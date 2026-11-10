// ======================================
// controllers/studentController.js
// ======================================

const studentModel = require("../models/studentModel");

// =============================
// Register Student
// =============================
exports.registerStudent = async (req, res) => {

    try {

        const result = await studentModel.registerStudent(req.body);

        res.status(201).json({
            success: true,
            message: "Student Registered Successfully",
            data: result
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Registration Failed",
            error: error.message
        });

    }

};

// =============================
// Get All Students
// =============================
exports.getAllStudents = async (req, res) => {

    try {

        const students = await studentModel.getAllStudents();

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to Fetch Students"
        });

    }

};

// =============================
// Get Student By ID
// =============================
exports.getStudentById = async (req, res) => {

    try {

        const student = await studentModel.getStudentById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error Fetching Student"
        });

    }

};

// =============================
// Update Student
// =============================
exports.updateStudent = async (req, res) => {

    try {

        const result = await studentModel.updateStudent(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Student Updated Successfully",
            data: result
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Update Failed"
        });

    }

};

// =============================
// Delete Student
// =============================
exports.deleteStudent = async (req, res) => {

    try {

        await studentModel.deleteStudent(req.params.id);

        res.status(200).json({
            success: true,
            message: "Student Deleted Successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Delete Failed"
        });

    }

};