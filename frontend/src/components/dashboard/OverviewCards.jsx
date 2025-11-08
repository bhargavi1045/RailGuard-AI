// Overview Cards Component
import React from 'react';
import Card from '../common/Card';
const OverviewCards = () => {
  const cards = [
    { label: 'Active Alerts', value: '3' },
    { label: 'Sensors Online', value: '125' },
    { label: 'Sections Monitored', value: '15' },
    { label: 'Last Update', value: '10:30' },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Overview</h3>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <Card key={idx}>
            <div className="text-gray-400 text-sm mb-2">{card.label}</div>
            <div className="text-3xl font-bold">{card.value}</div>
          </Card>
        ))}
      </div>
  </div>
);
};

export default OverviewCards;