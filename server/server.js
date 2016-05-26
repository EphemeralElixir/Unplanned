var express = require('express');
var app = express();
var mongoose = require('mongoose');

var morgan = require('morgan');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');

// connect to mongo database named "elixir"
mongoose.connect('mongodb://localhost/elixir');


//Express Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/public'));


app.use(morgan('dev'));
app.use(session({secret: 'elixir'}));
app.use(passport.initialize());
app.use(passport.session());


// configure our server with all the middleware and routing
// require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, passport, express);
require('./config/passport.js')(passport);

app.listen(8000);
console.log('listening on 8000')
module.exports = app;
