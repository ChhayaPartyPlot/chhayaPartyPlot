"use client";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

import Link from "next/link";
import Image from "next/image";

const images = [
  {
    src: "/WEBP/D3.webp",
    alt: "Chhaya Party Plot Grand Entrance",
    caption: "Grand Entrance",
    description:
      "A welcoming entrance designed to create the perfect first impression for your special events.",
  },
  {
    src: "/WEBP/D4.webp",
    alt: "Spacious Lawn at Chhaya Party Plot",
    caption: "Spacious Green Lawn",
    description:
      "Expansive open lawn ideal for weddings, receptions, and large celebrations under the sky.",
  },
  {
    src: "/WEBP/D1.webp",
    alt: "Elegant Banquet Setup at Chhaya Party Plot",
    caption: "Elegant Event Setup",
    description:
      "Beautifully arranged decor and seating to make every celebration truly memorable.",
  },
  {
    src: "/WEBP/D2.webp",
    alt: "Night View of Chhaya Party Plot",
    caption: "Stunning Night Ambience",
    description:
      "Experience the venue glowing with lights, creating a magical atmosphere for evening events.",
  },
];

function Carousel1() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Force a reflow after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div key={isMounted ? "carousel-mounted" : "carousel-unmounted"}>
      <Carousel
        data-bs-theme="dark"
        interval={8000}
        pause={false}
        touch={true}
        onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
      >
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <div className="relative w-screen h-screen overflow-hidden">
              {/* Background Image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                quality={80}
                sizes="100vw"
                className={`object-cover transition-transform duration-[1s] ease-in-out 
  ${activeIndex === index ? "scale-110" : "scale-100"}`}
              />

              {/* Overlay on image only */}
              <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none"></div>

              {/* Carousel Caption */}

              <Carousel.Caption className="absolute inset-0 z-[2] flex items-center justify-center text-center">
                <div className="px-6 max-w-4xl">
                  {/* Small Heading */}

                  <p className="text-xs sm:text-sm md:text-lg uppercase tracking-[0.35em] font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Welcome to Chhaya Party Plot
                  </p>

                  {/* Main Heading */}

                  <h1
                    className="
    text-white
text-2xl sm:text-3xl md:text-5xl lg:text-6xl
    font-playfair
    tracking-wide
    font-bold
    mt-3
    leading-tight
    drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]
  "
                  >
                    Your Perfect Venue for{" "}
                    <span className="text-[#c3ca6d]">Grand Celebrations</span>
                    <br className="hidden md:block" />
                    Create Timeless{" "}
                    <span className="text-[#c3ca6d]">Memories</span>
                  </h1>

                  {/* Subtitle */}

                  <p
                    className="
      text-white
      text-sm sm:text-base md:text-xl
      mt-4
      leading-relaxed
      drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]
      font-cormorant
    "
                  >
                    A premium destination in Chikhli, Navsari — featuring a
                    spacious lawn, elegant banquet hall, and world-class
                    hospitality for weddings, celebrations, and unforgettable
                    events.
                  </p>

                  {/* Button */}

                  <Link
                    href="/reservation"
                    className="
    relative inline-block mt-6

    px-8 py-3
    border border-white

    text-white
    text-sm md:text-base
    font-medium
    tracking-[0.15em]
    uppercase
    font-[Barlow_Condensed]

    overflow-hidden
    transition-all duration-300

    before:absolute
    before:inset-0
    before:bg-white
    before:scale-x-0
    before:origin-left
    before:transition-transform
    before:duration-300

    hover:before:scale-x-100
    hover:text-[#7a8740]!
  "
                  >
                    <span className="relative z-10">Reserve Your Date</span>
                  </Link>
                </div>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Carousel1;
