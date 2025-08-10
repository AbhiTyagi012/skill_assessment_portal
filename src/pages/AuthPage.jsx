import React, { useState } from "react";
import { signUp, login } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPage.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      let res;
      if (isLogin) {
        res = await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        res = await signUp({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
      }

      console.log("Login/Signup Response:", res);

      if (res?.token) {
        // Store auth details
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);
        localStorage.setItem("user_id", res.user_id);

        // Navigate based on role
        if (res.role === "admin") {
          navigate("/admin-dashboard", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      } else {
        setMessage(res.message || "Unexpected login/signup response");
      }
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="main-heading">Skill Assessment Portal</h1>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
