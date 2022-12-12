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
            return res.status(400).json({ message: "Problem Creating Ride for You!!"});
        }
    }

    async allRides(req, res) {
        const {riderId} = req.body;
        try {
            const rides = await rideService.getAllRides(riderId);
            if(!rides || rides.length === 0) { 
                return res.status(200).json({message: "No Rides found!!"});
            }
            return res.status(200).json(rides);
        } catch(err) {
            console.log(err);
            return res.status(400).json({message: "Something went wrong finding rides!"});
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

    async riderDetails(req, res) {
        const {riderId} = req.body;
        try {
            const rider = await rideService.riderDetails(riderId);
            if(rider) { 
                return res.status(200).json(rider);
            }
            return res.status(200).json({message: "Rider details not found!!"});
        } catch(err) {
            console.log(err);
            return res.status(400).json({message: "Something went wrong finding rider details!"});
        }
    }
}

module.exports = new RideController();