// ======================================
// controllers/authController.js
// ======================================

exports.login = async (req, res) => {

    try {

        const { username, password } = req.body;

        // Basic Validation
        if (!username || !password) {

            return res.status(400).json({
                success: false,
                message: "Username and Password are required"
            });

        }

        // Temporary Admin Login
        if (username === "admin" && password === "admin123") {

            return res.status(200).json({

                success: true,
                message: "Login Successful"

            });

        }

        return res.status(401).json({

            success: false,
            message: "Invalid Username or Password"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};