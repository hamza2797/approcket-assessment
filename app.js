const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressValidator = require('express-validator')
const cors = require('cors')

const mongoose = require('mongoose');

const options = {
   useNewUrlParser: true
}
mongoose.connect('mongodb://localhost/test', options, function (err) {
   if (err) throw err;
   console.log('Successfully connected');
});

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);
mongoose.plugin(schema => {
   schema.set('timestamps', true);
});
mongoose.plugin(require('mongoose-autopopulate'));

//var indexRouter = require('./src/routes/index');
//var usersRouter = require('./src/routes/users');

const passport = require('passport');
require('./src/security/passport')(passport);

var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator())
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./src/routes')(app, passport);

module.exports = app;
