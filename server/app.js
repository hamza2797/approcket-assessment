const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressValidator = require('express-validator')
const cors = require('cors')
const mongoose = require('mongoose');
const session = require('express-session');

const io = require('socket.io')();


const port = 8000;
io.listen(port);
console.log('socket listening on port ', port);


const options = {
   useNewUrlParser: true
}
mongoose.connect('mongodb://localhost/test', options, function (err) {
   if (err) throw err;
   console.log('DB Successfully connected');
});

mongoose.set('useCreateIndex', true);
mongoose.plugin(schema => {
   schema.set('timestamps', true);
});
mongoose.plugin(require('mongoose-autopopulate'));



const passport = require('passport');
require('./src/security/passport')(passport);

var app = express();

app.use(function(req,res, next){
	req.io = io;
	next();
});


app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator())


app.use(session({
   secret: 'abcdefg',
   resave: true,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./src/routes')(app, passport);

module.exports = app;
