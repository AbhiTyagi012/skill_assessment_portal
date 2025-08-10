import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/userApi";
import "../styles/SideBar.css";

export default function Sidebar({ role }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear(); // remove user data
      navigate("/"); // redirect to login
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul>
        {role === "admin" ? (
          <>
            <li>
              <Link to="/admin-dashboard">Admin Dashboard</Link>
            </li>
            <li>
              <Link to="/admin-manage">Manage Skills & Questions</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/skill-assessment">Skill Assessment</Link>
            </li>
          </>
        )}
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
