'use client'
import Link from "next/link";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";  

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-opacity-30 backdrop-blur-md shadow-md w-[100vw]">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-black text-xl font-bold">Chhaya Party Plot</div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-black focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 pl-6">
          {['Home', 'About Us', 'Events', 'Services', 'Gallery', 'Contact'].map((item, index) => (
            <Link 
              key={index} 
              href="#" 
              className="text-black hover:text-green-200 uppercase text-sm tracking-wide border-b-2 border-transparent hover:border-green-200 transition duration-300"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white/30 backdrop-blur-lg shadow-md flex flex-col p-6 md:hidden font-bold ">
            {['Home', 'About Us', 'Events', 'Services', 'Gallery', 'Contact'].map((item, index) => (
              <Link 
                key={index} 
                href="#" 
                className="text-black hover:text-green-200 uppercase text-sm tracking-wide py-2 border-b border-black"
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;