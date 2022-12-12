const router = require('express').Router();

const homeController = require('../controllers/home-controller');
const authController = require('../controllers/auth-controller');
const userController = require('../controllers/user-controller');
const vehicleController = require('../controllers/vehicle-controller');
const rideController = require('../controllers/ride-controller');
const tripController = require('../controllers/trip-controller');
const referralController = require('../controllers/referral-controller')
const paymentController = require('../controllers/payment-controller');

// Middlewares
const authenticated = require('../middlewares/auth-middleware');

router.get('/home', homeController.home);

router.post('/sendotp', authController.sendOtp);
router.post('/verifyotp', authController.verifyOtp);
router.post('/register', authController.register);

router.post('/registervehicle', vehicleController.registerVehicle);
router.get('/vehicles', vehicleController.allVehicles);
router.post('/user/vehicles', vehicleController.ownersVehicles);
router.post('/removevehicle', vehicleController.removeVehicle);

// Rider
router.post('/rider/createRide', rideController.createRide);
router.post('/allRides', rideController.allRides);

// Driver
router.post('/trip/createDriversTrip', tripController.createDriversTrip);
router.post('/allTrips', tripController.allTrips);

// Rider's Trip
router.post('/findTrip', tripController.findTrip);
router.post('/requestDriver', tripController.requestDriver);

// Driver's Trip
router.post('/driverApproval', tripController.driverApproval);
router.post('/startTrip', tripController.startTrip);
router.post('/endTrip', tripController.endTrip);
router.post('/checkout', paymentController.razorpayPayment);



// Referral
router.post('/referral', referralController.generateReferral);
router.post('/referredUsers', referralController.referredUsers);

// User DashBoard
router.get('/users', userController.getUsers); // get all users
router.get('/user/:id', userController.getUsers); // get user details by id

// router.post('/findRide', rideController.findRide);


module.exports = router;