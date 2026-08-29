const db = require("../config/db");

const getDashboardStats = async (req, res) => {
    try {
        const [books] = await db.query(`
            SELECT 
                COUNT(*) AS total_books,
                COALESCE(SUM(total_copies), 0) AS total_copies,
                COALESCE(SUM(available_copies), 0) AS available_copies
            FROM books
        `);

        const [members] = await db.query(`
            SELECT COUNT(*) AS total_members
            FROM members
        `);

        const [borrowed] = await db.query(`
            SELECT COUNT(*) AS borrowed_books
            FROM checkouts
            WHERE status != 'Returned'
        `);

        res.status(200).json({
            total_books: books[0].total_books,
            total_copies: books[0].total_copies,
            available_copies: books[0].available_copies,
            total_members: members[0].total_members,
            borrowed_books: borrowed[0].borrowed_books
        });

    } catch (error) {
        console.error("Dashboard Stats Error:", error);

        res.status(500).json({
            message: "Database Error"
        });
    }
};

module.exports = {
    getDashboardStats
};