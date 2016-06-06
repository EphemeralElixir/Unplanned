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

app.post('/email', (req, res) => {
  console.log(req.body);
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport('smtps://greenprojectfun@gmail.com:Fred1!1!@smtp.gmail.com');

  const email1 = 'leoadelstein@gmail.com';
  const email2 = 'adelstein96@gmail.com';
  // setup e-mail data with unicode symbols
  const mail1 = {
    from: '"Unplanned 👥" <no-reply@macla.local>', // sender address
    to: `${email1}`, // list of receivers
    subject: 'Hello ✔', // Subject line
    html: '<p> Enjoy your unplanned meetup! If you experience problems with this user please </p> <a href="http://macla.local:8000/email">click here</a>', // html body
  };
  const mail2 = {
    from: '"Unplanned 👥" <no-reply@macla.local>', // sender address
    to: `${email2}`, // list of receivers
    subject: 'Hello ✔', // Subject line
    html: '<p> Enjoy your unplanned meetup! If you experience problems with this user please </p> <a href="http://macla.local:8000/email">click here</a>', // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mail1, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
  transporter.sendMail(mail2, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });

  res.end();
});
>>>>>>> started email feature

http.listen(app.get('port'), () => {
  console.log('Express server started in ' + app.get('env') + ' mode on port ' + app.get('port'));
});

module.exports = app;
