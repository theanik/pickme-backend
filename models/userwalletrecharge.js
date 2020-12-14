'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserWalletRecharge = sequelize.define('UserWalletRecharge', {
    UserId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    rechargeAmount: DataTypes.FLOAT,
    transactionId: DataTypes.TEXT,
    transactionType: DataTypes.STRING
  }, {});
  UserWalletRecharge.associate = function(models) {
    // associations can be defined here
  };
  return UserWalletRecharge;
};