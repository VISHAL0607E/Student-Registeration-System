// ======================================
// models/studentModel.js
// ======================================

const db = require("../database/db");

// Register Student
exports.registerStudent = (student) => {

    return new Promise((resolve, reject) => {

        const sql = `
        INSERT INTO students
        (
            firstName,
            lastName,
            fatherName,
            dob,
            mobile,
            email,
            password,
            gender,
            department,
            semester,
            roll,
            address
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
        `;

        db.query(
            sql,
            [
                student.firstName,
                student.lastName,
                student.fatherName,
                student.dob,
                student.mobile,
                student.email,
                student.password,
                student.gender,
                student.department,
                student.semester,
                student.roll,
                student.address
            ],
            (err, result) => {

                if (err) {
                    return reject(err);
                }

                resolve(result);

            }
        );

    });

};

// Get All Students
exports.getAllStudents = () => {

    return new Promise((resolve, reject) => {

        db.query(
            "SELECT * FROM students ORDER BY id DESC",
            (err, result) => {

                if (err) return reject(err);

                resolve(result);

            }
        );

    });

};

// Get Student By ID
exports.getStudentById = (id) => {

    return new Promise((resolve, reject) => {

        db.query(
            "SELECT * FROM students WHERE id = ?",
            [id],
            (err, result) => {

                if (err) return reject(err);

                resolve(result[0]);

            }
        );

    });

};

// Update Student
exports.updateStudent = (id, student) => {

    return new Promise((resolve, reject) => {

        const sql = `
        UPDATE students SET
            firstName=?,
            lastName=?,
            fatherName=?,
            dob=?,
            mobile=?,
            email=?,
            gender=?,
            department=?,
            semester=?,
            roll=?,
            address=?
        WHERE id=?
        `;

        db.query(
            sql,
            [
                student.firstName,
                student.lastName,
                student.fatherName,
                student.dob,
                student.mobile,
                student.email,
                student.gender,
                student.department,
                student.semester,
                student.roll,
                student.address,
                id
            ],
            (err, result) => {

                if (err) return reject(err);

                resolve(result);

            }
        );

    });

};

// Delete Student
exports.deleteStudent = (id) => {

    return new Promise((resolve, reject) => {

        db.query(
            "DELETE FROM students WHERE id = ?",
            [id],
            (err, result) => {

                if (err) return reject(err);

                resolve(result);

            }
        );

    });

};