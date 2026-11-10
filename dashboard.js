// ======================================
// Dashboard JavaScript
// ======================================

// Login Check
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "/login.html";
}

// ======================================
// Load Students
// ======================================

async function loadStudents() {

    try {

        const response = await fetch("/api/students");

        const result = await response.json();

        const table = document.getElementById("studentTable");

        table.innerHTML = "";

        document.getElementById("totalStudents").innerText =
            result.data.length;

        result.data.forEach((student) => {

            table.innerHTML += `

            <tr>

                <td>${student.id}</td>

                <td>${student.firstName} ${student.lastName}</td>

                <td>${student.email}</td>

                <td>${student.mobile}</td>

                <td>${student.department}</td>

                <td>${student.semester}</td>

                <td>${student.roll}</td>

                <td>

                    <button
                    class="btn btn-warning btn-sm"
                    onclick="editStudent(${student.id})">

                    Edit

                    </button>

                    <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteStudent(${student.id})">

                    Delete

                    </button>

                </td>

            </tr>

            `;

        });

    } catch (error) {

        console.error(error);

        alert("Unable to Load Students");

    }

}

loadStudents();


// ======================================
// Search Student
// ======================================

document.getElementById("searchInput").addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#studentTable tr");

    rows.forEach((row) => {

        row.style.display =
            row.innerText.toLowerCase().includes(value)
                ? ""
                : "none";

    });

});


// ======================================
// Delete Student
// ======================================

async function deleteStudent(id) {

    const confirmDelete = confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`/api/students/${id}`, {

            method: "DELETE"

        });

        const result = await response.json();

        if (result.success) {

            alert("Student Deleted Successfully");

            loadStudents();

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

        alert("Delete Failed");

    }

}


// ======================================
// Edit Student
// ======================================

async function editStudent(id) {

    try {

        const response = await fetch(`/api/students/${id}`);

        const result = await response.json();

        const student = result.data;

        document.getElementById("editId").value = student.id;
        document.getElementById("editFirstName").value = student.firstName;
        document.getElementById("editLastName").value = student.lastName;
        document.getElementById("editFatherName").value = student.fatherName;
        document.getElementById("editDob").value =
    student.dob ? student.dob.split("T")[0] : "";
        document.getElementById("editMobile").value = student.mobile;
        document.getElementById("editEmail").value = student.email;
        document.getElementById("editGender").value = student.gender;
        document.getElementById("editDepartment").value = student.department;
        document.getElementById("editSemester").value = student.semester;
        document.getElementById("editRoll").value = student.roll;
        document.getElementById("editAddress").value = student.address;

        const modal = new bootstrap.Modal(document.getElementById("editModal"));

        modal.show();

    } catch (error) {

        console.error(error);

        alert("Unable to Load Student");

    }

}
// ======================================
// Logout
// ======================================

document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "/login.html";

});


// ======================================
// Update Student
// ======================================

document.getElementById("editForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const id = document.getElementById("editId").value;

    const student = {

        firstName: document.getElementById("editFirstName").value,
        lastName: document.getElementById("editLastName").value,
        fatherName: document.getElementById("editFatherName").value,
        dob: document.getElementById("editDob").value,
        mobile: document.getElementById("editMobile").value,
        email: document.getElementById("editEmail").value,
        gender: document.getElementById("editGender").value,
        department: document.getElementById("editDepartment").value,
        semester: document.getElementById("editSemester").value,
        roll: document.getElementById("editRoll").value,
        address: document.getElementById("editAddress").value

    };

    try {

        const response = await fetch(`/api/students/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        });

        const result = await response.json();

        if (result.success) {

            alert("Student Updated Successfully");

            bootstrap.Modal
                .getInstance(document.getElementById("editModal"))
                .hide();

            loadStudents();

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

        alert("Update Failed");

    }

});