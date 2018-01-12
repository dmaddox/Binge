// setup initial variable for storage user authentication status
var loggedin;

// Get user authentication status
$.get("/loggedin", function(res) {
    console.log("Getting logged in status!!");
    console.log(res);
    if (res) {
        loggedIn = true;
        console.log("user is logged in");
    } else {
        loggedIn = false;
        console.log("user is not logged in");
    }

    navLogger();
});

// Switch out "Logout" vs. "Login" buttons based on authentication status
function navLogger() {
    if (loggedIn) {
        $("#nav-logger").text("Logout").attr("href", "/logout");
        
    } else {
        $("#nav-logger").text("Login").attr("href", "./user-login.html");
    }
};

// Log the user out on "logout" click
if (loggedIn) {
    $("#nav-logger").on("click", function() {
        $.get("/logout", function(result) {
            result;
        });
    });
};

