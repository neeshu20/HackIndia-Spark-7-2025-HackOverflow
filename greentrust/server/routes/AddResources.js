// routes/AddResources.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const verifyToken = require('../middleware/VerifyToken');

router.post("/add-source", verifyToken,async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // Extract user ID from the token

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Proceed to add the renewable source
    const { location, capacity, output } = req.body;
    user.renewableSources.push({ location, capacity, output });
    await user.save();

    res.json({ message: "Source added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
