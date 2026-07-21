// ======================================
// Student Registration System
// public/script.js
// ======================================

const form = document.getElementById("studentForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const studentData = {

        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        fatherName: document.getElementById("fatherName").value.trim(),
        dob: document.getElementById("dob").value,
        mobile: document.getElementById("mobile").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
        gender: document.getElementById("gender").value,
        department: document.getElementById("department").value,
        semester: document.getElementById("semester").value,
        roll: document.getElementById("roll").value.trim(),
        address: document.getElementById("address").value.trim()

    };

    // Validation

    if (
        !studentData.firstName ||
        !studentData.lastName ||
        !studentData.fatherName ||
        !studentData.dob ||
        !studentData.mobile ||
        !studentData.email ||
        !studentData.password ||
        !studentData.gender ||
        !studentData.department ||
        !studentData.semester ||
        !studentData.roll ||
        !studentData.address
    ) {

        alert("Please fill all fields.");
        return;

    }

    try {

        const response = await fetch("/api/students/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(studentData)

        });

        const result = await response.json();
                if (result.success) {

            alert("✅ Student Registered Successfully!");

            console.log("Registration Successful");
            console.log(result);

            form.reset();

        } else {

            alert(result.message || "Registration Failed");

        }

    } catch (error) {

        console.error("Registration Error:", error);

        alert("❌ Unable to connect to server.");

    }

});