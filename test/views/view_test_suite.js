require.config({
  paths: {
    'underscore'    : 'vendor/javascripts/underscore',
    'mocha'         : 'vendor/javascripts/mocha',
    'sinon'         : 'vendor/javascripts/sinon-1.12.2',
  }
});

define(function(require) {
  require('mocha');
  require('underscore');
  require('sinon');

  mocha.setup('bdd');
  require(['search_view_tests'], function(require) {
    mocha.run();
  });
});
