var express = require('express');
var router = express.Router();
var pg=require('pg');
var pghstore=require('pg-hstore');
const profilController = require('../controllers').profil;
const accountController = require('../controllers').account;
const commentaireController= require('../controllers').commentaire;
const ticketController=require('../controllers').ticket;
const auth=require('../controllers').authentication;
const email=require('../controllers').email;
const offreController=require('../controllers').offre;

var sessionChecker = (req, res, next) => {
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
  //testlanguage.ejs
  //addoffre.ejs
  //affichoffre.ejs
});

router.get('/testrenum', sessionChecker, profilController.testrenum);
router.get('/api/profil', sessionChecker, profilController.list);
router.get('/edit/:id',sessionChecker, profilController.getById);
router.post('/api/profil', sessionChecker, profilController.add);
router.post('/edit/:id', sessionChecker, profilController.update);
router.get('/delete/:id',sessionChecker, profilController.delete);
router.get('/home', sessionChecker, profilController.getHomeePage);
router.get('/homee', sessionChecker, profilController.getHomePage);
router.get('/add', sessionChecker, profilController.addPlayerPage);
router.get('/appoffre',sessionChecker, profilController.appelOffrePage);
router.post('/appoffre', sessionChecker,profilController.appOffre);
router.post('/add', sessionChecker, profilController.addPlayer);
router.get('/detailss/:id',sessionChecker,profilController.DetailsPlayer);
router.post('/rechercheavance',sessionChecker,profilController.rechercheavance);
router.get('/rechercheavance',sessionChecker,profilController.rechercheavancepage);
router.post('/addRelation', sessionChecker,profilController.addRelation);
//router.get('/auth/callback', auth.callback, auth.successLoginRedirect);  

router.get('/Dashboard',sessionChecker, accountController.Dashboard);
router.get('/api/account',sessionChecker, accountController.list);
router.get('/api/account/:id',sessionChecker, accountController.getById);
router.post('/api/account', sessionChecker, accountController.add);
router.put('/api/account/:id', sessionChecker, accountController.update);
router.delete('/api/account/:id', sessionChecker, accountController.delete);
router.post('/auth', accountController.authUser);
router.get('/deconnexion',sessionChecker, accountController.deconnexion);
router.get('/adde',sessionChecker,accountController.addPage);
router.post('/adde',accountController.add);
router.get('/contact',sessionChecker,accountController.contactPage);
router.get('/contactdemandeur',sessionChecker,accountController.contactPageDemandeur);
router.get('/contactadmin',sessionChecker,accountController.contactPageAdmin);
router.get('/propos',sessionChecker,accountController.proposPageDemandeur);
router.get('/proposdemandeur',sessionChecker,accountController.proposPageDemandeur);
router.get('/proposadmin',sessionChecker,accountController.proposPageAdmin);
//router.get('/ticket',accountController.ticketPage);


router.get('/ticket',ticketController.list);
router.get('/recruteur',ticketController.listrecruteur);
router.get('/ajouterrecruteur', ticketController.affichaddrecruteur);


router.post('/addText', sessionChecker,commentaireController.addT);
//router.get('/editCom/:id',commentaireController.editPageComment);
//router.post('/editCom/:id',commentaireController.editComment);
router.post('/deleteCom', sessionChecker,commentaireController.deleteComment);
router.post('/updateComment', sessionChecker,commentaireController.updateComment);

//OFFRE
router.get('/offre',  offreController.list);
router.post('/addoffre', offreController.addT);

//router.get('/detailsdemandeur/:id', offreController.DetailsPlayer);
router.get('/affichprofil',offreController.DetailsOffre);
router.post('/editoffre/:id',  offreController.updateOffre);
router.get('/deleteoffre/:id', offreController.deleteOffre);
router.get('/addprofildemandeur',  offreController.addPlayerPage);
router.post('/ajoutdemandeur',  offreController.addPlayer);

module.exports = router;
