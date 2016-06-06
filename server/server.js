const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const io = require('./config/socket');
const userHandlers = require('./users/userController');
const nodemailer = require('nodemailer');

app.set('port', process.env.PORT || 8000);
io.makeSocketServer(http);
mongoose.connect('mongodb://localhost/elixir');
require('./config/middleware.js')(app, express);

// This route used to flag users
// A get request to /flag?fbId=2342523070223
// will increment that users flagCount in the db.
app.get('/flag', userHandlers.flagUser);


function sendReportEmail(name, email, userId) {
  const transporter = nodemailer.createTransport('smtps://greenprojectfun@gmail.com:Fred1!1!@smtp.gmail.com');
  const mail = {
    from: '"Unplanned 👥" <no-reply@macla.local>', // sender address
    to: `${email}`, // list of receivers
    subject: 'Hello 😸', // Subject line
    html: `<p> Enjoy your unplanned meetup with ${name}! If you experience problems with this user please </p> <a href="http://192.241.203.99:8000/flag?fbId=${userId}">click here</a>`,
  };

  // send mail with defined transport object
  transporter.sendMail(mail, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
}

app.post('/flag', (req, res) => {
  userHandlers.getEmail(req.body.user1, (userObj) => {
    sendReportEmail(userObj.name, userObj.email, req.body.user2);
  });
  userHandlers.getEmail(req.body.user2, (userObj) => {
    sendReportEmail(userObj.email, req.body.user1);
  });

  res.end();
});

http.listen(app.get('port'), () => {
  console.log('Express server started in ' + app.get('env') + ' mode on port ' + app.get('port'));
});

module.exports = app;
