var email;
var pw;
var verify_pw;

// Wrapping all in document.ready to wait for page to load
$(document).ready(function() {

  // email input
  $("#email").blur(function() {
    clearValidationMessage();
    email = $("#email").val().trim();
  });

  // initial password input
  $("#key").blur(function() {
    clearValidationMessage();
    pw = $("#key").val().trim();
    verifyPw();
  });

   // password verify input
   $("#verify-key").blur(function() {
    clearValidationMessage();  
    verify_pw = $("#verify-key").val().trim();
    verifyPw();
   });

   $("#login-form").on("submit", verifyFill);

}); //end document.ready

// clear validation
function clearValidationMessage() {
  $("#validation-message").text("");
};

// verify all fields are filled in
function verifyFill() {
    // Wont submit the post if we are missing any
    if (!email || !pw || !verify_pw) {
      event.preventDefault();
      // event.stopPropagation();
      console.log("Please complete all fields.");
      // call validateMessage to display the proper error message to the user
      $("#validation-message").append("Please complete all fields.");
      return;
    }
};

// compare both password fields to validate they are equal
function verifyPw() {
  // if either password or verify is empty, end the function
  if (!pw || !verify_pw) {return};
  // if pw's dont' match
  if (pw !== verify_pw) {
    console.log("Passwords must match.");
    $('#btn-login').prop('disabled', true);
    // call validateMessage to display the proper error message to the user
    $("#validation-message").append("Your passwords don't match.");
    return;
  }  else {
    $('#btn-login').prop('disabled', false);
  }
};
