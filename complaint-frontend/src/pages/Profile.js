import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    if (!user) {
        return <p style={{ color: "white" }}>No user data found</p>;
    }

    return (
        <div className="profile-page">
            <button
                className="close-btn"
                onClick={() => navigate("/dashboard")}
            >
                ✕
            </button>

            <div className="profile-card">
                <h2>User Profile</h2>

                <div className="profile-row">
                    <span>Name</span>
                    <span>{user.name || "-"}</span>
                </div>

                <div className="profile-row">
                    <span>Email</span>
                    <span>{user.email}</span>
                </div>

                <div className="profile-row">
                    <span>Role</span>
                    <span>{user.role}</span>
                </div>

                <div className="profile-row">
                    <span>Room Number</span>
                    <span>{user.roomNumber || "-"}</span>
                </div>

                <div className="profile-row">
                    <span>Building</span>
                    <span>{user.building || "-"}</span>
                </div>
            </div>
        </div>
    );
};

export default Profile;
