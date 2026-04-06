const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// 🔥 FINAL CORS FIX
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // VERY IMPORTANT

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Protected route
const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    msg: "You accessed protected route 🎉",
    user: req.user
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("API Running Successfully 🚀");
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
