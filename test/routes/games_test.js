var models = require('../../models');
var Game = models.Game;
var gameRoutes = require('../../routes/games');
var expect = require('chai').expect;
var sinon = require('sinon');
var express = require('express');

describe('Game Routes', function() {
  describe('POST games', function() {
    it('should persist a game', function(done) {
      var req = {body: {name: "the Legend of Zelda", giantBombApiId: '1'}};
      var res = {json: function() {}};
      
      gameRoutes.createGame(req, res);
      Game.count().then(function(count) {
        expect(count).to.equal(1);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  afterEach(function() {
    Game.destroy({where: {id: {$gt: 0}}});
  });
});



