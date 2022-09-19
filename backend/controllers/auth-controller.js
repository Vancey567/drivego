const Users = require('../models/user-model')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

class AuthController {
    async register(req, res) {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let {name, gender, dob, email, phone, password} = req.body;

        if(!name || !gender || !dob || !email || !phone || !password) {
            return res.json({error: "All fields are required!!"});
        }

        if(!email.match(regex)) {
            return res.json({error: "Email format incorrect!!"});
        }

        Users.exists({ email: email }, (err, user) => {
            if (user) {
                return res.json({error: "User already exists!"});
            } else if(err) {
                return res.json({error: "Something went wrong!"});
            } else {
                console.log('bcrypt');
                
                bcryptjs.genSalt(10, (err, salt) => {
                    if(err === null) {
                        bcryptjs.hash(password, salt, (err, hashedPassword) => {
                            password = hashedPassword;

                            const userObj = new Users({
                                name: name,
                                email: email,
                                phone: phone,
                                gender: gender,
                                dob: dob,
                                password: hashedPassword,
                            })
                            
                            userObj.save()
                            .then(() => {
                                res.json({message: "User Registered"});
                            }).catch((err) => {
                                console.log(err);
                                res.json({message: "Problem creating the user!!"});
                            })
                        })
                    } else {
                        console.log(err);
                    }
                }) 
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