'use strict';
module.exports = (sequelize, DataTypes) => {
  const DriverEarnInfo = sequelize.define('DriverEarnInfo', {
    driverId: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    totalRide: DataTypes.INTEGER,
    totalEarn: DataTypes.FLOAT,
    wallet: DataTypes.FLOAT,
    bonus: DataTypes.FLOAT,
    rating:DataTypes.FLOAT,
    ratingUserCount : DataTypes.INTEGER,
  }, {});
  DriverEarnInfo.associate = function(models) {
    // associations can be defined here
  };
  return DriverEarnInfo;
};