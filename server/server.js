import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import dashboardRoutes from "./routes/dashboardRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/reminders", reminderRoutes);

app.use("/uploads", express.static("uploads"));

// Test Route
app.get("/", (req, res) => {
  res.send("Library Management System Backend Running...");
});

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on Port ${PORT}`);
});