var bodyParser = require('body-parser');
var morgan = require('morgan');

//Webpack hot loading
var webpackConfig = require('../../webpack.config.js');
var webpack = require('webpack');
var compiler = webpack(webpackConfig);
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

module.exports = function (app, express) {

  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
  app.use(webpackDevMiddleware(compiler));

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client/public'));

};
