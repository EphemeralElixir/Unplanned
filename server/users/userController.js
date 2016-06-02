var User = require('./userModel');

var loginOrCreate = function(userObj) {

  User.findOne({'userID': userObj.userID}, function(err, user) {

    if (err) {
      throw err;
    }

    //Log in user if found
    if (user) {
      console.log('User exists inside DB');
    } else {

      //Create a new user if not found
      var newUser = new User();

      newUser.name = userObj.name;
      newUser.userID = userObj.userID;
      newUser.image = userObj.image;
      newUser.save();
    }

  });
};

var updateBio = function(userID, bio) {
  User.findOne({'userID': userID}, function(err, user) {
    if (err) {
      throw err;
    }

    if (user) {
      user.bio = bio;
      user.save();
    }
  });
};

module.exports = {
  loginOrCreate: loginOrCreate,
  updateBio: updateBio
};
