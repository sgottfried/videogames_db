'use strict';

module.exports = function(sequelize, DataTypes) {
  var Platform = sequelize.define("Platform", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

      giantBombApiId: {
        type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
      }
  });

  return Platform;
};
