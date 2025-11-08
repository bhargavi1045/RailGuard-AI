const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const driverRoutes = require("./routes/driver");
const alertRoutes = require("./routes/alerts");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/alerts", alertRoutes);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT || 5000, () => console.log("Server running"));
