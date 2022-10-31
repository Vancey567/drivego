const tripModel = require('../models/trip-model');
const generatedTrip = require('../models/generatedTrip-model');
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

    async createRide({trip, ride, paymentType}) {
        await generatedTrip.create({trip, ride, paymentType});
    }
}

module.exports = new rideService();