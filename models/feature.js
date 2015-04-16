"use strict";
module.exports = function(sequelize, DataTypes) {
  var feature = sequelize.define("feature", {
    feature: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    website: DataTypes.STRING,
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // models.feature.hasMany(models.review);
      }
    }
  });
  return feature;
};