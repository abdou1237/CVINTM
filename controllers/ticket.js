
var sequelize = require('sequelize');
const Ticket = require('../models').ticket;
const Accounts = require('../models').accounts;


module.exports = {
    list(req, res) {
        return Ticket
      .findAll({
        order: [
          ['createdAt', 'DESC'],
      ]
      })
      .then((ticket) => {
            res.render('Ticket', {
                title: "Welcome to Socka | View Players"
                ,players: ticket
            });
            //res.status(200).send(ticket);
        })
      .catch((error) => res.status(400).send(error));
      },
    
      listrecruteur(req, res) {
        return Accounts
      .findAll({
        where: {
            etat: 0
        }
      })
      .then((profil) => {
            res.render('recruteuroffre', {
                title: "Welcome to Socka | View Players"
                ,players: profil
            });
           // res.status(200).send(profil);
        })
      .catch((error) => res.status(400).send(error));
      },

      affichaddrecruteur(req,res){
        res.render('addrecruteur.ejs', {
            title: "Welcome to Socka | Add a new player"
            ,message: ''
        });
      },
    }