var loginOrCreate = function(UserModel, userObj) {

  UserModel.findOne({'userID': userObj.userID}, function(err, user) {

    if (err) {
      throw err;
    }

    //Log in user if found
    if (user) {
      console.log('User exists inside DB');
    } else {

      //Create a new user if not found
      var newUser = new UserModel();

      newUser.name = userObj.name;
      newUser.userID = userObj.userID;
      newUser.image = userObj.image;
      newUser.save();
    }

  });
}

module.exports = {
  loginOrCreate: loginOrCreate
};
