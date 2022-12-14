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
            const requestedTrip = await TripService.requestDriver(riderId, driverId);
            return res.status(200).json({message: "Driver has been requested. Please wait for confirmation", requestedTrip});
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
            const tripDetails = await TripService.getTripDetails(tripId);
            const hashedOtp = tripDetails.otp;

            const verified = await OtpService.verifyOtp(hashedOtp, data);
            if(!verified) {
                return res.status(200).json({message: "OTP didn't match!!"});
            }

            const trip = await TripService.startTrip(riderId, driverId);
            if(trip.status === 'started') {
                return res.status(200).json({message: "Trip Started, Enjoy!!", trip: trip});
            }
            return res.status(200).json({message: "Trip not started yet!!", trip: trip});
        } catch(err) {
            console.log(err);
            return res.status(500).json({message: "Problem starting the trip!"});
        }
    }

    async endTrip(req, res) {
        const {tripId} = req.body;

        try {
            const trip = await TripService.endTrip(tripId);
            if(trip.status === 'completed') {
                // paymentService.pay() {

                // }
                return res.status(200).json({message: "Trip Completed Successfully, Hope You Enjoyed!!", trip: trip});
            }
            return res.status(200).json({message: "Trip in progress!!"});
        } catch(err) {
            console.log(err);
            return res.status(500).json({message: "Problem ending the trip!"});
        }
    }

    async allTrips(req, res) {
        const {driverId} = req.body;
        try {
            const trips = await DriverService.getAllTrips(driverId);
            if(!trips || trips.length === 0) { 
                return res.status(200).json({message: "No Trips found!!"});
            }
            return res.status(200).json(trips);
        } catch(err) {
            console.log(err);
            return res.status(400).json({message: "Something went wrong finding trips!"});
        }
    }

    async driverDetail(req, res) {
        const {driverId} = req.body;
        try {
            const driver = await TripService.driverDetails(driverId);
            if(driver) { 
                return res.status(200).json(driver);
            }
            return res.status(200).json({message: "Driver details not found!!"});
        } catch(err) {
            console.log(err);
            return res.status(400).json({message: "Something went wrong finding driver details!"});
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