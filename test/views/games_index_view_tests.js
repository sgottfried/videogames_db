var GamesIndexView = require('../../public/js/games_index_view');

var indexView, xhr, server, requests;

describe('GamesIndexView', function() {
  beforeEach(function() {
    requests = [];
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };
  });

  describe('#initialize', function() {
    it('should make a request to /games', function() {
      indexView = new GamesIndexView();
      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal('/games');
    });

    it('should render the results on the page', function() {
      server = sinon.fakeServer.create();
      server.respondWith('GET', '/games',
        [
          200,
          {"Content-Type": "application/json"},
          JSON.stringify([{name: "The Legend of Zelda", imageUrl: "http://static.giantbomb.com/uploads/scale_avatar/0/26/10169-legendofzelda-goldbox.png", giantBombApiId: "1"}])
        ]);

      new GamesIndexView();

      server.respond();
      var row = document.getElementById('row1');
      expect(row.innerHTML).to.equal('<div class="col-md-3"><img src="http://static.giantbomb.com/uploads/scale_avatar/0/26/10169-legendofzelda-goldbox.png" class="game-box-image"></div>');
    });
  });

  afterEach(function() {
    xhr.restore();
    if(server) { server.restore() };
  });

  after(function() {
    gamesBox.innerHTML = '';
  });
});
