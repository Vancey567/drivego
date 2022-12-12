const Jimp = require('jimp');
const path = require('path');
const userService = require('../services/user-service');
const UserDto = require('../dtos/user-dtos')

class ActivateController {
    async uploadImg(req, res) {
        const { image } = req.body;
        if(!image) {
            res.status(400).json({message: "All fields are required!"});
        }

        const buffer = Buffer.from(
            image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
            'base64'
        );

        const imageName = `${Date.now()}-${Math.round(
            Math.random() * 1e9 
        )}.png`;

        try {
            const jimResp = await Jimp.read(buffer);
            jimResp
                .resize(300, Jimp.AUTO)  // width, height
                // .quality(60) // set JPEG quality
                .write(path.resolve(__dirname, `../storage/${imageName}`));

            const imagePath = `/storage/${imageName}`;
            return res.status(200).json(imagePath);
        } catch(err) {
            console.log(err);
            res.status(500).json({message: "Could not process the image"});
        }

        const userId = req.user._id;

        // Update user
        try {
            const user = await userService.findUser({ _id: userId });
            if(!user) {
                res.status(404).json({message: "User not found"});
            }

            user.isActivated = true;
            user.image = `/storage/${imageName}`;

            user.save(); // Save the user to the database
            res.json({ user: new UserDto(user), auth: true }); // If everything went right we will send the updated user. We are sending the flag auth: true cuz we need it on client.
        } catch(err) {
            console.log(err);
            res.status(500).json({message: "Something wnet wrong while storing user image in the DB"});
        }


        // update vehichle
        try {

        } catch(err) {
            console.log(err);
            res.status(500).json({message: "Something wnet wrong while storing vehichle image in the DB"});
        }
    }
}

module.exports = new ActivateController();