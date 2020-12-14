'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DriverPayChecks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      driverId: {
        type: Sequelize.INTEGER
      },
      driverName: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      carType: {
        type: Sequelize.STRING
      },
      driverBalance: {
        type: Sequelize.FLOAT
      },
      companyBalance: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING
      },
      payType: {
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
    return queryInterface.dropTable('DriverPayChecks');
  }
};