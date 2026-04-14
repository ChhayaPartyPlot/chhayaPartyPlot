"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Trees,
  Building2,
  Car,
  Settings,
  Palette,
  CalendarHeart,
} from "lucide-react";
import CountUp from "./count-up";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa";

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

const Features = () => {
  const features = React.useMemo(
    () => [
      {
        icon: MapPin,
        title: "Prime Location",
        description:
          "Conveniently located in Chikhli, Navsari with easy highway access for guests.",
        color: "from-green-500 to-emerald-600",
      },

      {
        icon: Building2,
        title: "AC Banquet Hall",
        countUpFrom: 0,
        countUpTo: 800,
        unit: " guests",
        description:
          "capacity with two dedicated changing rooms — ideal for weddings and indoor events.",
        color: "from-blue-500 to-cyan-600",
      },

      {
        icon: Building2,
        title: "Multipurpose Hall",
        countUpFrom: 0,
        countUpTo: 1000,
        unit: " guests",
        description:
          "non-air-conditioned hall suitable for large gatherings and ceremonies.",
        color: "from-indigo-500 to-blue-600",
      },

      {
        icon: Trees,
        title: "Spacious Lawn",
        countUpFrom: 0,
        countUpTo: 3000,
        unit: " guests",
        description:
          "perfect for grand outdoor weddings, receptions, and celebrations.",
        color: "from-lime-500 to-green-600",
      },

      {
        icon: Settings,
        title: "Modern Kitchen",
        countUpFrom: 0,
        countUpTo: 3000,
        unit: " sq. ft.",
        description:
          "fully equipped kitchen with wash area for large-scale catering.",
        color: "from-gray-500 to-slate-600",
      },

      {
        icon: Car,
        title: "Ample Parking",
        countUpFrom: 0,
        countUpTo: 200,
        unit: "+ vehicles",
        description:
          "dedicated parking with trained staff ensuring smooth vehicle flow.",
        color: "from-purple-500 to-indigo-600",
      },

      {
        icon: Palette,
        title: "Custom Decor",
        description:
          "Flexible decor options to match your wedding or event theme.",
        color: "from-pink-500 to-rose-600",
      },

      {
        icon: CalendarHeart,
        title: "Versatile Events",
        description:
          "Perfect venue for weddings, receptions, birthdays, and corporate events.",
        color: "from-orange-500 to-red-600",
      },
    ],
    [],
  );

  return (
    <section
      id="features"
      className="
         
        
          px-6 md:px-8 lg:px-16
          py-10 md:py-10
          rounded-3xl
        "
    >
      {/* Heading */}

      <div className="text-center mb-12 md:mb-16">
        <p
          className="
            text-xl md:text-2xl lg:text-3xl
            font-semibold
            text-[#4e4b42]
            italic
            max-w-3xl
            mx-auto
          "
        >
          A premium event destination where timeless elegance meets grand
          celebration.
        </p>
      </div>

      {/* Features Grid */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6 md:gap-8
        "
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            className="
      group
      bg-white
      rounded-xl
      p-4
      shadow-md
      hover:shadow-xl
      transition-all
      duration-300
      transform
      hover:-translate-y-2
      hover:scale-[1.02]
      border border-gray-200
      flex flex-col
      h-full
    "
          >
            {/* Icon (fixed height) */}
            <div
              className={`
        w-14 h-14 md:w-16 md:h-16
        bg-gradient-to-r ${feature.color}
        rounded-2xl
        flex items-center justify-center
        mb-4
        group-hover:scale-110
        transition-all
        shrink-0
      `}
            >
              <feature.icon className="text-white" size={26} />
            </div>

            {/* Title (fixed height) */}
            <h3
              className="
    text-base md:text-lg
    font-semibold
    text-gray-800
    mb-2
    leading-snug
    min-h-[48px]
    break-words
  "
            >
              {feature.title}
            </h3>

            {/* Description (flex grow) */}
            <p
              className="
    text-gray-600
    leading-relaxed
    text-sm
    flex-grow
  "
            >
              {feature.countUpTo ? (
                <>
                  <span
                    className="
  font-bold
  text-[#7a8740]
  tracking-wide
"
                  >
                    <CountUp
                      from={feature.countUpFrom || 0}
                      to={feature.countUpTo}
                      duration={2}
                      separator=","
                    />{" "}
                    {feature.unit}
                  </span>{" "}
                  {feature.description}
                </>
              ) : (
                feature.description
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner */}

      <div
        className="
      mt-12 md:mt-16
      bg-gradient-to-r
      from-[#c3ca6d]
      to-[#7a8740]
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
        text-white/90
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
        hover:text-yellow-200!
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
          bg-white text-[#7a8740]!
          font-semibold
          px-8 py-3
          rounded-full
          shadow-xl
          hover:scale-105
          hover:bg-gray-100!
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
          bg-[#7a8740]!
          text-white!
          font-semibold
          px-8 py-3
          rounded-full
          shadow-xl
          hover:scale-105
          hover:bg-[#6a7538]!
          transition
        "
          >
            <FaWhatsapp size={20} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
