const vehicleService = require('../services/vehicle-service');
const tripService = require('../services/trip-service');

const authController = require('./auth-controller');
const Trips = require('../models/trip-model');

class TripController {
    async createTrip(req, res) {
        // if(driver.isActivated) {
        //     await tripService.generateTrip(req.body);
        // } else {
        //     await tripService.activateDriver(req.body);
        // }

        const {vehicle} = req.body;

        try {
            const trip = await Trips.findOne({vehicle: vehicle});

            if(trip && trip.status !== "completed") {
                const vehicleDetails = await vehicleService.findVehicleById(vehicle);
                return res.status(409).json({message: `You already have a trip created with vehicle number ${vehicleDetails.vehicleNumber}`});
            }
            
            if(!trip || trip === null){
                try {
                    // const vDto = new tripDto({ driver, vehicle, rider, coRiders, availableSeats, seatType, source, destination, pickup, expectedStartTime, startTime, endTime, fare, paymentType, status});
                    const savedtrip = await tripService.saveTrip(req.body);
                    res.status(200).json({message: `Trip Created Successfully!! ${savedtrip}`});
                } catch(err) {
                    console.log(err);
                    res.status(500).json({message: "Problem Registering the trip!!"});
                }
            }
        } catch(err) {
            console.log(err);
            res.status(500).json({message: "Problem Registering the trip!!"});
        }
    }


    async createRide(req, res) {
        authController.sendOtp();
    }
}

module.exports = new TripController();