import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function RecentPredictions({ predictions }) {
  return (
    <div className="recent-card">
      <div className="recent-header">
        <h3>Recent Predictions</h3>

        <Link to="/history" className="view-all-btn">
          View All
        </Link>
      </div>

      <table className="prediction-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Prediction</th>
            <th>Confidence</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {predictions.length > 0 ? (
            predictions.map((item) => (
              <tr key={item._id}>
                <td>{item.patientName}</td>

                <td
                  style={{
                    color:
                      item.prediction === "Normal"
                        ? "#16a34a"
                        : "#dc2626",
                    fontWeight: "600",
                  }}
                >
                  {item.prediction}
                </td>

                <td>{item.confidence.toFixed(2)}%</td>

                <td>
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="empty-row">
                No predictions available yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentPredictions;