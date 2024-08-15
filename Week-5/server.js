const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const additionRouter = require('./routers/additionRouter');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Route to serve index.html from the 'view' directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

// Use the addition router for API routes
app.use(additionRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
