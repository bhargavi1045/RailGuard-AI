const express = require("express");
const router = express.Router();
const User = require("../models/User");
const protect = require("../middleware/auth"); // your existing JWT middleware

// GET /api/driver/profile
router.get("/profile", protect(["Train Driver"]), async (req, res) => {
  try {
    const driver = await User.findById(req.user.id);
    if (!driver) return res.status(404).json({ success: false, message: "Driver not found" });

    res.json({
      success: true,
      driver: { name: driver.name, email: driver.email, role: driver.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
