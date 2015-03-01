var SearchView = function() {
  var resultsBox = document.getElementById('results');
  var searchBar = document.getElementsByTagName('input')[0];
  var template = _.template('<li><%= name %><img src = "<%= image_url %>" class = "vg-thumbnail">' +
      '<button class = "btn btn-success add" id = "add<%= id %>">+</button>' + 
      '</li>');

  var searchTimeout;

  var searchView = this;
  this.getResults = function(query) {
    resultsBox.innerHTML = '';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/search?query=' + query);
    xhr.addEventListener('load', function() {
      var results = JSON.parse(xhr.responseText);
      results.results.forEach(function(r) {
        var id = r.id;
        var name = r.name;
        var image = r.image;
        var image_url;
        if(image) { image_url = image.thumb_url;};
        
        resultsBox.innerHTML += template({name: name, image_url: image_url, id: id});
        $('body').on('click', '#add' + id, function() {
          searchView.addGame({name: name, imageUrl: image_url, giantBombApiId: id});
          $('#add' + id).remove();
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
