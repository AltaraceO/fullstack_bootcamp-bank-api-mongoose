const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: {
    required: true,
    type: String,
    minLength: 2,
    trim: true,
    unique: true,
  },
  current: {
    type: Boolean,
    default: false,
  },
  cash: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
  },
});

module.exports = User;
