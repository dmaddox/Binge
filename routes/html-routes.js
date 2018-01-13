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

  // Authentication Routes
  // =====================

  // send signup errors to client side
  app.get('/signupform', function(req, res) {
      res.send({message: req.flash('error')});
  });

  // send log-in errors to client side
  app.get('/signinform', function(req, res) {
      res.send({message: req.flash('error')});
  });

  // process the login form
  app.post('/signinform', passport.authenticate('local-login', {
      successRedirect : '/add', // redirect to the secure profile section
      failureRedirect : '/signin', // redirect back to the signup page if there is an error
      failureFlash: true
  }));

  // // process the signup form
  app.post('/signupform', passport.authenticate('local-signup', {
    successRedirect : '/add', // redirect to the add pairing page
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash: true
  }));

  app.get('/loggedin', function(req, res) {
    console.log("/loggedin route req is: " + req.user);
    if (req.user) {
      console.log("TRUE-coming in hot!");
      res.send(true);
    } else {
      console.log("FALSE-piddling out...");
      res.send(false);
    }
  });

    app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

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
