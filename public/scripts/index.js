var resultsBox = document.getElementById('results');
var searchBar = document.getElementsByTagName('input')[0];

var getResults = function() {
  resultsBox.innerHTML = '';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/search?query=' + searchBar.value);
  xhr.addEventListener('load', function() {
    var results = JSON.parse(xhr.responseText);
    results.results.forEach(function(r) {
      resultsBox.innerHTML += r.name + "<br />";
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

