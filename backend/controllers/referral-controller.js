const ReferralService = require('../services/referral-Service');
const OtpService = require('../services/Otp-Service');

let phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
class ReferralController {
    async generateReferral(req, res) {
        const {userId, referredPhone} = req.body;

        if(!referredPhone) {
            return res.status(400).json({message: 'Phone number is required!'});
        }

        if(!referredPhone.match(phoneRegex)) {
            return res.status(400).json({message: 'Invalid Phone Number!'});
        }

        const exists = await ReferralService.referralAlreadyExists(referredPhone);
        if(exists) {
            return res.status(400).json({message: `${referredPhone} is already referred!!`});
        }
        
        try {
            const reffered = await ReferralService.storeReferredPhone(userId, referredPhone);
            // await OtpService.sendReferralBySms(referredPhone);
            return res.status(200).json({message: `You referred ${referredPhone}`});
        } catch (err) {
            console.log(err);
            return res.status(400).json({message: 'Something went wrong, Please try again'});
        }
    }

    async referredUsers(req, res) {
        const {userId} = req.body;
        try {
            const referrals = await ReferralService.getReferredUsers(userId);
            if(referrals.length === 0) {
                return res.status(404).json({message: `You haven't referred anyone yet, refer someone!!`});
            }
            return res.status(200).json(referrals);
        } catch (err) {
            console.log(err);
            return res.status(400).json({message: 'Something went wrong, Please try again'});
        }
    }
}

module.exports = new ReferralController();