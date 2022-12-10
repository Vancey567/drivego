const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const referralSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    referredPhone: { type: String, required: true},
    // createdAt: { type: Date, default: Date.now },
    // expireAt: { type: Date, default: Date.now + '1m' }
    expireAt: { type: Date, default: Date.now() + 1 * 60 * 1000  }
}, {timestamps: true});

module.exports = mongoose.model('Referral', referralSchema);