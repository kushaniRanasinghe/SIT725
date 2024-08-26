const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB connection string
const uri = "mongodb+srv://ranasinghekush:Toiv3V8puKN8TZmC@cluster0.xqja7fu.mongodb.net/?retryWrites=true&w=majority";
let collection; // Variable to hold the reference to the MongoDB collection

// Create a new MongoClient instance with the provided URI and options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, // Specifies the MongoDB API version
    strict: true, // Enables strict mode to catch and throw potential issues
    deprecationErrors: true, // Throws errors for deprecated MongoDB features
  }
});

// Function to establish a connection to MongoDB and initialize the collection
async function runDBConnection() {
  try {
    // Establish a connection to MongoDB using the client
    await client.connect();

    // Select the database (additionDB) where the 'additions' collection resides
    const db = client.db('additionDB');

    // Initialize the collection variable to refer to the 'additions' collection
    collection = db.collection('additions');

    // Log a message when the connection and collection are successfully initialized
    console.log('Connected to MongoDB and collection initialized');
  } catch (ex) {
    // Log an error message if the connection to MongoDB fails
    console.error('Error connecting to MongoDB', ex);
  }
}

// Function to store an addition record in the MongoDB collection
async function storeAddition(number1, number2, result) {
  // Check if the collection is initialized before proceeding
  if (!collection) {
    throw new Error('Collection is not initialized');
  }

  // Create an object representing the addition operation, including a timestamp
  const addition = { number1, number2, result, timestamp: new Date() };

  try {
    // Insert the addition record into the 'additions' collection
    await collection.insertOne(addition);
  } catch (err) {
    // Log an error message if the insertion fails
    console.error('Error storing addition:', err);
  }
}

// Function to retrieve all addition records from the MongoDB collection
async function getAdditions() {
  // Check if the collection is initialized before proceeding
  if (!collection) {
    throw new Error('Collection is not initialized');
  }

  try {
    // Retrieve all addition records from the collection, sorted by timestamp in descending order
    return await collection.find({}).sort({ timestamp: -1 }).toArray();
  } catch (err) {
    // Log an error message if the retrieval fails
    console.error('Error retrieving additions:', err);
  }
}

// Export the functions for use in other parts of the application
module.exports = {
  runDBConnection,
  storeAddition,
  getAdditions,
};
