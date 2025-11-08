// Track Schematic Component
import React from 'react';

const TrackSchematic = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Track Schematic</h3>
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 h-80 relative overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 520 300">
          <rect x="0" y="0" width="260" height="300" fill="#a7f3d0" opacity="0.3"/>
          <rect x="260" y="0" width="260" height="300" fill="#fcd34d" opacity="0.2"/>
          
          <path d="M 100 0 Q 120 100 110 150 Q 100 200 120 300" fill="#7dd3fc" opacity="0.4" stroke="#0ea5e9" strokeWidth="2"/>
          <path d="M 120 0 Q 140 100 130 150 Q 120 200 140 300" fill="#7dd3fc" opacity="0.3" stroke="#0ea5e9" strokeWidth="1"/>
          
 <circle cx="180" cy="140" r="50" fill="#34d399" opacity="0.2"/>
          <circle cx="200" cy="160" r="35" fill="#34d399" opacity="0.25"/>
          <circle cx="160" cy="160" r="40" fill="#34d399" opacity="0.2"/>
          
          <g>
            <circle cx="90" cy="120" r="8" fill="#0ea5e9" stroke="#fff" strokeWidth="2"/>
            <text x="90" y="145" fontSize="12" fill="#fff" textAnchor="middle">Park Core</text>
          </g>
          
          <g>
            <text x="380" y="190" fontSize="14" fill="#6b7280" textAnchor="middle">Abbeyville</text>
          </g>
          
          <g>
            <text x="420" y="250" fontSize="14" fill="#6b7280" textAnchor="middle">Trincup</text>
          </g>
<g opacity="0.1">
            {[...Array(10)].map((_, i) => (
              <line key={`v${i}`} x1={i * 52} y1="0" x2={i * 52} y2="300" stroke="#fff" strokeWidth="1"/>
            ))}
            {[...Array(6)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 50} x2="520" y2={i * 50} stroke="#fff" strokeWidth="1"/>
            ))}
          </g>
        </svg>
      </div>
    </div>
 );
};

export default TrackSchematic;