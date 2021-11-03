const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.index);
router.get('/users', adminController.users);
router.delete('/users', adminController.userDelete);
router.put('/users', adminController.userEdit);
router.get('/turns', adminController.turns);
router.get('/staff', adminController.staff);
router.get('/account', adminController.account);
router.get('/treatments', adminController.treatments);
router.post('/treatments', adminController.treatmentsCreate);
router.put('/treatments', adminController.treatmentsEdit);
router.delete('/treatments', adminController.treatmentsDelete);
router.post('/turn', adminController.turnCreate);
router.put('/turn', adminController.turnEdit);
router.delete('/turn', adminController.turnDelete);
router.post('/staff', adminController.staffCreate);
router.put('/staff', adminController.staffEdit);
router.delete('/staff', adminController.staffDelete);
router.get('/sponsors', adminController.sponsors);
router.post('/sponsors', adminController.sponsorCreate);
router.delete('/sponsors', adminController.sponsorDelete);
router.get('/banners', adminController.banners);
router.post('/banners', adminController.bannersCreate);
router.delete('/banners', adminController.bannersDelete);
router.get('/messages', adminController.messages);
router.delete('/messages', adminController.messagesDelete);

module.exports = router;

