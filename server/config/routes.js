module.exports = function (app, passport, express) {

  // app.get('/', function(req, res){
  //   res.redirect('..pubh/index.html');
  // });

  app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));


  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/success',
      failureRediect: '/login'
    }));

  app.get('/success', function(req, res) {
    res.send('Successfully logged in.');
  });

  app.get('/login', function(res, req) {
    res.send('Error logging in -- please try again.');
  })

};
