'use strict';
module.exports = (sequelize, DataTypes) => {
  const RideLog = sequelize.define('RideLog', {
    driverId: DataTypes.STRING,
    driverName: DataTypes.STRING,
    userId: DataTypes.STRING,
    userName: DataTypes.STRING,
    carType: DataTypes.STRING,
    startPoint: DataTypes.STRING,
    destinationPoint: DataTypes.STRING,
    rideStatus : DataTypes.STRING,
    fare: DataTypes.FLOAT
  }, {});
  RideLog.associate = function(models) {
    // associations can be defined here
  };
  return RideLog;
};