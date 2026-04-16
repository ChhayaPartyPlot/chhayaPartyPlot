"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FiLogOut, FiMenu, FiUserPlus, FiX } from "react-icons/fi";
import { useAuth } from "../src/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { isLoggedIn, setLoggedIn } = useAuth();

  /* ================= Scroll Lock ================= */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  /* ================= Handlers ================= */

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    setLoggedIn(false);
    router.push("/login");
  };

  const handleNewAdmin = () => {
    router.push("/admin");
  };

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        bg-white/90 backdrop-blur-md
        border-b border-[#e4e7b2]
        shadow-sm
      "
    >
      {/* Container */}
      <nav
        className="
          max-w-7xl
          mx-auto
          px-4 sm:px-6 lg:px-8
          h-16
          flex
          items-center
          justify-between
        "
      >
        {/* ================= Logo ================= */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Chhaya Party Plot Logo"
            className="
              h-10
              sm:h-12
              w-auto
              object-contain
            "
          />
        </Link>

        {/* ================= Mobile Button ================= */}
        <button
          aria-label="Toggle Menu"
          title="Menu"
          onClick={() => setIsOpen(!isOpen)}
          className="
lg:hidden
    flex items-center justify-center
    w-10 h-10
    rounded-full
    text-black
    hover:bg-[#c3ca6d]!
    hover:text-white
    transition-all duration-200

  "
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>

        {/* ================= Desktop Menu ================= */}
        <div
          className="
       hidden lg:flex
            items-center
            gap-8
          "
        >
          {[
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
            { name: "Gallery", path: "/gallery" },
            { name: "Enquiry", path: "/reservation" },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`
                uppercase
                text-sm
                tracking-wide
                transition
                ${
                  pathname === item.path
                    ? "text-[#7a8740]! font-semibold"
                    : "text-black hover:text-[#c3ca6d]!"
                }
              `}
            >
              {item.name}
            </Link>
          ))}

          {/* Admin Buttons */}
          {isLoggedIn && (
            <div className="flex items-center gap-2 ml-3">
              {/* New Admin */}
              <button
                onClick={handleNewAdmin}
                aria-label="New Admin"
                title="New Admin"
                className="
      flex items-center justify-center

      w-10 h-10
      rounded-full

      text-black
      bg-gray-100

      hover:bg-[#c3ca6d]
      hover:text-white

      transition-all duration-200

      shadow-sm
      hover:shadow-md
    "
              >
                <FiUserPlus size={18} />
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                aria-label="Logout"
                title="Logout"
                className="
      flex items-center justify-center

      w-10 h-10
      rounded-full

      text-red-500
      bg-red-50

      hover:bg-red-100
      hover:text-red-600

      transition-all duration-200

      shadow-sm
      hover:shadow-md

      focus:outline-none
      focus:ring-2
      focus:ring-red-400
      focus:ring-offset-1
    "
              >
                <FiLogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ================= Mobile / Tablet Menu ================= */}
      <div
        className={`
    lg:hidden
    fixed
    left-0
    top-16
    w-full
    z-40

    bg-white/95
    backdrop-blur-md

    shadow-xl

    transform
    transition-all
    duration-300
    ease-in-out

    ${
      isOpen
        ? "opacity-100 translate-y-0 visible"
        : "opacity-0 -translate-y-3 invisible"
    }
  `}
      >
        <div className="px-4 py-3 space-y-2">
          {[
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
            { name: "Gallery", path: "/gallery" },
            { name: "Enquiry", path: "/reservation" },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={`
                block
                px-4
                py-3
                rounded-lg
                font-medium
                transition
                ${
                  pathname === item.path
                    ? "bg-[#7a8740]! text-white"
                    : "text-black hover:bg-[#c3ca6d]/20!"
                }
              
              `}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Admin Buttons */}
          {isLoggedIn && (
            <div className=" border-t  space-y-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleNewAdmin();
                }}
                className="
                  w-full
                  text-left
                  px-4 py-3
                  rounded-lg
                  hover:bg-gray-100
                "
              >
                New Admin
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="
                  w-full
                  text-left
                  px-4 py-3
                  rounded-lg
                  hover:bg-gray-100
                "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
