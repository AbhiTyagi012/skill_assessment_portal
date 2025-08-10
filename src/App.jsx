import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import SkillAssessment from "./pages/SkillAssessment";
import AdminDashboard from "./pages/AdminDashboard";
import Sidebar from "./components/SideBar";
import AdminManage from "./pages/AdminManage";

const Layout = ({ children }) => {
  const role = localStorage.getItem("role"); // "admin" or "user"

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role={role} />
      <div style={{ marginLeft: "220px", padding: "20px", flex: 1 }}>{children}</div>
    </div>
  );
};

const App = () => {
  const role = localStorage.getItem("role");
  console.log(role)
  return (
    <Router>
      <Routes>
        {/* Auth page without sidebar */}
        <Route path="/" element={<AuthPage />} />

        {/* Protected routes with sidebar */}
        {role === "admin" && (
          <>
            <Route
              path="/admin-dashboard"
              element={
                <Layout>
                  <AdminDashboard />
                </Layout>
              }
            />
            <Route
              path="/admin-manage"
              element={
                <Layout>
                  <AdminManage />
                </Layout>
              }
            />
          </>
          
        )}

        {role === "user" && (
          <>
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/skill-assessment"
              element={
                <Layout>
                  <SkillAssessment />
                </Layout>
              }
            />
          </>
        )}

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </Router>
  );
};

export default App;
