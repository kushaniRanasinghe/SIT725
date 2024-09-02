const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const additionRouter = require('./routers/additionRouter');
const { runDBConnection } = require('./model/additionModel');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

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

// Handle a new client connection
io.on('connection', (socket) => {
    console.log('A user connected'); // Log when a user connects

    // Handle the event when the user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected'); // Log when a user disconnects
    });

    // Emit a random number to the client every second
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10)); // Send a random number between 0 and 9 to the client
    }, 1000); // Interval set to 1 second (1000 milliseconds)
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
