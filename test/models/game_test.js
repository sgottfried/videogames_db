var assert = require('assert');
var models = require('../../models');
var Game = models.Game;
var expect = require('chai').expect;

process.env.NODE_ENV = 'test';

var testGameIsNotValid = function(game, field, errorMessage, done) {
  game.validate().then(function(error) {
    if(error) {
      expect(error.errors[0].path).to.equal(field);
      expect(error.errors[0].message).to.equal(errorMessage);
      done();
    }
    else {
      throw new Error('Did not fail validation: ' + errorMessage);
    }
  }).catch(function (err) {
    done(err);
  });
};

describe('Game', function() {
  describe('#name', function() {
    var field = 'name';

    it('should not be null', function(done) {
      var game = Game.build({});
      var errorMessage = 'name cannot be null';
      testGameIsNotValid(game, field, errorMessage, done);
    });
    it('should not be empty', function(done) {
      var game = Game.build({name: ''});
      var errorMessage = 'Validation notEmpty failed';
      testGameIsNotValid(game, field, errorMessage, done);
    });
  });

  describe('#giantBombApiId', function() {
    var field = 'giantBombApiId';

    it('should not be empty', function(done) {
      var game = Game.build({name: 'zelda', giantBombApiId: ''});
      var errorMessage = 'Validation notEmpty failed';
      testGameIsNotValid(game, field, errorMessage, done);
    });

    it('should not allow duplicates', function(done) {
      Game.create({name: 'zelda', giantBombApiId: '1'}).then(function() {
        var duplicateGame = Game.build({name: 'duplicate', giantBombApiId: '1'});
        var errorMessage = 'Game already added.';
        testGameIsNotValid(duplicateGame, field, errorMessage, done);
      });
    });

    after(function() {
      Game.destroy({where: {id: {$gt: 0}}});
    });
  });

  describe('#imageUrl', function() {
    var field = 'imageUrl';
    
    it('should be a url', function(done) {
      var game = Game.build({name: 'zelda', imageUrl: 'notUrl'});
      var errorMessage = 'Validation isUrl failed';
      testGameIsNotValid(game, field, errorMessage, done);
    });
  });
});
