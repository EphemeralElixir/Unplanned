var handle = require('./request-handlers');

module.exports = function (app, passport, express) {

  app.get('/', handle.initializeMain);

  app.get('/login', handle.redirectToFbOAuth);

  app.get('/auth/facebook/callback', handle.fbCallbackOAuth);

  app.get('/success', handle.sendUserDataToClient);

  app.get('/failure', handle.sendLoginError);

};
