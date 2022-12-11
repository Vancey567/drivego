const router = require('express').Router();

const homeController = require('../controllers/home-controller');
const authController = require('../controllers/auth-controller');
const userController = require('../controllers/user-controller');
const vehicleController = require('../controllers/vehicle-controller');
const rideController = require('../controllers/ride-controller');
const tripController = require('../controllers/trip-controller');
const referralController = require('../controllers/referral-controller')

router.get('/home', homeController.home);
// router.post('/login', authController.login);

router.post('/sendotp', authController.sendOtp);
router.post('/verifyotp', authController.verifyOtp);
router.post('/register', authController.register);

router.post('/registervehicle', vehicleController.registerVehicle);
router.get('/vehicles', vehicleController.allVehicles);
// router.get('/some/:id', vehicleController.ownersVehicles);
router.post('/user/vehicles', vehicleController.ownersVehicles);
router.post('/removevehicle', vehicleController.removeVehicle);

router.post('/rider/createtrip', rideController.createRide);
router.post('/trip/createtrip', tripController.createTrip);
router.post('/findtrip', tripController.findTrip);

// Referral
router.post('/referral', referralController.generateReferral);
router.post('/referredUsers', referralController.referredUsers);

// User DashBoard
router.get('/users', userController.getUsers); // get all users
router.get('/user/:id', userController.getUsers); // get user details by id

router.post('/findRide', rideController.findRide);


module.exports = router;