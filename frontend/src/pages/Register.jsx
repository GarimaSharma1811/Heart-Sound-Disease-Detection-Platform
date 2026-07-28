import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import AuthLayout from "../components/AuthLayout";
import api from "../services/api";

import "../styles/login.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/register",
        formData
      );

      alert(
        response.data.message ||
          "Registration Successful!"
      );

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Create your Heart Sound AI account"
    >
      <form onSubmit={handleSubmit}>
        <div className="input-group-custom">
          <FaUser className="input-icon" />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group-custom">
          <FaEnvelope className="input-icon" />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group-custom">
          <FaLock className="input-icon" />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button
          className="login-btn"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

        <p className="register-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Register;