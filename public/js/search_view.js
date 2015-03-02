var SearchView = function() {
var gamesIndexView;

  var myGamesLink = document.getElementById('myGames');
  myGamesLink.addEventListener('click', function() {
    gamesIndexView = new GamesIndexView();
  });
  
  var gamesBox = document.getElementById('gamesBox');
  var searchBar = document.getElementsByTagName('input')[0];
  var template = _.template('<li><%= name %><img src = "<%= thumb_url %>" class = "vg-thumbnail">' +
      '<button class = "btn btn-success add" id = "add<%= id %>">+</button>' + 
      '</li>');

  var searchTimeout;

  var searchView = this;
  this.getResults = function(query) {
    gamesBox.setAttribute('class', 'text-right');
    gamesBox.innerHTML = '';
    var spinner = new Spinner().spin();
    gamesBox.appendChild(spinner.el);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/search?query=' + query);
    xhr.addEventListener('load', function() {
      spinner.stop();
      var results = JSON.parse(xhr.responseText);
      results.results.forEach(function(r) {
        var id = r.id;
        var name = r.name;
        var image = r.image;
        var image_url;
        if(image) { 
          image_url = image.small_url;
          thumb_url = image.thumb_url;
        }
        
        gamesBox.innerHTML += template({name: name, image_url: image_url, thumb_url: thumb_url, id: id});
        $('body').on('click', '#add' + id, function() {
          searchView.addGame({name: name, imageUrl: image_url, giantBombApiId: id});
          gamesIndexView = new GamesIndexView();
        });
      });
    });

    xhr.send();
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
