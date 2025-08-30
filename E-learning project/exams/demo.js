// Get a reference to the heading and the button
const heading = document.getElementById("greeting");
const button = document.getElementById("myButton");

// Add a "click" event listener to the button
button.addEventListener("click", function() {
  // When the button is clicked, change the heading's text
  heading.textContent = "You clicked the button!";
});