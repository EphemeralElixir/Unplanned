var passport = require('passport');
var websocket = require('./websocket');

var redirectToFbOath = function(req, res, next) {
  console.log('Calling this function redirect');
  passport.authenticate('facebook', {scope: 'email'})(req, res, next);
};

var fbCallbackOath = function(req, res, next) {
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      return next(err);
    }

    //Store new user using their unique fbId on login success.
    websocket.activeUsers.facebookId = user;

    res.redirect('/success');
  })(req, res, next);
};

var sendUserDataToClient = function(req, res) {
  res.send(websocket.activeUsers);
};

var sendLoginError = function (req, res) {
  res.send('Login to facebook failed, please try again');
}

module.exports = {
  fbCallbackOath: fbCallbackOath,
  redirectToFbOath: redirectToFbOath,
  sendLoginError: sendLoginError,
  sendUserDataToClient: sendUserDataToClient
};
