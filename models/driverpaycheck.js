'use strict';
module.exports = (sequelize, DataTypes) => {
  const DriverPayCheck = sequelize.define('DriverPayCheck', {
    driveId: DataTypes.INTEGER,
    driverName: DataTypes.STRING,
    phone: DataTypes.STRING,
    carType: DataTypes.STRING,
    driverBalance: DataTypes.FLOAT,
    companyBalance: DataTypes.FLOAT,
    status: DataTypes.STRING,
    payType: DataTypes.STRING
  }, {});
  DriverPayCheck.associate = function(models) {
    // associations can be defined here
  };
  return DriverPayCheck;
};