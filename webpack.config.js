const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, ''),
  devtool: debug ? 'inline-sourcemap' : null,
  entry: ['webpack-hot-middleware/client', './client/webpackEntry.js'],
  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     loader: 'eslint',
    //     exclude: /(node_modules|bower_components)/,
    //   },
    // ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
  output: {
    path: `${__dirname}/client/public`,
    filename: 'webpack.min.js',
  },
  eslint: {
    failOnWarning: false,
    failOnError: true,
  },
  plugins: debug ? [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
