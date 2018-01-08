var db = require("../models");

module.exports = function(app) {

  // Get route for getting all of the pairings
  app.get("/api/view", function(req, res) {
    // findAll to return all entries
    db.Pairs.findAll({}).then(function(dbPairing) {
      res.json(dbPairing);
    });
  });

  // Get route for simple title search
  app.get("/api/view/title/:title", function(req, res) {
    // return all entries that match the title
    db.Pairs.findAll({
      where: {
        media_title: req.params.title
      }
    }).then(function(dbPairing) {
      res.json(dbPairing);
    });
  });

    // Get route to show only by give media type
  app.get("/api/view/type/:type", function(req, res) {
    // return all entries that match the title
    db.Pairs.findAll({
      where: {
        media_type: req.params.type
      }
    }).then(function(dbPairing) {
      res.json(dbPairing);
    });
  });

};
