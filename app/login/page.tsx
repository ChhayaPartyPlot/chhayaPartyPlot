'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../src/context/AuthContext'; 
import Cookies from 'js-cookie'; // <-- import js-cookie

const Page = () => {
  const router = useRouter();
  const { setLoggedIn } = useAuth();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check cookie on mount
  useEffect(() => {
    const token = Cookies.get('session_token'); // Change 'token' to whatever your cookie name is
    if (token) {
      setLoggedIn(true);
      router.push('/reservation');
    }
  }, [router, setLoggedIn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        setSuccess('');
      } else {
        setSuccess(data.message);
        setError('');
        setLoggedIn(true);
        router.push('/reservation');
      }
    } catch (err) {
      setError('Something went wrong');
      setSuccess('');
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', backgroundColor: '#e0f7fa'
    }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex', flexDirection: 'column', gap: '1rem',
        width: '300px', padding: '2rem', borderRadius: '8px',
        backgroundColor: '#ffffff', border: '1px solid #ccc',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ color: '#00796b' }}>Login</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: '0.5rem', borderRadius: '4px',
            border: '1px solid #ccc', backgroundColor: '#f9f9f9'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '0.5rem', borderRadius: '4px',
            border: '1px solid #ccc', backgroundColor: '#f9f9f9'
          }}
        />
        <button type="submit" style={{
          padding: '0.75rem', backgroundColor: '#00796b',
          color: '#ffffff', border: 'none', borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Login
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
};

export default Page;