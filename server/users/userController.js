const User = require('./userModel');

const create = (userObj) => {
  const newUser = new User();
  newUser.name = userObj.name;
  newUser.userID = userObj.userID;
  newUser.image = userObj.image;
  newUser.bio = userObj.bio;
  newUser.email = userObj.email;
  newUser.phoneNumber = userObj.phoneNumber;
  newUser.flagCount = 0;
  newUser.save();
};

const updateBio = function updateBio(user) {
  User.findOneAndUpdate({ userID: user.userID },
    { bio: user.bio, phoneNumber: user.phoneNumber })
    .then(() => {
      // success
    })
    .catch((err) => {
      throw err;
    });
};

const getEmail = function getEmail(userId, callback) {
  User.findOne({ userID: userId })
    .then((res) => {
      callback(res);
    })
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

const flagUser = (req, res) => {
  const userID = req.query.fbId;
  User.findOne({ userID })
    .then((user) => {
      if (user) {
        const dbUser = user;
        dbUser.flagCount += 1;
        dbUser.save();
        res.send('User flag count has been incremented.');
      } else {
        res.send('User does not exist.');
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
  flagUser,
  getEmail,
};
