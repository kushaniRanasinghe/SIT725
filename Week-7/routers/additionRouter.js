const express = require('express');
const { storeAddition, getAdditions } = require('../model/additionModel'); // Import the database functions
const router = express.Router(); // Initialize the router

// Route to handle the addition of two numbers and store the result in the database
router.post('/addition', async (req, res) => {
    const { number1, number2 } = req.body; // Extract numbers from the request body

    // Validate the input to ensure they are numbers
    if (isNaN(parseFloat(number1)) || isNaN(parseFloat(number2))) {
        return res.status(400).json({ result: null, statusCode: 400 }); // Return an error for invalid input
    }

    // Calculate the sum of the two numbers
    const result = parseFloat(number1) + parseFloat(number2);

    try {
        // Store the addition result in the database
        await storeAddition(number1, number2, result);
        // Respond with the result only
        res.status(200).json({ result, statusCode: 200 });
    } catch (error) {
        console.error('Error storing addition:', error); // Log the error if any
        res.status(500).send('Error saving addition'); // Return an error response
    }
});

// Route to retrieve all past additions from the database
router.get('/additions', async (req, res) => {
    try {
        // Retrieve all additions from the database
        const additions = await getAdditions();
        // Respond with the retrieved additions
        res.status(200).json({ data: additions });
    } catch (error) {
        console.error('Error retrieving additions:', error); // Log the error if any
        res.status(500).send('Error retrieving additions'); // Return an error response
    }
});

module.exports = router; // Export the router to use in the server setup
