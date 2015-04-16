"use strict";
module.exports = function(sequelize, DataTypes) {
  var parkfeaturesparks = sequelize.define("parkfeaturesparks", {
    parkId: DataTypes.INTEGER,
    parkfeatureId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.parkfeaturesparks.belongsTo(models.parkfeaturesparks);
      }
    }
  });
  return parkfeaturesparks;
};