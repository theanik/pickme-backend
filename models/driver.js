'use strict';
module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    gander: DataTypes.STRING,
    dob: DataTypes.TEXT,
    city: DataTypes.STRING,
    image: DataTypes.TEXT,
    drivingLicence: DataTypes.TEXT,
    insuranceImg: DataTypes.TEXT,
    pancardImg: DataTypes.TEXT,
    vehicleName: DataTypes.STRING,
    vehicleImg: DataTypes.TEXT,
    vehicleReg: DataTypes.TEXT,
    vehicleRegImg: DataTypes.TEXT,
    vehicleType: DataTypes.STRING,
    isApprove: DataTypes.INTEGER,
    deviceId:DataTypes.TEXT,
    referId : DataTypes.STRING,
    lat : DataTypes.FLOAT,
    long : DataTypes.FLOAT,
    direction : DataTypes.FLOAT,
    status :DataTypes.INTEGER,
  }, {});
  Driver.associate = function(models) {
    // associations can be defined here
  };
  return Driver;
};