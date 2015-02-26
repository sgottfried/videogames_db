var requests = [];
var searchView;
var testArea;

describe('SearchView', function() {
  before(function() {
    testArea = document.getElementById('testArea');
    testArea.innerHTML = '<input /><ul id = "results"></ul>';
    testArea.innerHTML += '<script type = "text/template" id = "gameTemplate">' +
                          '<li><%= name %><img src = "<%= image_url %>"></li>' +
                          '</script>';

    searchView = new SearchView();
  });

  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    this.xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };
  });

  describe('#getResults', function() {
    it('should make a request to /search', function() {
      searchView.getResults('zelda');
      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal('/search?query=zelda');
    });
  });

  after(function() {
    this.xhr.restore();
    testArea.innerHTML = '';
  });
});
