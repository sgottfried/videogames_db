var resultsBox = document.getElementById('results');
var searchBar = document.getElementsByTagName('input')[0];
var template = _.template(document.getElementById('gameTemplate').innerHTML);

var getResults = function() {
  resultsBox.innerHTML = '';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/search?query=' + searchBar.value);
  xhr.addEventListener('load', function() {
    var results = JSON.parse(xhr.responseText);
    results.results.forEach(function(r) {
      resultsBox.innerHTML += template({name: r.name, image_url: r.image.thumb_url});
    });
  });

  xhr.send();
};

var searchTimeout;
searchBar.addEventListener('input', function() {
  if (searchTimeout != undefined) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(getResults, 330);
});

