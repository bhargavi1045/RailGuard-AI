// pages/Alerts.jsx
import React, { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

export default function Alerts() {
  const [activeNav, setActiveNav] = useState("Alerts");
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setError("Unauthorized");

      try {
        const res = await fetch("http://localhost:5000/api/alerts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setAlerts(data.alerts);
        } else {
          setError("Failed to fetch alerts");
        }
      } catch (err) {
        console.error(err);
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 bg-gray-800 overflow-auto">
        <Header />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Latest Alerts</h1>

          {loading && <p>Loading alerts...</p>}
          {error && (
            <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 mb-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {!loading && !error && alerts.length === 0 && (
            <p className="text-gray-400">No alerts yet.</p>
          )}

          <ul className="space-y-4 ">
            {alerts.map((alert) => (
              <li
                key={alert._id}
                className="bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center"
              >
                <div>
                  <p className="font-semibold text-lg">{alert.message}</p>
                  <p className="text-sm text-gray-400">
                    Confidence: {alert.confidence}%
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
                {alert.imageUrl && (
                  <img
                    src={alert.imageUrl}
                    alt="Track alert"
                    className="w-32 h-32 object-cover rounded mt-2 md:mt-0"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
