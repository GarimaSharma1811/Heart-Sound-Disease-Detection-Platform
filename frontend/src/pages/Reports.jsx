import { useEffect, useState } from "react";
import {
  FaDownload,
  FaPrint,
  FaSearch,
} from "react-icons/fa";
import api from "../services/api";

function Reports() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/predictions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReports(response.data.history);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredReports = reports.filter((report) =>
    report.patientName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            color: "#1f2937",
            marginBottom: "10px",
          }}
        >
          Medical Reports
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "30px",
          }}
        >
          Download and manage AI generated heart sound reports.
        </p>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "30px",
            boxShadow: "0 10px 25px rgba(0,0,0,.05)",
          }}
        >
          <FaSearch color="#5B6EF5" />

          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "16px",
            }}
          />
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(0,0,0,.06)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead
              style={{
                background: "#EEF2FF",
              }}
            >
              <tr>
                <th style={th}>Patient</th>
                <th style={th}>Prediction</th>
                <th style={th}>Confidence</th>
                <th style={th}>Date</th>
                <th style={th}>File</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((report) => (
                <tr key={report._id}>
                  <td style={td}>{report.patientName}</td>

                  <td
                    style={{
                      ...td,
                      color:
                        report.prediction === "Normal"
                          ? "#16a34a"
                          : "#dc2626",
                      fontWeight: "600",
                    }}
                  >
                    {report.prediction}
                  </td>

                  <td style={td}>
                    {report.confidence.toFixed(2)}%
                  </td>

                  <td style={td}>
                    {new Date(
                      report.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td style={td}>{report.filename}</td>

                  <td style={td}>
                    <button style={downloadBtn}>
                      <FaDownload />
                    </button>

                    <button style={printBtn}>
                      <FaPrint />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredReports.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const th = {
  padding: "18px",
  textAlign: "left",
};

const td = {
  padding: "18px",
  borderBottom: "1px solid #eee",
};

const downloadBtn = {
  background: "#5B6EF5",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  marginRight: "10px",
  cursor: "pointer",
};

const printBtn = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Reports;