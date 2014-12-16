"use strict";

module.exports = function(sequelize, DataTypes) {
  var wineries = sequelize.define("wineries", {
    name: DataTypes.STRING,
    yelp_id: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return wineries;
};
