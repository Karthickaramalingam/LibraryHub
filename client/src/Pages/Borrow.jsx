import { useEffect, useState } from "react";
import axios from "axios";

function Borrow() {
    const [members, setMembers] = useState([]);
    const [books, setBooks] = useState([]);
    const [checkouts, setCheckouts] = useState([]);

    const [memberId, setMemberId] = useState("");
    const [bookId, setBookId] = useState("");

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    // =========================
    // Get Members
    // =========================

    const getMembers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/members",
                config
            );

            setMembers(response.data);
        } catch (error) {
            console.error("Get Members Error:", error);
        }
    };

    // =========================
    // Get Books
    // =========================

    const getBooks = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/books",
                config
            );

            setBooks(response.data);
        } catch (error) {
            console.error("Get Books Error:", error);
        }
    };

    // =========================
    // Get Checkouts
    // =========================

    const getCheckouts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/checkouts",
                config
            );

            setCheckouts(response.data);
        } catch (error) {
            console.error("Get Checkouts Error:", error);
        }
    };

    useEffect(() => {
    const loadData = async () => {
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const [membersResponse, booksResponse, checkoutsResponse] =
                await Promise.all([
                    axios.get("http://localhost:5000/api/members", config),
                    axios.get("http://localhost:5000/api/books", config),
                    axios.get("http://localhost:5000/api/checkouts", config)
                ]);

            setMembers(membersResponse.data);
            setBooks(booksResponse.data);
            setCheckouts(checkoutsResponse.data);

            console.log("Members:", membersResponse.data);
            console.log("Books:", booksResponse.data);
            console.log("Checkouts:", checkoutsResponse.data);

        } catch (error) {
            console.error("Error loading data:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);
            }
        }
    };

    loadData();
}, []);
    // =========================
    // Borrow Book
    // =========================

    const handleBorrow = async (e) => {
        e.preventDefault();

        if (!memberId || !bookId) {
            alert("Please select member and book.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/checkouts/borrow",
                {
                    member_id: Number(memberId),
                    book_id: Number(bookId)
                },
                config
            );

            alert(response.data.message);

            setMemberId("");
            setBookId("");

            getBooks();
            getMembers();
            getCheckouts();

        } catch (error) {
            console.error("Borrow Error:", error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Server connection failed.");
            }
        }
    };

    // =========================
    // Return Book
    // =========================

    const handleReturn = async (checkoutId) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/checkouts/return",
                {
                    checkout_id: checkoutId
                },
                config
            );

            alert(response.data.message);

            getBooks();
            getMembers();
            getCheckouts();

        } catch (error) {
            console.error("Return Error:", error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Server connection failed.");
            }
        }
    };

    return (
        <div>

            <h1>📚 Borrow & Return Books</h1>

            {/* ========================= */}
            {/* Borrow Book */}
            {/* ========================= */}

            <h2>📖 Borrow Book</h2>

            <form onSubmit={handleBorrow}>

                <label>Member:</label>

                <select
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                >
                    <option value="">
                        -- Select Member --
                    </option>

                    {members.map((member) => (
                        <option
                            key={member.member_id}
                            value={member.member_id}
                        >
                            {member.member_id} - {member.name}
                        </option>
                    ))}
                </select>

                <br />
                <br />

                <label>Book:</label>

                <select
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                >
                    <option value="">
                        -- Select Book --
                    </option>

                    {books
                        .filter((book) => book.available_copies > 0)
                        .map((book) => (
                            <option
                                key={book.book_id}
                                value={book.book_id}
                            >
                                {book.title} - Available:{" "}
                                {book.available_copies}
                            </option>
                        ))}
                </select>

                <br />
                <br />

                <button type="submit">
                    📚 Borrow Book
                </button>

            </form>

            <hr />

            {/* ========================= */}
            {/* Current Checkouts */}
            {/* ========================= */}

            <h2>📋 Current Checkouts</h2>

            {checkouts.length === 0 ? (
                <p>No checkout records found.</p>
            ) : (
                <table border="1" cellPadding="10">

                    <thead>
                        <tr>
                            <th>Checkout ID</th>
                            <th>Member ID</th>
                            <th>Book ID</th>
                            <th>Checkout Date</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {checkouts.map((checkout) => (
                            <tr key={checkout.checkout_id}>

                                <td>
                                    {checkout.checkout_id}
                                </td>

                                <td>
                                    {checkout.member_id}
                                </td>

                                <td>
                                    {checkout.book_id}
                                </td>

                                <td>
                                    {checkout.checkout_date}
                                </td>

                                <td>
                                    {checkout.due_date}
                                </td>

                                <td>
                                    {checkout.status}
                                </td>

                                <td>

                                    {checkout.status !== "Returned" && (
                                        <button
                                            onClick={() =>
                                                handleReturn(
                                                    checkout.checkout_id
                                                )
                                            }
                                        >
                                            🔄 Return
                                        </button>
                                    )}

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>
            )}

        </div>
    );
}

export default Borrow;