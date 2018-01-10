// Wrapping all in document.ready to wait for page to load
$(document).ready(function() {

  // Adding an event listener for when the form is submitted
  $(".form-wrap").on("submit", handleSignin);

}); //end document.ready


 
// A function for handling what happens when the user signs up
function handleSignin(event) {
  event.preventDefault();
  console.log("submit button clicked");
  // clear out the error messages
  $("#validation-message").html("");

  // Identify & store user's data 
  // ==================================================
  email = $("#email").val().trim();
  pw = $("#key").val().trim();
  
  console.log(email);
  console.log(pw);

  // Wont submit the post if we are missing any
  if (!email || !pw) {
    console.log("Please complete all fields.");
    // call validateMessage to display the proper error message to the user
    $("#validation-message").append("Please complete all fields.");
    return;
  }

  // Constructing a newUser object to hand to the database w/ submitted info
  var verifyUser = {
    email: email,
    password: pw
  };


  console.log(verifyUser);
  // Run submitPair to create a whole new pairing
    checkUserPw(verifyUser);
};

  // Submits a new pairing and brings user to view upon completion
  function checkUserPw(post) {
    console.log("checkUserPw function running");
    $.post('/signin', post, function(data, status) {
      // console.log(data);
      console.log(status);
      if (status === "success") {window.location.href = "/add";};
  });}



