const express = require("express");
const router = new express.Router();
const User = require("../models/users");

router.patch("/transfer/:idOne/:idTwo", async (req, res) => {
  try {
    const amount = req.body.cash;
    const first = await User.findOne({ _id: req.params.idOne });

    if (first.credit + first.cash < amount) {
      throw new Error("Not enough credit");
    }

    const from = await User.findByIdAndUpdate(
      { _id: req.params.idOne },
      { $inc: { cash: -amount } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!from) {
      return res.status(404).send();
    }

    const to = await User.findByIdAndUpdate(
      { _id: req.params.idTwo },
      { $inc: { cash: amount } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!to) {
      return res.status(404).send();
    }
    res.send({ from: from, to: to });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
