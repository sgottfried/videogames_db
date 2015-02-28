"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('games', 'imageUrl', DataTypes.STRING);
    // add altering commands here, calling 'done' when finished
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('games', 'imageUrl');
    // add reverting commands here, calling 'done' when finished
    done();
  }
};
