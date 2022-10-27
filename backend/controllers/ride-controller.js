const tripController = require('./trip-controller');
const rideService = require('../services/ride-service');

const tripService = require('../services/trip-service');


class RideController {
    async createRide(req, res, params) {
        // const { rider, extraPerson, source, destinati, preferredTripTimeon, pickup, preferredVehicle, preferredSeatType, offeredFare, luggage } = req.body;
        const {trip, ride} = req.body;
        
        const rideData = await rideService.createRide({trip, ride});

    }

    async findRide(req, res) {
        const {source, destination, time, seats} = req.body;

        const trip = await tripService.findTrip({source, destination});
        if(!trip && trip === null) {
            res.status(404).json({message: 'Sorry, No trip found at your desired location!!'});
        }

        if(trip) {
            res.status(200).json({trip: trip});
        }        
    }
}

module.exports = new RideController();