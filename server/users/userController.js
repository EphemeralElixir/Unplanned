const User = require('./userModel');

const create = (userObj) => {
  const newUser = new User();
  newUser.name = userObj.name;
  newUser.userID = userObj.userID;
  newUser.image = userObj.image;
  newUser.save();
};

const updateBio = function updateBio(user) {
  User.findOneAndUpdate({ userID: user.userID }, { user })
    .catch((err) => {
      throw err;
    });
};

const checkExisting = (userID, socket) => {
  User.findOne({ userID })
    .then((user) => {
      if (user) {
        socket.emit('is in db', true, user);
      } else {
        socket.emit('is in db', false);
      }
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  create,
  updateBio,
  checkExisting,
};
