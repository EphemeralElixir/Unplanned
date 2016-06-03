const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const io = require('./config/socket');

app.set('port', process.env.PORT || 8000);
io.makeSocketServer(http);
mongoose.connect('mongodb://localhost/elixir');
require('./config/middleware.js')(app, express);

http.listen(app.get('port'), () => {
  console.log('Express server started in ' + app.get('env') + ' mode on port ' + app.get('port'));
});

module.exports = app;
