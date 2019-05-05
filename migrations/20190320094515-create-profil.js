'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profils', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      experience: {
        type: Sequelize.INTEGER
      },
      civilite: {
        type: Sequelize.STRING
      },
      adresse: {
        type: Sequelize.STRING
      },
      ville: {
        type: Sequelize.STRING
      },
      posteactuel: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      email : {
        type: Sequelize.STRING
      },
      nivetude :{
        type: Sequelize.STRING
      },
      situation:{
        type: Sequelize.STRING
      },
      numtel: {
        type: Sequelize.STRING
      },
      renumeration:{
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      fileWord: {
        type: Sequelize.STRING
      },
      filePDF: {
        type: Sequelize.STRING
      },
      fileDDC: {
        type: Sequelize.STRING
      },
      filePLUS1: {
        type: Sequelize.STRING
      },
      filePLUS2: {
        type: Sequelize.STRING
      },
      statut: {
        type: Sequelize.STRING
      },
      vu: {
        type: Sequelize.STRING
      },
      nbrevu: {
        type: Sequelize.INTEGER
      },
      appeler: {
        type: Sequelize.STRING
      },
      nbreappeler: {
        type: Sequelize.INTEGER
      },
      descfinal: {
        type: Sequelize.STRING
      },
      TextProfil: {
        type: Sequelize.STRING
      },
      codepostal: {
        type: Sequelize.STRING
      },
      cdpostal: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('profils');
  }
};