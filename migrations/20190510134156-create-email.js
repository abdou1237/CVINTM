'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('emails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subject: {
        type: Sequelize.STRING
      },
      to: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      },
      Date: {
        type: Sequelize.STRING
      },
      heure: {
        type: Sequelize.STRING
      },
      envoie: {
        type: Sequelize.STRING
      },
      nom:  {
        allowNull: true,
        type: Sequelize.STRING
      },
      Datee: {
        type: Sequelize.DATE
      },
      prenom: {
        allowNull: true,
        type:  Sequelize.STRING
      },
      numtel:  {
        allowNull: true,
        type: Sequelize.STRING
      },
      autres1:  {
        allowNull: true,
        type: Sequelize.STRING
      },
      autres2:  {
        allowNull: true,
        type:Sequelize.STRING
      },
      minute: {
        allowNull: true,
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
    return queryInterface.dropTable('emails');
  }
};