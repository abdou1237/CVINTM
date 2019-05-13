'use strict';
module.exports = (sequelize, DataTypes) => {
  const profil = sequelize.define('profil', {
    civilite:DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    position: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    image: DataTypes.STRING,
    username: DataTypes.STRING,
    fileWord: DataTypes.STRING,
    filePDF: DataTypes.STRING,
    fileDDC: DataTypes.STRING,
    filePLUS1: DataTypes.STRING,
    filePLUS2: DataTypes.STRING,
    TextProfil: DataTypes.STRING,
    statut:DataTypes.STRING,
    vu:DataTypes.STRING,
    nbrevu:DataTypes.INTEGER,
    appeler:DataTypes.STRING,
    nbreappeler:DataTypes.INTEGER,
    descfinal:DataTypes.STRING,
    adresse:DataTypes.STRING,
    ville:DataTypes.STRING,
    posteactuel:DataTypes.STRING,
    numtel:DataTypes.STRING,
    renumeration:DataTypes.INTEGER,
    situation:DataTypes.STRING,
    codepostal: DataTypes.STRING,
    cdpostal:DataTypes.INTEGER,
    age:DataTypes.INTEGER,
    email:DataTypes.STRING,
    nivetude:DataTypes.STRING,
    motcle:DataTypes.STRING
  }, {});
  profil.associate = function(models) {
    // associations can be defined here
    profil.hasMany(models.commentaire, {
      foreignKey: 'profil_id',
      as: 'comm',
      onDelete: 'cascade',
      hooks: true, 
      
    });
    profil.belongsToMany(models.specialite, {
      through: 'SpecialiteProfil',
      as: 'profils',
      foreignKey: 'profil_id'
    });
  };
  return profil;
};