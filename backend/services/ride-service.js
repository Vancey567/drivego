const tripModel = require('../models/trip-model');
const matchedTrip = require('../models/matchedTrip-model');
const riderModel = require('../models/rider-model');
var ObjectId = require('mongoose').Types.ObjectId; 

class rideService {
    async findDriver({source, destination, time, seats}) {
        try {
            const driver = await tripModel.findOne({source, destination, time, seats});
            return driver;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async createRide({rider, extraPerson, source, destination, preferredTripTime, offeredFare, luggage}) {
        try {
            return await riderModel.create({rider, extraPerson, source, destination, preferredTripTime, offeredFare, luggage});
        } catch(err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async searchRide(owner) {
        try {
            const ownerId = new ObjectId(owner);
            const existingRide = await riderModel.find({owner: ownerId});
            return existingRide ? true : false;
        } catch (err) {
            console.log(err);
            throw new Error(err.message); 
        }
    }
}

module.exports = new rideService();