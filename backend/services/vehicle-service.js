const VehiclesModel = require('../models/vehicle-model');
var ObjectId = require('mongoose').Types.ObjectId; 
class VehicleService {
    async findOwnersVehicles(owner) {
        try {
            const ownerId = new ObjectId(owner);
            return await VehiclesModel.find({owner: ownerId}).populate('owner');
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

    async findVehicleById(vehicleId) {
        try {
            const vehicles = await VehiclesModel.findById(vehicleId).populate('owner');
            return vehicles;
        } catch(err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async findVehicleByNumber(vehicleNo) {
        try {
            const vehicles = await VehiclesModel.find({vehicleNumber: vehicleNo}).populate('owner');
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