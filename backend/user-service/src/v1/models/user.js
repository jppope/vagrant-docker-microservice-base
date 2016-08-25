
// setup db connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_CONN);

// create a model schema
var Schema = mongoose.Schema;
var userSchema = new Schema({
  name : String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  group: { type: String, default: 'user' },
  created_at: Date,
  updated_at: Date,
  last_login: Date,
  login_attempts: Number
});

// Create the User Model
var User = mongoose.model('User', userSchema);

// make available to scope
module.exports = User;