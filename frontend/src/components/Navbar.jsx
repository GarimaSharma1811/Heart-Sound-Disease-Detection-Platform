import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="custom-navbar">

      <div className="logo">

        <FaHeartbeat className="logo-icon" />

        <div>
          <h3>HeartSound AI</h3>
          <span>AI Diagnosis Platform</span>
        </div>

      </div>

      <ul className="nav-links">

        <li>
          <a href="#home">Home</a>
        </li>

        <li>
          <a href="#features">Features</a>
        </li>

        <li>
          <a href="#about">About</a>
        </li>

        <li>
          <a href="#contact">Contact</a>
        </li>

      </ul>

      <div className="nav-buttons">

        <Link to="/login">
          <button className="login-btn-nav">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="register-btn-nav">
            Register
          </button>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;