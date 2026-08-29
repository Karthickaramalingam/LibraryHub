const db = require("../config/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {

    const { username, email, password, role } = req.body;

    let connection;

    try {

        connection = await db.getConnection();
        // Hash Password
         const hashedPassword = await bcrypt.hash(password, 10);

        // Check if email already exists
        const [result] = await connection.query(
    `INSERT INTO users
    (username, email, password, role)
    VALUES (?, ?, ?, ?)`,
    [username, email, hashedPassword, role]
);

return res.status(201).json({
    message: "User Registered Successfully!",
    userId: result.insertId
});

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Database Error"
        });

    } finally {

        if (connection) {
            connection.release();
        }

    }

};
const login = async (req, res) => {

    const { email, password } = req.body;

    let connection;

    try {

        connection = await db.getConnection();

       const [users] = await connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
);

if (users.length === 0) {
    return res.status(404).json({
        message: "User not found."
    });
}

const user = users[0];
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
    return res.status(401).json({
        message: "Invalid Password."
    });
}

const token = jwt.sign(
    {
        user_id: user.user_id,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
);

return res.status(200).json({
    message: "Login Successful!",
    token,
    user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role
    }

});

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Database Error"
        });

    } finally {

        if (connection) {
            connection.release();
        }

    }

};

module.exports = {
    register,
    login
};