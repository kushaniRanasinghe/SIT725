const express = require('express');
const router = express.Router();

// Example of storing and retrieving past additions (You should implement this with a database)
let pastAdditions = [];

router.post('/addition', (req, res) => {
    const { number1, number2 } = req.body;
    const firstNumber = parseFloat(number1);
    const secondNumber = parseFloat(number2);

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        return res.status(400).json({ result: null, statusCode: 400 });
    }

    const result = firstNumber + secondNumber;
    pastAdditions.push({ number1: firstNumber, number2: secondNumber, result });

    res.status(200).json({ result, statusCode: 200 });
});

router.get('/additions', (req, res) => {
    res.status(200).json({ data: pastAdditions });
});

module.exports = router;
