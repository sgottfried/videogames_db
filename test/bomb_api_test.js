var assert = require('assert');
var API = require('../lib/bomb_api');

var bombApi;
var nock = require('nock');

describe('bombApi', function() {
  beforeEach(function() {
    bombApi = new API('testkey');
  });

  it('should have an api key', function() {
    assert.equal('testkey', bombApi.apiKey);
  });

  describe('#search', function() {
    beforeEach(function() {
      nock('http://www.giantbomb.com')
        .get('/api/search/?api_key=testkey&format=json&query=zelda&field_list=name,id,image,platforms')
        .reply(200, {results:[{name: 'the Legend of Zelda'}]});
    });
    
    it('should search the GiantBomb API for a game and execute the callback', function(done) {
      bombApi.search('zelda', function(body) {
        assert.equal(JSON.stringify({results:[{name: 'the Legend of Zelda'}]}), body); 
        done();
      });
   });
  });
});
