
require("dotenv").config();


const express = require("express");
const cors = require("cors");


// Import the database connection
require("./config/db");

const app = express();
const bookRoutes = require("./routes/bookRoutes");
const memberRoutes = require("./routes/memberRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/checkouts", checkoutRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Welcome to LibraryHub API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});