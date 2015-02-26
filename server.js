var secrets = require('./secrets.json');
var request = require('request');
var express = require('express');
var API = require('./lib/bomb_api');

var bomb = new API(secrets['api_key']);

var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/search', function(req, res) {
  bomb.search(req.query.query, function(body) {
    res.send(body);
  });
});

app.listen(3000);
console.log("Listening on port 3000");
