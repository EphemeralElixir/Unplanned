var User = require('./userModel');

var create = function(userObj) {
  var newUser = new User();
  newUser.name = userObj.name;
  newUser.userID = userObj.userID;
  newUser.image = userObj.image;
  newUser.save();
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

var checkExisting = function(userID, socket) {
  User.findOne({'userID': userID}, function(err, user) {
    if (err) {
      throw err;
    }

    if (user) {
      socket.emit('is in db', true, user);
    } else {
      socket.emit('is in db', false);
    }
  });
};

module.exports = {
  create: create,
  updateBio: updateBio,
  checkExisting: checkExisting
};
