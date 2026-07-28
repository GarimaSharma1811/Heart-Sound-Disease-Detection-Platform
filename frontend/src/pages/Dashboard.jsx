import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import RecentPredictions from "../components/RecentPredictions";

import {
  FaUsers,
  FaFileMedical,
  FaHeartbeat,
  FaBrain,
  FaCloudUploadAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import api from "../services/api";

import "../styles/dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalPatients: 0,
    totalReports: 0,
    recentPredictions: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboard(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1>Welcome Back 👋</h1>

            <p>AI-Powered Heart Sound Disease Detection Platform</p>
          </div>

          <Link to="/upload" className="upload-btn">
            <FaCloudUploadAlt />
            Upload Recording
          </Link>
        </div>

        <div className="stats-grid">
          <StatCard
            title="Patients"
            value={dashboard.totalPatients}
            subtitle="Analysed"
            icon={<FaUsers />}
          />

          <StatCard
            title="Reports"
            value={dashboard.totalReports}
            subtitle="Generated"
            icon={<FaFileMedical />}
          />

          <StatCard
            title="Accuracy"
            value="94.8%"
            subtitle="Current Model"
            icon={<FaHeartbeat />}
          />

          <StatCard
            title="Model"
            value="XGBoost"
            subtitle="Version 1.0"
            icon={<FaBrain />}
          />
        </div>

        <RecentPredictions
          predictions={dashboard.recentPredictions}
        />
      </main>
    </div>
  );
}

export default Dashboard;