'use strict';
module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('Region', {
    regionName: DataTypes.STRING,
    carType: DataTypes.STRING,
    basePrice: DataTypes.FLOAT,
    kilometerRat: DataTypes.FLOAT,
    minuteRate: DataTypes.FLOAT,
    range: DataTypes.FLOAT,
    location: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  Region.associate = function(models) {
    // associations can be defined here
  };
  return Region;
};