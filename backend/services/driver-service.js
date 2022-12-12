const DriverModel = require('../models/driver-model');
const MatchedTrip = require('../models/matchedTrip-model');

var ObjectId = require('mongoose').Types.ObjectId; 

class driverService {
    async isDriverOccupied(driverId) {
        try {
            const driver = await DriverModel.find({driver: ObjectId(driverId)});  
            return driver.length === 0? false : true;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async getAllTrips(driverId) {
        const rides = await MatchedTrip.find({driver: ObjectId(driverId)});
        return rides;
    }

    async saveTrip(driver) {
        try {
            const createdTrip = await DriverModel.create(driver); 
            return createdTrip;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async deleteDriverTrip(driverId) {
        try {
            const deletedDriver = await DriverModel.findByIdAndDelete(driverId);
            return deletedDriver;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }
}

module.exports = new driverService();