import { useEffect, useState } from "react";
import "./Members.css";
import axios from "axios";

function Members() {

    

    const [members, setMembers] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        join_date: "",
        membership_expiry: ""
    });

    // =========================
    // Get Members
    // =========================

    const getMembers = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/members",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMembers(response.data);

        } catch (error) {

            console.error("Get Members Error:", error);

        }
    };

    useEffect(() => {

    const loadMembers = async () => {

        try {

            const token = localStorage.getItem("token");

            console.log("Token:", token);

            const response = await axios.get(
                "http://localhost:5000/api/members",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Members:", response.data);

            setMembers(response.data);

        } catch (error) {

            console.error("Members Error:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);
            }

        }

    };

    loadMembers();

}, []);

    // =========================
    // Handle Input
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };

    // =========================
    // Add Member
    // =========================

    const handleAddMember = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/api/members",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);

            setFormData({
                name: "",
                email: "",
                phone: "",
                join_date: "",
                membership_expiry: ""
            });

            getMembers();

        } catch (error) {

            console.error("Add Member Error:", error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Server connection failed.");
            }

        }

    };

   
// =========================
// Edit Member
// =========================

const handleEdit = async (member) => {

    const newName = prompt(
        "Enter new name:",
        member.name
    );

    if (!newName) {
        return;
    }

    const newEmail = prompt(
        "Enter new email:",
        member.email
    );

    if (!newEmail) {
        return;
    }

    const newPhone = prompt(
        "Enter new phone:",
        member.phone
    );

    if (!newPhone) {
        return;
    }

    const newExpiry = prompt(
        "Enter new membership expiry date (YYYY-MM-DD):",
        member.membership_expiry
    );

    if (!newExpiry) {
        return;
    }

    try {

        const token = localStorage.getItem("token");

        const response = await axios.put(
            `http://localhost:5000/api/members/${member.member_id}`,
            {
                name: newName,
                email: newEmail,
                phone: newPhone,
                membership_expiry: newExpiry
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert(response.data.message);

        getMembers();

    } catch (error) {

        console.error("Update Member Error:", error);

        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("Server connection failed.");
        }

    }
};
// =========================
// Delete Member
// =========================

const handleDelete = async (memberId) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this member?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const token = localStorage.getItem("token");

        const response = await axios.delete(
            `http://localhost:5000/api/members/${memberId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert(response.data.message);

        getMembers();

    } catch (error) {

        console.error("Delete Member Error:", error);

        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("Server connection failed.");
        }

    }
};
    // =========================
    // Return
    // =========================

    return (

        <div className="members-page">

            <h1>👥 Library Members</h1>

            {/* ========================= */}
            {/* Add Member Form */}
            {/* ========================= */}

            <h2>➕ Add New Member</h2>

            <form onSubmit={handleAddMember}>

                <input
                    type="text"
                    name="name"
                    placeholder="Member Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                <label>
                    Join Date:
                </label>

                <input
                    type="date"
                    name="join_date"
                    value={formData.join_date}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                <label>
                    Membership Expiry:
                </label>

                <input
                    type="date"
                    name="membership_expiry"
                    value={formData.membership_expiry}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                <button type="submit">
                    ➕ Add Member
                </button>

            </form>

            <hr />

            {/* ========================= */}
            {/* Members Table */}
            {/* ========================= */}

            <h2>👥 All Members</h2>

            {members.length === 0 ? (

                <p>No members found.</p>

            ) : (

                <table border="1" cellPadding="10">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Join Date</th>
                            <th>Membership Expiry</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {members.map((member) => (

                            <tr key={member.member_id}>

                                <td>
                                    {member.member_id}
                                </td>

                                <td>
                                    {member.name}
                                </td>

                                <td>
                                    {member.email}
                                </td>

                                <td>
                                    {member.phone}
                                </td>

                                <td>
                                    {member.join_date}
                                </td>

                                <td>
                                    {member.membership_expiry}
                                </td>

                                <td>
                                 <button onClick={() => handleEdit(member)}>
                                ✏️ Edit
                                 </button>

{" "}

<button
    onClick={() => handleDelete(member.member_id)}
>
    🗑️ Delete
</button>   

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>

    );
}

export default Members;