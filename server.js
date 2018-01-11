// *****************************************************************************
// Server.js - Starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');

// Sets up Passport
// =============================================================
var passport   = require('passport');
var session    = require('express-session');

//Sets up Handlebars
// =============================================================
// var exphbs = require('express-handlebars');
// var methodOverride = require('method-override');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
// app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// For Passport---------------------------------------------/
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Static directory
app.use(express.static("public"));


// Routes
// =============================================================
// TO BE UPDATED

require("./routes/html-routes.js")(app, passport);
require("./routes/view-api-routes.js")(app);
require("./routes/post-api-routes.js")(app);
// load passport strategies
require('./config/passport.js')(passport, db.Users);


// Syncing our sequelize models and then starting our Express app
// =============================================================
// add { force: true } in ".sync()" function if writing db schema for first time.

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
