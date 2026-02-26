import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        form
      );

      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <input
          placeholder="Username"
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}