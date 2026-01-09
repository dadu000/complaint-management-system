import { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleReset = async () => {
        setMessage("");
        setError("");

        if (!email || !password) {
            setError("All fields are required");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:8080/api/auth/forgot-password",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (!response.ok) {
                setError("Email not found");
                return;
            }

            setMessage("Password updated successfully");
            setPassword("");
        } catch {
            setError("Server error. Try again");
        }
    };

    return (
        <div className="forgot-page">
            <div className="forgot-card">

                {/* ❌ CLOSE BUTTON */}
                <div
                    className="close-btn"
                    onClick={() => window.location.href = "/"}
                >
                    ✕
                </div>

                <h2>Reset Password</h2>
                <p className="subtitle">Enter your email and new password</p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleReset}>Reset Password</button>

                {error && <p className="error">{error}</p>}
                {message && <p className="success">{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
