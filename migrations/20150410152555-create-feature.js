"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("features", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      feature: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      website: {
        type: DataTypes.STRING
      },
      longitude: {
        type: DataTypes.STRING
      },
      latitude: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
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
    migration.dropTable("features").done(done);
  }
};