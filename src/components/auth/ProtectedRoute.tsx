"use client";

import { useState, useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  storageKey?: string; // Optional key for localStorage to differentiate pages
}

export default function ProtectedRoute({
  children,
  storageKey = "authenticated",
}: ProtectedRouteProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For toggling visibility

  // Check localStorage on mount with expiration
  useEffect(() => {
    const authData = localStorage.getItem(storageKey);
    if (authData) {
      const { authenticated, timestamp } = JSON.parse(authData);
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
      if (authenticated && Date.now() - timestamp < oneHour) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem(storageKey); // Clear expired auth
      }
    }
  }, [storageKey]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const { success } = await res.json();
      if (success) {
        setIsAuthenticated(true);
        // Store with timestamp for expiration
        localStorage.setItem(
          storageKey,
          JSON.stringify({ authenticated: true, timestamp: Date.now() })
        );
      } else {
        alert("Wrong password, try again!");
        setPassword("");
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      alert("Something went wrong, try again!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-purple-800 mb-4">
            SipSense Demo
          </h1>
          <p className="text-gray-600 mb-4">
            Enter the password to access this section
          </p>
          <form onSubmit={handlePasswordSubmit} className="relative">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-2 pr-10 border border-gray-300 rounded-lg mb-4 w-full max-w-xs dark:text-gray-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 py-auto"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
