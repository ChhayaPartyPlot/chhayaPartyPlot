"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";

/* Copy Phone */

const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success(`Phone number ${text} copied!`);
    })
    .catch(() => {
      toast.error("Failed to copy number");
    });
};

const BottomCTA = () => {
  return (
    <div
      className="
        mt-12 md:mt-16
        bg-gradient-to-r
        from-emerald-600
        to-green-600
        rounded-3xl
        px-6 md:px-12
        py-10 md:py-12
        text-white
        text-center
        shadow-xl
      "
    >
      <h3
        className="
          text-xl md:text-2xl lg:text-3xl
          font-bold
          mb-4
        "
      >
        Everything You Need for a Perfect Celebration
      </h3>

      <p
        className="
          text-sm md:text-lg
          text-green-100
          mb-8
          max-w-2xl
          mx-auto
        "
      >
        From weddings and receptions to birthdays and corporate events,
        <span className="font-semibold text-white">
          {" "}
          Chhaya Party Plot
        </span>{" "}
        offers elegant spaces and spacious lawns to make your special moments
        unforgettable.
      </p>

      {/* Phone */}

      <p
        onClick={() => copyToClipboard("+91 76006 16660")}
        onKeyDown={(e) => {
          if (e.key === "Enter") copyToClipboard("+91 76006 16660");
        }}
        className="
          text-xl md:text-2xl lg:text-3xl
          font-bold
          cursor-pointer
          hover:text-yellow-300
          transition
        "
        role="button"
        tabIndex={0}
      >
        +91 76006 16660
      </p>

      {/* Buttons */}

      <div
        className="
          flex flex-col sm:flex-row
          justify-center
          items-center
          gap-4
          mt-6
        "
      >
        <Link
          href="/reservation"
          className="
            bg-white text-green-700
            font-semibold
            px-8 py-3
            rounded-full
            shadow-xl
            hover:scale-105
            hover:bg-green-100
            transition
          "
        >
          Reserve Now
        </Link>

        <a
          href={`https://wa.me/917600616660?text=${encodeURIComponent(
            "Hello, I would like to enquire about booking Chhaya Party Plot.",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
    inline-flex items-center gap-2
    bg-green-800 text-white
    font-semibold
    px-8 py-3
    rounded-full
    shadow-xl
    hover:scale-105
    hover:bg-green-900
    transition
  "
        >
          <FaWhatsapp size={20} />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default BottomCTA;
