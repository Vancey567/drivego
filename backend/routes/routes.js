const router = require('express').Router();

const homeController = require('../controllers/home-controller');
const authController = require('../controllers/auth-controller');
const vehicleController = require('../controllers/vehicle-controller');
const rideController = require('../controllers/ride-controller');
const tripController = require('../controllers/trip-controller');

router.get('/home', homeController.home);
router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/sendotp', authController.sendOtp);
router.post('/verifyotp', authController.verifyOtp);

router.post('/rider/createtrip', rideController.createRide);
router.post('/trip/createtrip', tripController.createTrip);

router.post('/registervehicle', vehicleController.registerVehicle);
router.get('/vehicles', vehicleController.allVehicles);
router.post('/removevehicle', vehicleController.removeVehicle);


router.post('/findRide', rideController.findRide);


module.exports = router;