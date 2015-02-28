var searchView;
var testArea;

var server;
var xhr;
var requests;

describe('SearchView', function() {
  before(function() {
    testArea = document.getElementById('testArea');
    testArea.innerHTML = '<input /><ul id = "results"></ul>';

    searchView = new SearchView();
  });

  beforeEach(function() {
    requests = [];
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
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
          JSON.stringify({results: [{name: "The Legend of Zelda", image: { thumb_url: "http://static.giantbomb.com/uploads/scale_avatar/0/26/10169-legendofzelda-goldbox.png"}}]})
        ]);
      
      searchView.getResults('zelda');
      server.respond();

      var results = document.getElementById('results');
      expect(results.innerHTML).to.equal('<li>The Legend of Zelda<img src="http://static.giantbomb.com/uploads/scale_avatar/0/26/10169-legendofzelda-goldbox.png" class="vg-thumbnail"><button class="btn btn-success">+</button></li>');
    });
  });

  describe('#addGame', function() {
    it('should make a request to /games', function() {
      var game = {name: "The Legend of Zelda", giantBombApiId: 1};
      searchView.addGame(game);

      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal('/games');
      expect(requests[0].requestBody).to.equal(game);
    });
  });

  after(function() {
    xhr.restore();
    server.restore;
    testArea.innerHTML = '';
  });
});
