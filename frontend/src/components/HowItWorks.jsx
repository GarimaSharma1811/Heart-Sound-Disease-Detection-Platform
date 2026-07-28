import {
  FaCloudUploadAlt,
  FaBrain,
  FaHeartbeat,
  FaFileMedical,
} from "react-icons/fa";

import "../styles/howitworks.css";

function HowItWorks() {
  const steps = [
    {
      icon: <FaCloudUploadAlt />,
      title: "Upload Recording",
      description:
        "Upload a heart sound recording in WAV format securely to the platform.",
    },
    {
      icon: <FaBrain />,
      title: "AI Analysis",
      description:
        "Our trained machine learning model processes the heart sound automatically.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Prediction",
      description:
        "The system predicts whether the recording is normal or abnormal.",
    },
    {
      icon: <FaFileMedical />,
      title: "Download Report",
      description:
        "Generate a professional medical report for future reference.",
    },
  ];

  return (
    <section className="work-section">

      <div className="work-header">

        <span>HOW IT WORKS</span>

        <h2>
          AI Diagnosis in
          <br />
          Four Simple Steps
        </h2>

      </div>

      <div className="work-grid">

        {steps.map((step, index) => (

          <div className="work-card" key={index}>

            <div className="step-number">
              {index + 1}
            </div>

            <div className="work-icon">
              {step.icon}
            </div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default HowItWorks;