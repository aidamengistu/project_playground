"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("parkfeaturesparks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      parkId: {
        type: DataTypes.INTEGER
      },
      parkfeatureId: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("parkfeaturesparks").done(done);
  }
};