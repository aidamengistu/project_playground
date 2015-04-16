"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.renameColumn('reviews','featureId','parkId');
    done();
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.renameColumn('reviews','parkId','featureId');

    done();
  }
};
