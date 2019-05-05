'use strict';
module.exports = (sequelize, DataTypes) => {
  const specialite = sequelize.define('specialite', {
    spefic: DataTypes.STRING,
    datedeb: DataTypes.DATE,
    datefin: DataTypes.DATE,
    entre: DataTypes.STRING,
  }, {});
  specialite.associate = function(models) {
    // associations can be defined here
    specialite.belongsToMany(models.profil, {
      through: 'SpecialiteProfil',
      as: 'specialities',
      foreignKey: 'specialite_id'
    });
  };
  return specialite;
};