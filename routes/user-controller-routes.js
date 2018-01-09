// *********************************************************************************
// this file offers routes for managing user signup & login
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");


// Routes
// =============================================================
module.exports = function(app, passport) {

  // process the login form
  app.post('/signin', passport.authenticate('local-login', {
      successRedirect : '/add', // redirect to the secure profile section
      failureRedirect : '/signin', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/add', // redirect to the add pairing page
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }), function(req,res){
    res.end();
  });
};
