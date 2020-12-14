'use strict';
module.exports = (sequelize, DataTypes) => {
  const DriverRefer = sequelize.define('DriverRefer', {
    driverId: DataTypes.INTEGER,
    referId: DataTypes.INTEGER
  }, {});
  DriverRefer.associate = function(models) {
    // associations can be defined here
  };
  return DriverRefer;
};