'use strict';

var request = require('request');
var API = function(key) {
  this.apiKey = key;
  
  this.search = function(query, callback) {
    var fields = 'name,id,image,platforms';
    var url = 'http://www.giantbomb.com/api/search/?api_key=' + this.apiKey + '&format=json&query=' + query + '&field_list=' + fields;
   
    var options = {
      url: url,
      headers: {
        'User-Agent': 'request'
      }
    };

    request.get(options, function(err, response, body) {
      callback(body);
    });
  };

};

module.exports = API;
