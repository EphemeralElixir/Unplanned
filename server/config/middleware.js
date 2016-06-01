var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');

module.exports = function (app, express) {

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(session({ secret: 'ephemeralelixirshanetaileosepehr', saveUninitialized: true,
    resave: true, }));
  app.use(express.static(__dirname + '/../../client/public'));

};
