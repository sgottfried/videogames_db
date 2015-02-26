require.config({
  paths: {
    'searchView'    : '../../public/scripts/index',
    'chai'          : 'vendor/javascripts/chai',
  }
});

define(function(require) {
  var chai = require('chai');
  var expect = chai.expect;
  var searchView = require('searchView');

  var requests = [];

  describe('SearchView', function() {
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
    });
  });
});
