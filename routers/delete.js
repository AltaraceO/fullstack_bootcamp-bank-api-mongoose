const express = require("express");
const router = new express.Router();
const User = require("../models/users");

router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
