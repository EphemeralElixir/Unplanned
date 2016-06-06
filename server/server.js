const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const io = require('./config/socket');
const userHandlers = require('./users/userController');

app.set('port', process.env.PORT || 8000);
io.makeSocketServer(http);
mongoose.connect('mongodb://localhost/elixir');
require('./config/middleware.js')(app, express);

// This route used to flag users
// A get request to /flag?fbId=2342523070223
// will increment that users flagCount in the db.
app.get('/flag', userHandlers.flagUser);

http.listen(app.get('port'), () => {
  console.log('Express server started in ' + app.get('env') + ' mode on port ' + app.get('port'));
});

module.exports = app;
