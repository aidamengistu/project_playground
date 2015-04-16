"use strict";
module.exports = function(sequelize, DataTypes) {
  var review = sequelize.define("review", {
    comments: DataTypes.TEXT,
    rating: DataTypes.FLOAT,
    photo: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    parkId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.review.belongsTo(models.park);
        models.review.belongsTo(models.user);
      }
    }
  });
  return review;
};