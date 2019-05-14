var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const bodyParser = require('body-parser');
const moment = require('moment');
const ejs = require('ejs');
const passport= require('passport');
const flash= require('flash');
var passwordHash= require('password-hash');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const dotenv=require('dotenv');
const schedule = require('node-schedule');
var gulp = require('gulp');
var sonarqubeScanner = require('sonarqube-scanner');
var morgan = require('morgan');

dotenv.config();
const Profil = require('./models').profil;
const Email = require('./models').email;

//CONFIGURATION DE UIPATH
/*var util = require('util');
var Orchestrator = require('uipath-orchestrator');
var orchestrator = new Orchestrator({
     tenancyName: 'test',           // The Orchestrator Tenancy
     usernameOrEmailAddress: 'xxx',// The Orchestrator login
     password: 'yyy',               // The Orchestrator password
     hostname: 'host.company.com', // The instance hostname
     isSecure: true,                // optional (defaults to true)
     port: 443, // optional (defaults to 80 or 443 based on isSecure)
     invalidCertificate: false, // optional (defaults to false)
     connectionPool: 5 // options, 0=unlimited (defaults to 1)
});
var apiPath = '/odata/Users';
var apiQuery = {};
orchestrator.get(apiPath, apiQuery, function (err, data) {
    if (err) {
        console.error('Error: ' + err);
    }
    console.log('Data: ' + util.inspect(data));
});
*/
//CONFIGURATION DE SONARQUBE
gulp.task('default', function(callback) {
  sonarqubeScanner({
    serverUrl : "localhost:9000",
    token : "0d9170784cb59e155fff0cad0b676163901c0af7",
    options : {
      "sonar.organization": "my-org"
    }
  }, callback);
});

//CONFIGURATION PARTIE EMAIL DANS UNE DATE X
var date = new Date(2019, 4, 12, 12, 58, 0);
 
var j = schedule.scheduleJob(date, function(){
  var today = new Date();
  console.log(today);
   var dd = String(today.getDate()+2).padStart(2, '0');
   var mm = String(today.getMonth()+1).padStart(2, '0'); //January is 0!
   var yyyy = today.getFullYear();

today =yyyy + '-' + mm + '-' + dd;
  console.log(today);
    return Email
      .findAll({
        where: {
            Datee: today
        }
       })
      .then((email) =>{
        
          console.log(email.length);
          var i=0;
          while(i!=email.length){
            process.env.NODE_TLS_REJECT_UNAUTHORIZED
            console.log(process.env.NODE_TLS_REJECT_UNAUTHORIZED);
            
            var AppConfig = {
              'sendEmailID': 'abdouhatty1@gmail.com',
              'sendEmailFromName': 'abdouhatty1@gmail.com',
              'sendEmailPassword': 'velomoteur'
              }
              var transporter = nodemailer.createTransport({
                service: 'Gmail',
                host: 'smtp.gmail.com',
                port: '587',
                auth: {
                    user: "abdellah.hatimy@gmail.com",
                    pass: "Velomoteur1!"
                },
                secureConnection: 'false',
                tls: {
                    ciphers: 'SSLv3'
                },
                
            });
            
            // setup e-mail data with unicode symbols 
            var mailOptions = {
                from: AppConfig.sendEmailFromName, // sender address 
                to: email[i].to, // list of receivers 
                subject: email[i].subject, // Subject line 
                html: email[i].body+"<br/> Le nom et Prénom de la personne:"+email[i].nom+ ' '+ email[i].prenom // html body 
            };
            
            // send mail with defined transport object 
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return console.log("ERROR----" + error);
                }
                console.log('Message sent: ' + info.response);
            });
            i++;
          }
        
        console.log(email);
         

      })
      
  
});

dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
/*var callback = passport.authenticate('node-sequelize', { failureRedirect: '/error' });  

var successLoginRedirect = function (req, res) {
  User.findById(req.user._id);

  var redirectionUrl = req.session.redirectUrl || '/auth';
  res.redirect(redirectionUrl);
};*/  

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');*/

app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.set('trust proxy',1);
app.use(morgan('dev'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

app.use(session({
	secret: 'aq8754hbjde45654de',
	resave: false,
  saveUninitialized: true,
}));
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});
app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', indexRouter);
app.use('/users', usersRouter);

//require('app/routes/index.js')(app, passport); // load our routes and pass in our app and fully configured passport

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/

app.post('/send-email', function (req, res) {
  console.log("1");
      return Email
      .create({
        subject:req.body.subject,
        to:req.body.to,
        body:req.body.body,
        Date:'test',
        heure:'test',
        envoie:'0',
        nom:req.body.lastnme,
        prenom:req.body.firstnme,
        numtel: req.body.numtel,
        Datee:req.body.datee
      }).then(()=>{
        console.log("2");
        process.env.NODE_TLS_REJECT_UNAUTHORIZED
  console.log(process.env.NODE_TLS_REJECT_UNAUTHORIZED);
  
  var AppConfig = {
    'sendEmailID': 'abdouhatty1@gmail.com',
    'sendEmailFromName': 'abdouhatty1@gmail.com',
    'sendEmailPassword': 'velomoteur'
    }
    res.redirect('detailss/'+ req.body.playerid);
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: '587',
      auth: {
          user: "abdellah.hatimy@gmail.com",
          pass: "Velomoteur1!"
      },
      secureConnection: 'false',
      tls: {
          ciphers: 'SSLv3'
      },
      
  });
  
  // setup e-mail data with unicode symbols 
  var mailOptions = {
      from: AppConfig.sendEmailFromName, // sender address 
      to: req.body.to, // list of receivers 
      subject: req.body.subject, // Subject line 
      html: req.body.body // html body 
  };
  
  // send mail with defined transport object 
  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          return console.log("ERROR----" + error);
      }
      console.log('Message sent: ' + info.response);
  });
    }).catch((error) => res.status(400).send(error));
  //console.log("HELLLO");
  
    
  });


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
const port = 2000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});