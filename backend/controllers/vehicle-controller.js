const Vehicles = require('../models/vehicle-model');
const VehicleService = require('../services/vehicle-service');
const ImageService = require('../services/imageUpload-service');

const vehicleDto = require('../dtos/vehicle-dtos'); 

class VehicleController {
    async registerVehicle(req, res) {
        let {owner, vehicleNumber, model, type, capacity, company, color, image} = req.body;

        try {
            const vehicle = await Vehicles.find({vehicleNumber: vehicleNumber});

            if(vehicle.length !== 0 && vehicle) {
                return res.json({message: `Vehicle with vehicle number ${vehicleNumber} is already registered!!`});
            }
            
            if(!vehicle || vehicle.length === 0 || vehicle === null){
                try {
                    image = await ImageService.uploadImg(image);

                    const vDto = new vehicleDto({ owner, vehicleNumber, model, type, capacity, company, color, image});
                    const savedVehicle = await VehicleService.saveVehicle(vDto);
                    res.status(200).json({savedVehicle, message: "Vehicle Registered Successfully!!"})
                } catch(err) {
                    console.log(err);
                    res.status(500).json({message: "Problem Registering the Vehicle!!"});
                }
            }
        } catch(err) {
            console.log(err);
            res.status(500).json({message: "Problem Registering the Vehicle!!"});
        }
    }

    async allVehicles(req, res) {
        try {
            const vehicles = await VehicleService.findAllVehicle();
            if(!vehicles || vehicles.length === 0) {
                return res.status(404).json({message: "No Vehicle Found, Register One!!"});
            }
            return res.status(200).json({vehicles});
        } catch (err) {
            console.log(err);
            return res.status(500).json({message: "Problem finding all the vehicles!!"});
        }
    }

    async ownersVehicles(req, res) {   
        const {ownerId} = req.body;  
        try {
            const vehicles = await VehicleService.findOwnersVehicles(ownerId);
            return res.status(200).json({vehicles: vehicles});
        } catch(err) {
            console.log(err);
            return res.status(500).json({message: "No Vehicles Found, Register One to Create the Trip!!"});
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