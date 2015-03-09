var $ = require('jquery');
var _ = require('underscore');
var Spinner = require('spin.js');
var GamesIndexView = require('./games_index_view');

module.exports = SearchView;

function SearchView() {
var gamesIndexView;

  var myGamesLink = $('#myGames');
  myGamesLink.click(function() {
    gamesIndexView = new GamesIndexView();
  });

  var gamesBox = $('#gamesBox');
  var searchBar = $('input')[0];
  var template = _.template('<li><%= name %><img src = "<%= thumb_url %>" class = "vg-thumbnail">' +
      '<button class = "btn btn-success add" id = "add<%= id %>">+</button>' +
      '</li>');

  var searchTimeout;

  var searchView = this;
  this.getResults = function(query) {
    gamesBox.attr('class', 'text-right');
    gamesBox.html('');
    var spinner = new Spinner().spin();
    gamesBox.append(spinner.el);
    $.ajax({
            url: '/search',
            data: {
                    query: query
            },
            type: 'GET',
            dataType: 'json',
            success: function(results) {
              spinner.stop();
              results.results.forEach(function(r) {
                var id = r.id;
                var name = r.name;
                var image = r.image;
                var image_url;
                var thumb_url;

                if(image) {
                  image_url = image.small_url;
                  thumb_url = image.thumb_url;
                }

                gamesBox.append( template({name: name, image_url: image_url, thumb_url: thumb_url, id: id}));
                $('body').on('click', '#add' + id, function() {
                  searchView.addGame({name: name, imageUrl: image_url, giantBombApiId: id});
                  gamesIndexView = new GamesIndexView();
                });
              });
            }
      });
  };

  this.addGame = function(game) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/games');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(game));
  };

  var that = this;
  searchBar.addEventListener('input', function() {
    if (searchTimeout != undefined) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(function() { that.getResults(searchBar.value)}, 330);
  });
};
