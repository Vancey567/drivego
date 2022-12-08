const crypto = require('crypto');
const bcryptjs = require('bcryptjs');

class HashService {
    hashOtp(data) { 
       return crypto.createHmac('sha256', process.env.HASH_SECRET).update(data).digest('hex');
    }

    async hashPassword(password) {
         bcryptjs.genSalt(10, async (err, salt) => {
            if(err === null) {
                bcryptjs.hash(password, salt, (err, hashedPassword) => {                   
                    if(err) {
                        console.log("hashError");
                        console.log(err);
                        return {message: "Problem hashing password!!"};
                    } else {
                        console.log("Bcrypt", hashedPassword);
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