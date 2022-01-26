const express = require("express");
const Admin = require("../models/admin");
const auth = require("../middleware/auth");
const router = new express.Router();

//Create a new Admin
router.post("/admin", async (req, res) => {
  console.log(req.body);
  const admin = new Admin(req.body);
  console.log("got here");
  try {
    await admin.save();
    const token = await admin.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(`${e.message} from here`);
  }
});

router.post("/admin/login", async (req, res) => {
  console.log(req.body);
  try {
    const admin = await Admin.findByCredentials(
      req.body.email,
      req.body.password
    );
    //admin. is the particular instance of admin from above
    const token = await admin.generateAuthToken();
    res.send({ admin, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/admin/logoutAll", auth, async (req, res) => {
  try {
    req.admin.tokens = [];
    await req.admin.save();
    res.send("success!");
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/forgot", async (req, res, next) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(404).send("no user found");
    }
    const resetToken = admin.getResetPasswordToken();

    await admin.save();

    const resetUrl = `http://localhost:3000/passwordsreset/${resetToken}`;

    const message = `
     <h1>You have requested a password reset</h1>
     <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
