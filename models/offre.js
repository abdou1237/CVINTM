'use strict';
module.exports = (sequelize, DataTypes) => {
  const offre = sequelize.define('offre', {
    titre: DataTypes.STRING,
    description: DataTypes.STRING,
    nivetude: DataTypes.STRING,
    renumeration: DataTypes.STRING,
    mission: DataTypes.STRING,
    profil: DataTypes.STRING,
    reference: DataTypes.STRING,
    etat: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  offre.associate = function(models) {
    // associations can be defined here
  };
  return offre;
};