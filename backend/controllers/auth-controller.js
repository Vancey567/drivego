const Users = require('../models/user-model')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supertest = require('supertest');
const {ObjectId} = require('mongodb');

const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dtos');

const SECRET_KEY = process.env.SECRET_KEY;
let phoneRegex = /^0?[6-9][\d]{9}$/;
class AuthController {
    async sendOtp(req, res) {
        const { phone } = req.body;
        if(!phone) {
            res.status(400).json({message: 'Phone number is required!'});
        }

        if(!phone.match(phoneRegex)) {
            res.status(400).json({message: 'Invalid Phone Number!'});
        }

        const otp = await otpService.generateOtp();

        const ttl = 1000 * 60 * 60 * 24;
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        
        const hash = hashService.hashOtp(data);

        try {
            // await otpService.sendBySms(phone, otp); // Pass phone and normal otp for sending to the user not the hashed otp
            return res.json({
                hash: `${hash}.${expires}`, // We will send a hash. The expires time will be extracted
                phone: phone,
                otp  // we don't want to send the otp in response to display in console
            });
        } catch(err) {
            console.log(err);
            res.status(500).json({message: 'Message sending failed'});
        }
    }
    
    async verifyOtp(req, res) {
        const { otp, hash, phone, name, email } = req.body;
        if(!otp || !hash || !phone) {
            res.status(400).json({message: 'All fields are required'});
        }
        if(!phone.match(regex)) {
            res.status(400).json({message: 'Invalid Phone Number!'});
        }
        const [ hashedOtp, expires ] = hash.split('.'); // split expires from hash
        if(Date.now() > +expires) {
            res.status(400).json({message: 'OTP expired'});
        }

        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp, data);
        if(!isValid) {
            res.status(400).json({message: 'Invalid OTP'});
        }

        let user;         
        try {
            user = await userService.findUser({phone: phone});// Find the user from the data using there phone number

            if(!user || user === null) {
                user = await userService.createUser({ phone: phone, name, email }); // if user does not exist, create user and store it in user variable
            }
            return res.json({userId: user._id});
        } catch(err) {
            console.log(err);
            res.status(500).json({ message: "DB error" });
        }

        // Generate JWT token
        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false 
        }); 

        // Before storing the refresh token into the cookie we will the store refresh token in the DB
        await tokenService.storeRefreshToken(refreshToken, user._id);

        // Creating cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        }) 

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        })

        const userDto = new UserDto(user);
        res.json({ user: userDto, auth: true });
    }

    async refresh(req, res) {
        // Get refresh token from header
        const {  refreshToken: refreshTokenFromCookie } = req.cookies;
        console.log("Refresh Token", refreshTokenFromCookie);

        // Check if token is valid
        let userData;
        try {
            userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
        } catch(err) {
            console.log("From Auth controller refresh token");
            console.log(err);
            return res.status(401).json({ message: "Invalid token" });
        }

        // Check if the refresh token exist in our DB.
        try {
            const token = await tokenService.findRefreshToken(userData._id, refreshTokenFromCookie);
            if(!token) {
                return res.status(401).json({ message: "Token does't exists in DB" });
            }
        } catch(err) {
            console.log(err);
            return res.status(500).json({ message: "Internal Error" });
        }

        // Check if valid user. // If the refreshToken has the user but our Db don't then
        const user = await userService.findUser({ _id: userData._id });
        if(!user) {
            return res.status(404).json({ message: "No User"});
        }

        // Generate both the tokens if everything is fine
        const { refreshToken, accessToken } = tokenService.generateTokens({ _id: userData._id });

        // update refreshToken. Since we have created the new refreshToken now we need to update the refreshToken in our DB newly created token.
        try {
            await tokenService.updateRefreshToken(userData._id, refreshToken)
        } catch(err) {
            console.log(err);
            return res.status(500).json({ message: "Internal error"});
        }

        // Store these tokens inside the cookie
        res.cookie('refreshToken', refreshToken, { 
            maxAge: 1000 * 60 * 60 * 24 * 30, 
            httpOnly: true, 
            domain: 'localhost',
        }) 

        res.cookie('accessToken', accessToken, { 
            maxAge: 1000 * 60 * 60 * 24 * 30, 
            httpOnly: true,
            domain: 'localhost',
        })

        // send Response on the client.
        const userDto = new UserDto(user);
        res.json({ user: userDto, auth: true });
    }

    async logout(req, res) {
        const { refreshToken } = req.cookies;

        await tokenService.removeToken(refreshToken);

        // 3. delete that cookies from DB
        res.clearCookie('refreshToken'); // res has this clearCookie() method inside which we need to pass the key of the cookie(here refreshToken and accessToken) to clear/delete the cookkie
        res.clearCookie('accessToken');
    
        res.json({ user: null, auth: false }); // now we will send the user as null(since no user) and make the auth as false (not authenticted);
    }


    async register(req, res) {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let {name, gender, dob, email, phone, occupation, password} = req.body;

        if(!name || !gender || !dob || !email || !phone || !password) {
            return res.json({error: "All fields are required!!"});
        }

        if(!email.match(emailRegex)) {
            return res.json({error: "Email format incorrect!!"});
        }

        Users.exists({ email: email }, async (err, user) => {
            if (user) {
                return res.json({error: "User already exists!"});
            } else if(err) {
                return res.json({error: "Something went wrong!"});
            } else {
                // let sendOtpRes = await supertest(`http://${req.get("host")}`).post('/sendotp').send({ phone });

                const someData = {
                    otp: sendOtpRes.body.otp, 
                    hash: sendOtpRes.body.hash,
                    phone: sendOtpRes.body.phone,
                    name, 
                    email 
                }

                // let verifyOtp = await supertest(`http://${req.get("host")}`).post('/verifyotp').send(someData);
                const userId = verifyOtp.body.userId;

                const hashedPassword = hashService.hashPassword(password);

                const user = await Users.findOneAndUpdate({_id: ObjectId(userId)}, {
                    gender: gender,
                    dob: dob,
                    occupation: occupation,
                    password: hashedPassword,
                }, {
                    new: true // returns the newly updated document
                })
                console.log(user);
            }
        })
    }

    async login(req, res) {
        let userCred = req.body;
    
        Users.findOne({ email: userCred.email })
        .then((user) => {
            if(user !== null) {
                bcryptjs.compare(userCred.password, user.password, (err, status) => {
                    if(status === true) {
                        jwt.sign(userCred, SECRET_KEY, (err, token) => {
                            if(err === null) {
                                res.json({message: `Welcome user`, token: token});
                            }
                        })
                    } else {
                    res.send({message: "Wrong Password"})
                    }
                })
            } else {
                res.send({message: "Username not found"});
            }
        }).catch((err) => {
            console.log(err);
            res.send({message: "user not found!!"});
        })
    }
}

module.exports = new AuthController;