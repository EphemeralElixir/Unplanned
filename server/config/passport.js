var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../users');
var configAuth = require('./auth');

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


  passport.use(new FacebookStrategy({

    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    enableProof: configAuth.facebookAuth.enableProof

  },

  //Callback function -- facebook sending back token and profile info
  function(token, refreshToken, profile, done) {

    console.log('Here is the fresh profile --->', JSON.stringify(profile));

    process.nextTick(function() {
    //Lookup user in database based on facebook id
    User.findOne({'facebook.id': profile.id}, function(err, user) {

      if (err) {
        return done(err);
      }

      //Log in user if found
      if (user) {
      console.log('Here is the existing ==>', user);

        return done(null, user);
      } else {

        //Create a new user if not found
        var newUser = new User();

        newUser.name = profile.displayName;
        newUser.token = token;
        newUser.facebookId = profile.id;

        console.log('Here is the new facebook user stored in Mongo ======>', JSON.stringify(newUser));
        newUser.save(function(err) {
          if (err) {
            console.log("error ====>", err);
            // throw err;
          }
          console.log('Saving user to database... =>', newUser);
          return done(null, newUser);
        });
      }
    })
    })
  }));

};


