"use strict";

module.exports = function(sequelize, DataTypes) {
  var wineries = sequelize.define("wineries", {
    name: DataTypes.STRING,
    yelp_id: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associating to user model
        this.belongsTo(models.user);
      }
    }
  });

  return wineries;
};
