'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull:false,
      },
      email: {
        type: Sequelize.STRING
      },
      gander: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      dob : {
        type : Sequelize.TEXT,
        allowNull:true,
      },
      image:{
        type: Sequelize.TEXT,
        allowNull:true,
      },
      deviceId : {
        type: Sequelize.TEXT
      },
      referId : {
        type: Sequelize.STRING,
        allowNull:false
      },
      lat : {
        type: Sequelize.TEXT,
        allowNull:true,
      },
      long : {
        type: Sequelize.TEXT,
        allowNull:true,
      },
      status : {
        type: Sequelize.INTEGER,
        allowNull:false,
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
    return queryInterface.dropTable('Users');
  }
};