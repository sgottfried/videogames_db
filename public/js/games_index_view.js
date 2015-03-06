var $ = require('jquery');
var _ = require('underscore');

module.exports = GamesIndexView;

function GamesIndexView() {
  var gamesBox = $('#gamesBox');
  gamesBox.removeAttr('class');
  var indexTemplate = _.template('<div class = "col-md-3"><img src="<%= image_url %>" class = "game-box-image"></div>');

  $.ajax({
    url: '/games',
    type: 'GET',
    dataType: 'json',
    success: function(games) {
      gamesBox.html('<div class = "container" id = "container"></div>');
      var rowCounter = 0;
      var columnCounter = 0;
      games.forEach(function(g) {
        if(columnCounter == 0) {
          rowCounter += 1;
          container = $('#container');
          container.append('<div id = "row' + rowCounter + '" class = "row"></div>');
        }

        $('#row' + rowCounter).append(indexTemplate({image_url: g.imageUrl}));
        columnCounter += 1;

        if(columnCounter === 3) { columnCounter = 0; }
      });
      gamesBox.append('</div>');
    }
  });
};
