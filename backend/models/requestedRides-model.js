const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchedTripSchema = new Schema ({
    driver: {type: Schema.Types.ObjectId, ref: 'Driver'},
    rider: {type: Schema.Types.ObjectId, ref: 'Rider'},
    vehicle: {type: Schema.Types.ObjectId, ref: 'Vehicle'},
    source: {type: String, required: true},
    destination: {type: String, required: true},
    startTime: {type: Date, required: false},
    // endTime: {type: Date, required: false},
    fare: {type: String, required: true},
    paymentType: {type: String, enum:['Cash', 'Card', 'UPI', 'NetBanking'], default: "Cash", required: true},
    paid: {type: Boolean, default: false, required: true},
    status: {type: String, enum: ['pending', 'accepted', 'decline', 'not-started', 'in-progress', 'completed'], default: 'pending', required: true},
}, { timestamps: true })

module.exports = mongoose.model('Trips', matchedTripSchema);