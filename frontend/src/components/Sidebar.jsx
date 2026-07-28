import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHeartbeat,
  FaHome,
  FaCloudUploadAlt,
  FaHistory,
  FaFileMedical,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <FaHeartbeat className="logo-icon" />

        <div>
          <h2>HeartAI</h2>
          <p>Detection Platform</p>
        </div>
      </div>

      <nav>
        <NavLink to="/dashboard" className="sidebar-link">
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/upload" className="sidebar-link">
          <FaCloudUploadAlt />
          Upload
        </NavLink>

        <NavLink to="/history" className="sidebar-link">
          <FaHistory />
          History
        </NavLink>

        <NavLink to="/reports" className="sidebar-link">
          <FaFileMedical />
          Reports
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;