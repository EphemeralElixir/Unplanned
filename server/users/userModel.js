const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userID: {
    type: String,
    unique: true,
  },
  name: String,
  image: String,
  phoneNumber: String,
  bio: String,
});

module.exports = mongoose.model('User', UserSchema);
