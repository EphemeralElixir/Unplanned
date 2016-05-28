var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  name: String,
  // email: String, // May not need email at all...
  pic: String,
  reportedCount: Number,
  phoneNumber: String,
  token: String,
  facebookId: String

});

module.exports = mongoose.model('User', UserSchema);
