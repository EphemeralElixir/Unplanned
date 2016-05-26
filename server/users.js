var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true
  },
  pic: String,
  reportedCount: Number,
  phoneNumber: String
});


module.exports = mongoose.model('User', UserSchema);
