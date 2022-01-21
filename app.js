const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

const publicPath = path.join(__dirname, "client/bulid");
app.use(express.static(publicPath));

app.get("/api", (req, res) => {
  res.send("working girl!");
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
