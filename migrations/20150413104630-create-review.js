"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      comments: {
        type: DataTypes.TEXT
      },
      rating: {
        type: DataTypes.FLOAT
      },
      photo: {
        type: DataTypes.TEXT
      },
      userId: {
        type: DataTypes.INTEGER
      },
      featureId: {
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
    migration.dropTable("reviews").done(done);
  }
};