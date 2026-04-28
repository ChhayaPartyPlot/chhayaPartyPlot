"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NewAdmin = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  /* =========================
     HANDLE SUBMIT
  ========================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage(null);
    setError(null);

    if (!username || !password) {
      setError("Please fill both username and password.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("/api/admin/register", {
        // ✅ fixed path
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ important
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      setMessage("Admin registered successfully!");
      setIsRegistered(true);

      // Clear fields
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError("Failed to register. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     SUCCESS SCREEN
  ========================= */

  if (isRegistered) {
    return (
      <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Admin registered successfully!
        </h2>

        <p className="mb-6">You can now proceed to the reservation page.</p>

        <button
          onClick={() => router.push("/reservation")}
          className="bg-green-600 hover:bg-green-700 
                     text-white px-6 py-2 rounded font-semibold"
        >
          Go to Reservation
        </button>
      </div>
    );
  }

  /* =========================
     FORM UI
  ========================= */

  return (
    <div className="max-w-md mx-auto mt-50 p-6 bg-white rounded shadow-md ">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Admin</h2>

      {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}

      {message && (
        <p className="mb-4 text-green-600 font-semibold">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* USERNAME */}

        <div>
          <label htmlFor="username" className="block mb-1 font-medium">
            Username
          </label>

          <input
            type="text"
            id="username"
            placeholder="Enter username"
            className="w-full border border-gray-300 rounded 
                       px-3 py-2 focus:outline-none 
                       focus:ring-2 focus:ring-green-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        {/* PASSWORD */}

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>

          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="w-full border border-gray-300 rounded 
                       px-3 py-2 focus:outline-none 
                       focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <p className="text-sm text-gray-500 mt-1">Minimum 4 characters</p>
        </div>

        {/* BUTTON */}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded text-white font-bold transition
          ${
            isLoading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isLoading ? "Registering..." : "Register Admin"}
        </button>
      </form>
    </div>
  );
};

export default NewAdmin;
