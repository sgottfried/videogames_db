var models = require('../models');
var Game = models.Game;

var Routes = {
  Games: Game,
  createGame: function(req, res) {
    var name = req.body.name;
    var giantBombApiId = req.body.giantBombApiId;
    var imageUrl = req.body.imageUrl;

    Game.create({name: name, giantBombApiId: giantBombApiId, imageUrl: imageUrl}).then(function(game) {
      res.json(game);
    });
  }
};

module.exports = Routes;

