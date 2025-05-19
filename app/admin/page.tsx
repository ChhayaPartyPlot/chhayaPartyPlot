'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const NewAdmin = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // Track success

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage(null);
    setError(null);
    setIsLoading(true);

    if (!username || !password) {
      setError('Please fill both username and password.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        setMessage('Admin registered successfully!');
        setIsRegistered(true); // Hide form, show message/link
      }
    } catch (err) {
      setError('Failed to register. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isRegistered) {
    return (
      <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Admin registered successfully!</h2>
        <p className="mb-6">You can now proceed to the reserve page.</p>
        <button
          onClick={() => router.push('/reservation')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
        >
          Go to Reserve
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Admin</h2>

      {error && (
        <p className="mb-4 text-red-600 font-semibold">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded text-white font-bold ${
            isLoading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isLoading ? 'Registering...' : 'Register Admin'}
        </button>
      </form>
    </div>
  );
};

export default NewAdmin;
