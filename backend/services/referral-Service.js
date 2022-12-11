const ReferralModel = require('../models/referral-model');
var ObjectId = require('mongoose').Types.ObjectId; 


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

    async getReferredUsers(userId1) {
        console.log(userId1);
        console.log(typeof(userId1));
        try {
            const userId = ObjectId(userId1);
            const referrals = await ReferralModel.find({userId: userId});
            return referrals;
        } catch(err) {
            console.log(err);
            throw new Error(err.message);
        }
    }
}

module.exports = new ReferralService();