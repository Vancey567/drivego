const VehiclesModel = require('../models/vehicle-model');
var ObjectId = require('mongoose').Types.ObjectId; 
class VehicleService {
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
            const vehicles = await VehiclesModel.findById(vehicleId);
            return vehicles;
        } catch(err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async findVehicleByNumber(vehicleNo) {
        try {
            const vehicles = await VehiclesModel.find({vehicleNumber: vehicleNo});
            return vehicles;
        } catch(err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async findOwnersVehicles(owner) {
        try {
            // console.log(owner);            
            return await VehiclesModel.find({owner: ObjectId(owner)});
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