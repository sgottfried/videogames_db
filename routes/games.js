'use strict';

var models = require('../models');
var Game = models.Game;

var Routes = {
  
  // POST /games
  createGame: function(req, res) {
    var game = req.body;
    var name = game.name;
    var giantBombApiId = game.giantBombApiId.toString();
    var imageUrl = game.imageUrl;

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
  },

  // Delete /games/:id

  destroyGame: function(req, res) {
    var game = Game.findById(req.params.id).then(function(game) {
      if(game !== undefined) {
        game.destroy().then(function() {
          res.json({success: true });
        });
      }
    });
  }
};

module.exports = Routes;

