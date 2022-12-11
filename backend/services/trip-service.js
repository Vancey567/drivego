const MatchedTripModel = require('../models/matchedTrip-model');
const DriverModel = require('../models/driver-model');

class tripService {
    // async findDriver(source, destination, time, seats) {
    //     try {
    //         const driver = await DriverModel.find({
    //             sourceLat: {$gte: source[0] - 0.2000, $lte: source[0] + 0.2000},
    //             sourceLong: {$gte: source[1]- 0.2000, $lte: source[1] + 0.2000},
    //             destinationLat: {$gte: destination[0] - 0.2000, $lte: destination[0] + 0.2000},
    //             destinationLong: {$gte: destination[1] - 0.2000, $lte: destination[1] + 0.2000},
    //             time: {$gte: time - 3600, $lte: time + 3600},
    //             seats: {$lte: seats}
    //         });
    //         return driver;
    //     } catch (err) {
    //         console.log(err);
    //         throw new Error(err);
    //     }
    // }
    
    async findDriver(source, destination, time, seats) {
        try {
            const driver = await DriverModel.find({
                source: source,
                destination: destination,
                time: {$gte: time - 3600, $lte: time + 3600},
                seats: {$lte: seats}
            });
            return driver;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async saveMatchedTrip(rider, driver) {
        try {
            const trip = await (await (await MatchedTripModel.create({rider: rider, driver: driver})).populate('rider')).populate('driver');
            return trip;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }
}

module.exports = new tripService();