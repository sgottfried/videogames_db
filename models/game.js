"use strict";

module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    giantBombApiId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isUnique: function (value, next) {
          var self = this;
          Game.find({where: { giantBombApiId: value }}).then(function(game) {
            if (game && self.id !== game.id) {
              return next("giantBombApiId is already being used.");
            }
            return next();
          }).catch(function (err) {
            return next(err);
          });
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isUrl: true
      }
    }
  });

  return Game;
};
