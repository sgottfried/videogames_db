"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('games',
        {
          id: {
            type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
          },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    name: DataTypes.STRING,
    giantBombApiId: DataTypes.STRING
        });

    // add altering commands here, calling 'done' when finished
    done();
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropTable('games');
    done();
  }
};
