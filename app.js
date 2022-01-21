const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const port = process.env.PORT || 5000;

const publicPath = path.join(__dirname, "client/bulid");
app.use(cors());
app.use(express.static(publicPath));

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
