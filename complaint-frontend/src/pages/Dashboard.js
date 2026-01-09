import { useEffect, useState } from "react";
import { authFetch } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
    const role = localStorage.getItem("role");
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);

    // 🔹 Load complaints based on role
    const loadComplaints = () => {
        const url =
            role === "ADMIN"
                ? "/api/complaints"
                : `/api/complaints/user/${user.id}`;

        authFetch(url)
            .then(data => {
                setComplaints(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        loadComplaints();
    }, []);

    // 🔹 User submits complaint
    const submitComplaint = async () => {
        if (!title || !description) {
            alert("All fields required");
            return;
        }

        await authFetch("/api/complaints", {
            method: "POST",
            body: JSON.stringify({
                title,
                description,
                user: { id: user.id }
            })
        });

        setTitle("");
        setDescription("");
        loadComplaints();
    };

    // 🔹 Admin updates status
    const updateStatus = async (id, status) => {
        await authFetch(`/api/complaints/${id}/status`, {
            method: "PUT",
            body: JSON.stringify({ status })
        });
        loadComplaints();
    };

    // 🔹 Admin deletes complaint
    const deleteComplaint = async (id) => {
        if (!window.confirm("Delete this complaint?")) return;
        await authFetch(`/api/complaints/${id}`, { method: "DELETE" });
        loadComplaints();
    };

    // 🔹 ✅ PROPER LOGOUT (FIXED)
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        navigate("/login", { replace: true });
    };

    return (
        <div className="dashboard">

            {/* TOP BAR */}
            <div className="top-bar">
                <div className="left">
                    <div className="avatar">
                        {role === "ADMIN" ? "A" : "U"}
                    </div>
                    <div className="role">Role: {role}</div>
                </div>

                <div className="right">
                    <button
                        className="profile-btn"
                        onClick={() => navigate("/profile")}
                    >
                        Profile
                    </button>

                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* USER ONLY */}
            {role === "USER" && (
                <div className="card">
                    <h3>Raise Complaint</h3>

                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button onClick={submitComplaint}>Submit</button>
                </div>
            )}

            {/* COMPLAINTS */}
            <div className="card">
                <h3>Complaints</h3>

                {loading && <p>Loading...</p>}
                {!loading && complaints.length === 0 && <p>No complaints found</p>}

                {complaints.map(c => (
                    <div key={c.id} className="complaint-row">

                        <div className="complaint-info">
                            <strong>{c.title}</strong>
                            <p>{c.description}</p>
                            <span className="status">{c.status}</span>
                        </div>

                        {role === "ADMIN" && (
                            <div className="admin-actions">
                                <button onClick={() => updateStatus(c.id, "OPEN")}>OPEN</button>
                                <button onClick={() => updateStatus(c.id, "IN_PROGRESS")}>PROGRESS</button>
                                <button onClick={() => updateStatus(c.id, "RESOLVED")}>DONE</button>
                                <button
                                    className="delete-btn"
                                    onClick={() => deleteComplaint(c.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}

                    </div>
                ))}
            </div>

        </div>
    );
};

export default Dashboard;
