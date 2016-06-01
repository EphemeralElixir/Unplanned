var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  name: String,
  image: String,
  phoneNumber: String,
  token: String,
  userID: {
    type: String,
    unique: true
  },
  bio: String
});

module.exports = mongoose.model('User', UserSchema);


