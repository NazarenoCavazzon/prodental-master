const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', usersController.index);
router.get('/:id', usersController.getUser);

module.exports = router;
