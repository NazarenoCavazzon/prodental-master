const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.index);
router.get('/users', adminController.users);
router.get('/turns', adminController.turns);
router.get('/staff', adminController.staff);
router.get('/account', adminController.account);
router.get('/treatments', adminController.treatments);
router.post('/turn', adminController.turnCreate);
router.put('/turn', adminController.turnEdit);
router.delete('/turn', adminController.turnDelete);
router.get('/sponsors', adminController.sponsors);
router.post('/sponsors', adminController.sponsorCreate);
router.delete('/sponsors', adminController.sponsorDelete);

module.exports = router;

