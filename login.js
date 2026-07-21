// ======================================
// public/login.js
// ======================================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please enter Username and Password");
        return;
    }

    try {

        const response = await fetch("/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })

        });

        const result = await response.json();

        if (result.success) {

            alert("✅ Login Successful");

            // Save login status
            localStorage.setItem("isLoggedIn", "true");

            // Redirect to Dashboard
            window.location.href = "/dashboard.html";

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

        alert("❌ Server Error");

    }

});