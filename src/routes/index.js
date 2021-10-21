const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');

/* GET home page. */
router.get('/', homeController.index);
router.get('/aboutus', homeController.aboutus);
router.get('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/login', authController.processLogin);
router.get('/signup', authController.signup);
router.get('/treatments/:title', homeController.treatments);
router.get('/faq', homeController.faq);
router.post('/signup', authController.processSignup);
router.get('/experiencia-dentalpro', homeController.experienceDentalPro);
router.post('/lang', homeController.langChange)

module.exports = router;
