const express = require("express");
const router = new express.Router();
const User = require("../models/users");

router.patch("/withdrawal/:id", async (req, res) => {
  try {
    const amount = req.body.cash;
    const _id = req.params.id;
    const curr = await User.findOne({ _id });

    if (curr.credit + curr.cash < amount) {
      throw new Error("Not enough credit");
    }
    const user = await User.findByIdAndUpdate(
      { _id },
      { $inc: { cash: -amount } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
