'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserWallet = sequelize.define('UserWallet', {
    userId: DataTypes.INTEGER,
    wallet: DataTypes.FLOAT,
    joiningBonus: DataTypes.FLOAT,
    promobalance: DataTypes.FLOAT
  }, {});
  UserWallet.associate = function(models) {
    // associations can be defined here
    UserWallet.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return UserWallet;
};