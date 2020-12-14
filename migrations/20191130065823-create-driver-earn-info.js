'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DriverEarnInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      driverId: {
        type: Sequelize.INTEGER
      },
      phone: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      totalRide: {
        type: Sequelize.INTEGER
      },
      totalEarn: {
        type: Sequelize.FLOAT
      },
      wallet: {
        type: Sequelize.FLOAT
      },
      bonus: {
        type: Sequelize.FLOAT
      },
      rating :{
        type: Sequelize.FLOAT
      },
      ratingUserCount :{
        type : Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DriverEarnInfos');
  }
};