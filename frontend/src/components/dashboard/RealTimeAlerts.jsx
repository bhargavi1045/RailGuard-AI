// Real-Time Alerts Component
import React from 'react';
import Badge from '../common/Badge';
const RealTimeAlerts = () => {
  const alerts = [
    { time: '10:30 AM', section: 'Section A', sensor: 'Sensor 1', severity: 'high', status: 'Alert' },
    { time: '10:25 AM', section: 'Section B', sensor: 'Sensor 2', severity: 'medium', status: 'Safe' },
    { time: '10:15 AM', section: 'Section A', sensor: 'Sensor 3', severity: 'low', status: 'OK' },
    { time: '10:10 AM', section: 'Section C', sensor: 'Sensor 4', severity: 'high', status: 'Alert' },
    { time: '10:05 AM', section: 'Section B', sensor: 'Sensor 5', severity: 'medium', status: 'Safe' },
  ];

 return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Real-Time Alerts</h3>
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-4 text-gray-400 font-medium">Time</th>
              <th className="text-left p-4 text-gray-400 font-medium">Section</th>
              <th className="text-left p-4 text-gray-400 font-medium">Sensor</th>
              <th className="text-left p-4 text-gray-400 font-medium">Severity</th>
              <th className="text-left p-4 text-gray-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
 {alerts.map((alert, idx) => (
              <tr key={idx} className="border-b border-gray-700 last:border-0">
                <td className="p-4">{alert.time}</td>
                <td className="p-4">{alert.section}</td>
                <td className="p-4">{alert.sensor}</td>
                <td className="p-4">
                  <Badge variant={alert.severity}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </Badge>
                </td>
                <td className="p-4">
                  <Badge variant={alert.status.toLowerCase()}>
                    {alert.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
   </div>
);
};

export default RealTimeAlerts;