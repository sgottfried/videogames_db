var models = require('../models');
var Game = models.Game;

var Routes = {
  
  // POST /games
  createGame: function(req, res) {
    var name = req.body.name;
    var giantBombApiId = req.body.giantBombApiId;
    var imageUrl = req.body.imageUrl;

    Game.create({name: name, giantBombApiId: giantBombApiId, imageUrl: imageUrl}).then(function(game) {
      if(req.session && req.session.games) {
        req.session.games.push(game);
      }
      else {
        req.session.games = [{name: name, giantBombApiId: giantBombApiId, imageUrl: imageUrl}];
      }
    
      res.json(game);
    });
  },
 
  // Get /games
  showGames: function(req, res) { 
    if(req.session && req.session.games) {
      res.json(JSON.stringify(req.session.games));
    }
    else {
      Game.findAll().then(function(games) {
        req.session.games = games;
        res.json(JSON.stringify(games));
      });
    }
  }
};

module.exports = Routes;

