const mongoose = require("mongoose");

const User = mongoose.model("User", {
  description: {
    required: true,
    type: String,
    trim: true,
  },
  current: {
    type: Boolean,
    default: false,
  },
});

module.exports = User;
