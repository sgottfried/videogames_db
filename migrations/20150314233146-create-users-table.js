'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Users',
        {
          id: {
            type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
          },
    createdAt: DataTypes.DATE,
    username: DataTypes.STRING,
    password: DataTypes.STRING
        });

    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Users');
    done();
  }
};
