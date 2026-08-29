import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Reports.css";


function Reports() {

    const navigate = useNavigate();

    const [checkouts, setCheckouts] = useState([]);
    const [loading, setLoading] = useState(true);

    // =========================
    // Get Checkout History
    // =========================

   
useEffect(() => {

    const loadCheckouts = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/checkouts",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCheckouts(response.data);

        } catch (error) {

            console.error(
                "Get Reports Error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    loadCheckouts();

}, []);

    return (

        <div className="reports-page">

            {/* ========================= */}
            {/* Header */}
            {/* ========================= */}

            <div className="reports-header">

                <div>

                    <h1>📊 Library Reports</h1>

                    <p>
                        Borrow and Return History
                    </p>

                </div>

                <button
                    className="back-button"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Back to Dashboard
                </button>

            </div>


            {/* ========================= */}
            {/* Report Table */}
            {/* ========================= */}

            <div className="reports-table-card">

                <h2>📋 Checkout History</h2>

                {loading ? (

                    <p>Loading reports...</p>

                ) : checkouts.length === 0 ? (

                    <p>No checkout records found.</p>

                ) : (

                    <div className="table-container">

                        <table className="reports-table">

                            <thead>

                                <tr>

                                    <th>
                                        Checkout ID
                                    </th>

                                    <th>
                                        Member
                                    </th>

                                    <th>
                                        Book
                                    </th>

                                    <th>
                                        Checkout Date
                                    </th>

                                    <th>
                                        Due Date
                                    </th>

                                    <th>
                                        Return Date
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {checkouts.map((checkout) => (

                                    <tr
                                        key={
                                            checkout.checkout_id
                                        }
                                    >

                                        <td>
                                            {
                                                checkout.checkout_id
                                            }
                                        </td>

                                        <td>
                                            {
                                                checkout.member_name
                                            }
                                        </td>

                                        <td>
                                            {
                                                checkout.book_title
                                            }
                                        </td>

                                        <td>
                                            {
                                                checkout.checkout_date
                                            }
                                        </td>

                                        <td>
                                            {
                                                checkout.due_date
                                            }
                                        </td>

                                        <td>
                                            {
                                                checkout.return_date
                                                    || "—"
                                            }
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    checkout.status ===
                                                    "Returned"
                                                        ? "status-returned"
                                                        : "status-borrowed"
                                                }
                                            >
                                                {
                                                    checkout.status
                                                }
                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );
}

export default Reports;