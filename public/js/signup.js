// Wrapping all in document.ready to wait for page to load
$(document).ready(function() {

  // Adding an event listener for when the form is submitted
  $(".form-wrap").on("submit", handleSignup);

}); //end document.ready


 
// A function for handling what happens when the user signs up
function handleSignup(event) {
  event.preventDefault();
  // clear out the error messages
  $("#validation-message").html("");

  // Identify & store user's data 
  // ==================================================
  email = $("#email").val().trim();
  username = $("#username").val().trim();
  pw = $("#key").val().trim();
  verify_pw = $("#verify-key").val().trim();
  
  console.log(email);
  console.log(username);
  console.log(pw);
  console.log(verify_pw);


  // Wont submit the post if we are missing any
  if (!email || !username || !pw || !verify_pw) {
    console.log("Please complete all fields.");
    // call validateMessage to display the proper error message to the user
    $("#validation-message").append("Please complete all fields.");
    return;
  }

  // Constructing a newUser object to hand to the database w/ submitted info
  var newUser = {
    email: email,
    password: pw
  };


  console.log(newUser);
  // Run submitPair to create a whole new pairing
    submitUser(newUser);
};

  // Submits a new pairing and brings user to view upon completion
  function submitUser(post) {
    console.log("submitUser function running");
    console.log(post);
    $.post('/signup', post,
      function() {
        "post submitUser is complete"
      }
    );
  }



