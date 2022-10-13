const Vehicles = require('../models/vehicle-model');
const VehicleService = require('../services/vehicle-service');
class VehicleController {
    async registerVehicle(req, res) {
        const {owner, vehicleNumber, model, type, capacity, color, carImg } = req.body;

        try {
            const vehicle = await Vehicles.find({vehicleNumber: vehicleNumber});

            if(vehicle) {
                return res.json({message: `Vehicle with vehicle number ${vehicleNumber} is already registered!!`});
            }

            const vehicleObj = new Vehicles({
                owner, vehicleNumber, model, type, capacity, color, carImg
            })
            
            vehicleObj.save()
            .then(() => {
                res.status(200).json({message: "Vehicle Registered Successfully!!"})
            }).catch(err => {
                console.log(err);
                res.status(500).json({message: "Problem Registering the Vehicle!!"});
            })
        } catch(err) {
            console.log(err);
            res.status(500).json({message: "Problem Registering the Vehicle!!"});
        }
    }

    async allVehicles(req, res) {
        try {
            const vehicles = VehicleService.findVehicle();
            
            if(vehicles.length === 0) {
                return res.status(404).json({message: "No Vehicle Found, Register One!!"});
            }
            return res.status(200).json({vehicles: vehicles});
        } catch (e) {
            console.log(err);
            return res.status(500).json({message: "Problem finding all the vehicles!!"});
        }

    }

    async removeVehicle(req, res) {
        const {vehicleId} = req.body;
        try {
            await Vehicles.findOneAndDelete({_id: vehicleId})
            .then((vehicle) => {
                return res.status(200).json({message: 'Vehicle Removed successfully', vehicle: vehicle});
            })
            .catch(err => {
                console.log(err);
                return res.status(404).json({message: `Vehicle with id ${vehicleId} doesn't exist!!`});
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({message: "Problem Removing the Vehicle!!"});
        }
    }
}

module.exports = new VehicleController();