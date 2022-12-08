const Users =  require('../models/user-model');
const userService = require('../services/user-service');
const sendEmailService = require('../services/sendEmail-service');
const CLIENT_URL = process.env.CLIENT_URL;

class UserController {
    async getUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json({users: users});
        } catch (err) {
            console.log(err);
            return res.status(404).json({message: err.message});
        }
    }

    async getUserDetail(req, res, email) {
        try {
            const user = await userService.getUserDetail(email);
            return res.status(200).json({user: user});
        } catch (err) {
            console.log(err);
            return res.status(404).json({message: err.message});
        }
    }

    async forgetPassword(req, res, email) {
        const user = await userService.findUser(email);
        console.log(user);
        
        if(!user) {
            return res.status(500).json({message: "User with this email doesn't exists"});
        }
        
        // Generate a link and reset token
        const resetPasswordToken = await tokenService.generateResetToken(user._id);
        const hasedResetPasswordToken = await hashService.hashPassword(resetPasswordToken);

        // Send Email with link and access token
        const link = `${CLIENT_URL}/passwordReset?token=${hasedResetPasswordToken}&id=${user._id}`;
        sendEmailService.sendEmail(user.email,"Password Reset Request",{name: user.name,link: link,},"../utils/template/requestResetPassword.handlebars");
        return link;

        // Send Email Notification for change of password.

    }
    
}

module.exports = new UserController();