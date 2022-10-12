const tripController = require('./trip-controller');

class RideController {
    async createRide(req, res, params) { // created by driver
        const { rider, extraPerson, source, destinati, preferredTripTimeon, pickup, preferredVehicle, preferredSeatType, offeredFare, luggage } = req.body;
        
    }

    async bookRide(req, res, params, filter) { // booked by rider
        const driver = await tripController.findDriver(filter);

        const trip = await tripController.createRide(driver);

    }
}

module.exports = new RideController();