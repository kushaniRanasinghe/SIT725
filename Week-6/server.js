const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const additionRouter = require('./routers/additionRouter');
const { runDBConnection } = require('./model/additionModel');

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

// Initialize the MongoDB connection
runDBConnection().catch(console.dir);

// Use the addition router for other API routes
app.use('/api', additionRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
