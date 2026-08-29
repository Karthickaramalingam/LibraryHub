const db = require("../config/db");

// Register Member
const addMember = async (req, res) => {

    const {
        name,
        email,
        phone,
        join_date,
        membership_expiry
    } = req.body;

    // Validation
    if (!name || !email || !phone) {
        return res.status(400).json({
            message: "Name, Email and Phone are required."
        });
    }

    let connection;

    try {

        connection = await db.getConnection();

        const sql = `
            INSERT INTO members
            (name, email, phone, join_date, membership_expiry)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await connection.query(
            sql,
            [
                name,
                email,
                phone,
                join_date,
                membership_expiry
            ]
        );

        return res.status(201).json({
            message: "Member Registered Successfully!",
            memberId: result.insertId
        });

    } catch (err) {

        console.error(err);

        // Duplicate email or phone
        if (err.code === "ER_DUP_ENTRY") {

            if (err.message.includes("phone")) {
                return res.status(409).json({
                    message: "Phone number already registered."
                });
            }

            if (err.message.includes("email")) {
                return res.status(409).json({
                    message: "Email already registered."
                });
            }

            return res.status(409).json({
                message: "Member already exists."
            });
        }

        return res.status(500).json({
            message: "Database Error"
        });

    } finally {

        if (connection) {
            connection.release();
        }

    }

};
    // Get All Members
const getAllMembers = async (req, res) => {

    let connection;

    try {

        connection = await db.getConnection();

        const [result] = await connection.query(
            "SELECT * FROM members"
        );

        return res.status(200).json(result);

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
// Get Member By ID
const getMemberById = async (req, res) => {

    const { id } = req.params;

    let connection;

    try {

        connection = await db.getConnection();

        const [result] = await connection.query(
            "SELECT * FROM members WHERE member_id = ?",
            [id]
        );

        if (result.length === 0) {
            return res.status(404).json({
                message: "Member not found."
            });
        }

        return res.status(200).json(result[0]);

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
// Update Member
const updateMember = async (req, res) => {

    const { id } = req.params;

    const {
        name,
        email,
        phone,
        membership_expiry
    } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({
            message: "Name, Email and Phone are required."
        });
    }

    let connection;

    try {

        connection = await db.getConnection();

        const [result] = await connection.query(
            `UPDATE members
             SET name = ?,
                 email = ?,
                 phone = ?,
                 membership_expiry = ?
             WHERE member_id = ?`,
            [name, email, phone, membership_expiry, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Member not found."
            });
        }

        return res.status(200).json({
            message: "Member Updated Successfully!"
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
// Delete Member
const deleteMember = async (req, res) => {

    const { id } = req.params;

    let connection;

    try {

        connection = await db.getConnection();

        const [result] = await connection.query(
            "DELETE FROM members WHERE member_id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Member not found."
            });
        }

        return res.status(200).json({
            message: "Member Deleted Successfully!"
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
    addMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember
};