var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var websocket = require('./config/socket.server');

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/env/auth');

//hot loading
var webpackConfig = require('../webpack.config.js');
var webpack = require('webpack');
var compiler = webpack(webpackConfig);
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

//Initialize socket io connection
websocket.io(io);

mongoose.connect(config.dbUri);

app.use(passport.initialize());
app.use(passport.session());

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
app.use(webpackDevMiddleware(compiler));

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, passport, express);
require('./config/passport.js')(passport);



server.listen(8000, function(err) {
  console.log('Server is setup. Listening on port 8000...')
});

module.exports = app;
