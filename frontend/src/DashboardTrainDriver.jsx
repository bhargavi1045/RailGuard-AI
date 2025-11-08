import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import HeaderDriver from "./components/layout/HeaderDriver";
import OverviewCards from "./components/dashboard/OverviewCards";
import RealTimeAlerts from "./components/dashboard/RealTimeAlerts";
import UpcomingTrips from "./components/dashboard/UpcomingTrips";
import RealTimeAlertsDriver from "./components/dashboard/RealTimeAlertsDriver";

export default function DashboardTrainDriver() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [driver, setDriver] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    if (!token) {
      navigate("/");
      return;
    }

    if (role !== "Train Driver") {
      alert("Unauthorized access! Redirecting...");
      navigate("/dashboard");
      return;
    }

    setDriver({ name, role });
  }, [navigate]);

  // Mock upcoming trips
  const mockTrips = [
    { id: 1, route: "Mumbai → Pune", departure: "10:30 AM", status: "On Time" },
    { id: 2, route: "Pune → Nagpur", departure: "3:45 PM", status: "Delayed" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      <div className="flex-1 bg-gray-800 overflow-auto">
        <HeaderDriver />
        <div className="p-6">
          {/* Overview Cards */}
          <OverviewCards />

          {/* Real-time alerts */}
          <RealTimeAlertsDriver />

          {/* Upcoming trips section */}
          <UpcomingTrips trips={mockTrips} />
        </div>
      </div>
    </div>
  );
}
