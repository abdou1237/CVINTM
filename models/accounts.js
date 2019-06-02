'use strict';
module.exports = (sequelize, DataTypes) => {
  const accounts = sequelize.define('accounts', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    etat:DataTypes.INTEGER,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    numtel: DataTypes.STRING,
  }, {});
  accounts.associate = function(models) {
    // associations can be defined here
  };
  return accounts;
};