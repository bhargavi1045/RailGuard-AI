// models/Alert.js
const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },      // image uploaded by authority
  confidence: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  message: { type: String, default: "Defective Track Detected!" },
});

module.exports = mongoose.model("Alert", alertSchema);
