var expect = require("chai").expect;
var request = require("request");

describe("Basic Calculator: Addition API", function() {
    var baseUrl = "http://localhost:3000/api/addition";

    // Before each test, clear the additions in the database to ensure a clean slate
    beforeEach(function(done) {
        request.get("http://localhost:3000/api/additions/clear", function(error, response, body) {
            if (error) return done(error); // Handle any errors during the clear operation
            done(); // Indicate that the setup is complete
        });
    });

    // Test for successful status 200 response for valid addition
    it("should return status 200 when a valid addition request is made", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: 13, number2: 7 }
        }, function(error, response, body) {
            expect(response.statusCode).to.equal(200); // Expect a 200 OK response
            done(); // Indicate the test is complete
        });
    });

    // Test to check if the result returned is a number
    it("should return the result as a number", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: 13, number2: 7 }
        }, function(error, response, body) {
            expect(body.result).to.be.a('number'); // Expect the result to be a number
            done(); // Indicate the test is complete
        });
    });

    // Test to verify that the correct result is returned for a valid addition
    it("should return the correct addition result", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: 13, number2: 7 }
        }, function(error, response, body) {
            expect(body.result).to.equal(20); // Expect the result to equal 20
            done(); // Indicate the test is complete
        });
    });

    // Test to check if invalid input returns a 400 status code
    it("should return status 400 for invalid input", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: "a", number2: "b" }
        }, function(error, response, body) {
            expect(response.statusCode).to.equal(400); // Expect a 400 Bad Request response
            done(); // Indicate the test is complete
        });
    });

    // Test to verify that the result is null for invalid input
    it("should return null result for invalid input", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: "a", number2: "b" }
        }, function(error, response, body) {
            expect(body.result).to.be.null; // Expect the result to be null
            done(); // Indicate the test is complete
        });
    });

    // Test to ensure the addition result is stored in the database
    it("should store the addition result in the database", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: 13, number2: 7 }
        }, function(error, response, body) {
            request.get("http://localhost:3000/api/additions", function(err, res, body) {
                if (err) return done(err); // Handle any errors during the retrieval
                body = JSON.parse(body);
                const latestAddition = body.data[body.data.length - 1];
                expect(latestAddition).to.deep.include({ number1: 13, number2: 7, result: 20 }); // Check the most recent addition
                done(); // Indicate the test is complete
            });
        });
    });

    // Test to check if the API can handle large number additions
    it("should handle large number additions correctly", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: 1000000000, number2: 2000000000 }
        }, function(error, response, body) {
            expect(body.result).to.equal(3000000000); // Expect the result to be the sum of the large numbers
            done(); // Indicate the test is complete
        });
    });

    // Test to ensure zero is handled correctly in the addition
    it("should handle zero as one of the inputs correctly", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: 0, number2: 5 }
        }, function(error, response, body) {
            expect(body.result).to.equal(5); // Expect the result to be the other number
            done(); // Indicate the test is complete
        });
    });

    // Test to verify that negative numbers are added correctly
    it("should handle negative numbers correctly", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: -10, number2: -5 }
        }, function(error, response, body) {
            expect(body.result).to.equal(-15); // Expect the result to be the correct sum of negatives
            done(); // Indicate the test is complete
        });
    });

    // Test to check if floating-point numbers are added correctly
    it("should handle floating-point numbers correctly", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: 2.5, number2: 4.5 }
        }, function(error, response, body) {
            expect(body.result).to.equal(7.0); // Expect the result to be the correct sum of floats
            done(); // Indicate the test is complete
        });
    });

    // Test to verify that very large additions are handled correctly
    it("should handle very large additions correctly", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: 9007199254740991, number2: 1 }
        }, function(error, response, body) {
            expect(body.result).to.equal(9007199254740992); // Expect the result to be the correct sum for large numbers
            done(); // Indicate the test is complete
        });
    });

    // Test to check if a 400 status is returned when one or both inputs are missing
    it("should return a 400 status code when one or both inputs are missing", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: 5 }
        }, function(error, response, body) {
            expect(response.statusCode).to.equal(400); // Expect a 400 Bad Request response
            done(); // Indicate the test is complete
        });
    });

    // Test to verify that a 400 status is returned for empty input
    it("should return 400 status for empty input", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: {}
        }, function(error, response, body) {
            expect(response.statusCode).to.equal(400); // Expect a 400 Bad Request response
            done(); // Indicate the test is complete
        });
    });

    // Test to ensure very small numbers are added correctly and the result is accurate
    it("should return status 200 and the correct result for addition of very small numbers", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: 0.0000001, number2: 0.0000002 }
        }, function(error, response, body) {
            expect(response.statusCode).to.equal(200); // Expect a 200 OK response
            expect(body.result).to.be.closeTo(0.0000003, 0.00000001); // Check that the result is accurate to a small margin of error
            done(); // Indicate the test is complete
        });
    });

    // Test to check if the API returns a 400 status when non-numeric characters are used as input
    it("should return 400 status code if non-numeric characters are in the input", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: "five", number2: 5 }
        }, function(error, response, body) {
            expect(response.statusCode).to.equal(400); // Expect a 400 Bad Request response
            done(); // Indicate the test is complete
        });
    });
});

describe("Retrieve Past Additions API", function() {
    var baseUrl = "http://localhost:3000/api/additions";

    // Before each test, clear the additions to ensure tests are independent
    beforeEach(function(done) {
        request.get(baseUrl + "/clear", function(error, response, body) {
            if (error) return done(error); // Handle any errors during the clear operation
            done(); // Indicate that the setup is complete
        });
    });

    // Test to check if retrieving past additions returns status 200
    it("should return status 200 when retrieving past additions", function(done) {
        request.get(baseUrl, function(error, response, body) {
            expect(response.statusCode).to.equal(200); // Expect a 200 OK response
            done(); // Indicate the test is complete
        });
    });

    // Test to ensure that the response contains an array of past additions
    it("should return a list of past additions", function(done) {
        request.get(baseUrl, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.data).to.be.an('array'); // Expect the response data to be an array
            done(); // Indicate the test is complete
        });
    });

    // Test to verify that the most recent addition is included in the list of past additions
    it("should include the most recent addition result", function(done) {
        request.post({
            url: "http://localhost:3000/api/addition",
            json: true,
            body: { number1: 13, number2: 7 }
        }, function() {
            setTimeout(function() {
                request.get(baseUrl, function(err, res, body) {
                    if (err) return done(err); // Handle any errors during the retrieval
                    body = JSON.parse(body);
                    const latestAddition = body.data[body.data.length - 1];
                    expect(latestAddition).to.deep.include({ number1: 13, number2: 7, result: 20 }); // Check that the latest addition matches
                    done(); // Indicate the test is complete
                });
            }, 100);  // Adding a delay to ensure the addition is stored in the database
        });
    });
});
