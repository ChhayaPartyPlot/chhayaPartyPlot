'use client';
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [observerOptions, setObserverOptions] = useState({
    threshold: 0.1,
    rootMargin: "-100px",
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const openFullVideo = () => {
    window.open("/1409899-uhd_3840_2160_25fps.mp4", "_blank");
  };

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
          rootMargin: "-100px",
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
      className="relative w-full h-[50vh] flex flex-col justify-start items-center text-center bg-[#FeFFF1] pt-16 md:pt-20 py-12"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`fixed top-0 left-0 w-full h-screen object-cover brightness-75 transition-opacity duration-300 z-0 ${
          isInView ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        src="/1409899-uhd_3840_2160_25fps.mp4"
      />
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black/60 transition-opacity duration-300 z-0 ${
          isInView ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="relative z-10 text-white"
      >
        <h2 className="text-2xl md:text-4xl font-serif tracking-wider uppercase">
          Chhaya Party Plot
        </h2>
        <h3 className="text-3xl md:text-5xl font-bold mt-4 uppercase">
          Promotional Video
        </h3>
        <button
          onClick={openFullVideo}
          className="mt-10 px-6 py-2 bg-green-700 text-white rounded-full transition-colors duration-200 ease-in-out hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Watch Full Video
        </button>
      </motion.div>
    </div>
  );
}