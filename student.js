// ======================================
// routes/student.js
// ======================================

const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

// ==============================
// Register Student
// ==============================
router.post("/register", studentController.registerStudent);

// ==============================
// Get All Students
// ==============================
router.get("/", studentController.getAllStudents);

// ==============================
// Get Student By ID
// ==============================
router.get("/:id", studentController.getStudentById);

// ==============================
// Update Student
// ==============================
router.put("/:id", studentController.updateStudent);

// ==============================
// Delete Student
// ==============================
router.delete("/:id", studentController.deleteStudent);

module.exports = router;