var gameRoutes = require('../../routes/games');

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var when = require('when');

var game, req;

describe('Game Routes', function() {
  describe('POST games', function() {
    before(function() {
      game = {name: "the Legend of Zelda", giantBambApiId: '1', imageUrl: 'http://test.png'};
      req = {body: {name: "the Legend of Zelda", giantBombApiId: '1', imageUrl: 'http://test.png'}};
    });

    it('should persist a game', function(done) {
      var res = {json: function() {}};
      
      gameRoutes.createGame(req, res);
      gameRoutes.Games.count().then(function(count) {
        expect(count).to.equal(1);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('should respond with json of the new post', function(done) {
      var res = {json: function(gameJSON) {
        expect(gameJSON).to.equal(game);
        done();
      }};

      sinon.stub(gameRoutes.Games, 'create').returns(when(game));
      gameRoutes.createGame(req, res);
    });
  });

  afterEach(function() {
    gameRoutes.Games.destroy({where: {id: {$gt: 0}}});
  });
});
