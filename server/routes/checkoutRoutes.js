const express = require("express");

const router = express.Router();

const {
    borrowBook,
    returnBook,
    getCheckouts
} = require("../controllers/checkoutController");

const authenticateUser = require("../middleware/authMiddleware");

// Get all checkout records
router.get("/", authenticateUser, getCheckouts);

// Borrow Book
router.post("/borrow", authenticateUser, borrowBook);

// Return Book
router.post("/return", authenticateUser, returnBook);

module.exports = router;