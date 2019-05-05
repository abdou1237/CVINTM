'use strict';
module.exports = (sequelize, DataTypes) => {
  const commentaire = sequelize.define('commentaire', {
    profil_id: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    profilID: DataTypes.INTEGER,
    user:DataTypes.STRING,
  }, {});
  commentaire.associate = function(models) {
    // associations can be defined here
    commentaire.belongsTo(models.profil,{
      foreignKey:'profil_id',
      onDelete: 'CASCADE'
    });
  };
  return commentaire;
};
