var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  name: String,
  pic: String,
  reportedCount: Number,
  phoneNumber: String,
  token: String,
  facebookId: String
});

module.exports = mongoose.model('User', UserSchema);
