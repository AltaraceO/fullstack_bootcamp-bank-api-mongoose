const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
//npm i bcryptjs
const bcrypt = require("bcryptjs");
//npm i jsonwebtoken
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email invalid");
      }
    },
  },
  password: {
    required: true,
    type: String,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('cannot include "password"');
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  resetPasswordToken: String,
});

//regular function because it is called with a this keyword for the specific instance of a user
adminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = jwt.sign({ _id: admin._id.toString() }, process.env.JWT_SECRET);
  admin.tokens = admin.tokens.concat({ token });
  await admin.save();

  return token;
};

//methods for a particular instance of user.
//res.send automatically JSON.stringify-ies whatever is sent(user). then toJSON manipulates what we want to send
adminSchema.methods.toJSON = function () {
  const admin = this;
  const adminObject = admin.toObject();

  delete adminObject.password;
  delete adminObject.tokens;

  return adminObject;
};
//statics on the UPPERCASE User.find...
adminSchema.statics.findByCredentials = async (email, password) => {
  const admin = await Admin.findOne({ email: email });
  if (!admin) {
    throw new Error("Unable to login ");
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return admin;
};

//*set a new token for forgotten password
adminSchema.method.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  return resetToken;
};

//* Hash the plain text password before saving
adminSchema.pre("save", async function (next) {
  const admin = this;

  //*if the password received is modified - hash it again
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }

  next();
});

//* Delete user task when user deleted
//*pre middleware comes with mongooose and runs something before "remove" or "save"
adminSchema.pre("remove", async function (next) {
  const admin = this;
  await Task.deleteMany({ owner: admin._id });
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
