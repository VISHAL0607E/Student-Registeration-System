require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const studentRoutes = require("./routes/student");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// =========================
// Middleware
// =========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// Static Folder
// =========================
app.use(express.static(path.join(__dirname, "public")));

// =========================
// API Routes
// =========================
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);

// =========================
// Home Route
// =========================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "registration.html"));
});

// =========================
// Health Check
// =========================
app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Student Registration System Running Successfully"
    });
});

// =========================
// 404 Handler
// =========================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// =========================
// Global Error Handler
// =========================
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

// =========================
// Server Start
// =========================
app.listen(PORT, () => {
    console.log("======================================");
    console.log(" Student Registration System Started");
    console.log("======================================");
    console.log(` Server : http://localhost:${PORT}`);
    console.log("======================================");
});