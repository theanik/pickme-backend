'use strict';
module.exports = (sequelize, DataTypes) => {
  const RideCompliteLog = sequelize.define('RideCompliteLog', {
    driverId: DataTypes.INTEGER,
    driverFirstName: DataTypes.STRING,
    driverLastName: DataTypes.STRING,
    driverPhone: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    userFirstName: DataTypes.STRING,
    userLastName: DataTypes.STRING,
    userPhone: DataTypes.STRING,
    carType : DataTypes.STRING,
    fare : DataTypes.FLOAT,
    fromLat: DataTypes.FLOAT,
    fromLong: DataTypes.FLOAT,
    toLat: DataTypes.FLOAT,
    toLong: DataTypes.FLOAT,
    startPoint: DataTypes.STRING,
    destinationPoint: DataTypes.STRING,
    promoCode: DataTypes.STRING,
    distance : DataTypes.FLOAT,
    driverImage : DataTypes.STRING,
    userImage : DataTypes.STRING
  }, {});
  RideCompliteLog.associate = function(models) {
    // associations can be defined here
  };
  return RideCompliteLog;
};