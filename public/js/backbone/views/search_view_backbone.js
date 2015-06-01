'use strict';

var Backbone = require('backbone');
var Spinner = require('spin.js');
var $ = require('jquery');

var gamesBox = $('#gamesBox');

var ResultCollection = require('../collections/result_collection');
var Result = require('../models/result');

var SearchViewBackbone = Backbone.Model.extend({
  initialize: function() {
    this.collection = new ResultCollection();
  },

  getResults: function(query) {
    this.collection.reset();
    var collection = this.collection;
    var spinner = new Spinner().spin();
    gamesBox.append(spinner.el);
    $.ajax({
      url: '/search',
      data: {
        query: query
      },
      type: 'GET',
      dataType: 'json',
      success: function(results) {
        spinner.stop();
        results.results.forEach(function(r) {
          var id = r.id;
          var name = r.name;
          var image = r.image;
          var imageUrl;
          var thumbUrl;

          if(image) {
            imageUrl = image.small_url;
            thumbUrl = image.thumb_url;
          }

          var result = new Result({name: name, imageUrl: imageUrl, thumbUrl: thumbUrl, id: id});
         collection.add(result); 
        });


      }
    });
  }
});
module.exports = SearchViewBackbone;
