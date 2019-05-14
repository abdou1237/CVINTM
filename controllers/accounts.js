const Accounts = require('../models').accounts;
var passwordHash= require('password-hash');
var fs=require('fs');
var PDFParser=require('pdf2json');
//var path = osHomedir();
//var homepath = path.replace(new RegExp('\\' + path.sep, 'g'), '/');
//var pdfFilePath = homepath + '/Downloads/ProjetWord/' + 'CVHATIMYAbdellah.pdf';



module.exports = {
  list(req, res) {
    return Accounts
      .findAll(
       )
      .then((accounts) => res.status(200).send(accounts))
      .catch((error) => { res.status(400).send(error); });
  },

  pdffile(req,re){

    if (fs.existsSync(pdfFilePath)) {
      //Read the content of the pdf from the downloaded path
      var pdfParser = new PDFParser(browser, 1);
      pdfParser.on("pdfParser_dataError", function (errData) {
         console.error(errData.parserError)
      });
      pdfParser.on("pdfParser_dataReady", function (pdfData) {
      //console.log('here is the content: '+pdfParser.getRawTextContent());
      browser.assert.ok(pdfParser.getRawTextContent().indexOf(textToVerify) > -1);
      });
    
      pdfParser.loadPDF(pdfFilePath);
    } else {
        console.log('OOPs file not present in the downloaded folder');
        //Throw an error if the file is not found in the path mentioned
        browser.assert.ok(fs.existsSync(pdfFilePath));
    }
  },

  getById(req, res) {
    return Accounts
    .findByPk(req.params.id)
    .then((accounts) => {
      if (!accounts) {
        return res.status(404).send({
          message: 'Account Not Found',
        });
      }
      return res.status(200).send(accounts);
    })
    .catch((error) => res.status(400).send(error));
},

  add(req, res) {
    var hashedPassword = passwordHash.generate(req.body.password);
    return Accounts
      .create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        isAdmin: true,
      })
      .then((accounts) => res.redirect('/'))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Accounts
      .findByPk(req.params.id) 
      .then(accounts => {
        if (!accounts) {
          return res.status(404).send({
            message: 'Account Not Found',
          });
        }
        return accounts
          .update({
            username: req.body.username || accounts.username,
            password: req.body.password || accounts.password,
            email: req.body.email || accounts.email,
          })
          .then(() => res.status(200).send(accounts))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Accounts
      .findByPk(req.params.id)
      .then(accounts => {
        if (!accounts) {
          return res.status(400).send({
            message: 'Account Not Found',
          });
        }
        return accounts
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  authUser(req, res) {
      return Accounts
      .findAll({
        where: {
            email: req.body.username,
            
        }
       })
       .then((accounts) => {
          if (!accounts) {
        res.redirect('/');
           }else{
           var result=passwordHash.verify(req.body.password, accounts[0].password) 
            // console.log(result+ " "+ req.body.password+ " "+ accounts[0].password);
            if (result == true) {
    
              req.session.user = accounts;
              req.session.user.logged=true
              console.log("gggggggggggggggggggggggggggggggggggggggggg"+req.session.user[0].username);
              //res.status(200).send("GOOD");
             res.redirect('/homee');
    
            } else {
    
             //res.send('Incorrect password');
             res.render('login_1.ejs');
            }
        } 
      
    })
    .catch((error) => res.status(400).send(error));
  },

  Dashboard (req, res){
    if(!req.session.user){
      res.status(401).send("BIG PRO BRO");
    }else{
      res.status(200).send(req.session.user[0].username);
    }
  },

  addPage (req, res){
    res.render('adduser.ejs', {
        title: "Welcome to Socka | Add a new player"
        ,message: ''
    });
},

proposPage (req, res){
  res.render('about.ejs', {
      title: "Welcome to Socka | Add a new player"
      ,message: ''
  });
},

contactPage (req, res){
  res.render('contact.ejs', {
      title: "Welcome to Socka | Add a new player"
      ,message: ''
  });
},
  
  deconnexion(req, res) {
    req.session.destroy(function(err) {
      // cannot access session here
      res.redirect('/');
    })
  },
};