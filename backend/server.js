const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// ✅ Connect Database
connectDB();

// ✅ Middleware
app.use(express.json());

// 🔥🔥 FINAL CORS FIX (SIMPLE & WORKING)
app.use(cors());

// ✅ Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// ✅ Protected Route
const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    msg: "You accessed protected route 🎉",
    user: req.user
  });
});

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API Running Successfully 🚀");
});

// ✅ PORT FIX (Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
