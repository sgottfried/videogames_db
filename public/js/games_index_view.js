var GamesIndexView = function() {
  var gamesBox = document.getElementById('gamesBox');
  gamesBox.removeAttribute('class');
  var indexTemplate = _.template('<div class = "col-md-3"><img src="<%= image_url %>" class = "game-box-image"></div>');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/games');
  xhr.addEventListener('load', function() {
    gamesBox.innerHTML = '<div class = "container" id = "container"></div>';
    var games = JSON.parse(xhr.responseText);
    var rowCounter = 0;
    var columnCounter = 0;
    games.forEach(function(g) {
      if(columnCounter == 0) { 
        rowCounter += 1;
        container = document.getElementById('container');
        container.innerHTML += '<div id = "row' + rowCounter + '" class = "row"></div>'; 
      }

      document.getElementById('row' + rowCounter).innerHTML += indexTemplate({image_url: g.imageUrl});
      columnCounter += 1;

      if(columnCounter === 3) { columnCounter = 0; }
    });
    gamesBox.innerHTML += '</div>';
  });

  xhr.send();
};
