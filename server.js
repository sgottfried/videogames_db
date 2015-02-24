var secrets = require('./secrets.json');
var request = require('request');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/search', function(req, res) {
  var api_key = secrets['api_key']; 
  var fields = 'name,id,image,platforms';
  var query = req.query.query;
  var url = 'http://www.giantbomb.com/api/search/?api_key=' + api_key + '&format=json&query=' + query + '&field_list=' + fields;
  
  request(url, function(error, response, body) {
    res.json(JSON.parse(body));
  });
});

app.listen(3000);
console.log("Listening on port 3000");
