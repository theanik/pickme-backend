'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    gander:DataTypes.STRING,
    dob:DataTypes.TEXT,
    image:DataTypes.TEXT,
    deviceId:DataTypes.TEXT,
    referId : DataTypes.STRING,
    lat :DataTypes.TEXT,
    long :DataTypes.TEXT,
    status :DataTypes.INTEGER,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Refer,{foreignKey: 'referId'})
    //User.hasOne(models.UserWallet)
  };
  return User;
};