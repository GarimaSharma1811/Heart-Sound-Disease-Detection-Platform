import { Link } from "react-router-dom";
import { FaHeartbeat, FaShieldAlt, FaFileMedical } from "react-icons/fa";
import heroImage from "../assets/images/hero.svg";
import "../styles/hero.css";

function HeroSection() {
  return (
    <section className="hero-section" id="home">

      <div className="hero-left">

        <span className="hero-tag">
          AI Powered Healthcare
        </span>

        <h1>
          Detect Heart Diseases
          <br />
          Using Artificial Intelligence
        </h1>

        <p>
          Upload heart sound recordings and receive fast, accurate
          AI-assisted analysis with secure report generation and
          intelligent cardiac insights.
        </p>

        <div className="hero-buttons">

          <Link to="/upload">
            <button className="primary-btn">
              Upload Heart Sound
            </button>
          </Link>

          <button className="secondary-btn">
            Learn More
          </button>

        </div>

        <div className="hero-stats">

          <div className="stat-card">
            <FaHeartbeat />
            <h3>95%</h3>
            <span>Detection Accuracy</span>
          </div>

          <div className="stat-card">
            <FaShieldAlt />
            <h3>100%</h3>
            <span>Secure Reports</span>
          </div>

          <div className="stat-card">
            <FaFileMedical />
            <h3>Instant</h3>
            <span>AI Analysis</span>
          </div>

        </div>

      </div>

      <div className="hero-right">

        <img
          src={heroImage}
          alt="Medical Illustration"
        />

      </div>

    </section>
  );
}

export default HeroSection;