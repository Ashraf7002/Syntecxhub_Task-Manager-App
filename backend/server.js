const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// ✅ Import auth middleware
const authMiddleware = require("./middleware/authMiddleware");

// ✅ Protected test route (ADD HERE)
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ msg: "You accessed protected route 🎉", user: req.user });
});

// Test route
app.get("/", (req, res) => {
  res.send("API Running Successfully 🚀");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});