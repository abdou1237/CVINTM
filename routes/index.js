var express = require('express');
var router = express.Router();
var pg=require('pg');
var pghstore=require('pg-hstore');
const profilController = require('../controllers').profil;
const accountController = require('../controllers').account;
const commentaireController= require('../controllers').commentaire;
const auth=require('../controllers').authentication;
const email=require('../controllers').email;

var sessionChecker = (req, res, next) => {
  //console.log("ttttttttttttttttttttttttt"+typeof (req.session.user[0].username));
  if (typeof (req.session.user)!=='undefined') {
    next();
  }else{
    res.render('login_1.ejs');
  }
};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login_1.ejs', { title: 'Express' });
  //login_1.ejs
  //email.ejs
});

router.get('/testrenum', sessionChecker, profilController.testrenum);
router.get('/api/profil', sessionChecker, profilController.list);
router.get('/edit/:id',sessionChecker, profilController.getById);
router.post('/api/profil', profilController.add);
router.post('/edit/:id', profilController.update);
router.get('/delete/:id',sessionChecker, profilController.delete);
router.get('/home', sessionChecker, profilController.getHomeePage);
router.get('/homee', sessionChecker, profilController.getHomePage);
router.get('/add', profilController.addPlayerPage);
router.get('/appoffre',sessionChecker, profilController.appelOffrePage);
router.post('/appoffre',profilController.appOffre);
router.post('/add', profilController.addPlayer);
router.get('/detailss/:id',sessionChecker,profilController.DetailsPlayer);
router.post('/rechercheavance',sessionChecker,profilController.rechercheavance);
router.get('/rechercheavance',sessionChecker,profilController.rechercheavancepage);
router.post('/addRelation',profilController.addRelation);
//router.get('/auth/callback', auth.callback, auth.successLoginRedirect);  

router.get('/Dashboard',sessionChecker, accountController.Dashboard);
router.get('/api/account',sessionChecker, accountController.list);
router.get('/api/account/:id',sessionChecker, accountController.getById);
router.post('/api/account', accountController.add);
router.put('/api/account/:id', accountController.update);
router.delete('/api/account/:id', accountController.delete);
router.post('/auth', accountController.authUser);
router.get('/deconnexion',sessionChecker, accountController.deconnexion);
router.get('/adde',sessionChecker,accountController.addPage);
router.post('/adde',sessionChecker,accountController.add);
router.get('/contact',sessionChecker,accountController.contactPage);
router.get('/propos',sessionChecker,accountController.proposPage);

router.post('/addText',commentaireController.addT);
//router.get('/editCom/:id',commentaireController.editPageComment);
//router.post('/editCom/:id',commentaireController.editComment);
router.post('/deleteCom',commentaireController.deleteComment);
router.post('/updateComment',commentaireController.updateComment);

module.exports = router;
