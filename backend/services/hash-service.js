const crypto = require('crypto');
const bcryptjs = require('bcryptjs');

class HashService {
    hashOtp(data) { 
       return crypto.createHmac('sha256', process.env.HASH_SECRET).update(data).digest('hex');
    }

    hashPassword(password) { 
        bcryptjs.genSalt(10, (err, salt) => {
            if(err === null) {
                bcryptjs.hash(password, salt, (err, hashedPassword) => {
                    console.log(password);
                    
                    // password = hashedPassword;

                    // const userObj = new Users({
                    //     name: name,
                    //     email: email,
                    //     phone: phone,
                    //     gender: gender,
                    //     dob: dob,
                    //     password: hashedPassword,
                    // })
                    
                    // userObj.save()
                    // .then(() => {
                    //     res.json({message: "User Registered"});
                    // }).catch((err) => {
                    //     console.log(err);
                    //     res.json({message: "Problem creating the user!!"});
                    // })
                    if(err) {
                        console.log("hashError");
                        console.log(err);
                        return {message: "Problem hashing password!!"};
                    } else {
                        return hashedPassword;
                    }
                })
            } else {
                console.log(err);
                res.json({message: "Problem generating salt for password!!"});
            }
        }) 
    }
}

module.exports = new HashService();