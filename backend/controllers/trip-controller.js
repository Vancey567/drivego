// const vehicleService = require('../services/vehicle-service');
const TripService = require('../services/trip-service');
const UserService = require('../services/user-service');
// const authController = require('./auth-controller');
const DriverService = require('../services/driver-service');
const RiderService = require('../services/ride-service');
const OtpService = require('../services/otp-service');
const HashService = require('../services/hash-service');

const DriverModel = require('../models/driver-model');

class TripController {
    async createDriversTrip(req, res) {
        const {driver} = req.body;

        try {            
            const driverOccupied = await DriverService.isDriverOccupied(driver);
            if(driverOccupied) {
                return res.status(400).json({message: `You already have a trip created!!`});
            }
            
            try {
                const savedTrip = await DriverService.saveTrip(req.body);
                res.status(200).json({message: `Trip Created Successfully!!`, savedTrip});
            } catch(err) {
                console.log(err);
                res.status(500).json({message: "Problem Creating the trip!!"});
            }
        } catch(err) {
            console.log(err);
            res.status(500).json({message: "Problem Registering the trip!!"});
        }
    }

    async findTrip(req, res) {
        const {riderId} = req.body;
        try {
            const rider = await RiderService.riderDetails(riderId);
            const driver = await TripService.findDriver(rider.source, rider.destination, rider.preferredTripTime);
            if(!driver || driver.length === 0) {
                return res.status(404).json({message: "Sorry, No Driver Found for Your Destination"});
            }
            return res.status(200).json(driver);
        } catch (err) {
            console.log(err);
            return res.status(500).json({message: "Problem finding trip for your!!"});
        }
    }

    async requestDriver(req, res) {
        const {riderId, driverId} = req.body;
        try {
            await TripService.requestDriver(riderId, driverId);
            // const trip = await TripService.saveMatchedTrip(riderId, driverId);
            return res.status(200).json({message: "Driver has been requested. Please wait for confirmation"});
        } catch(err) {
            console.log(err);
            return res.status(500).json({message: "Request unsuccessful!!"});
        }
    }

    async driverApproval(req, res) {
        const {riderId, driverId, status} = req.body;
        try {
            const otp = await OtpService.generateOtp();
            const data = `${riderId}.${otp}`;
            const hashedOtp = HashService.hashOtp(data);
            console.log("hashedOtp", hashedOtp);

            const accepted = await TripService.acceptRider(riderId, driverId, status, hashedOtp);
            
            if(!accepted) {
                return res.status(200).json({message: "Sorry, Driver rejected your ride request!!"});
            }

            try {
                const user = await UserService.findUserDetails(riderId);
                // await OtpService.sendTripOtpBySms(user.phone, otp);

                // Delete Data from Rider and Driver Models
                const deletedDriver = await DriverService.deleteDriverTrip(driverId);
                const deletedRider = await RiderService.deleteRiderTrip(riderId);
                console.log(deletedDriver, deletedRider);
                return res.status(200).json({message: `Your Ride request is accepted, Your OTP for the ride is ${otp}!!`});
            } catch(err) {
                console.log(err);
                return res.status(500).json({message: "Problem sending OTP!!"});
            }
            // const trip = await TripService.saveMatchedTrip(riderId, driverId);
        } catch(err) {
            console.log(err);
            return res.status(500).json({message: "Problem finding trip for your!!"});
        }
    }

    async startTrip(req, res) {
        const {tripId, riderId, driverId, otp} = req.body;

        try {
            const data = `${riderId}.${otp}`;
            const newHash = HashService.hashOtp(data);

            const tripDetails = await TripService.getTripDetails(tripId);
            const hash = tripDetails.otp;
            const [ riderId, hashedOtp ] = hash.split('.');

            const verified = await OtpService.verifyOtp(hashedOtp, newHash);
            if(!verified) {
                return res.status(200).json({message: "OTP didn't match!!"});
            }

            const started = await TripService.startTrip(riderId, driverId);
            if(!started) {
                return res.status(200).json({message: "Sorry, Driver rejected your ride request!!"});
            }
            return res.status(200).json({message: "Trip Started, Enjoy!!"});
        } catch(err) {

        }
    }

    // async saveMatchedTrip(req, res) {
    //     const {rider, driver} = req.body;
    //     try {
    //         const trip = await TripService.saveMatchedTrip(rider, driver);
    //         try {
    //             const otp = OtpService.generateOtp();
    //             const user = await UserService.findUserDetails(rider);
    //             await OtpService.sendTripOtpBySms(user.phone, otp);

    //             // Delete Data from Rider and Driver Models
    //             const deletedDriver = await DriverService.deleteDriverTrip(driver);
    //             const deletedRider = await RiderService.deleteRiderTrip(driver);
    //             console.log(deletedDriver, deletedRider);
    //         } catch(err) {
    //             console.log(err);
    //             return res.status(500).json({message: "Problem sending OTP!!"});
    //         }
    //         return res.status(200).json({trip, message: "Trip Created successfully"});
    //     } catch(err) {
    //         console.log(err);
    //         return res.status(500).json({message: "Problem creating the trip!!"});
    //     }
    // }
}

module.exports = new TripController();