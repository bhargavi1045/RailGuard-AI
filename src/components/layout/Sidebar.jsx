// Sidebar Component
import React from 'react';
import { Home, Bell, FileText, Settings, User, Menu } from 'lucide-react';
const Sidebar = ({ activeNav, setActiveNav }) => {
  const navItems = [
    { name: 'Dashboard', icon: Home },
    { name: 'Alerts', icon: Bell },
    { name: 'Reports', icon: FileText },
    { name: 'Settings', icon: Settings },
    { name: 'Profile', icon: User },
  ];

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Menu className="w-6 h-6" />
          <h1 className="text-xl font-bold">RailGuard</h1>
        </div>
      </div>
<nav className="flex-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => setActiveNav(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeNav === item.name
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
</div>
);
};

export default Sidebar;
