'use strict';

var assert = require('assert');
var models = require('../../models');
var Platform = models.Platform;
var expect = require('chai').expect;

process.env.NODE_ENV = 'test';

var testPlatformIsNotValid = function(platform, field, errorMessage, done) {
  platform.validate().then(function(error) {
    if(error) {
      expect(error.errors[0].path).to.equal(field);
      expect(error.errors[0].message).to.equal(errorMessage);
      done();
    }
    else {
      throw new Error('Did not fail validation: ' + errorMessage);
    }
  }).catch(function (err) {
    done(err);
  });
};

describe('Platform', function() {
  describe('#name', function() {
    var field = 'name';

    it('should not be null', function(done) {
      var platform = Platform.build({giantBombApiId: '1'});
      var errorMessage = 'name cannot be null';
      testPlatformIsNotValid(platform, field, errorMessage, done);
    });

    it('should not be empty', function(done) {
      var platform = Platform.build({name: '', giantBombApiId: '1'});
      var errorMessage = 'Validation notEmpty failed';
      testPlatformIsNotValid(platform, field, errorMessage, done);
    });
  });

  describe('#giantBombApiId', function() {
    var field = 'giantBombApiId';

    it('should not be null', function(done) {
      var platform = Platform.build({name: "NES"});
      var errorMessage = 'giantBombApiId cannot be null';
      testPlatformIsNotValid(platform, field, errorMessage, done);
    });

    it('should not be empty', function(done) {
      var platform = Platform.build({name: 'NES', giantBombApiId: ''});
      var errorMessage = 'Validation notEmpty failed';
      testPlatformIsNotValid(platform, field, errorMessage, done);
    });
  });
});
