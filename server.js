var secrets = require('./secrets.json');
var request = require('request');
var express = require('express');
var app = express();
var API = require('./lib/bomb_api');
app.use(express.static(__dirname + '/public'));

app.get('/search', function(req, res) {
  var api_key = secrets['api_key']; 
  var api = new API(api_key);
  api.search(req.query.query, function(body) {
    res.send(body);
  });
});

app.listen(3000);
console.log("Listening on port 3000");
