$(document).ready(function () {
    // Function to load and display past additions from the database
    function loadAdditions() {
        $.ajax({
            url: '/api/additions',    // API endpoint to retrieve past additions
            method: 'GET',            // HTTP GET method
            success: function (response) { // On success, display the past additions
                const additionsList = $('#additionsList');
                additionsList.empty(); // Clear the list before adding new items
                response.data.forEach(addition => {
                    additionsList.append(`<li class="collection-item">${addition.number1} + ${addition.number2} = ${addition.result}</li>`);
                });
            },
            error: function (xhr, status, error) { // Handle errors
                console.error('Error:', error);
            }
        });
    }

    // Load additions when the page is ready
    loadAdditions();

    // Handle form submission for adding two numbers
    $('#additionForm').on('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Retrieve and parse the values from the input fields
        const number1 = parseFloat($('#number1').val());
        const number2 = parseFloat($('#number2').val());

        // Send an Ajax request to the server to store the result
        $.ajax({
            url: '/api/addition',         // API endpoint to perform addition and store result
            method: 'POST',               // HTTP POST method
            contentType: 'application/json', // Specify JSON format for the request body
            data: JSON.stringify({ number1, number2 }), // Convert the data to a JSON string
            success: function (response) { // On success, display the result
                $('#result').text(`Result: ${response.result}`);
                $('#result').append(`<p>Your addition of ${number1} and ${number2} has been successfully calculated and stored!</p>`);
            },
            error: function (xhr, status, error) { // Handle errors
                console.error('Error:', error);
            }
        });
    });
});
