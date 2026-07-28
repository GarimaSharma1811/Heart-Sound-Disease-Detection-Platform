import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaFileAudio,
  FaUser,
  FaCalendarAlt,
  FaVenusMars,
} from "react-icons/fa";
import api from "../services/api";

function Upload() {
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientName || !age || !gender || !file) {
      alert("Please fill all fields and upload a WAV file.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("patientName", patientName);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("audio", file);

      const response = await api.post(
        "/predictions",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Prediction completed successfully!");

      navigate("/result", {
        state: response.data,
      });

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Prediction failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#1f2937",
          }}
        >
          Upload Heart Sound Recording
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "40px",
          }}
        >
          Enter patient information and upload a heart sound (.wav) recording.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "25px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                }}
              >
                <FaUser style={{ marginRight: "8px" }} />
                Patient Name
              </label>

              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient name"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                }}
              >
                <FaCalendarAlt style={{ marginRight: "8px" }} />
                Age
              </label>

              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: "1 / span 2" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                }}
              >
                <FaVenusMars style={{ marginRight: "8px" }} />
                Gender
              </label>

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                style={inputStyle}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div
            style={{
              border: "2px dashed #5B6EF5",
              borderRadius: "18px",
              padding: "40px",
              textAlign: "center",
              marginBottom: "30px",
              background: "#f8f9ff",
            }}
          >
            <FaCloudUploadAlt
              style={{
                fontSize: "60px",
                color: "#5B6EF5",
                marginBottom: "20px",
              }}
            />

            <h3>Upload WAV File</h3>

            <p style={{ color: "#6b7280" }}>
              Supported format: .wav
            </p>

            <input
              type="file"
              accept=".wav"
              onChange={handleFileChange}
              required
            />

            {file && (
              <div
                style={{
                  marginTop: "25px",
                  padding: "15px",
                  background: "#fff",
                  borderRadius: "12px",
                }}
              >
                <FaFileAudio
                  style={{
                    color: "#5B6EF5",
                    marginRight: "10px",
                  }}
                />

                <strong>{file.name}</strong>

                <br />

                <small>
                  {(file.size / 1024).toFixed(2)} KB
                </small>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              border: "none",
              borderRadius: "14px",
              background: "#5B6EF5",
              color: "white",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {loading ? "Analyzing..." : "Analyze Recording"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "16px",
  boxSizing: "border-box",
};

export default Upload;