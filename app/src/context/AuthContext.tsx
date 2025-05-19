// src/context/AuthContext.tsx
'use client';
import Cookies from 'js-cookie'; // <-- import js-cookie
import { useEffect } from 'react';
import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';
type AuthContextType = {
  isLoggedIn: boolean;
  setLoggedIn: (val: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = Cookies.get('session_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn: setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
