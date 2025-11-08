// components/dashboard/RealTimeAlertsDriver.jsx
import React, { useEffect, useState } from "react";

export default function RealTimeAlertsDriver() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchAlerts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/alerts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setAlerts(data.alerts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAlerts();

    // Poll every 10 seconds
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!alerts.length) return <p className="text-gray-400">No alerts</p>;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Real-Time Defective Track Alerts</h2>
      <ul>
        {alerts.map((alert) => (
          <li
            key={alert._id}
            className="mb-2 p-3 bg-red-600 rounded-lg text-white flex justify-between items-center"
          >
            <div>
              <p>{alert.message || "Track Defective!"}</p>
              <p className="text-sm">Confidence: {alert.confidence}%</p>
              <p className="text-xs">{new Date(alert.timestamp).toLocaleString()}</p>
            </div>
            <img
              src={alert.imageUrl}
              alt="Track alert"
              className="w-16 h-16 object-cover rounded"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
