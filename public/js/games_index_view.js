'use strict';

var $ = require('jquery');
var _ = require('underscore');

module.exports = GamesIndexView;

function GamesIndexView() {
  var gamesBox = $('#gamesBox');
  gamesBox.removeAttr('class');
  var indexTemplate = _.template('<div class = "col-md-3"><div><img src="<%= image_url %>" class = "game-box-image"></div><div><button class = "btn btn-danger" id = "delete-<%= id %>">delete</button></div></div>');

  $.ajax({
    url: '/games',
    type: 'GET',
    dataType: 'json',
    success: function(games) {
      gamesBox.html('<div class = "container" id = "container"></div>');
      var rowCounter = 0;
      var columnCounter = 0;
      var container = $('#container');
      games.forEach(function(g) {
        if(columnCounter === 0) {
          rowCounter += 1;
          container.append('<div id = "row' + rowCounter + '" class = "row"></div>');
        }

        $('#row' + rowCounter).append(indexTemplate({image_url: g.imageUrl, id: g.id}));
        columnCounter += 1;

        if(columnCounter === 3) { columnCounter = 0; }
      });
      gamesBox.append('</div>');
      $('.btn-danger').click(function(e) {
        $.ajax({
          url: '/games/' + e.target.id.substring(7),
          type: 'Delete',
          dataType: 'json',
          success: function(response) {
            if(response.success === true) {
              gamesBox.html(new GamesIndexView());
            }
          }
        });
      });
    }
  });

}
