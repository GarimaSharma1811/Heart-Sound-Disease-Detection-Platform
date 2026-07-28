import "../styles/dashboard.css";

function RecentPredictions() {
  return (
    <div className="recent-card">

      <div className="recent-header">

        <h3>Recent Predictions</h3>

        <button className="view-all-btn">
          View All
        </button>

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

          <tr>
            <td colSpan="4" className="empty-row">
              No predictions available yet.
            </td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default RecentPredictions;