"use strict";

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    username: {
      type:DataTypes.STRING,
      validate:{
        len:{
          args:[2,50],
          msg:'Please enter a username'
        }
      }
      },
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:true
      }
      },
    password: {
      type:DataTypes.STRING,
      validate:{
        len:{
          args:[8,20],
          msg:'Password must have at least 8 characters'
        }
      }
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.hasMany(models.review);
      }
    },
    hooks:{
      beforeCreate:function(user,option,sendback){
        bcrypt.hash(user.password,10,function(err,hash){
          if(err){throw err;}
          user.password=hash;
          sendback(null,user);
        })
      }
    }
  });
  return user;
};