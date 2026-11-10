
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const studentRoutes = require("./routes/student");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "registration.html"));
});

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Student Registration System Running Successfully"
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

app.listen(PORT, () => {
    console.log(`Student Registration System running on port ${PORT}`);
});
