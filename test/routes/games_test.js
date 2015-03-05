var gameRoutes = require('../../routes/games');

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var when = require('when');

var Game = require('../../models').Game;

var zelda, mario, games;
var req, res;

describe('Game Routes', function() {
  before(function() {
      zelda = {name: "the Legend of Zelda", giantBombApiId: '1', imageUrl: 'http://test.png'};
      mario = {name: "Super Mario Bros.", giantBombApiId: '2', imageUrl: 'http://test2.png'};
      games = [zelda, mario];
  });
  
  describe('#createGame', function() {
    before(function() {
      req = { body: zelda };
    });

    it('should persist a game', function(done) {
      res = {json: function() {}};
     
      gameRoutes.createGame(req, res);

      Game.count().then(function(count) {
        expect(count).to.equal(1);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('should respond with json of the new post', function(done) {
      res = {json: function(gameJSON) {
        expect(gameJSON).to.equal(zelda);
        done();
      }};

      sinon.stub(Game, 'create').returns(when(zelda));
      gameRoutes.createGame(req, res);
    });
  });

  describe('#showGames', function() {
    it('should return games from the database', function(done) {
      var findAllStub;
      req = {};
      res = {json: function(gamesJSON) {
        expect(gamesJSON).to.equal(games);
        findAllStub.restore();
        done();
      }};

      findAllStub = sinon.stub(Game, 'findAll').returns(when(games));
      gameRoutes.showGames(req, res);
    });
  });

  afterEach(function() {
    Game.destroy({where: {id: {$gt: 0}}});
  });
});
