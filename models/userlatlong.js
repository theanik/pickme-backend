'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLatLong = sequelize.define('UserLatLong', {
    userId: DataTypes.INTEGER,
    lat: DataTypes.TEXT,
    long: DataTypes.TEXT,
    isApprove: DataTypes.INTEGER,
    isActice: DataTypes.BOOLEAN
  }, {});
  UserLatLong.associate = function(models) {
    // associations can be defined here
  };
  return UserLatLong;
};