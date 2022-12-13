const Jimp = require('jimp');
const path = require('path');

class UploadController {
    async uploadImg(image) {
        // if(!image) {
        //     throw new Error({message: "Image is required!"});
        // }

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
            return imagePath;
        } catch(err) {
            console.log(err);
            throw new Error(err)
        }
    }
}

module.exports = new UploadController();