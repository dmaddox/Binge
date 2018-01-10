// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var passport = require('passport');
var db = require('../models');
var path = require("path");


// Routes
// =============================================================
module.exports = function(app, passport) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index1.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index1.html"));
  });

// index route loads index1.html
  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index1.html"));
  });

  // view route (showing existing pairs) loads view.html
  app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/view.html"));
  });

  // view route (showing existing pairs) loads view.html
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });


  // view route for signin
  app.get("/signin", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user-login.html"));
  });

    // process the login form
    app.post('/signin', passport.authenticate('local-login', {
        successRedirect : '/add', // redirect to the secure profile section
        failureRedirect : '/signin', // redirect back to the signup page if there is an error
    }));

    // // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/add', // redirect to the add pairing page
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
    }));

  // process the login form
    // app.post('/signin', passport.authenticate('local-login', { failureRedirect: '/signin' }),
    // function(req, res) {
    //   console.log("my post response is " + res);
    //   console.log("my post response is " + res.user);
    //   // console.log(res);
    // });

  // // process the signup form
  // app.post('/signup', passport.authenticate('local-signup', { failureRedirect: '/login' }), 
  // function(req, res) {
  //   console.log("req before: " + JSON.stringify(req.body));
  //   // If this function gets called, authentication was successful.
  //   // `req.user` contains the authenticated user.
  //   res.redirect('/add');
  // });

  // add route loads add.html
  app.get("/add", isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/add.html"));
  });

  //determine is user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/signup');
  }
  // Handle 404 - Keep this as a last route
  app.use(function(req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
  });

};
