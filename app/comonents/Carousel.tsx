"use client";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Link from "next/link";


const images = [
  { src: "/image1.jpeg", alt: "First slide", caption: "First slide label", description: "Nulla vitae elit libero, a pharetra augue mollis interdum." },
  { src: "/image2.jpeg", alt: "Second slide", caption: "Second slide label", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { src: "/image1.jpeg", alt: "Third slide", caption: "Third slide label", description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur." }
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
            <div className="relative overflow-hidden w-[100vw] h-[100vh]">
              <img 
                className={`d-block w-full h-full object-cover transition-transform duration-[1s] ease-in-out 
                  ${activeIndex === index ? "scale-110" : "scale-100"}`}
                src={image.src} 
                alt={image.alt} 
              />
            </div>
            <Carousel.Caption className="absolute transform text-center">
              <div className="relative w-full h-screen flex items-center justify-center text-center">
                <div className="absolute inset-0"></div>
                <div className="relative z-10 px-6">
                  <p className="text-white text-sm md:text-lg uppercase tracking-widest font-semibold">
                    Presenting Chhaya Party Plot
                  </p>
                  <h1 className="text-white text-2xl md:text-5xl font-poppins font-bold mt-2">
                    Celebrate in Grandeur, <br className="hidden md:block" /> Create Timeless Memories!
                  </h1>
                  <p className="text-white text-xs md:text-lg mt-3">
                    Sprawling space, premium decor, and unmatched hospitality – all in one venue!
                  </p>
                  <Link
                    href="/reservation"
                    className="border border-white relative transition-all duration-300 px-8 py-3 uppercase tracking-wider text-sm font-[400] font-[Barlow_Condensed] bg-transparent text-white leading-none text-[15px] letter-spacing-[3px] before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 hover:text-black before:mix-blend-difference no-underline max-w-full"
                  >
                    Reservation
                  </Link>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Carousel1;