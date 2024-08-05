const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = 3000;

// MongoDB URI
const uri = "mongodb+srv://ranasinghekush:Toiv3V8puKN8TZmC@cluster0.xqja7fu.mongodb.net/?retryWrites=true&w=majority";
let collection;

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function runDBConnection() {
  try {
    await client.connect();
    collection = client.db('additionDB').collection('additions');
    console.log('Connected to MongoDB');
  } catch (ex) {
    console.error('Error connecting to MongoDB', ex);
  }
}

// Endpoint to handle addition and save to MongoDB
app.post('/api/addition', async (req, res) => {
  const { number1, number2, result } = req.body;
  try {
    const addition = { number1, number2, result, timestamp: new Date() };
    await collection.insertOne(addition);
    res.json({ message: 'Addition stored successfully.' });
  } catch (ex) {
    console.error('Error saving addition', ex);
    res.status(500).send('Error saving addition');
  }
});

// Endpoint to retrieve past additions from MongoDB
app.get('/api/additions', async (req, res) => {
  try {
    const additions = await collection.find({}).sort({ timestamp: -1 }).toArray();
    res.json({ data: additions });
  } catch (ex) {
    console.error('Error retrieving additions', ex);
    res.status(500).send('Error retrieving additions');
  }
});

// Start the server and connect to MongoDB
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  runDBConnection();
});
