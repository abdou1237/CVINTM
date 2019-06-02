'use strict';
module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
    titre: DataTypes.STRING,
    description: DataTypes.STRING,
    degre: DataTypes.STRING,
    reference: DataTypes.STRING,
    etat: DataTypes.STRING,
    profil: DataTypes.STRING
  }, {});
  ticket.associate = function(models) {
    // associations can be defined here
  };
  return ticket;
};