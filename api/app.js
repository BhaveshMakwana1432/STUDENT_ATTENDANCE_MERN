const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Initialize Express app
const app = express();

// Middleware

app.use(bodyParser.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
// Routes
const attendanceRoutes = require("./routes/attendanceRoute.js");
const userRoutes = require("./routes/userRoute.js");
const connectDB = require("./config/dbConfig.js");

connectDB();

app.use("/api/attendance", attendanceRoutes);
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
