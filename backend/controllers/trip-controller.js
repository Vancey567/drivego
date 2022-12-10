// const vehicleService = require('../services/vehicle-service');
// const tripService = require('../services/trip-service');
// const authController = require('./auth-controller');
const DriverService = require('../services/driver-service');

const DriverModel = require('../models/driver-model');

class TripController {
    async createTrip(req, res) {
        const {driver} = req.body;

        // if(driver.isActivated) {
        //     await tripService.generateTrip(req.body);
        // } else {
        //     await tripService.activateDriver(req.body);
        // }
        try {            
            const trip = await DriverService.driverOccupied(driver);
            if(trip) {
                return res.status(400).json({message: `You already have a trip created!!`});
            }
            
            try {
                // const vDto = new tripDto({ driver, vehicle, rider, coRiders, availableSeats, seatType, source, destination, pickup, expectedStartTime, startTime, endTime, fare, paymentType, status});
                const savedtrip = await DriverService.saveTrip(req.body);
                res.status(200).json({message: `Trip Created Successfully!!`, savedtrip});
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
        const {rider, } = req.body;
        
    }

    async createRide(req, res) {
        authController.sendOtp();
    }
}

module.exports = new TripController();