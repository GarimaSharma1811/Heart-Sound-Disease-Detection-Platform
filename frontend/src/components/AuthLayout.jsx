import "../styles/auth.css";
import { FaStethoscope } from "react-icons/fa";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-container">
      {/* Left Side */}
      <div className="auth-left">
        <div className="auth-content">
          <h1 className="brand-title">
            <FaStethoscope className="brand-icon" />
            Heart Sound AI
          </h1>

          <p className="brand-description">
            AI-powered heart sound analysis for early detection
            of cardiovascular diseases.
          </p>

          <ul className="feature-list">
            <li>✓ Murmur Detection</li>
            <li>✓ Disease Prediction</li>
            <li>✓ Secure Medical Reports</li>
            <li>✓ Fast & Accurate Analysis</li>
          </ul>
        </div>
      </div>

      {/* Right Side */}
      <div className="auth-right">
        <div className="auth-card">
          <h2>{title}</h2>
          <p>{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;