const express = require("express");
const router = express.Router();

const {
    addMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember

} = require("../controllers/memberController");

const authenticateUser = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

// Get all members
router.get(
    "/",
    authenticateUser,
    authorizeRole("Admin", "Librarian"),
    getAllMembers
);

// Add member - Admin only
router.post(
    "/",
    authenticateUser,
    authorizeRole("Admin"),
    addMember
);
// Get member by ID
router.get(
    "/:id",
    authenticateUser,
    authorizeRole("Admin", "Librarian"),
    getMemberById
);
router.put(
    "/:id",
    authenticateUser,
    authorizeRole("Admin"),
    updateMember
);
 router.delete(
    "/:id",
    authenticateUser,
    authorizeRole("Admin"),
    deleteMember
);
module.exports = router;