const express = require("express");
const router = express.Router();
const User = require("../models/User");

// SIGNUP
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  await User.create({ username, password });

  res.json({ message: "Signup successful" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful" });
});

module.exports = router;