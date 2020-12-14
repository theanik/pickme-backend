'use strict';
module.exports = (sequelize, DataTypes) => {
  const PromoCode = sequelize.define('PromoCode', {
    promoCode: DataTypes.STRING,
    regionId: DataTypes.INTEGER,
    vehicleType: DataTypes.STRING,
    stratDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    offerAmount: DataTypes.INTEGER,
    status:DataTypes.INTEGER
  }, {});
  PromoCode.associate = function(models) {
    // associations can be defined here
  };
  return PromoCode;
};