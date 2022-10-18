const vehicleService = require('../services/vehicle-service');
const tripService = require('../services/trip-service');

const authController = require('./auth-controller');
const Trips = require('../models/trip-model');

class TripController {
    async createTrip(req, res) {
        // await vehicleService.findVehicle();
        // if(driver.isActivated) {
        //     await tripService.generateTrip(req.body);
        // } else {
        //     await tripService.activateDriver(req.body);
        // }

        const {vehicle} = req.body;

        try {
            const trip = await Trips.findOne({vehicle: vehicle});

            if(trip && trip.status !== "completed") {
                console.log(trip);
                return res.status(409).json({message: `You already have a trip created with vehicle number ${tripNumber}`});
            }
            
            if(!trip || trip === null){
                try {
                    // const vDto = new tripDto({ driver, vehicle, rider, coRiders, availableSeats, seatType, source, destination, pickup, expectedStartTime, startTime, endTime, fare, paymentType, status});
                    const savedtrip = await tripService.saveTrip(req.body);
                    res.status(200).json({message: "trip Registered Successfully!!"});
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


    async createRide(req, res, driver) {
        authController.sendOtp();
    }
}

module.exports = new TripController();