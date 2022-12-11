const driverModel = require('../models/driver-model');
var ObjectId = require('mongoose').Types.ObjectId; 

class driverService {
    async isDriverOccupied(driverId) {
        try {
            const driver = await driverModel.find({driver: ObjectId(driverId)});  
            return driver.length === 0? false : true;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async driverApproval(driver, rider) {
        
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

    async deleteDriverTrip(driverId) {
        console.log(driverId);
        try {
            const deletedDriver = await driverModel.findByIdAndDelete(driverId);
            console.log(deletedDriver);
            return deletedDriver;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }
}

module.exports = new driverService();