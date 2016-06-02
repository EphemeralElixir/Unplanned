const express = require('express');
const app = express();

const http = require('http').Server(app);

const mongoose = require('mongoose');
const config = require('./config/env/auth');

mongoose.connect(config.dbUri);

const io = require('./config/socket.server');
io.makeSocketServer(http);

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

http.listen(8000, () => {
  console.log('Server is setup. Listening on port 8000...');
});

module.exports = app;
