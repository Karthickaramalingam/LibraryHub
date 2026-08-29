import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Books from "./Pages/Books";
import Members from "./Pages/Members";
import Borrow from "./Pages/Borrow";
import Reports from "./Pages/Reports";
import Navbar from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/books" element={<Books />} />
                <Route path="/borrow" element={<Borrow />} />
                <Route path="/members" element={<Members />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;