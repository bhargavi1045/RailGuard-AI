// src/Profile.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./components/layout/Sidebar"; // your sidebar
import Header from "./components/layout/Header"; // optional header

export default function Profile() {
  const [activeNav, setActiveNav] = useState("Profile");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("name") || "");
    setEmail(localStorage.getItem("email") || "");
    setRole(localStorage.getItem("role") || "");
  }, []);

  const handleUpdate = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    setMessage("Profile updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col bg-gray-800 overflow-auto">
        <Header />

        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-400 mb-6">Manage your account details</p>

          {message && (
            <div className="bg-green-700 text-white px-4 py-2 rounded mb-4">
              {message}
            </div>
          )}

          {/* Profile form aligned to left */}
          <div className="flex flex-col w-full max-w-lg">
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mb-4 bg-gray-800 rounded border border-gray-600 text-gray-400 "
            />

            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 bg-gray-800 rounded border border-gray-600 text-gray-400 "
            />

            <label className="block mb-2 font-semibold">Role</label>
            <input
              type="text"
              value={role}
              disabled
              className="w-full p-3 mb-4 bg-gray-700 rounded text-gray-400 cursor-not-allowed"
            />

            <button
              onClick={handleUpdate}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold mt-2"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
