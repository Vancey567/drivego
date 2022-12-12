const MatchedTripModel = require('../models/matchedTrip-model');
const DriverModel = require('../models/driver-model');
const RequestedTripModel = require('../models/driver-model');
var ObjectId = require('mongoose').Types.ObjectId; 


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

    async findDriver(source, destination, time) {        
        try {
            const driver = await DriverModel.find({
                source: source,
                destination: destination,
                // time: { $gte: (time - 5) % 23, $lte: (time + 5) % 23},
                // time: { $gte: {$substract: [time, 18000000]}, $lte: time + 9800 },
                // availableSeats: { $gte: seats }
            });
            console.log(driver);
            return driver;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async requestDriver(rider, driver) {
        try {
            const requestedTrip = await (await (await MatchedTripModel.create({ rider: new ObjectId(rider), driver: new ObjectId(driver) })).populate('rider')).populate('driver');
            return requestedTrip;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async acceptRider(driverId, riderId, status, hashedOtp) {
        console.log({driverId, riderId, status, hashedOtp});

        try {
            let accepted;
            if(status === 'accepted') {
                accepted = await MatchedTripModel.findOneAndUpdate(
                    { rider: ObjectId(riderId), driver: ObjectId(driverId) },
                    { status: status, $set: {otp: hashedOtp } },
                    { upsert: true, new: true }
                ).exec();
            } else {
                accepted = await MatchedTripModel.findOneAndUpdate(
                    { rider: ObjectId(riderId), driver: ObjectId(driverId) },
                    { status: status },
                    { new: true }
                );
            }
            console.log("Inside", accepted);
            return accepted.status === "accepted" ? true : false;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async getTripDetails(id) {
        const tripDetails = await MatchedTripModel.findById(id);
        return tripDetails;
    }

    async startTrip(driverId,  riderId, status, otp) {
        try {
            const started = await MatchedTripModel.findOneAndUpdate(
                { rider: ObjectId(riderId), driver: ObjectId(driverId) },
                { status: "started" },
                { new: true }
            );
            return started;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async saveMatchedTrip(rider, driver) {
        try {
            const trip = await (await (await MatchedTripModel.create({ rider: rider, driver: driver })).populate('rider')).populate('driver');
            return trip;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async endTrip(tripId) {
        try {
            const ended = await MatchedTripModel.findOneAndUpdate(
                { _id: ObjectId(tripId)},
                { status: "completed" },
                { new: true }
            );
            return ended;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async requestApproval(riderId, driverId, data) {

    }
}

module.exports = new tripService();