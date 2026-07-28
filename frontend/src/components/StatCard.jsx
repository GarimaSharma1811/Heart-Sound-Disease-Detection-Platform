import "../styles/dashboard.css";

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div>
          <h4>{title}</h4>
          <h2>{value}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="stat-icon">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;