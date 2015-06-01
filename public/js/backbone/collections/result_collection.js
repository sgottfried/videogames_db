var Backbone = require('backbone');
var Result = require('../models/result');

var ResultCollection = Backbone.Collection.extend({
  model: Result
});
module.exports = ResultCollection;
