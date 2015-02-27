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
          notEmpty: true
        }
      }

  });

  return Game;
};
