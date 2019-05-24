'use strict';
module.exports = (sequelize, DataTypes) => {
  const accounts = sequelize.define('accounts', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    etat:DataTypes.INTEGER
  }, {});
  accounts.associate = function(models) {
    // associations can be defined here
  };
  return accounts;
};