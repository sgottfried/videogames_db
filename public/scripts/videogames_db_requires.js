require.config({
  paths: {
    'underscore'    : '../vendor/scripts/underscore',
    'search'        : 'search_view'
  }
});

define(function(require) {
  require('underscore');
  require('search');
});
