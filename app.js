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


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var callback = passport.authenticate('node-sequelize', { failureRedirect: '/error' });  

var successLoginRedirect = function (req, res) {
  User.findById(req.user._id);

  var redirectionUrl = req.session.redirectUrl || '/auth';
  res.redirect(redirectionUrl);
};  

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');*/

app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine

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
	saveUninitialized: true
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