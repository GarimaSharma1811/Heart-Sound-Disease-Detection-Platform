import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaTrash,
  FaEye,
  FaFileMedical,
} from "react-icons/fa";
import api from "../services/api";

function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/predictions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory(response.data.history);
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = (prediction) => {
    navigate("/result", {
      state: {
        prediction,
      },
    });
  };

  const handleDownloadReport = async (item) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        `/reports/${item._id}/report`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `Heart_Report_${item.patientName}.pdf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert("Unable to generate report.");
    }
  };

  const filteredHistory = history.filter((item) =>
    item.patientName
      ?.toLowerCase()
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
          Prediction History
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "30px",
          }}
        >
          View all previously analyzed heart sound recordings.
        </p>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "25px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,.05)",
          }}
        >
          <FaSearch color="#5B6EF5" />

          <input
            type="text"
            placeholder="Search patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
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
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredHistory.map((item) => (
                <tr key={item._id}>
                  <td style={td}>{item.patientName}</td>

                  <td
                    style={{
                      ...td,
                      color:
                        item.prediction === "Normal"
                          ? "#16a34a"
                          : "#dc2626",
                      fontWeight: "600",
                    }}
                  >
                    {item.prediction}
                  </td>

                  <td style={td}>
                    {item.confidence.toFixed(2)}%
                  </td>

                  <td style={td}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td style={td}>
                    <button
                      style={viewBtn}
                      onClick={() => handleView(item)}
                      title="View Prediction"
                    >
                      <FaEye />
                    </button>

                    <button
                      style={reportBtn}
                      onClick={() => handleDownloadReport(item)}
                      title="Generate Report"
                    >
                      <FaFileMedical />
                    </button>

                    <button
                      style={deleteBtn}
                      title="Delete Prediction"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredHistory.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    No prediction history found.
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

const viewBtn = {
  background: "#5B6EF5",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  marginRight: "8px",
  cursor: "pointer",
};

const reportBtn = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  marginRight: "8px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default History;