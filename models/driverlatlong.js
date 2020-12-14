'use strict';
module.exports = (sequelize, DataTypes) => {
  const DriverLatLong = sequelize.define('DriverLatLong', {
    driverId: DataTypes.INTEGER,
    lat: DataTypes.TEXT,
    long: DataTypes.TEXT,
    vehicleType:DataTypes.TEXT,
    isApprove: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {});
  DriverLatLong.associate = function(models) {
    // associations can be defined here
  };
  return DriverLatLong;
};