var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var websocket = require('./config/websocket');

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/env/auth');

//Initialize socket io connection
websocket.io(io);
var config = require('../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var activeUsers = {};

mongoose.connect(config.dbUri);

app.use(passport.initialize());
app.use(passport.session());

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackDevMiddleware(compiler));

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, passport, express);
require('./config/passport.js')(passport);

server.listen(8000, function(err) {
  console.log('Server is setup. Listening on port 8000...')
});

module.exports = app;
