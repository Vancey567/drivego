const Vehicles = require('../models/vehicle-model');

class VehicleService {
    async findVehicle() {
        const vehicles = await Vehicles.find();
        return vehicles;
    }
}

module.exports = new VehicleService();