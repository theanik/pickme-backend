'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Drivers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      gander: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dob: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      drivingLicence: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      insuranceImg: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      pancardImg: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      vehicleName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vehicleImg: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      vehicleReg: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      vehicleRegImg: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      vehicleType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isApprove: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      deviceId : {
        type: Sequelize.TEXT
      },
      referId : {
        type: Sequelize.STRING,
        allowNull:false,
        unique : true
      },
      lat : {
        type:  Sequelize.FLOAT,
        allowNull:true,
      },
      long : {
        type:  Sequelize.FLOAT,
        allowNull:true,
      },
      direction : {
        type : Sequelize.FLOAT
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
    return queryInterface.dropTable('Drivers');
  }
};