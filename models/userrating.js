'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRating = sequelize.define('UserRating', {
    driverId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    coutRatingDriver: DataTypes.INTEGER
  }, {});
  UserRating.associate = function(models) {
    // associations can be defined here
  };
  return UserRating;
};