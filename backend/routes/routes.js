const router = require('express').Router();

const homeController = require('../controllers/home-controller')
const authController = require('../controllers/auth-controller')

router.get('/home', homeController.home);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;