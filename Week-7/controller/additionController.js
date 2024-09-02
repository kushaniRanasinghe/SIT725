const additionModel = require('../model/additionModel');

// Ensure MongoDB connection is established when the application starts
additionModel.runDBConnection();

async function addAddition(req, res) {
  // Extract the numbers from the request body
  const { number1, number2 } = req.body;

  // Calculate the sum of the two numbers
  const result = number1 + number2;

  try {
    // Store the addition operation (numbers and result) in the database
    await additionModel.storeAddition(number1, number2, result);

    // Respond to the client with the calculated result in JSON format
    res.json({ result });
  } catch (ex) {
    // Log the error if saving the addition fails
    console.error('Error saving addition', ex);

    // Respond with a 500 status code if there is an error
    res.status(500).send('Error saving addition');
  }
}

async function getAdditions(req, res) {
  try {
    // Retrieve all the stored additions from the database
    const additions = await additionModel.getAdditions();

    // Respond to the client with the retrieved additions in JSON format
    res.json({ data: additions });
  } catch (ex) {
    // Log the error if retrieving the additions fails
    console.error('Error retrieving additions', ex);

    // Respond with a 500 status code if there is an error
    res.status(500).send('Error retrieving additions');
  }
}

// Export the functions so they can be used in other parts of the application
module.exports = {
  addAddition,
  getAdditions
};
