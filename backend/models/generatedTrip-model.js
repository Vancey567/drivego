const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generatedTripSchema = new Schema ({
    trip: {type: Schema.Types.ObjectId, ref: 'Trip'},
    rider: {type: Schema.Types.ObjectId, ref: 'Rider'},
    paymentType: {type: String, enum:['Cash', 'Card', 'UPI', 'NetBanking'], required: true},
    status: {type: String, required: true},
}, { timestamps: true })

module.exports = mongoose.model('GeneratedTrip', generatedTripSchema);