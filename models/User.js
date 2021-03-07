const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  points:{
    type: Number,
    required: false
  },
  role:{
    type: String,
    required: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);
