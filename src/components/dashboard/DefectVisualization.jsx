import React from 'react';
import Card from '../common/Card';
// Defect Visualization Component
const DefectVisualization = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Defect Data Visualization</h3>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <h4 className="text-sm text-gray-400 mb-2">Defect Occurrence</h4>
          <div className="text-4xl font-bold mb-1">12</div>
          <div className="text-sm text-green-400 mb-6">Last 24 Hours • 5%</div>
          <div className="flex gap-2 h-32">
            <div className="flex-1 bg-gray-700 rounded relative">
              <div className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded" style={{height: '45%'}}></div>
            </div>
            <div className="flex-1 bg-gray-700 rounded relative">
              <div className="absolute bottom-0 left-0 right-0 bg-blue-500/50 rounded" style={{height: '75%'}}></div>
            </div>
          </div>
<div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Broken Rails</span>
            <span>Fastener Fails</span>
          </div>
        </Card>

        <Card>
          <h4 className="text-sm text-gray-400 mb-2">Defect Severity</h4>
          <div className="text-4xl font-bold mb-1">High</div>
          <div className="text-sm text-red-400 mb-6">Last 24 Hours • 5%</div>
          <div className="space-y-3">
            {[
              { section: 'Section A', width: '65%' },
              { section: 'Section B', width: '85%' },
              { section: 'Section C', width: '45%' },
            ].map((item, idx) => (
<div key={idx} className="flex items-center gap-2">
                <span className="text-sm text-gray-400 w-20">{item.section}</span>
                <div className="flex-1 bg-gray-700 rounded-full h-6 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 bg-blue-500 rounded-full" style={{width: item.width}}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
  </div>
);
};

export default DefectVisualization;