const tripController = require('./trip-controller');
const rideService = require('../services/ride-service');

class RideController {
    async createRide(req, res, params) { // created by driver
        const { rider, extraPerson, source, destinati, preferredTripTimeon, pickup, preferredVehicle, preferredSeatType, offeredFare, luggage } = req.body;
    
    }

    async findRide(req, res) { // booked by rider
        // const driver = await tripController.findDriver(filter);
        // const {source, destination, time, seats} = req.body;
        const filter = req.body;

        const driver = await rideService.findDriver(filter);

        const trip = await tripController.createRide(driver);

    }
}

module.exports = new RideController();