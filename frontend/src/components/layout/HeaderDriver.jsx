import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("name") || "User";
    setUsername(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-gray-100 shadow-md">
      
      {/* Left side: Welcome message */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Welcome, User!!</h1>
      </div>

      {/* Right side: Profile dropdown */}
      <div className="relative ml-auto">
        <button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">
              {username
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>
          <span className="hidden sm:block">{username}</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg z-50">
            {/* Navigate to Profile page */}
            <button
              onClick={() => {
                navigate("/profiledriver"); // <-- navigate instead of alert
                setDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-t-lg"
            >
              My Profile
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-b-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
