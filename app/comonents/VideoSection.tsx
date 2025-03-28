'use client';
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [observerOptions, setObserverOptions] = useState({
    threshold: 0.3,
    rootMargin: "-80px",
  });

  // Animation variants for fading in
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Function to open the full video in a new tab
  const openFullVideo = () => {
    window.open("/1409899-uhd_3840_2160_25fps.mp4", "_blank");
  };

  // Update Intersection Observer options based on screen size
  useEffect(() => {
    const updateObserverOptions = () => {
      if (window.innerWidth < 768) {
        // Mobile: Start earlier
        setObserverOptions({
          threshold: 0.1, // Trigger when 10% of the section is in view
          rootMargin: "-20px", // Start when the section's top is 20px below the viewport's top
        });
      } else {
        // Desktop: Keep the original settings
        setObserverOptions({
          threshold: 0.3, // Trigger when 30% of the section is in view
          rootMargin: "10px", // Start when the section's top is 10px below the viewport's top
        });
      }
    };

    // Initial update
    updateObserverOptions();

    // Update on resize
    window.addEventListener("resize", updateObserverOptions);
    return () => window.removeEventListener("resize", updateObserverOptions);
  }, []);

  // Use Intersection Observer to detect when the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }
      },
      observerOptions // Use dynamic options
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [observerOptions]); // Re-run when observerOptions change

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-[50vh] flex flex-col justify-start items-center text-center bg-[#FeFFF1] pt-16 md:pt-20 py-12"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`fixed top-0 left-0 w-full h-screen object-cover brightness-75 transition-opacity duration-300 ${
          isInView ? "opacity-100" : "opacity-0"
        }`}
        src="/1409899-uhd_3840_2160_25fps.mp4"
      />
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black/60 transition-opacity duration-300 ${
          isInView ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="relative z-10 text-white"
      >
        <h2 className="text-2xl md:text-4xl font-serif tracking-wider uppercase">
          Evergreen Party Plot
        </h2>
        <h3 className="text-3xl md:text-5xl font-bold mt-4 uppercase">
          Promotional Video
        </h3>
        <button
          onClick={openFullVideo}
          className="mt-10 px-6 py-2 bg-green-700 text-white rounded-full hover:bg-green-600 transition-colors"
        >
          Watch Full Video
        </button>
      </motion.div>
    </div>
  );
}