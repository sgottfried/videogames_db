'use strict';

var port = process.env.PORT || 3000;

var request = require('request');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var API = require('./lib/bomb_api');
var models = require('./models');
var gamesRoutes = require('./routes/games');

var bomb = new API(process.env.GIANT_BOMB_API_KEY);

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
app.delete('/games/:id', gamesRoutes.destroyGame);



app.listen(port);
console.log('Listening on port ' + port);
