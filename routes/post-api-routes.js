// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // POST route for saving a new post
  app.post("/api/view", function(req, res) {
    // this will pull in an object from the user's input
    // for now i am testing with a specific entry
    db.Pairs.create({
        media_type: "movie",
        media_title: "Baywatch",
        food_name: "Chicken Wings",
        recipe_url: null,
        playlist_url: null,
        drink_name: "Mai Thai",
        drink_url: null,
        user_id: 3
    }).then(function(dbPairing) {
      // confirms to js file that *something* resulted
      res.json(dbPairing);
    });
  });

};