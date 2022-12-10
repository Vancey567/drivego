const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema ({
    driver: {type: Schema.Types.ObjectId, ref: 'User'},
    vehicle: {type: Schema.Types.ObjectId, ref: 'Vehicle'},
    coRiders: {type: [String], required: true},
    availableSeats: {type: Number, required: true},
    source: {type: String, required: true},
    destination: {type: String, required: true},
    expectedStartTime: {type: Date, required: true},
    fare: {type: String, required: true},
    status: {type: String, enum: ['not-matched', 'in-progress', 'completed']},
}, { timestamps: true })

module.exports = mongoose.model('Driver', driverSchema);