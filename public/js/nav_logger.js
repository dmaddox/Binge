// setup initial variable for storage user authentication status
var loggedin;
var currentUser;

// Get user authentication status
$.get("/loggedin", function(res) {
    if (res[0]) {
        loggedIn = true;
        currentUser = res[1];
    } else {
        loggedIn = false;
    }
}).then(function(response){
    navLogger();
});

// Switch out "Logout" vs. "Login" buttons based on authentication status
function navLogger() {
    if (loggedIn) {
        // make the login / logout button say "Logout"
        $("#nav-logger").text("Logout").attr("href", "/logout");
        // Log the user out on "logout" click
        $("#nav-logger").on("click", function() {
            $.get("/logout", function(result) {
                result;
            });
        });
    } else {
        // make the login / logout button say "Login"
        $("#nav-logger").text("Login").attr("href", "./user-login.html");
    }
};



