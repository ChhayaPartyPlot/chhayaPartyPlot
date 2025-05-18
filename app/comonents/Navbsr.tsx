'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../src/context/AuthContext'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { isLoggedIn, setLoggedIn } = useAuth();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    setLoggedIn(false);
    router.push('/login'); // redirect after logout
  };

  const handleNewAdmin = () => {
    router.push('/admin'); // Change route if needed
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-opacity-30 backdrop-blur-md shadow-md w-[100vw]">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-13" />
          <div className="text-black text-xl font-bold">Chhaya Party Plot</div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 pl-6 items-center">
          <Link
            href="/"
            className={`uppercase text-sm tracking-wide transition duration-300 ${
              pathname === '/' ? 'text-green-500 font-bold' : 'text-black hover:text-green-200'
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`uppercase text-sm tracking-wide transition duration-300 ${
              pathname === '/about' ? 'text-green-500 font-bold' : 'text-black hover:text-green-200'
            }`}
          >
            About Us
          </Link>
          <Link
            href="/gallery"
            className={`uppercase text-sm tracking-wide transition duration-300 ${
              pathname === '/gallery' ? 'text-green-500 font-bold' : 'text-black hover:text-green-200'
            }`}
          >
            Gallery
          </Link>
          <Link
            href="/reservation"
            className={`uppercase text-sm tracking-wide transition duration-300 ${
              pathname === '/reservation' ? 'text-green-500 font-bold' : 'text-black hover:text-green-200'
            }`}
          >
            Reservation
          </Link>

          {/* Show buttons if logged in */}
          {isLoggedIn && (
            <>
              <button
                onClick={handleNewAdmin}
                className="ml-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                New Admin
              </button>
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white/30 backdrop-blur-lg shadow-md flex flex-col p-6 md:hidden font-bold">
            <Link
              href="/"
              className={`text-black uppercase text-sm tracking-wide py-2 ${
                pathname === '/' ? 'text-green-500 font-bold' : 'hover:text-green-200'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-black uppercase text-sm tracking-wide py-2 ${
                pathname === '/about' ? 'text-green-500 font-bold' : 'hover:text-green-200'
              }`}
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/gallery"
              className={`text-black uppercase text-sm tracking-wide py-2 ${
                pathname === '/gallery' ? 'text-green-500 font-bold' : 'hover:text-green-200'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/reservation"
              className={`text-black uppercase text-sm tracking-wide py-2 ${
                pathname === '/reservation' ? 'text-green-500 font-bold' : 'hover:text-green-200'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Reservation
            </Link>

            {/* Buttons mobile */}
            {isLoggedIn && (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleNewAdmin();
                  }}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  New Admin
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
