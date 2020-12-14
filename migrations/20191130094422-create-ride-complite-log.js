'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RideCompliteLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      driverId: {
        type: Sequelize.INTEGER
      },
      driverFirstName: {
        type: Sequelize.STRING
      },
      driverLastName: {
        type: Sequelize.STRING
      },
      driverPhone: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      userFirstName: {
        type: Sequelize.STRING
      },
      userLastName: {
        type: Sequelize.STRING
      },
      userPhone: {
        type: Sequelize.STRING
      },
      fare : {
        type: Sequelize.FLOAT
      },
      carType : {
        type :Sequelize.STRING
      },
      fromLat: {
        type: Sequelize.FLOAT
      },
      fromLong: {
        type: Sequelize.FLOAT
      },
      toLat: {
        type: Sequelize.FLOAT
      },
      toLong: {
        type: Sequelize.FLOAT
      },
      startPoint: {
        type: Sequelize.STRING
      },
      destinationPoint: {
        type: Sequelize.STRING
      },
      promoCode: {
        type: Sequelize.STRING
      },
      distance : {
        type: Sequelize.FLOAT
      },
      driverImage : {
        type : Sequelize.STRING
      },
      userImage : {
        type : Sequelize.STRING
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
    return queryInterface.dropTable('RideCompliteLogs');
  }
};