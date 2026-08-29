import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            console.log("Login Response:", response.data);

            // Save JWT token
            localStorage.setItem(
                "token",
                response.data.token
            );

            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login Successful!");

            navigate("/dashboard");

        } catch (error) {

            console.error("Login Error:", error);

            if (error.response) {

                alert(error.response.data.message);

            } else {

                alert("Server connection failed.");

            }
        }
    };

    return (
        <div>

            <h1>LibraryHub Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br />
                <br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;