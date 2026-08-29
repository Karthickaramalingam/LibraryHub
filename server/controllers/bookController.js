const db = require("../config/db");


// ==============================
// Get All Books
// ==============================

const getAllBooks = async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM books"
        );

        return res.status(200).json(rows);

    } catch (err) {

        console.error("❌ Get All Books Error:", err);

        return res.status(500).json({
            message: "Database Error"
        });
    }
};


// ==============================
// Add Book
// ==============================

const addBook = async (req, res) => {

    const {
        title,
        author,
        isbn,
        publisher,
        publication_year,
        edition,
        pages,
        language,
        total_copies,
        available_copies,
        category_id
    } = req.body;

    if (!title || !author) {

        return res.status(400).json({
            message: "Title and Author are required."
        });

    }

    try {

        const [result] = await db.query(
            `
            INSERT INTO books
            (
                title,
                author,
                isbn,
                publisher,
                publication_year,
                edition,
                pages,
                language,
                total_copies,
                available_copies,
                category_id
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                title,
                author,
                isbn,
                publisher,
                publication_year,
                edition,
                pages,
                language,
                total_copies,
                available_copies,
                category_id
            ]
        );

        return res.status(201).json({
            message: "Book Added Successfully!",
            bookId: result.insertId
        });

    } catch (err) {

        console.error("❌ Add Book Error:", err);

        return res.status(500).json({
            message: "Database Error"
        });
    }
};


// ==============================
// Get Book By ID
// ==============================

const getBookById = async (req, res) => {

    const { id } = req.params;

    try {

        const [rows] = await db.query(
            "SELECT * FROM books WHERE book_id = ?",
            [id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                message: "Book not found."
            });

        }

        return res.status(200).json(rows[0]);

    } catch (err) {

        console.error("❌ Get Book Error:", err);

        return res.status(500).json({
            message: "Database Error"
        });
    }
};


// ==============================
// Update Book
// ==============================

const updateBook = async (req, res) => {

    const { id } = req.params;

    const {
        title,
        author,
        isbn,
        publisher,
        publication_year,
        edition,
        pages,
        language,
        total_copies,
        available_copies,
        category_id
    } = req.body;

    if (!title || !author) {

        return res.status(400).json({
            message: "Title and Author are required."
        });

    }

    try {

        const [result] = await db.query(
            `
            UPDATE books
            SET
                title = ?,
                author = ?,
                isbn = ?,
                publisher = ?,
                publication_year = ?,
                edition = ?,
                pages = ?,
                language = ?,
                total_copies = ?,
                available_copies = ?,
                category_id = ?
            WHERE book_id = ?
            `,
            [
                title,
                author,
                isbn,
                publisher,
                publication_year,
                edition,
                pages,
                language,
                total_copies,
                available_copies,
                category_id,
                id
            ]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Book not found."
            });

        }

        return res.status(200).json({
            message: "Book Updated Successfully!"
        });

    } catch (err) {

        console.error("❌ Update Book Error:", err);

        return res.status(500).json({
            message: "Database Error"
        });
    }
};


// ==============================
// Delete Book
// ==============================

const deleteBook = async (req, res) => {

    const { id } = req.params;

    try {

        // Check whether this book has checkout history
        const [checkouts] = await db.query(
            "SELECT checkout_id FROM checkouts WHERE book_id = ? LIMIT 1",
            [id]
        );

        if (checkouts.length > 0) {

            return res.status(400).json({
                message: "Cannot delete this book because it has checkout history."
            });

        }

        // Delete book
        const [result] = await db.query(
            "DELETE FROM books WHERE book_id = ?",
            [id]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Book not found."
            });

        }

        return res.status(200).json({
            message: "Book Deleted Successfully!"
        });

    } catch (err) {

        console.error("❌ Delete Book Error:", err);

        return res.status(500).json({
            message: "Database Error"
        });
    }
};


// ==============================
// Export
// ==============================

module.exports = {
    getAllBooks,
    addBook,
    getBookById,
    updateBook,
    deleteBook
};