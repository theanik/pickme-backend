'use strict';
module.exports = (sequelize, DataTypes) => {
  const Refer = sequelize.define('Refer', {
    userId: DataTypes.INTEGER,
    referId: DataTypes.STRING
  }, {});
  Refer.associate = function(models) {
    // associations can be defined here
    Refer.belongsTo(models.User,{foreignKey: 'referId', as: 'user'})
  };
  return Refer;
};