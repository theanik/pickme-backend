'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Regions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      regionName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      carType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      basePrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      kilometerRat: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      minuteRate: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      range: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('Regions');
  }
};