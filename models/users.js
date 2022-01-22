const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: {
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
