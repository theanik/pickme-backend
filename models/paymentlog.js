'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentLog = sequelize.define('PaymentLog', {
    rideId: DataTypes.INTEGER,
    driverId: DataTypes.INTEGER,
    driverName: DataTypes.STRING,
    driverPhone: DataTypes.STRING,
    carType: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    userPhone: DataTypes.STRING,
    payAmount: DataTypes.FLOAT,
    status: DataTypes.STRING,
    transactionId : DataTypes.TEXT
  }, {});
  PaymentLog.associate = function(models) {
    // associations can be defined here
  };
  return PaymentLog;
};