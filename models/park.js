"use strict";
module.exports = function(sequelize, DataTypes) {
  var park = sequelize.define("park", {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    website: DataTypes.STRING,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.park.hasMany(models.parkfeature);
        models.park.hasMany(models.parkfeaturesparks);
        models.park.hasMany(models.review);
      }
    }
  });
  return park;
};