const Offre = require('../models').offre;
var sequelize = require('sequelize');
const Profil = require('../models').profil;


module.exports = {
    list(req, res) {
        return Offre
      .findAll({
        order: [
          ['createdAt', 'DESC'],
      ]
      })
      .then((offre) => {
            res.render('affichoffre', {
                title: "Welcome to Socka | View Players"
                ,players: offre 
            });
            //res.status(200).send(offre);
        })
      .catch((error) => res.status(400).send(error));
      },

      

      DetailsOffre(req, res) {
        console.log("///////////////////////////////////////"+req.session.user[0].username);
        return Profil
          .findAll(
            {
              where:{
                firstname : req.session.user[0].username
              }
            }
          )
          .then((profil) => {
            if (!profil) {
              return res.status(404).send({
                message: 'Profil Not Found',
              });
            } 
            res.render('affichprofildemandeur', {
                title: "Edit  Player"
                ,player: profil
                ,message : ''
            });
            console.log(profil);
           // res.status(200).send(profil);
          })
          .catch((error) => res.status(400).send(error));
    },
    addPlayerPage(req, res) {
      res.render('adddemandeur.ejs', {
          title: "Welcome to Socka | Add a new player"
          ,message: ''
      });
  },

  addPlayer(req, res) {
      var options= {};
    if(req.body.first_name) options.firstname =sequelize.fn('lower', req.body.first_name);
    if(req.body.last_name) options.lastname = sequelize.fn('UPPER',req.body.last_name);
    if(req.body.position) options.position = sequelize.fn('UPPER',req.body.position);
    if(req.body.textprofil) options.TextProfil =sequelize.fn('lower',req.body.textprofil);
    if(req.body.number) options.experience = req.body.number;
    if(req.body.motcle) options.motcle=req.body.motcle;
    if(req.session.user[0].username) options.username = sequelize.fn('lower',req.session.user[0].username);
    if(req.body.civilite) options.civilite=req.body.civilite;
    if(req.body.situation) options.situation=req.body.situation;
    if(req.body.codepostal) {
       options.codepostal=req.body.codepostal;
       options.cdpostal = (req.body.codepostal).substring(0,2);}
       options.statut="test";
       console.log(options.status);
    //options.nbrevu=3;
    if(req.body.adresse) options.adresse=sequelize.fn('lower',req.body.adresse);
    if(req.body.ville) options.ville=sequelize.fn('UPPER',req.body.ville);
    if(req.body.posteactuel) options.posteactuel=sequelize.fn('UPPER',req.body.posteactuel);
    if(req.body.email) options.email=sequelize.fn('lower',req.body.email);
    if(req.body.age) options.age=req.body.age;
    if(req.body.nivetude) options.nivetude=req.body.nivetude;
    if(req.body.numtel) options.numtel=req.body.numtel;
    if(req.body.renumeration) options.renumeration=req.body.renumeration;
                               options.vu='non';
                               options.nbrevu=0;
                               options.nbreappeler=0;
                               options.appeler='non';
                               options.descfinal='Pas de Decision';
    if(req.files.image){
    let uploadedFile = req.files.image;
    let test =(req.files.image).mv(`public/images/`+req.body.last_name+'3' + '.' + (req.files.image).mimetype.split('/')[1]);
    let fileExtension = (req.files.image).mimetype.split('/')[1];
    options.image = req.body.last_name+'3' + '.' + (req.files.image).mimetype.split('/')[1];
    }
    if(req.files.filePDF){
    let filePDFF= req.files.filePDF;
    let test2=(req.files.filePDF).mv(`public/file/`+req.body.last_name+'4' + '.' + (req.files.filePDF).mimetype.split('/')[1]);
    let filePDFExtension= (req.files.filePDF).mimetype.split('/')[1];
    options.filePDF= req.body.last_name+'4' + '.' + (req.files.filePDF).mimetype.split('/')[1];
    }
    if(req.files.fileWord){
    let fileWordd =req.files.fileWord;
    let testi =(req.files.fileWord).mv(`public/file/`+ req.body.last_name+'5' + '.' + 'docx');
    let fileWordExtension= (req.files.fileWord).mimetype.split('.').pop();
    options.fileWord = req.body.last_name+'5' + '.' + 'docx';
    }
    if(req.files.fileDDC){
    let fileDDCC= req.files.fileDDC;
    console.log((req.files.fileDDC).mimetype.split('/')[1]);
    if((req.files.fileDDC).mimetype.split('/')[1]== 'msword')
    var extens='doc';
    else if((req.files.fileDDC).mimetype.split('/')[1]== 'vnd.openxmlformats-officedocument.wordprocessingml.document') 
    extens='docx';
    else extens=(req.files.fileDDC).mimetype.split('/')[1];
    let test3=(req.files.fileDDC).mv(`public/file/`+req.body.last_name + '.' + extens);
    console.log((req.files.fileDDC).mimetype.split('/')[1]);
    let fileDDCExtension= extens;
    options.fileDDC = req.body.last_name + '.' +extens;
    //console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"+options.fileDDC);
    }

    if(req.files.fichierp){
      if((req.files.fichierp).mimetype.split('/')[1]== 'msword')
      var extens='doc';
      else if((req.files.fichierp).mimetype.split('/')[1]== 'vnd.openxmlformats-officedocument.wordprocessingml.document') 
      extens='docx';
      else extens=(req.files.fichierp).mimetype.split('/')[1];
      let test3=(req.files.fichierp).mv(`public/file/`+req.body.last_name + '1' + '.' + extens);
      options.filePLUS1 = req.body.last_name + '1' + '.' +extens;
      }
    if(req.files.fichierpl){
        if((req.files.fichierpl).mimetype.split('/')[1]== 'msword')
        var extens='doc';
        else if((req.files.fichierpl).mimetype.split('/')[1]== 'vnd.openxmlformats-officedocument.wordprocessingml.document') 
        extens='docx';
        else extens=(req.files.fichierpl).mimetype.split('/')[1];
        let test3=(req.files.fichierpl).mv(`public/file/`+req.body.last_name +'2' + '.' + extens);
        options.filePLUS2 = req.body.last_name +'2' + '.' +extens;
        }
    return Profil
       .create(options
     
     
     //insertDocuments( db, `node-sequelize/public/images/`+ req.body.username + '.' + (req.files.image).mimetype.split('/')[1] ),
     //return :[req.files.fileWord,req.files.filePDF,req.files.image, req.body.lastname + '.' + (req.files.image).mimetype.split('/')[1]],
       )
    .then((imagee) =>  {
         res.redirect('/home');
       }) 
    .catch((error) => res.status(400).send(error));
},

      addT(req, res) {
        return Offre
          .create({
            titre: req.body.titre,
            description: req.body.description,
            nivetude:req.body.nivetude,
            renumeration:req.body.renumeration
           // mission:req.body,
           // profil:req.body
          })
          .then((offre) => res.status(200).send(offre))
          .catch((error) => res.status(400).send(error));
      },

      updateOffre(req, res) {
        return Offre
          .findByPk(req.body.idComment,
            {
              order: [
                ['createdAt', 'DESC'],
              ],
            }) 
          .then(offre => {
            if (!offre) {
              return res.status(404).send({
                message: 'Account Not Found',
              });
            }
            return offre
              .update({
                titre: req.body.commentaire || offre.titre,
                description:req.body  || offre.description,
                nivetude:req.body || offre.nivetude,
                renumeration:req.body || offre.renumeration,
                mission:req.body || offre.mission,
                profil:req.body || offre.profil
              })
              .then(() => res.redirect(''))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      deleteOffre(req, res) {
        return offre
          .findByPk(req.body)
          .then(offre => {
            if (!offre) {
              return res.status(400).send({
                message: 'Commentaire Not Found',
              });
            }
            return offre
              .destroy()
              .then(() => res.redirect(''))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
}