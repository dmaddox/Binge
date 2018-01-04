// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index1.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index1.html"));
  });

  // add route loads add.html
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/add.html"));
  });

// index route loads index1.html
  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index1.html"));
  });

  // view route (showing existing pairs) loads view.html
  app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/view.html"));
  });

};
