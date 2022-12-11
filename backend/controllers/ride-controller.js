const tripController = require('./trip-controller');
const rideService = require('../services/ride-service');
const tripService = require('../services/trip-service');

class RideController {
    async createRide(req, res) {
        const { rider, source, destination, preferredTripTime, luggage } = req.body;

        try {
            const createNewTrip = await rideService.searchRide(rider);
            if(createNewTrip) {
                return res.json({message: "You already have a ride created!!"});
            } else {
                const rideData = await rideService.createRide({rider, source, destination, preferredTripTime, luggage});
                return res.status(200).json({rideData, message: "Ride Created Successfully, Soon we will find a trip for you!!"});
            }
        } catch(err) {
            console.log(err);
            res.status(400).json({ message: "Problem Creating Ride for You!!"});
        }
    }

    
    async findRide(req, res) {
        const { } = req.body;

        const trip = await tripService.findTrip({source, destination});
        if(!trip && trip == null) {
            res.status(404).json({message: 'Sorry, No trip found at your desired location!!'});
        }
        
        if(trip) {
            res.status(200).json({trip: trip});
        }        
    }
}

module.exports = new RideController();