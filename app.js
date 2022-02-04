// Env should be at the top of the server side file
require("dotenv").config({ path: "./config.env" });
const express = require("express");
require("./mongo/mongoose");
const cors = require("cors");
const path = require("path");

const userRouter = require("./routers/users");
const singleUser = require("./routers/user");
const depositRouter = require("./routers/deposit");
const withdrawalRouter = require("./routers/withdrawal");
const transferRouter = require("./routers/transfer");
const deleteRouter = require("./routers/delete");
const adminRouter = require("./routers/admin");

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(singleUser);
app.use(depositRouter);
app.use(withdrawalRouter);
app.use(transferRouter);
app.use(deleteRouter);
app.use(adminRouter);

const publicPath = path.join(__dirname, "client/build");

console.log(publicPath, "HERE");
app.use(express.static(publicPath));

app.get("/api", (req, res) => {
  res.send("It's working!");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is serving on port ${PORT}`);
});
