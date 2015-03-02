var secrets = require('./secrets.json');
var request = require('request');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var API = require('./lib/bomb_api');
var models = require('./models');
var gamesRoutes = require('./routes/games');

var bomb = new API(secrets['api_key']);

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var session = session({
  secret: 'vg_db',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
});

app.use(session);

app.get('/search', function(req, res) {
  bomb.search(req.query.query, function(body) {
    res.send(body);
  });
});

app.post('/games', gamesRoutes.createGame);
app.get('/games', gamesRoutes.showGames);



app.listen(3000);
console.log("Listening on port 3000");
