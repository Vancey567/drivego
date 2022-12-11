const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const riderSchema = new Schema ({
    rider: {type: Schema.Types.ObjectId, ref: 'User'},
    source: {type: String, required: true},
    destination: {type: String, required: true},
    preferredTripTime: {type: String, required: true},
    luggage: {type: Boolean, default: false, required: false},
    // offeredFare: {type: String, required: false},
    // extraPerson: {type: Number, required: false, min: 0, max: 6},
    // pickup: {type: String, required: true},
    // preferredVehicle: {type: String, required: true},
    // preferredSeatType: {type: String, required: true},
}, { timestamps: true })

module.exports = mongoose.model('Rider', riderSchema);