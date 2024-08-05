$(document).ready(function () {
  // Function to load and display past additions
  function loadAdditions() {
      $.ajax({
          url: '/api/additions',    // URL to send the request to
          method: 'GET',            // HTTP method to use
          success: function (response) { // Function to run if the request is successful
              const additionsList = $('#additionsList');
              additionsList.empty();
              response.data.forEach(addition => {
                  additionsList.append(`<li class="collection-item">${addition.number1} + ${addition.number2} = ${addition.result}</li>`);
              });
          },
          error: function (xhr, status, error) { // Function to run if there is an error with the request
              console.error('Error:', error);
          }
      });
  }

  // Load additions when the page is ready
  loadAdditions();

  // Attach a submit event handler to the form with the ID 'additionForm'
  $('#additionForm').on('submit', function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();
      
      // Retrieve and parse the values from the input fields
      const number1 = parseFloat($('#number1').val());
      const number2 = parseFloat($('#number2').val());
      const result = number1 + number2;

      // Display the result and a fun message
      const funMessages = [
          `Great job! Your addition of ${number1} and ${number2} has been successfully calculated!`,
          `Did you know? Adding ${number1} and ${number2} gives you ${result}!`,
          `Awesome! ${number1} + ${number2} = ${result}. Did you know that honey never spoils?`,
          `Fantastic! Your addition is complete. Keep practicing and you'll be a math whiz in no time!`,
          `Your addition of ${number1} and ${number2} is ${result}. Remember, "Mathematics is the music of reason." - James Joseph Sylvester`
      ];

      // Select a random message
      const message = funMessages[Math.floor(Math.random() * funMessages.length)];
      $('#result').text(`Result: ${result}`);
      $('#result').append(`<p>${message}</p>`);

      // Send an Ajax request to the server to store the result
      $.ajax({
          url: '/api/addition',               // URL to send the request to
          method: 'POST',            // HTTP method to use
          contentType: 'application/json', // Specify that the data is in JSON format
          data: JSON.stringify({ number1, number2, result }), // Convert the data to a JSON string
          success: function (response) { // Function to run if the request is successful
              console.log('Addition stored successfully.');
          },
          error: function (xhr, status, error) { // Function to run if there is an error with the request
              console.error('Error:', error);
          }
      });
  });
});
