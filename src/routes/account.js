const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

/* GET home page. */
router.get('/', accountController.index);
router.get('/turn/treatment', accountController.turnTreatment);
router.post('/turn/treatment', accountController.processTurnTreatment);
router.get('/turn/date', accountController.turnDate);
router.post('/turn/date', accountController.processTurnDate);
router.put('/turn/', accountController.turnDelete);
module.exports = router;
