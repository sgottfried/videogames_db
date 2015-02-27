var assert = require('assert');
var models = require('../../models');
var Game = models.Game;
var expect = require('chai').expect;

process.env.NODE_ENV = "test";

var testGameIsNotValid = function(game, errorMessage, done) {
  game.validate().then(function(error) {
    if(error) {
      expect(error.errors.length).to.equal(1);
      expect(error.errors[0].message).to.equal(errorMessage);
      done();
    }
    else {
      throw new Error("Did not fail validation: " + errorMessage);
    }
  }).catch(function (err) {
    done(err);
  });
};

describe("Game", function() {
  describe("#name", function() {
    it("cannot be null", function(done) {
      var game = Game.build({});
      var errorMessage = "name cannot be null";
      testGameIsNotValid(game, errorMessage, done);
    });
    it("cannot be empty", function(done) {
      var game = Game.build({name: ""});
      var errorMessage = "Validation notEmpty failed";
      testGameIsNotValid(game, errorMessage, done);
    });
  });

  describe("#giantBombApiId", function() {
    it("cannot be empty", function(done) {
      var game = Game.build({name: "zelda", giantBombApiId: ""});
      var errorMessage = "Validation notEmpty failed";
      testGameIsNotValid(game, errorMessage, done);
    });
  });
});
