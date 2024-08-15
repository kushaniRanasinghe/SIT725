const express = require('express');
const AdditionController = require('../controller/additionController');

const router = express.Router();

// Route to handle addition and save to MongoDB
router.post('/api/addition', AdditionController.addAddition);

// Route to retrieve past additions from MongoDB
router.get('/api/additions', AdditionController.getAdditions);

module.exports = router;
