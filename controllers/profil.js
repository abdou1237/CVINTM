const Profil = require('../models').profil;
const Commentaire = require('../models').commentaire;
var validator = require('validator');
var sequelize = require('sequelize');
const specialite = require('../models').specialite;


module.exports = {
  list(req, res) {
    return Profil
      .findAll({
        include: [{
          model: specialite,
          as: 'specialite'
        }],
      })
      .then((profil) => res.status(200).send(profil))
      .catch((error) => { res.status(400).send(error); });
  },
  appOffre(req, res) {
    return Profil
    .findAll()
    .then((options) => {
      console.log(req.body.value);
      var vall=(req.body.value).toString();
      var tabval=vall.split(',');
      tabval=tabval.map(s => s.trim());
      console.log(tabval);
    var profil={},result={};
    profil=options;
    console.log("test du count");
    
    console.log("j'ai passé le count");
    var i=0;
    while(i != options.length){
      profil[i].number=0;
    let tabmot=(options[i].motcle).toString(); 
    tabmot=tabmot.split(',');
    console.log("1/2");
    profil[i].tabmotcle=tabmot.map(s=> s.trim());
    console.log(profil[i].tabmotcle);
    i++;}
    console.log("mapping du profil");
     var tailleprofil=0;
     var tailleval=tabval.length;
     console.log(tailleval  + "/" +profil.length);
     while(tailleprofil != profil.length){
       var tp=0;
       console.log("1");
       console.log(profil[tailleprofil].motcle);
       //console.log(profil.tabmotcle);
       //console.log(profil[0].tabmotcle);
       while(tp != (profil[tailleprofil].tabmotcle).length){
         //console.log("2");
         var j=0;
         while(j!=tailleval && profil[tailleprofil].tabmotcle[tp] != tabval[j])
           j++;
        if(j != tabval.length) { profil[tailleprofil].number ++;}
       tp++;}
       tailleprofil++;
       console.log(tailleprofil);
     }
     i=0;
     var tailleresult=0;
     while(i!=profil.length){
       console.log("le nombre pour"+ i +"est:"+profil[i].number);
      if(profil[i].number > 0) {result[tailleresult]= profil[i]; tailleresult++;}
      i++;
     }
     
     res.render('appeloffre.ejs', {
      title: "Edit  Player"
      ,players: result
      ,taille: tailleresult
      ,message : ''
  });
    })
    .catch((error) => res.status(400).send(error));
  },

  getById(req, res) {
    return Profil
    .findByPk(req.params.id,
      {
        include: { model: Commentaire, as: 'comm' },
      })
    .then((profil) => {
      if (!profil) {
        return res.status(404).send({
          message: 'Profil Not Found',
        });
      }
      res.render('edit-player.ejs', {
        title: "Edit  Player"
        ,player: profil
        ,message : ''
    });
    })
    .catch((error) => res.status(400).send(error));
},

  add(req, res) {
    return Profil
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        position: req.body.position,
        experience: req.body.experience,
        image:req.body.image,
        username:req.session.user[0].username,
        fileWord:req.body.fileWord,
        filePDF:req.body.filePDF,
        TextProfil:req.body.TextProfil,

        isAdmin: true,
      })
      .then((profil) => res.status(201).send(profil))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Profil
      .findByPk(req.params.id) 
      .then(profil => {
        if (!profil) {
          return res.status(404).send({
            message: 'Profil Not Found',
          });
        }
        return profil
          .update({
            firstname: sequelize.fn('lower', req.body.first_name) || profil.firstname,
            lastname: sequelize.fn('UPPER',req.body.last_name) || profil.lastname,
            position: sequelize.fn('UPPER',req.body.position) || profil.position,
            experience: req.body.number || profil.experience,
            image: req.body.image || profil.image,
            username: sequelize.fn('lower', req.body.username) || profil.username,
            fileWord: req.body.fileWord || profil.fileWord,
            filePDF: req.body.filePDF || profil.filePDF,
            TextProfil: req.body.textprofil || profil.TextProfil,
            civilite: req.body.civilite || profil.civilite,
            situation: req.body.situation || profil.situation,
            email:sequelize.fn('lower',req.body.email) || profil.email,
            age:req.body.age || profil.age,
            nivetude:req.body.nivetude || profil.nivetude,
            adresse: sequelize.fn('lower',req.body.adresse) || profil.adresse,
            ville: sequelize.fn('UPPER',req.body.ville) || profil.ville,
            posteactuel: sequelize.fn('lower',req.body.posteactuel) || profil.posteactuel,
            numtel: req.body.numtel || profil.numtel,
            renumeration: req.body.renumeration || profil.renumeration,
            codepostal:req.body.codepostal || profil.codepostal,
          })
          .then(() => res.redirect('/edit/'+req.params.id))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  DetailsPlayer(req, res) {
    return Profil
      .findByPk( req.params.id,
        {
        include: { model: Commentaire, as: 'comm' },
        
      })
      .then((options) => {
        if (!options) {
          return res.status(404).send({
            message: 'Profil Not Found',
          });
        } 
        var profil={};
        profil=options;
        let tabmot=(options.motcle).split(',');
        profil.tabmotcle=tabmot.map(s=> s.trim());
        res.render('detail-profil.ejs', {
            title: "Edit  Player"
            ,player: profil
            ,message : ''
        });
      })
      .catch((error) => res.status(400).send(error));
},
  

  delete(req, res) {
    return Profil
      .findByPk(req.params.id)

      .then(profil => {
        if (!profil) {
          return res.status(400).send({
            message: 'Profil Not Found',
          });
        }
        return profil
          
          .destroy()
          .then(() => res.redirect('/homee'))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  testrenum(req, res) {
    const Op=sequelize.Op;
    return Profil
    .findAll({
      where: {
          renumeration:{
            [Op.between]: [400, 450]
          } 
      }
     })
     .then((accounts) => {
      
      res.status(200).send(accounts);
  })
  .catch((error) => res.status(400).send(error));
},
    addRelation(req, res) {
      console.log('haaahhhhhhhhhhhhhhhhhhhhhhhhhhh'+req.body.vu + '/'+req.body.vuel+'/'+req.body.appeler+'/'+req.body.appel);
  return Profil
  .findByPk(req.body.idprofill) 
  .then(profil => {
    if (!profil) {
      return res.status(404).send({
        message: 'Profil Not Found',
      });
    }
    return profil
      .update({
      appeler: req.body.appeler,
      nbreappeler: req.body.appel,
      vu:req.body.vu,
      nbrevu:req.body.vuel,
      descfinal:req.body.desfinal
    })
    .then((Profil) => res.redirect('/detailss/'+Profil.id))
    .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
  },
  getHomePage(req, res){
    if (!req.session){
      res.redirect('/');
    }
    return Profil
      .findAll({
        order: [
          ['createdAt', 'DESC'],
      ]
      })
      .then((profil) => {
            res.render('index', {
                title: "Welcome to Socka | View Players"
                ,players: profil
            });
        })
      .catch((error) => res.status(400).send(error));
       
    },

    getHomeePage(req, res){
      if (! req.session ){
        res.redirect('/auth');
      }
      return Profil
        .findAll()
        .then((profil) => {
              res.render('accueil.ejs', {
                  title: "Welcome to Socka | View Players"
                  ,players: profil
              });
          })
        .catch((error) => res.status(400).send(error));
         
      },
    
    addPlayerPage(req, res) {
      res.render('add-player.ejs', {
          title: "Welcome to Socka | Add a new player"
          ,message: ''
      });
  },
  appelOffrePage(req, res) {
    res.render('appeloffre.ejs', {
        title: "Welcome to Socka | Add a new player"
        ,message: ''
        ,players:''
        ,taille :0
    });
},
    rechercheavancepage(req, res) {
      res.render('rechercheavance.ejs', {
        title: "Welcome to Socka | Add a new player"
        ,message: ''
        ,players: ''
    });
  },
  
  rechercheavance(req, res) {
    let firstname = req.body.first_name;
    let lastname = req.body.last_name;
    let position = req.body.position;
    let experience = req.body.number;
    let username = req.body.username;
    let civilite = req.body.civilite;
    let situation = req.body.situation;
    let adresse=req.body.adresse;
    let ville =req.body.ville;
    let posteactuel= req.body.posteactuel;
    let numtel = req.body.numtel;
    let renummin= req.body.renumerationmin;
    let renummax=req.body.renumerationmax;
    let email=req.body.email;
    let codepostal=req.body.codepostal;
    let nivetude=req.body.nivetude;
    let cdpostal=(req.body.cdpostal).toString();
    let tabcdpostal=cdpostal.split(',');
    tabcdpostal=tabcdpostal.map(s => s.trim());
    //let options= req.body.options;
    //console.log(position.toString());
    let tabcdpost=codepostal.toString();
    tabcdpost=tabcdpost.split(',');
    let tabsp=position.toString();
    tabsp=tabsp.split(',');
    tabcdpost=tabcdpost.map(s => s.trim());
    tabsp=tabsp.map(s => s.trim() );
    const Op= sequelize.Op;
    let villetab=ville.split(',');
    villetab=villetab.map(s => sequelize.fn('UPPER',s.trim()));
    console.log(tabcdpost);
    console.log(villetab);
    /* if(renumeration) {
      options.where.price = {$between: [500, 5000]}
    }*/
    var options = {where: {}};
     if(firstname) { options.where.firstname=sequelize.fn('lower', req.body.first_name);}
     if(lastname) { options.where.lastname = sequelize.fn('UPPER', req.body.last_name);}
     if(position) { options.where.position = tabsp}
     if(experience) { options.where.experience = experience;}
     if(username) { options.where.username = sequelize.fn('lower', req.body.username);}
     if(civilite) { options.where.civilite = civilite;}
     if(situation) { options.where.situation = situation;}
     if(cdpostal) { options.where.cdpostal = {
                                              [Op.in]:tabcdpostal
     }}
     if(codepostal) { options.where.codepostal = {
                                              [Op.in]:tabcdpost
                                              }}
     if(nivetude){ options.where.nivetude=nivetude;}
     if(email) { options.where.email = sequelize.fn('lower', req.body.email);}
     if(adresse) { options.where.adresse = sequelize.fn('lower', req.body.adresse);}
     if(ville) { options.where.ville = {
                                              [Op.in]:villetab}}
       
      //sequelize.fn('UPPER', req.body.ville);}
     if(posteactuel) { options.where.posteactuel = sequelize.fn('UPPER', req.body.posteactuel);}
     if(renummin && !renummax) { options.where.renumeration = {
                                                        [Op.gte]:renummin
                                                      }}
     if(renummax && !renummin) { options.where.renumeration ={
                                                        [Op.lte]:renummax
                                                              } }
     if(numtel) { options.where.numtel = numtel;}
     if(renummin && renummax) { options.where.renumeration = {
                                                        [Op.between]: [renummin,renummax]
                                                    }}
      
      

return Profil.findAll(options)
      .then((profil) => res.render('rechercheavance.ejs', {
        title: "Rechercher"
        ,players: profil
        ,message : ''
       })
    )
      .catch((error) => { res.status(400).send(error); });

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
         res.redirect('/homee');
       }) 
    .catch((error) => res.status(400).send(error));
},


  
};