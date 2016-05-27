var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  name: String,
  email: String,
  pic: String,
  reportedCount: Number,
  phoneNumber: String,
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});


module.exports = mongoose.model('User', UserSchema);
