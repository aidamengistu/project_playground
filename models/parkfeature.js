"use strict";
module.exports = function(sequelize, DataTypes) {
  var parkfeature = sequelize.define("parkfeature", {
    feature: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.parkfeature.hasMany(models.park);
      }
    }
  });
  return parkfeature;
};