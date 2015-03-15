'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('games',
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          createdAt: DataTypes.DATE,
          updatedAt: DataTypes.DATE,

          name: DataTypes.STRING,
          giantBombApiId: DataTypes.STRING
        });
      done();
    },

    down: function(migration, DataTypes, done) {
      // add reverting commands here, calling 'done' when finished
      migration.dropTable('platforms');
      done();
    }
};
