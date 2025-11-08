const express = require("express");
const router = express.Router();
const Alert = require("../models/Alert");
const protect = require("../middleware/auth");

// POST alert from Railway Authority
router.post("/", async (req, res) => {
  try {
    const serverSecret = req.headers["x-server-secret"];
    const FLASK_SECRET = process.env.FLASK_SECRET || "supersecretkey";

    // Allow Flask server if secret matches
    if (serverSecret === FLASK_SECRET) {
      const { imageUrl, confidence } = req.body;
      const alert = await Alert.create({ imageUrl, confidence });
      return res.status(201).json({ success: true, alert });
    }

    // Otherwise, regular auth
    protect(["Railway Authority"])(req, res, async () => {
      const { imageUrl, confidence } = req.body;
      const alert = await Alert.create({ imageUrl, confidence });
      res.status(201).json({ success: true, alert });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET alerts for Train Drivers
router.get("/", protect(["Train Driver", "Railway Authority"]), async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json({ success: true, alerts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
