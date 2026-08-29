const express = require("express");
const router = express.Router();

const {
    getAllBooks,
    addBook,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

const authenticateUser = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");


// ===============================
// PUBLIC ROUTES
// ===============================

// Get all books
router.get("/", getAllBooks);

// Get book by ID
router.get("/:id", getBookById);


// ===============================
// PROTECTED ROUTES
// ===============================

// Admin + Librarian can add books
router.post(
    "/",
    authenticateUser,
    authorizeRole("Admin", "Librarian"),
    addBook
);


// Admin + Librarian can update books
router.put(
    "/:id",
    authenticateUser,
    authorizeRole("Admin", "Librarian"),
    updateBook
);


// Only Admin can delete books
router.delete(
    "/:id",
    authenticateUser,
    authorizeRole("Admin"),
    deleteBook
);


module.exports = router;