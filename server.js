// *****************************************************************************
// Server.js - Starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing


// Sets up the Express app to handle data parsing
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));



//Handlebars config ---------------------------------------/
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// Routes
// =============================================================
// TO BE UPDATED
// require("./routes/html-routes.js")(app);
require("./routes/view-api-routes.js")(app);
// require("./routes/post-api-routes.js")(app);
var db = require("./models");

// Syncing our sequelize models and then starting our Express app
// =============================================================
// add { force: true } in ".sync()" function if writing db schema for first time.

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
