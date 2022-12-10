const ReferralModel = require('../models/referral-model');

class ReferralService {
    async referralAlreadyExists(referredPhone) {
        try {
            const exists = await ReferralModel.findOne({referredPhone: referredPhone});
            return exists ? true : false;
        } catch(err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async storeReferredPhone(userId, referredPhone) {
        try {
            const referral = await ReferralModel.create({userId: userId, referredPhone: referredPhone});
            return referral;
        } catch(err) {
            console.log(err);
            throw new Error(err.message);
        }
    }
}

module.exports = new ReferralService();