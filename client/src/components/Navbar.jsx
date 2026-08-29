import { useNavigate } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <nav className="navbar">

            <h2
                className="navbar-logo"
                onClick={() => navigate("/dashboard")}
            >
                📚 LibraryHub
            </h2>

            <div className="navbar-links">

                <button onClick={() => navigate("/dashboard")}>
                    🏠 Dashboard
                </button>

                <button onClick={() => navigate("/books")}>
                    📚 Books
                </button>

                <button onClick={() => navigate("/members")}>
                    👥 Members
                </button>

                <button onClick={() => navigate("/borrow")}>
                    🔄 Borrow / Return
                </button>

                <button onClick={() => navigate("/reports")}>
                    📊 Reports
                </button>

                <span className="navbar-user">
                    👤 {user?.username}
                </span>

                <button onClick={logout}>
                    🚪 Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;