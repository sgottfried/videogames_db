var gameRoutes = require('../../routes/games');

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var when = require('when');

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
      req = {
        body: zelda,
        session: {}
      };
    });

    it('should persist a game and add it to the session', function(done) {
      res = {json: function() {}};
     
      gameRoutes.createGame(req, res);
      gameRoutes.Games.count().then(function(count) {
        expect(count).to.equal(1);
        expect(req.session.games[0]).to.deep.equal(zelda);
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

      sinon.stub(gameRoutes.Games, 'create').returns(when(zelda));
      gameRoutes.createGame(req, res);
    });
  });

  describe('#showGames', function() {
    it('should return games from the database and set the games in the session', function(done) {
      var findAllStub;
      req = {session: {}};
      res = {json: function(gamesJSON) {
        expect(gamesJSON).to.equal(JSON.stringify(games));
        expect(req.session.games).to.equal(games);
        findAllStub.restore();
        done();
      }};

      findAllStub = sinon.stub(gameRoutes.Games, 'findAll').returns(when(games));
      gameRoutes.showGames(req, res);
    });


    it('should use the games in the session if it exists', function(done) {
      var gameApiMock = sinon.mock(gameRoutes.Games);
      gameApiMock.expects('findAll').never();

      req = { session: {games: games}};
      res = {json: function(gamesJSON) {
        gameApiMock.verify();
        expect(gamesJSON).to.equal(JSON.stringify(games));
        gameApiMock.restore();
        done();
      }};

      gameRoutes = require('../../routes/games');
      gameRoutes.showGames(req, res);
    });
  });

  afterEach(function() {
    gameRoutes.Games.destroy({where: {id: {$gt: 0}}});
  });
});
