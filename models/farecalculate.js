'use strict';
module.exports = (sequelize, DataTypes) => {
  const FareCalculate = sequelize.define('FareCalculate', {
    carType: DataTypes.STRING,
    kmRate: DataTypes.FLOAT,
    minRate: DataTypes.FLOAT,
    baseFare: DataTypes.FLOAT,
    minFare: DataTypes.FLOAT,
    insurance: DataTypes.FLOAT
  }, {});
  FareCalculate.associate = function(models) {
    // associations can be defined here
  };
  return FareCalculate;
};