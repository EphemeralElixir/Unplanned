var express = require('express');
var mongoose = require('mongoose');

var app = express();

// connect to mongo database named "elixir"
mongoose.connect('mongodb://localhost/elixir');

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(8000);
console.log('listening on 8000')
module.exports = app;