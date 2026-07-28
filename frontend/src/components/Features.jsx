import {
  FaBrain,
  FaClock,
  FaShieldAlt,
  FaChartLine,
  FaCloudUploadAlt,
  FaFileMedical,
} from "react-icons/fa";

import "../styles/features.css";

function Features() {
  const features = [
    {
      icon: <FaBrain />,
      title: "AI-Powered Diagnosis",
      description:
        "Advanced machine learning models analyze heart sound recordings to detect abnormalities with high accuracy.",
    },
    {
      icon: <FaClock />,
      title: "Instant Analysis",
      description:
        "Upload your recording and receive detailed AI-assisted predictions within seconds.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Platform",
      description:
        "Your medical records remain encrypted and protected using secure authentication.",
    },
    {
      icon: <FaChartLine />,
      title: "Smart Insights",
      description:
        "Interactive reports and visualizations help doctors and patients understand results easily.",
    },
    {
      icon: <FaCloudUploadAlt />,
      title: "Easy Upload",
      description:
        "Simply upload your heart sound recording and let our AI process it automatically.",
    },
    {
      icon: <FaFileMedical />,
      title: "Medical Reports",
      description:
        "Generate professional PDF reports containing prediction results and patient details.",
    },
  ];

  return (
    <section className="features-section" id="features">
      <div className="features-header">
        <span>OUR FEATURES</span>

        <h2>
          Everything You Need For
          <br />
          AI-Based Heart Sound Analysis
        </h2>

        <p>
          Our intelligent platform combines Artificial Intelligence,
          medical analytics, and secure cloud technology to provide
          fast and reliable cardiac diagnosis.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;