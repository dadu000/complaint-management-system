import React, { useState } from "react";
import "./Login.css";

const Login = () => {

    // ✅ STATES (THIS FIXES YOUR ERROR)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            setError(""); // clear old error

            const response = await fetch(`${window.location.hostname === "localhost" ? "http://localhost:8080" : "https://your-backend-name.onrender.com"}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });


            if (!response.ok) {
                setError("Invalid email or password");
                return;
            }

            const data = await response.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("role", data.user.role);

            window.location.href = "/dashboard";

        } catch (err) {
            setError("Server error. Please try again.");
        }
    };



    return (
        <div className="page">
            <div className="login-card">

                {/* LEFT SIDE */}
                <div className="left-panel">
                    <div className="light-overlay"></div>

                    <div className="left-text">
                        <h1>
                            HELLO<span>!</span>
                        </h1>
                        <p>
                            Please enter your details<br />
                            to continue
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="right-panel">
                    <h2>
                        <span>Complaint</span> Management System
                    </h2>

                    {/*<div className="input-box">*/}
                    {/*    <input*/}
                    {/*        type="email"*/}
                    {/*        placeholder="Email"*/}
                    {/*        value={email}*/}
                    {/*        onChange={(e) => setEmail(e.target.value)}*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="error-text">{error}</p>}


                    <button onClick={handleLogin}>Log In</button>

                    <p className="forgot">
    <span
        style={{ cursor: "pointer", color: "#4da6ff" }}
        onClick={() => window.location.href = "/forgot-password"}
    >
        Forgot Password?
    </span>
                    </p>



                    <p className="signup">
                        Don't have an account?
                        <span onClick={() => window.location.href="/register"}> Sign up</span>
                    </p>

                </div>

            </div>
        </div>
    );
};

export default Login;
