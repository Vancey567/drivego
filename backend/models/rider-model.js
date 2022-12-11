const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const riderSchema = new Schema ({
    rider: {type: Schema.Types.ObjectId, ref: 'User'},
    extraPerson: {type: Number, required: true, min: 0, max: 6},
    source: {type: String, required: true},
    destination: {type: String, required: true},
    preferredTripTime: {type: String, required: true},
    // offeredFare: {type: String, required: false},
    luggage: {type: Boolean, required: true},
    // pickup: {type: String, required: true},
    // preferredVehicle: {type: String, required: true},
    // preferredSeatType: {type: String, required: true},
}, { timestamps: true })

module.exports = mongoose.model('Rider', riderSchema);