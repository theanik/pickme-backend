'use strict';
module.exports = (sequelize, DataTypes) => {
  const complainToUser = sequelize.define('complainToUser', {
    driverId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    complainType: DataTypes.STRING,
    complain: DataTypes.TEXT
  }, {});
  complainToUser.associate = function(models) {
    // associations can be defined here
  };
  return complainToUser;
};