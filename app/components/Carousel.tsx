"use client";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

import Link from "next/link";


const images = [
  { src: "/p1.jpeg", alt: "First slide", caption: "First slide label", description: "Nulla vitae elit libero, a pharetra augue mollis interdum." },
  { src: "/p2.jpeg", alt: "Second slide", caption: "Second slide label", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { src: "/p3.jpeg", alt: "Third slide", caption: "Third slide label", description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur." },
  { src: "/p4.jpeg", alt: "Third slide", caption: "Third slide label", description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur." }
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
        interval={4000} 
        pause={false} 
        onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
      >
        {images.map((image, index) => (
         <Carousel.Item key={index}>
  <div className="relative w-[100vw] h-[100vh] overflow-hidden">

    {/* Background Image */}
    <img 
      className={`d-block w-full h-full object-cover transition-transform duration-[1s] ease-in-out 
        ${activeIndex === index ? "scale-110" : "scale-100"}`}
      src={image.src} 
      alt={image.alt} 
    />

    {/* Overlay on image only */}
    <div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none"></div>

    {/* Carousel Caption */}
    <Carousel.Caption className="absolute inset-0 z-[2] flex items-center justify-center text-center">
  <div className="px-6">
    <p className="text-sm md:text-lg uppercase tracking-[0.3em] font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
      Presenting Chhaya Party Plot
    </p>
    <h1 className=" text-white text-7xl md:text-7xl font-playfair tracking-wider font-bold mt-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
      Celebrate in <span className="text-white">Grandeur</span>,<br className="hidden md:block" />
      Create Timeless <span className="text-white">Memories!</span>
    </h1>
    <p className="text-white text-md md:text-xl mt-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] font-cormorant">
      Sprawling space, premium decor, and unmatched hospitality – all in one venue!
    </p>
<Link
  href="/reservation"
  className="border border-white relative transition-all duration-300 px-8 py-3 uppercase tracking-widest text-sm font-[400] font-[Barlow_Condensed] bg-transparent text-white leading-none text-[15px] before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 before:opacity-0 hover:before:opacity-100 hover:text-[#d4af37] no-underline max-w-full inline-block mt-4 overflow-hidden"
>
  <span className="relative z-10">Reservation</span>
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