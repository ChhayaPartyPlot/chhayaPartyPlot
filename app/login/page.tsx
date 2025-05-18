'use client';
import React, { useState } from 'react';

const Page = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Password:', password);
    // Add login logic here
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#e0f7fa' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px', padding: '2rem', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #ccc', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#00796b' }}>Login</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}
        />
        <button
          type="submit"
          style={{ padding: '0.75rem', backgroundColor: '#00796b', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Page;