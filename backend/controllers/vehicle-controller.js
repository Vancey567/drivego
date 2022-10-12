const Vehicles = require('../models/vehicle-model');
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
}

module.exports = new VehicleController();