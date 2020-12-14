'use strict';
module.exports = (sequelize, DataTypes) => {
  const Complain = sequelize.define('Complain', {
    userId: DataTypes.INTEGER,
    driverId: DataTypes.INTEGER,
    complain: DataTypes.TEXT,
    complainType: DataTypes.STRING
  }, {});
  Complain.associate = function(models) {
    // associations can be defined here
    Complain.belongsTo(models.User, {foreignKey: 'userId'})
    Complain.belongsTo(models.Driver, {foreignKey: 'driverId'})
  };
  return Complain;
};