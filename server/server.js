const express = require('express');
const app = express();

const http = require('http').Server(app);

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/elixir');

const io = require('./config/socket.server');
io.makeSocketServer(http);

require('./config/middleware.js')(app, express);

http.listen(8000, () => {
  console.log('Server is setup. Listening on port 8000...');
});

module.exports = app;
