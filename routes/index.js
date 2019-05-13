var express = require('express');
var router = express.Router();
var pg=require('pg');
var pghstore=require('pg-hstore');
const profilController = require('../controllers').profil;
const accountController = require('../controllers').account;
const commentaireController= require('../controllers').commentaire;
const auth=require('../controllers').authentication;
const email=require('../controllers').email;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login_1.ejs', { title: 'Express' });
  //login_1.ejs
  //email.ejs
});

router.get('/testrenum',profilController.testrenum);
router.get('/api/profil', profilController.list);
router.get('/edit/:id', profilController.getById);
router.post('/api/profil', profilController.add);
router.post('/edit/:id', profilController.update);
router.get('/delete/:id', profilController.delete);
router.get('/home', profilController.getHomeePage);
router.get('/homee', profilController.getHomePage);
router.get('/add', profilController.addPlayerPage);
router.get('/appoffre', profilController.appelOffrePage);
router.post('/appoffre',profilController.appOffre);
router.post('/add', profilController.addPlayer);
router.get('/detailss/:id',profilController.DetailsPlayer);
router.post('/rechercheavance',profilController.rechercheavance);
router.get('/rechercheavance',profilController.rechercheavancepage);
router.post('/addRelation',profilController.addRelation);
//router.get('/auth/callback', auth.callback, auth.successLoginRedirect);  

router.get('/Dashboard', accountController.Dashboard);
router.get('/api/account', accountController.list);
router.get('/api/account/:id', accountController.getById);
router.post('/api/account', accountController.add);
router.put('/api/account/:id', accountController.update);
router.delete('/api/account/:id', accountController.delete);
router.post('/auth', accountController.authUser);
router.get('/deconnexion', accountController.deconnexion);
router.get('/adde',accountController.addPage);
router.post('/adde',accountController.add);
router.get('/contact',accountController.contactPage);
router.get('/propos',accountController.proposPage);

router.post('/addText',commentaireController.addT);
//router.get('/editCom/:id',commentaireController.editPageComment);
//router.post('/editCom/:id',commentaireController.editComment);
router.post('/deleteCom',commentaireController.deleteComment);
router.post('/updateComment',commentaireController.updateComment);

module.exports = router;
