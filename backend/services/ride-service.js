const TripModel = require('../models/trip-model');
const MatchedTrip = require('../models/matchedTrip-model');
const RiderModel = require('../models/rider-model');

var ObjectId = require('mongoose').Types.ObjectId;

class rideService {
    async findDriver({source, destination, time, seats}) {
        try {
            const driver = await TripModel.findOne({source, destination, time, seats});
            return driver;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async createRide({rider, source, destination, preferredTripTime, luggage}) {
        try {
            return await RiderModel.create({rider, source, destination, preferredTripTime, luggage});
        } catch(err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async searchRide(owner) {
        try {
            const ownerId = new ObjectId(owner);            
            const existingRide = await RiderModel.find({rider: ownerId});
            return existingRide && existingRide.length > 0 ? true : false;
        } catch (err) {
            console.log(err);
            throw new Error(err.message); 
        }
    }

    async deleteRiderTrip(riderId) {
        try {
            const deletedRider = await RiderModel.findByIdAndDelete(riderId);
            return deletedRider;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async riderDetails(riderId) {
        const riderDetail = await RiderModel.findOne({rider: ObjectId(riderId)}).populate('rider');
        return riderDetail;
    }

    async getAllRides(riderId) {
        const rides = await MatchedTrip.find({rider: ObjectId(riderId)});
        return rides;
    }
}

module.exports = new rideService();