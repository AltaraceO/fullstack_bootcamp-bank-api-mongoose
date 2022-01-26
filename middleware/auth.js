const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const auth = async (req, res, next) => {
  console.log(req);
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!admin) {
      throw new Error("nope");
    }
    req.token = token;
    req.admin = admin;

    next();
  } catch (e) {
    res.status(400).send({
      error: "Please authenticate",
    });
  }
};

module.exports = auth;
