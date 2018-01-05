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
  app.post("/api/pairing", function(req, res) {
    console.log(req.body);
    console.log(req.body.media_type);
    // this will pull in an object from the user's input
    // for now i am testing with a specific entry
    db.Pairs.create(req.body).then(function(dbPairing) {
      // confirms to js file that *something* resulted
      res.json(dbPairing);
    });
  });

};