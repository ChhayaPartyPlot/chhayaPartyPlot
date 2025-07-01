
'use client';
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [observerOptions, setObserverOptions] = useState({
    threshold: 0.5,
    rootMargin: "-10px",
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const openFullVideo = () => {
    window.open("/1409899-uhd_3840_2160_25fps.mp4", "_blank");
  };

  // Parallax effect for the video
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && videoRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollProgress = Math.min(
          Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
          1
        );
        const translateY = scrollProgress * -100;
        videoRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateObserverOptions = () => {
      if (window.innerWidth < 768) {
        setObserverOptions({
          threshold: 0.1,
          rootMargin: "-20px",
        });
      } else {
        setObserverOptions({
          threshold: 0.3,
          rootMargin: "10px",
        });
      }
    };

    updateObserverOptions();
    window.addEventListener("resize", updateObserverOptions);
    return () => window.removeEventListener("resize", updateObserverOptions);
  }, []);

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
      observerOptions
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [observerOptions]);

  return (
    <div
      ref={sectionRef}
      className="relative py-2 w-full h-[70vh] sm:h-[60vh] flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute top-0 left-0 w-full h-[120%] object-cover brightness-75 transition-opacity duration-300 ${
          isInView ? "opacity-100" : "opacity-0"
        }`}
        src="/1409899-uhd_3840_2160_25fps.mp4"
      />
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black/60 transition-opacity duration-300 ${
          isInView ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="relative z-10 text-white flex flex-col items-center"
      >
        <h2 className="text-xl md:text-2xl font-serif tracking-wider uppercase">
          Chhaya Party Plot
        </h2>
        <h3 className="text-3xl md:text-5xl font-bold mt-2 uppercase">
          Promotional Video
        </h3>
        <button
          onClick={openFullVideo}
          className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-white text-sm md:text-base">Play Full Video</span>
        </button>
      </motion.div>
    </div>
  );
}
