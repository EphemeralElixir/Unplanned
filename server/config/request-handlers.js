var websocket = require('./socket.server');

var sendUserDataToClient = function(req, res, next) {
  res.send('<h1>Good job it works</h1>');
};

var sendLoginError = function (req, res, next) {
  res.send('Login to facebook failed, please try again');
};

var initializeMain = function(req, res, next) {
  res.render('/index.html');
};

module.exports = {
  sendLoginError: sendLoginError,
  sendUserDataToClient: sendUserDataToClient,
  initializeMain: initializeMain
};
