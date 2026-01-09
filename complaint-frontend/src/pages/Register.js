import { useState } from "react";
import "./Register.css";
import { authFetch } from "../api/api";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [building, setBuilding] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [role, setRole] = useState("USER");
    const [error, setError] = useState("");

    // This function handles the button click
    const handleRegister = async () => {
        setError("");
        if (!name || !email || !password || !building || !roomNumber) {
            setError("All fields are required");
            return;
        }

        try {
            await authFetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password, role, building, roomNumber })
            });
            window.location.href = "/login";
        } catch (err) {
            setError(err.message || "Registration failed");
        }
    }; // <--- handleRegister ends here

    // ✅ FIXED: The return is now the main output of the component
    return (
        <div className="register-page">
            <div className="register-card">
                <h2>Create Account</h2>
                {error && <p className="error">{error}</p>}

                <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <input placeholder="Building" value={building} onChange={e => setBuilding(e.target.value)} />
                <input placeholder="Room Number" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} />

                <div className="role-select">
                    <button className={role === "USER" ? "role-btn active" : "role-btn"} onClick={() => setRole("USER")} type="button">User</button>
                    <button className={role === "ADMIN" ? "role-btn active" : "role-btn"} onClick={() => setRole("ADMIN")} type="button">Admin</button>
                </div>

                <button className="register-btn" onClick={handleRegister}>Sign Up</button>
                <p className="login-link">
                    Already have an account? <span onClick={() => window.location.href = "/login"} style={{cursor: "pointer", color: "#4da6ff"}}>Login</span>
                </p>
            </div>
        </div>
    );
};

export default Register;