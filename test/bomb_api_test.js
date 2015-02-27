var assert = require('assert');
var API = require('../lib/bomb_api');

var bombApi;
var nock = require('nock');
var expect = require('chai').expect;

describe('bombApi', function() {
  beforeEach(function() {
    bombApi = new API('testkey');
  });

  it('should have an api key', function() {
    expect(bombApi.apiKey).to.equal('testkey');
  });

  describe('#search', function() {
    beforeEach(function() {
      nock('http://www.giantbomb.com')
        .get('/api/search/?api_key=testkey&format=json&query=zelda&field_list=name,id,image,platforms')
        .reply(200, {results:[{name: 'the Legend of Zelda'}]});
    });
    
    it('should search the GiantBomb API for a game and execute the callback', function(done) {
      bombApi.search('zelda', function(body) {
        expect(body).to.equal(JSON.stringify({results:[{name: 'the Legend of Zelda'}]}));
        done();
      });
   });
  });
});
