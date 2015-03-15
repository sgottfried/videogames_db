'use strict';

var assert = require('assert');
var models = require('../../models');
var User = models.User;

var expect = require('chai').expect;

var testUserIsNotValid = function(user, field, errorMessage, done) {
  user.validate().then(function(error) {
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

describe('User', function() {
  describe('#username', function() {
    var field = 'username';
    it ('should not be null', function(done) {
      var user = User.build({password: '123'});
      var errorMessage = 'username cannot be null';
      testUserIsNotValid(user, field, errorMessage, done);
    });

    it('should not be empty', function(done) {
      var user = User.build({username: '', password: 123});
      var errorMessage = 'Validation notEmpty failed';
      testUserIsNotValid(user, field, errorMessage, done);
    });
  });

  describe('#password', function() {
    var field = 'password';
    it ('should not be null', function(done) {
      var user = User.build({username: 'test'});
      var errorMessage = 'password cannot be null';
      testUserIsNotValid(user, field, errorMessage, done);
    });

    it('should not be empty', function(done) {
      var user = User.build({username: 'test', password: ''});
      var errorMessage = 'Validation notEmpty failed';
      testUserIsNotValid(user, field, errorMessage, done);
    });
  });
});
