'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('offres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      nivetude: {
        type: Sequelize.STRING,
        allowNull:true
      },
      renumeration: {
        type: Sequelize.STRING,
        allowNull:true
      },
      mission: {
        type: Sequelize.STRING,
        allowNull:true
      },
      profil: {
        type: Sequelize.STRING
      },
      reference: {
        type: Sequelize.STRING,
        allowNull:true
      },
      etat: {
        type: Sequelize.STRING,
        allowNull:true
      },
      type: {
        type: Sequelize.STRING,
        allowNULL:true
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
    return queryInterface.dropTable('offres');
  }
};