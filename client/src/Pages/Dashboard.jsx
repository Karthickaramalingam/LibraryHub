import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [stats, setStats] = useState({
        total_books: 0,
        total_copies: 0,
        available_copies: 0,
        total_members: 0,
        borrowed_books: 0
    });

    const [loading, setLoading] = useState(true);

    // =========================
    // Get Dashboard Statistics
    // =========================

    

   useEffect(() => {

    const loadStats = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/dashboard/stats",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStats(response.data);

        } catch (error) {

            console.error(
                "Dashboard Stats Error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    loadStats();

}, []);
    // =========================
    // Logout
    // =========================

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";

    };

    return (
    <div className="dashboard">

        {/* Header */}
        <div className="dashboard-header">

            <h1>📚 LibraryHub Dashboard</h1>

            <h2>
                Welcome, {user?.username} 👋
            </h2>

            <p>
                Role: <strong>{user?.role}</strong>
            </p>

        </div>


        {/* Statistics */}
        <h2>📊 Library Statistics</h2>

        {loading ? (

            <p>Loading statistics...</p>

        ) : (

            <div className="stats-container">

                <div className="stat-card">
                    <h3>📚 Total Books</h3>
                    <h2>{stats.total_books}</h2>
                </div>

                <div className="stat-card">
                    <h3>📦 Total Copies</h3>
                    <h2>{stats.total_copies}</h2>
                </div>

                <div className="stat-card">
                    <h3>✅ Available Copies</h3>
                    <h2>{stats.available_copies}</h2>
                </div>

                <div className="stat-card">
                    <h3>👥 Total Members</h3>
                    <h2>{stats.total_members}</h2>
                </div>

                <div className="stat-card">
                    <h3>🔄 Borrowed Books</h3>
                    <h2>{stats.borrowed_books}</h2>
                </div>

            </div>

        )}


        {/* Navigation Buttons */}
        <div className="dashboard-buttons">

            <button
                onClick={() => navigate("/books")}
            >
                📚 Manage Books
            </button>
             <button
                     onClick={() => navigate("/members")}
                     >
                      👥 Manage Members
             </button>


            <button
                onClick={() => navigate("/borrow")}
            >
                🔄 Borrow / Return
            </button>

            <button
              onClick={() => navigate("/reports")}
            >
              📊 Reports
            </button>


            <button
                className="logout"
                onClick={logout}
            >
                🚪 Logout
            </button>

        </div>

    </div>
);}

export default Dashboard;