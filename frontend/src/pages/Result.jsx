import { useLocation, useNavigate } from "react-router-dom";
import {
  FaHeartbeat,
  FaUser,
  FaCalendarAlt,
  FaVenusMars,
  FaFileAudio,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.prediction) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "#f5f7fb",
        }}
      >
        <h2>No prediction found.</h2>

        <button onClick={() => navigate("/upload")}>
          Go Back
        </button>
      </div>
    );
  }

  const report = state.prediction;
  console.log(report);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "auto",
          background: "#fff",
          borderRadius: 20,
          padding: 40,
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 30 }}>
          Heart Sound Analysis Result
        </h1>

        <p><b>Patient:</b> {report.patientName}</p>
        <p><b>Age:</b> {report.age}</p>
        <p><b>Gender:</b> {report.gender}</p>
        <p><b>Audio:</b> {report.filename}</p>

        <p>
          <b>Prediction:</b>{" "}
          <span
            style={{
              color:
                report.prediction === "Normal"
                  ? "green"
                  : "red",
              fontWeight: "bold",
            }}
          >
            {report.prediction}
          </span>

          {report.prediction === "Normal" ? (
            <FaCheckCircle color="green" />
          ) : (
            <FaTimesCircle color="red" />
          )}
        </p>

        <p>
          <b>Confidence:</b>{" "}
          {report.confidence?.toFixed(2)}%
        </p>

        <p>
          <b>Sample Rate:</b> {report.sampleRate} Hz
        </p>

        <p>
          <b>Duration:</b> {report.duration} sec
        </p>

        {report.createdAt && (
          <p>
            <b>Date:</b>{" "}
            {new Date(report.createdAt).toLocaleString()}
          </p>
        )}

        <hr style={{ margin: "30px 0" }} />

        <h2>Waveform</h2>

        {report.waveform && (
          <img
            src={report.waveform}
            alt="Waveform"
            style={{ width: "100%", marginBottom: 30 }}
          />
        )}

        <h2>Spectrogram</h2>

        {report.spectrogram && (
          <img
            src={report.spectrogram}
            alt="Spectrogram"
            style={{ width: "100%", marginBottom: 30 }}
          />
        )}

        <h2>Mel Spectrogram</h2>

        {report.melSpectrogram && (
          <img
            src={report.melSpectrogram}
            alt="Mel Spectrogram"
            style={{ width: "100%", marginBottom: 30 }}
          />
        )}

        <h2>MFCC</h2>

        {report.mfcc && (
          <img
            src={report.mfcc}
            alt="MFCC"
            style={{ width: "100%", marginBottom: 30 }}
          />
        )}

        <button
          onClick={() => navigate("/history")}
          style={{
            width: "100%",
            padding: 15,
            background: "#5B6EF5",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          View Prediction History
        </button>
      </div>
    </div>
  );
}

export default Result;