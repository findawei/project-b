const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  role:{
    type: String,
    required: false
  },
  email:{
    type: String,
    unique: true
  },
  stripe_id: {
    type: String
  }
});

module.exports = User = mongoose.model("users", UserSchema);
