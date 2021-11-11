const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dateThirty = new Date();
dateThirty.setDate(dateThirty.getDate() + 30);

// Create Schema
const UserSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: true,
  },
  stripe_id: {
    type: String,
  },
  stripe_cc: {
    type: String,
  },
  rewards: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      validUntil: {
        type: Date,
        default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000),
      },
      dateUsed: Date,
      isReferrer: Boolean,
      title: String,
      description: String,
      rewardId: String,
      referredId: String,
      referrerId: String,
      status: String,
      metadata: {
        amount: Number,
      },
    },
  ],
});

module.exports = User = mongoose.model("users", UserSchema);
