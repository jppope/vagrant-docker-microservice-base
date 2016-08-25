
// setup db connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_CONN);

// create a model schema
var Schema = mongoose.Schema;
var modelSchema = new Schema({
  afield : String,
  another : String,
  created_at: Date,
  updated_at: Date
});

// create the Model
var Model = mongoose.model('Model', modelSchema);

// make available to scope
module.exports = Model;