const express = require("express");
require("dotenv").config();
const UserRouter = require("../backend/routes/auth");
const connectDB = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 1000;
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("Running");
});
app.use("/api/auth", UserRouter);
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
