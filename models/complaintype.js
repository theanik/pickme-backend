'use strict';
module.exports = (sequelize, DataTypes) => {
  const ComplainType = sequelize.define('ComplainType', {
    complainType: DataTypes.STRING
  }, {});
  ComplainType.associate = function(models) {
    // associations can be defined here
  };
  return ComplainType;
};