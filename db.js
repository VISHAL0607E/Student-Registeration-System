// ======================================
// database/db.js
// MySQL Database Connection
// ======================================

const mysql = require("mysql2");

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Niu-23-5743", // <-- यहाँ अपना MySQL password लिखना
    database: "student_registration"
});

// Connect Database
db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Connection Failed");
        console.error(err.message);
        process.exit(1);
    }

    console.log("✅ MySQL Database Connected Successfully");
});

module.exports = db;