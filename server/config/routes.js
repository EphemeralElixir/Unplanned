var handler = require('./request-handlers');

module.exports = function (app, passport, express) {

  app.get('/', handler.initializeMain);

  app.get('/success', handler.sendUserDataToClient);

  app.get('/failure', handler.sendLoginError);

};
