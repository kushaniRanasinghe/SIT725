var expect = require("chai").expect;
var request = require("request");

describe("Basic Calculator: Addition API", function() {
    var baseUrl = "http://localhost:3000/api/addition";

    it("should return status 200 when a valid addition request is made", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: 13, number2: 7 }
        }, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("should return the result as a number", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: 13, number2: 7 }
        }, function(error, response, body) {
            expect(body.result).to.be.a('number');
            done();
        });
    });

    it("should return the correct addition result", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: 13, number2: 7 }
        }, function(error, response, body) {
            expect(body.result).to.equal(20);
            done();
        });
    });

    it("should return status 400 for invalid input", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: "a", number2: "b" }
        }, function(error, response, body) {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });

    it("should return null result for invalid input", function(done) {
        request.post({
            url: baseUrl,
            json: true,
            body: { number1: "a", number2: "b" }
        }, function(error, response, body) {
            expect(body.result).to.be.null;
            done();
        });
    });
});

describe("Retrieve Past Additions API", function() {
    var baseUrl = "http://localhost:3000/api/additions";

    it("should return status 200 when retrieving past additions", function(done) {
        request.get(baseUrl, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("should return a list of past additions", function(done) {
        request.get(baseUrl, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.data).to.be.an('array');
            done();
        });
    });
});
