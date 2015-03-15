'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Games', 'imageUrl', DataTypes.STRING);
    // add altering commands here, calling 'done' when finished
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Games', 'imageUrl');
    // add reverting commands here, calling 'done' when finished
    done();
  }
};
