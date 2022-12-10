const driverModel = require('../models/driver-model');
var ObjectId = require('mongoose').Types.ObjectId; 

class driverService {
    async driverOccupied(driverId) {
        try {
            const driver = await driverModel.find({driver: ObjectId(driverId)});  
            return driver.length === 0? false : true;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async saveTrip(driver) {
        try {
            const createdTrip = await driverModel.create(driver); 
            return createdTrip;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }
}

module.exports = new driverService();