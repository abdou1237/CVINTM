'use strict';
module.exports = (sequelize, DataTypes) => {
  const email = sequelize.define('email', {
    subject: DataTypes.STRING,
    to: DataTypes.STRING,
    body: DataTypes.STRING,
    Date: DataTypes.STRING,
    heure: DataTypes.STRING,
    envoie: DataTypes.STRING,
    nom:DataTypes.STRING,
    prenom:DataTypes.STRING,
    numtel:DataTypes.STRING,
    autres1:DataTypes.STRING,
    autres2:DataTypes.STRING,
    minute:DataTypes.STRING,
    Datee:DataTypes.DATE

  }, {});
  email.associate = function(models) {
    // associations can be defined here
  };
  return email;
};