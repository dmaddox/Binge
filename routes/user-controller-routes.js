// *********************************************************************************
// this file offers routes for managing user signup & login
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models");
var passport = require('passport');
var path = require("path");


// Routes
// =============================================================
module.exports = function(app, passport) {

  // process the login form
  app.post('/signin', passport.authenticate('local-login', {
      successRedirect : '/add', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
  }));

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/add', // redirect to the add pairing page
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
  }));
};
