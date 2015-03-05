var models = require('../models');
var Game = models.Game;

var Routes = {
  
  // POST /games
  createGame: function(req, res) {
    var name = req.body.name;
    var giantBombApiId = req.body.giantBombApiId;
    var imageUrl = req.body.imageUrl;

    Game.create({name: name, giantBombApiId: giantBombApiId, imageUrl: imageUrl}).then(function(game) {
      res.json(game);
    }).catch(function(err) {
      return res.status(400).json(err.errors);
    });
  },
 
  // Get /games
  showGames: function(req, res) { 
      Game.findAll().then(function(games) {
        res.json(games);
      });
  }
};

module.exports = Routes;

