$(document).ready(function() {

    // Attach a submit event handler to the form with the ID 'additionForm'
    $('#additionForm').on('submit', function(event) {
      // Prevent the default form submission behavior
      event.preventDefault();
      
      // Retrieve and parse the values from the input fields
      const number1 = parseFloat($('#number1').val());
      const number2 = parseFloat($('#number2').val());
  
      // Send an Ajax request to the server
      $.ajax({
        url: '/add',               // URL to send the request to
        method: 'POST',            // HTTP method to use
        contentType: 'application/json', // Specify that the data is in JSON format
        data: JSON.stringify({ number1, number2 }), // Convert the data to a JSON string
        success: function(response) { // Function to run if the request is successful
          // Update the text of the element with ID 'result' with the result from the server
          $('#result').text(`Result: ${response.result}`);
        },
        error: function(xhr, status, error) { // Function to run if there is an error with the request
          // Log the error to the console
          console.error('Error:', error);
        }
      });
    });
  });
  