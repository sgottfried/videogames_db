var SearchView = require('../../public/js/search_view');

var searchView, gamesBox, server, xhr, requests;

describe('SearchView', function() {
  before(function() {
    gamesBox = document.getElementById('gamesBox');
    gamesBox.innerHTML = '<input /><ul id = "gamesBox"></ul>';

    searchView = new SearchView();
  });

  beforeEach(function() {
    requests = [];
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };
  });

  describe('#getResults', function() {
    it('should make a request to /search', function() {
      searchView.getResults('zelda');

      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal('/search?query=zelda');
    });

    it('should render the result on the page', function() {
      server = sinon.fakeServer.create();
      server.respondWith("GET", "/search?query=zelda",
        [
          200,
          {"Content-Type": "application/json"},
          JSON.stringify({results: [{name: "The Legend of Zelda", image: { thumb_url: "http://static.giantbomb.com/uploads/scale_avatar/0/26/10169-legendofzelda-goldbox.png"}, id: "1"}]})
        ]);

      searchView.getResults('zelda');
      server.respond();

      var gamesBox = document.getElementById('gamesBox');
      expect(gamesBox.innerHTML).to.equal('<li>The Legend of Zelda<img src="http://static.giantbomb.com/uploads/scale_avatar/0/26/10169-legendofzelda-goldbox.png" class="vg-thumbnail"><button class="btn btn-success add" id="add1">+</button></li>');
    });
  });

  describe('#addGame', function() {
    it('should make a request to /games', function() {
      var game = {name: "The Legend of Zelda", giantBombApiId: 1};
      searchView.addGame(game);

      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal('/games');
      expect(requests[0].requestBody).to.equal(JSON.stringify(game));
    });
  });

  afterEach(function() {
    xhr.restore();
    if(server) { server.restore() };
  });
});
