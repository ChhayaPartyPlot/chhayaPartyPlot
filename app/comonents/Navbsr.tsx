'use client'
import Link from "next/link";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className=" sticky top-0 left-0 right-0 z-50  bg-opacity-30 backdrop-blur-md shadow-md">
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
        <div className="hidden md:flex space-x-8">
          <Link href="#" className="text-black hover:text-green-200 uppercase text-sm tracking-wide">
            Home
          </Link>
          <Link href="#" className="text-black hover:text-green-200 uppercase text-sm tracking-wide">
            About Us
          </Link>
          <Link href="#" className="text-black hover:text-green-200 uppercase text-sm tracking-wide">
            Events
          </Link>
          <Link href="#" className="text-black hover:text-green-200 uppercase text-sm tracking-wide">
            Services
          </Link>
          <Link href="#" className="text-black hover:text-green-200 uppercase text-sm tracking-wide">
            Gallery
          </Link>
          <Link href="#" className="text-black hover:text-green-200 uppercase text-sm tracking-wide">
            Contact
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col space-y-4 p-6 md:hidden">
            <Link href="#" className="text-black hover:text-green-200 uppercase text-sm tracking-wide">
              Home
            </Link>
            <Link href="#" className="text-black hover:text-green-200 uppercase text-sm tracking-wide">
              About Us
            </Link>
            <Link href="#" className="text-black hover:text-green-200 uppercase text-sm tracking-wide">
              Events
            </Link>
            <Link href="#" className="text-black hover:text-green-200 uppercase text-sm tracking-wide">
              Services
            </Link>
            <Link href="#" className="text-black hover:text-green-200 uppercase text-sm tracking-wide">
              Gallery
            </Link>
            <Link href="#" className="text-black hover:text-green-200 uppercase text-sm tracking-wide">
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;