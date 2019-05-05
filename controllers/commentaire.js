const Commentaire = require('../models').commentaire;


module.exports = {
  list(req, res) {
    return Commentaire
      .findAll(
       )
      .then((commentaire) => res.status(200).send(commentaire))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Commentaire
    .findByPk(req.params.id)
    .then((commentaire) => {
      if (!commentaire) {
        return res.status(404).send({
          message: 'Commentaire Not Found',
        });
      }
      return res.status(200).send(commentaire);
    })
    .catch((error) => res.status(400).send(error));
},

  addT(req, res) {
    return Commentaire
      .create({
        profil_id: req.body.idProfil,
        comment: req.body.textProfil,
        user:req.session.user[0].username
      })
      .then((commentaire) => res.redirect('/detailss/'+commentaire.profil_id))
      .catch((error) => res.status(400).send(error));
  },

  updateComment(req, res) {
    return Commentaire
      .findByPk(req.body.idComment,
        {
          order: [
            ['createdAt', 'DESC'],
          ],
        }) 
      .then(commentaire => {
        if (!commentaire) {
          return res.status(404).send({
            message: 'Account Not Found',
          });
        }
        return commentaire
          .update({
            comment: req.body.commentaire || commentaire.comment,
          })
          .then(() => res.redirect('/edit/'+req.body.idProfil))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  deleteComment(req, res) {
    return Commentaire
      .findByPk(req.body.idComment)
      .then(commentaire => {
        if (!commentaire) {
          return res.status(400).send({
            message: 'Commentaire Not Found',
          });
        }
        return commentaire
          .destroy()
          .then(() => res.redirect('/edit/'+req.body.idPlayer))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

};