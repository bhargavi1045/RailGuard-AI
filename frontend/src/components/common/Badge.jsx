import React, { useState } from 'react';
import { Home, Bell, FileText, Settings, User, Menu } from 'lucide-react';

// Badge Component
const Badge = ({ children, variant }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'high':
      case 'alert':
        return 'bg-red-900/30 text-red-400';
      case 'medium':
        return 'bg-orange-900/30 text-orange-400';
      case 'low':
        return 'bg-blue-900/30 text-blue-400';
      case 'safe':
        return 'bg-green-900/30 text-green-400';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${getVariantClasses()}`}>
      {children}
   </span>
);
};

export default Badge;
