var handle = require('./request-handlers');

module.exports = function (app, passport, express) {
  var newUser = null;

  app.get('/login', handle.redirectToFbOath);

  app.get('/auth/facebook/callback', handle.fbCallbackOath);

  app.get('/success', handle.sendUserDataToClient);

  app.get('/failure', handle.sendLoginError);

};
