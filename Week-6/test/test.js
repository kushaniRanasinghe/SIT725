var expect = require("chai").expect;
var request = require("request");

describe("Basic Calculator: Addition API", function() {
    // Base URL for the Addition API
    var baseUrl = "http://localhost:3000/api/addition";

    // Test case: Valid addition request should return status 200
    it("should return status 200 when a valid addition request is made", function(done) {
        request.post({
            url: baseUrl,
            json: true, // Send the request body as JSON
            body: { number1: 13, number2: 7 } // Input numbers for addition
        }, function(error, response, body) {
            // Assert that the response status code is 200
            expect(response.statusCode).to.equal(200);
            done(); // Signal that the test is complete
        });
    });

    // Test case: The result returned should be a number
    it("should return the result as a number", function(done) {
        request.post({
            url: baseUrl,
            json: true, // Send the request body as JSON
            body: { number1: 13, number2: 7 } // Input numbers for addition
        }, function(error, response, body) {
            // Assert that the result is of type 'number'
            expect(body.result).to.be.a('number');
            done(); // Signal that the test is complete
        });
    });

    // Test case: The addition result should be correct
    it("should return the correct addition result", function(done) {
        request.post({
            url: baseUrl,
            json: true, // Send the request body as JSON
            body: { number1: 13, number2: 7 } // Input numbers for addition
        }, function(error, response, body) {
            // Assert that the result is 20 (13 + 7)
            expect(body.result).to.equal(20);
            done(); // Signal that the test is complete
        });
    });

    // Test case: Invalid input should return status 400 (Bad Request)
    it("should return status 400 for invalid input", function(done) {
        request.post({
            url: baseUrl,
            json: true, // Send the request body as JSON
            body: { number1: "a", number2: "b" } // Invalid input (non-numeric)
        }, function(error, response, body) {
            // Assert that the response status code is 400 (Bad Request)
            expect(response.statusCode).to.equal(400);
            done(); // Signal that the test is complete
        });
    });

    // Test case: Invalid input should return a null result
    it("should return null result for invalid input", function(done) {
        request.post({
            url: baseUrl,
            json: true, // Send the request body as JSON
            body: { number1: "a", number2: "b" } // Invalid input (non-numeric)
        }, function(error, response, body) {
            // Assert that the result is null for invalid input
            expect(body.result).to.be.null;
            done(); // Signal that the test is complete
        });
    });
});

describe("Retrieve Past Additions API", function() {
    // Base URL for the Retrieve Past Additions API
    var baseUrl = "http://localhost:3000/api/additions";

    // Test case: Retrieval of past additions should return status 200
    it("should return status 200 when retrieving past additions", function(done) {
        request.get(baseUrl, function(error, response, body) {
            // Assert that the response status code is 200
            expect(response.statusCode).to.equal(200);
            done(); // Signal that the test is complete
        });
    });

    // Test case: The API should return a list of past additions
    it("should return a list of past additions", function(done) {
        request.get(baseUrl, function(error, response, body) {
            body = JSON.parse(body); // Parse the response body as JSON
            // Assert that the data returned is an array (list of past additions)
            expect(body.data).to.be.an('array');
            done(); // Signal that the test is complete
        });
    });
});
