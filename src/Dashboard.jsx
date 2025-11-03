// Main Dashboard Component
import React, { useState } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import OverviewCards from './components/dashboard/OverviewCards';
import RealTimeAlerts from './components/dashboard/RealTimeAlerts';
import DefectVisualization from './components/dashboard/DefectVisualization';
import TrackSchematic from './components/dashboard/TrackSchematic';
export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('Dashboard');

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 overflow-auto">
        <Header />
        <div className="p-6">
          <OverviewCards />
          <RealTimeAlerts />
          <DefectVisualization />
          <TrackSchematic />
        </div>
      </div>
   </div>
  );
}