var passport = require('passport');
var websocket = require('./socket.server');

var redirectToFbOAuth = function(req, res, next) {
  passport.authenticate('facebook', {scope: 'email'})(req, res, next);
};

var fbCallbackOAuth = function(req, res, next) {
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      return next(err);    }

    //Store current user to send back individual data
    websocket.user.current = user;

    res.redirect('/');
  })(req, res, next);
};

var sendUserDataToClient = function(req, res, next) {
  //Sends own users data along with all connected users

  res.send('<h1>Good job it works</h1>');
};

var sendLoginError = function (req, res, next) {
  res.send('Login to facebook failed, please try again');
};

var initializeMain = function(req, res, next) {
  res.render('/index.html');
};

module.exports = {
  fbCallbackOAuth: fbCallbackOAuth,
  redirectToFbOAuth: redirectToFbOAuth,
  sendLoginError: sendLoginError,
  sendUserDataToClient: sendUserDataToClient,
  initializeMain: initializeMain
};
