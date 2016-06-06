const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userID: {
    type: String,
    unique: true,
  },
  name: String,
  image: String,
  email: String,
  phoneNumber: String,
  bio: String,
  flagCount: Number,
});

module.exports = mongoose.model('User', UserSchema);
