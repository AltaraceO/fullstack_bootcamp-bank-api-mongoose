const express = require("express");
require("./mongo/mongoose");
const cors = require("cors");
const path = require("path");
const userRouter = require("./routers/users");
const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter);

const publicPath = path.join(__dirname, "client/bulid");
app.use(express.static(publicPath));

app.get("/api", (req, res) => {
  res.send("It's working!");
});

app.get("/next", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
