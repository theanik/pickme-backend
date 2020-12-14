'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FareCalculates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      carType: {
        type: Sequelize.STRING
      },
      kmRate: {
        type: Sequelize.FLOAT
      },
      minRate: {
        type: Sequelize.FLOAT
      },
      baseFare: {
        type: Sequelize.FLOAT
      },
      minFare: {
        type: Sequelize.FLOAT
      },
      insurance: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('FareCalculates');
  }
};