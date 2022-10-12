const vehicleService = require('../services/vehicle-service');
const tripService = require('../services/trip-service');

const authController = require('./auth-controller')

class TripController {
    async createTrip(req, res) {
        // await vehicleService.findVehicle();
        const {driver} = req.body;

        // if(driver.isActivated) {
        //     await tripService.generateTrip(req.body);
        // } else {
        //     await tripService.activateDriver(req.body);
        // }
    }


    async createRide(req, res, driver) {
        authController.sendOtp();
    }
}

module.exports = new TripController();