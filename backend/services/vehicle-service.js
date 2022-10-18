const VehiclesModel = require('../models/vehicle-model');

class VehicleService {
    async findVehicle() {
        try {
            const vehicles = await VehiclesModel.find();
            return vehicles;
        } catch(err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async findAllVehicle() {
        try {
            const vehicles = await VehiclesModel.find();
            return vehicles;
        } catch(err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async saveVehicle(data) {
        try {
            const vehicle = await VehiclesModel.create(data);
            return vehicle;
        } catch(err) {
            console.log(err);
            throw new Error(err.message);
        }
    }
}

module.exports = new VehicleService();