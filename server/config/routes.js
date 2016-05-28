module.exports = function (app, passport, express) {
  var newUser = null;
  // app.get('/', function(req, res){
  //   res.redirect('..pubh/index.html');
  // });

  app.get('/login', passport.authenticate('facebook', {scope: 'email'}));


  app.get('/auth/facebook/callback', function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
      if (err) {return next (err); }
      newUser = user;

      res.redirect('/success');
    })(req, res, next);

  });

  app.get('/success', function(req, res) {

    res.send(newUser);
  });

  app.get('/failure', function(res, req) {
    res.send('Error logging in -- please try again.');
  })

};
