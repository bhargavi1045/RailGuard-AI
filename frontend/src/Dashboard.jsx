// Main Dashboard Component
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import OverviewCards from "./components/dashboard/OverviewCards";
import RealTimeAlerts from "./components/dashboard/RealTimeAlerts";
import DefectVisualization from "./components/dashboard/DefectVisualization";
import TrackSchematic from "./components/dashboard/TrackSchematic";
import UploadTrack from "./components/dashboard/UploadTrack";

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Step 1: Check localStorage for token + role
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    const userName = localStorage.getItem("name");

    // Step 2: Redirect if not logged in
    if (!token) {
      navigate("/");
      return;
    }

    // Step 3: Role-based protection
    if (userRole !== "Railway Authority") {
      alert("Unauthorized access! Redirecting to your dashboard...");
      navigate("/dashboard-train-driver");
      return;
    }

    // Step 4: Set user info for display (optional)
    setUser({ name: userName, role: userRole });
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 bg-gray-800 overflow-auto">
        <Header />
        <div className="p-6">

          <OverviewCards />
          <RealTimeAlerts />
          <DefectVisualization />
          <TrackSchematic />
          <UploadTrack />
        </div>
      </div>
    </div>
  );
}
