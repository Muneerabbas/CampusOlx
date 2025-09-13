const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Product = require("../models/products");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + safeName);
  },
});
const uploadStorage = multer({ storage: storage });

router.post("/upload", uploadStorage.single("file"), async (req, res) => {
  try {
    const { name, price, description, createdBy } = req.body;

    const imagePaths = `/uploads/${req.file.filename}`;

    const product = new Product({
      name,
      price,
      description,
      images: imagePaths,
      createdBy,
    });
    await product.save();
    console.log(product);
    res.status(201).json({ msg: "Product Uploaded successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/get", async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(201).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById({ _id: id }).populate(
      "createdBy",
      "name email"
    );

    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/getUserproducts/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const products = await Product.find({ createdBy: userId });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No Ads found" });
    }

    res.status(201).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
