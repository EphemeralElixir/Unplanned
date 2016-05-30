var passport = require('passport');
var websocket = require('./websocket');

var redirectToFbOAuth = function(req, res, next) {
  passport.authenticate('facebook', {scope: 'email'})(req, res, next);
};

var fbCallbackOAuth = function(req, res, next) {
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      return next(err);
    }

    //Store new user using their unique fbId on login success.
    websocket.activeUsers.facebookId = user;

    res.redirect('/success');
  })(req, res, next);
};

var sendUserDataToClient = function(req, res, next) {
  res.send(websocket.activeUsers);
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
