var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var websocket = require('./config/socket.server');

var mongoose = require('mongoose');
var config = require('./config/env/auth');

//Initialize socket io connection
websocket.io(io);

mongoose.connect(config.dbUri);

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

server.listen(8000, function(err) {
  console.log('Server is setup. Listening on port 8000...')
});

module.exports = app;
