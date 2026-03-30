"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Link from "next/link";

import Carousel1 from "./components/Carousel";
import { Footer } from "./components/footer";
import Dock from "./components/connection";
import Features from "./components/features";
import VenueShowcase from "./components/venue";
import Services from "./components/services";

import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaPhone } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert(`Phone number ${text} copied to clipboard!`);
    })
    .catch((err) => console.error("Failed to copy:", err));
};

const items = [
  {
    icon: <FaWhatsapp size={18} color="#25D366" />,
    label: "WhatsApp",
    onClick: () => window.open("https://wa.me/917600616660", "_blank"),
  },
  {
    icon: <FaInstagram size={18} color="#E4405F" />,
    label: "Instagram",
    onClick: () =>
      window.open("https://www.instagram.com/chhaya_partyplot", "_blank"),
  },
  {
    icon: <FaPhone size={18} color="#34B7F1" />,
    label: "Call",
    onClick: () => copyToClipboard("+91 76006 16660"),
  },
  {
    icon: <FaMapMarkerAlt size={18} color="#d9534f" />,
    label: "Map",
    onClick: () =>
      window.open(
        "https://www.google.com/maps/place/Chhaya+Party+Plot/@20.7288678,73.0306851,17z/data=!3m1!4b1!4m6!3m5!1s0x3be0ed1aac0027a3:0xa2d6c4b636ce3d7f!8m2!3d20.7288678!4d73.0306851!16s%2Fg%2F11v0y548kr?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D",
        "_blank",
      ),
  },
];

const images = [
  { id: 1, img: "/p1.jpeg" },
  { id: 2, img: "/p2.jpeg" },
  { id: 3, img: "/p3.jpeg" },
  { id: 4, img: "/p4.jpeg" },
  { id: 5, img: "/p1.jpeg" },
];

export default function Home() {
  const [cardDimensions, setCardDimensions] = useState({
    width: 500,
    height: 500,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth < 768) {
        setCardDimensions({
          width: 300,
          height: 300,
        });
      } else {
        setCardDimensions({
          width: 500,
          height: 500,
        });
      }
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Carousel */}
      <div className="fixed top-0 left-0 w-full h-[90vh] z-20">
        <Carousel1 />
      </div>

      {/* Main Content */}
      <div className="flex-grow relative z-20 mt-[100vh] bg-[#FEFFF1]">
        {/* Heading */}
        <div className="px-6 md:px-12 lg:px-24 py-5">
          <h1 className="text-3xl md:text-5xl font-serif text-[#5a4a31] tracking-wide leading-tight text-center">
            Welcome to{" "}
            <span className="text-green-800 font-extrabold italic drop-shadow-lg">
              Chhaya Party Plot
            </span>
          </h1>

          <Features />

          <VenueShowcase />
        </div>

        <Services />
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating Dock */}
      <Dock items={items} />
    </main>
  );
}
