const express = require("express");
require("dotenv").config();
const UserRouter = require("./routes/auth");
const ProductRouter = require("./routes/products");
const OCRouter = require("./routes/ocr");
const connectDB = require("./config/connection");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 1000;
app.use(express.json());
connectDB();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Running");
});
app.use("/api/auth", UserRouter);
app.use("/api/products", ProductRouter);
app.use("/api/idcard", OCRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
