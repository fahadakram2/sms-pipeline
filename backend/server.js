require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");

const app = express();

// 🌍 Allow all IP addresses
app.use(cors({ origin: "*" }));

app.use(express.json());

// 🔌 MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => {
    console.error("MongoDB connection failed ❌", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;

// 🌍 Listen on all network interfaces (important for Docker)
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);