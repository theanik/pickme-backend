'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RideLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      driverId: {
        type: Sequelize.STRING
      },
      driverName: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING
      },
      carType: {
        type: Sequelize.STRING
      },
      startPoint: {
        type: Sequelize.STRING
      },
      destinationPoint: {
        type: Sequelize.STRING
      },
      fare: {
        type: Sequelize.FLOAT
      },
      rideStatus : {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('RideLogs');
  }
};