const Trips = require('../models/trip-model');

class tripService {
    // async findTrip({source, destination, time, seats}) {
    //     try {
    //         const trip = await Trips.find({source: source, destination: destination});
    //         return trip;
    //     } catch (err) {
    //         console.log(err);
    //         throw new Error(err);
    //     }
    // }

    async findTrip({ source, destination, time, seats }) {
        try {
            const trip = await Trips.find({ 
                sourceLat: source.lat,
                sourceLong: source.long,
                destinationLat: destination.lat,
                destinationLong: destination.long,
                time: time
            });
            
            return trip;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async generateTrip({ }) {

    }

    async activateDriver() {

    }

    async saveTrip(data) {
        try {
            const trip = await Trips.create(data);
            return trip;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }
}

module.exports = new tripService();