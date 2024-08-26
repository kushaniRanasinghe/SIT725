const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const additionRouter = require('./routers/additionRouter'); // Ensure this is correctly defined in your project

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Route to serve index.html from the 'view' directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

// Endpoint to handle addition with URL parameters
app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req, res, next) {
    // Parse the numbers from the URL parameters
    const firstNumber = parseFloat(req.params.firstNumber);
    const secondNumber = parseFloat(req.params.secondNumber);

    // Check if the parsed numbers are valid
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        return res.status(400).json({ result: null, statusCode: 400 });
    }

    // Perform the addition
    const result = firstNumber + secondNumber;

    // Return the result with a 200 status code
    res.status(200).json({ result: result, statusCode: 200 });
});

// Use the addition router for other API routes (e.g., past additions)
app.use('/api', additionRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
