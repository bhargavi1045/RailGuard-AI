import React from 'react';
import { User } from 'lucide-react';
// Header Component
const Header = () => {
  return (
    <div className="bg-gray-900 border-b border-gray-800 p-6 flex items-center justify-between">
      <h2 className="text-2xl font-bold">RailGuard</h2>
      <div className="flex items-center gap-4">
        <span className="text-gray-400">Today, July 05, 2025</span>
        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
      </div>
   </div>
 );
};

export default Header;