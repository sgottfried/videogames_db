var SearchView = function() {
  var resultsBox = document.getElementById('results');
  var searchBar = document.getElementsByTagName('input')[0];
  var template = _.template('<li><%= name %><img src = "<%= image_url %>" class = "vg-thumbnail">' +
      '<button class = "btn btn-success">+</button>' + 
      '</li>');

  var searchTimeout;

  this.getResults = function(query) {
    resultsBox.innerHTML = '';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/search?query=' + query);
    xhr.addEventListener('load', function() {
      var results = JSON.parse(xhr.responseText);
      results.results.forEach(function(r) {
        resultsBox.innerHTML += template({name: r.name, image_url: r.image.thumb_url});
      });
    });

    xhr.send();
  };

  this.addGame = function(game) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/games');
    xhr.send(game);
  }

  var that = this;
  searchBar.addEventListener('input', function() {
    if (searchTimeout != undefined) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(function() { that.getResults(searchBar.value)}, 330);
  });
};
