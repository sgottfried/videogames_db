"use strict";

module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    name: DataTypes.STRING,
    giantBombApiId: DataTypes.STRING,
  });

  return Game;
};
