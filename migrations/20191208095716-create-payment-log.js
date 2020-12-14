'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PaymentLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rideId: {
        type: Sequelize.INTEGER
      },
      driverId: {
        type: Sequelize.INTEGER
      },
      driverName: {
        type: Sequelize.STRING
      },
      driverPhone: {
        type: Sequelize.STRING
      },
      carType: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING
      },
      userPhone: {
        type: Sequelize.STRING
      },
      payAmount: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING
      },
      transactionId : {
        type : Sequelize.TEXT
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
    return queryInterface.dropTable('PaymentLogs');
  }
};