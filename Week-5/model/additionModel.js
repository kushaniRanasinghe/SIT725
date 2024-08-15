const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB connection string
const uri = "mongodb+srv://ranasinghekush:Toiv3V8puKN8TZmC@cluster0.xqja7fu.mongodb.net/?retryWrites=true&w=majority";
let collection; // Variable to hold the reference to the MongoDB collection

// Create a new MongoClient with the provided URI and options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, // Specifies the API version
    strict: true, // Enables strict mode to catch potential issues
    deprecationErrors: true, // Throws errors on deprecated features
  }
});

async function runDBConnection() {
  try {
    // Establish a connection to MongoDB
    await client.connect();

    // Select the database (additionDB) where the collection resides
    const db = client.db('additionDB');

    // Initialize the collection variable to refer to the 'additions' collection
    collection = db.collection('additions');

    console.log('Connected to MongoDB and collection initialized');
  } catch (ex) {
    // Log an error message if the connection to MongoDB fails
    console.error('Error connecting to MongoDB', ex);
  }
}

async function storeAddition(number1, number2, result) {
  if (!collection) {
    // Log an error and throw an exception if the collection is not initialized
    console.error('Collection is not initialized');
    throw new Error('Collection is not initialized');
  }

  // Create an object representing the addition operation with a timestamp
  const addition = { number1, number2, result, timestamp: new Date() };

  // Insert the addition object into the collection
  await collection.insertOne(addition);
}

async function getAdditions() {
  if (!collection) {
    // Log an error and throw an exception if the collection is not initialized
    console.error('Collection is not initialized');
    throw new Error('Collection is not initialized');
  }

  // Retrieve all documents from the collection, sorted by the timestamp in descending order
  return await collection.find({}).sort({ timestamp: -1 }).toArray();
}

// Export the functions so they can be used in other parts of the application
module.exports = {
  runDBConnection,
  storeAddition,
  getAdditions,
};
