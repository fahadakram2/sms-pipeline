import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        form
      );

      alert("Signup Successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signup</h2>

        <input
          placeholder="Username"
          onChange={e =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={handleSubmit}>Signup</button>

        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}