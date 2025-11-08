import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("Railway Authority");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target).entries());
    if (isSignup) data.role = role;

    try {
      const res = await fetch(`http://localhost:5000/api/auth/${isSignup ? "signup" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Server Response:", result);

      if (!result.success) {
        alert(result.message || "Something went wrong");
        return;
      }

      // ✅ Store token and user info
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role);
      localStorage.setItem("name", result.name);

      // ✅ Redirect based on role
      if (result.role === "Railway Authority") navigate("/dashboard");
      else navigate("/dashboard-train-driver");

    } catch (err) {
      console.error("Auth Error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              name="name"
              placeholder="Full Name"
              required
              className="w-full border px-3 py-2 rounded"
            />
          )}

          <input
            name="email"
            placeholder="Email"
            type="email"
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full border px-3 py-2 rounded"
          />

          {isSignup && (
            <div className="flex justify-around">
              <button
                type="button"
                onClick={() => setRole("Railway Authority")}
                className={`px-3 py-1 rounded-full border ${
                  role === "Railway Authority" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                Railway Authority
              </button>
              <button
                type="button"
                onClick={() => setRole("Train Driver")}
                className={`px-3 py-1 rounded-full border ${
                  role === "Train Driver" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                Train Driver
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            type="button"
            className="text-blue-600 font-medium hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
