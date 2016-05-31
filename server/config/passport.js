var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../users');
var config = require('./env/auth');

var client = {
  clientID: config.facebookAuth.clientID,
  clientSecret: config.facebookAuth.clientSecret,
  callbackURL: config.facebookAuth.callbackURL,
  enableProof: config.facebookAuth.enableProof,
  profileFields: config.facebookAuth.profileFields
};

//Callback handler for Facebook Strategy
var loginOrCreate = function(req, token, refreshToken, profile, done) {
  console.log('Profile ==>', profile);
  console.log('Token ==>', token);
  console.log('Refresh Token ==>', refreshToken);
  process.nextTick(function() {

    //Lookup user in database based on facebook id
    User.findOne({'facebookId': profile.id}, function(err, user) {

      if (err) {
        return done(err);
      }

      //Log in user if found
      if (user) {
        return done(null, user);
      } else {

        //Create a new user if not found
        var newUser = new User();

        newUser.name = profile.displayName;
        newUser.token = token;
        newUser.facebookId = profile.id;

        newUser.save(function(err) {
          if (err) {
            throw err;
          }

          return done(null, newUser);
        });
      }
    });
  });
}

module.exports = function(passport) {

  //Serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  //Deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy(client, loginOrCreate));
};


