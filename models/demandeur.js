'use strict';
module.exports = (sequelize, DataTypes) => {
  const Demandeur = sequelize.define('Demandeur', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    identifiant: DataTypes.STRING
  }, {});
  Demandeur.associate = function(models) {
    // associations can be defined here
  };
  return Demandeur;
};