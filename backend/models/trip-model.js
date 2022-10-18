const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema ({
    driver: {type: Schema.Types.ObjectId, ref: 'User'},
    vehicle: {type: Schema.Types.ObjectId, ref: 'Vehicle'},
    rider: {type: Schema.Types.ObjectId, ref: 'Rider'},
    // extraPerson: {type: Number, required: true, min: 0, max: 10},
    coRiders: {type: Schema.Types.ObjectId, ref: 'Rider'},
    availableSeats: {type: Number, required: true},
    seatType: {type: String, required: true},
    source: {type: String, required: true},
    destination: {type: String, required: true},
    pickup: {type: String, required: true},
    expectedStartTime: {type: Date, required: true},
    startTime: {type: Date, required: false},
    endTime: {type: Date, required: false},
    fare: {type: String, required: true},
    paymentType: {type: String, enum:['Cash', 'Card', 'UPI', 'NetBanking'], required: true},
    status: {type: String, required: true},
}, { timestamps: true })

module.exports = mongoose.model('Trip', tripSchema);