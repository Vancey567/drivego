const tripModel = require('../models/trip-model');

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
}

module.exports = new rideService();