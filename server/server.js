var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/env/auth')

var activeUsers = {};

// connect to mongo database named "elixir"
mongoose.connect('mongodb://localhost/elixir');

app.use(passport.initialize());
app.use(passport.session());

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, passport, express);
require('./config/passport.js')(passport, io);

io.on('connection', function(socket) {

  socket.on('sample event listener', function() {}); //sample, etc...
  socket.on('LoginSignUpSuccess', function(user) {
    activeUsers[user.facebookId] = {
      name: user.name,
      lat: '',
      long: '',
      picUrl: '',
      bio: ''
    }
    socket.broadcast.emit('addUser', activeUsers);
  });
});

server.listen(8000);
console.log('listening on 8000');

module.exports = app;
