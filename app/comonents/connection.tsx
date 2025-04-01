"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

function DockItem({
  children,
  className = "",
  onClick,
  mouseY,
  spring,
  distance,
  magnification,
  baseItemSize,
}) {
  const ref = useRef(null);

  const mouseDistance = useTransform(mouseY, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      y: 0,
      height: baseItemSize,
    };
    return val - rect.y - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center rounded-full bg-[#060606] border-neutral-700 border-2 shadow-md ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Dock({
  items,
  className = "bg-white/10 backdrop-blur-lg border border-white/20",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelWidth = 64,
  dockWidth = 256,
  baseItemSize = 50,
}) {
  const mouseY = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const [isOpen, setIsOpen] = useState(typeof window !== "undefined" ? window.innerWidth >= 1024 : true);
  const dockRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsOpen(true); // Always open for larger screens
      } else {
        setIsOpen(false); // Closed by default on mobile
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dock when clicking outside (only for mobile)
  useEffect(() => {
    function handleClickOutside(event) {
      if (dockRef.current && !dockRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen && window.innerWidth < 1024) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* 🟢 Mobile Toggle Button (Left Center) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed left-4 top-[45%] -translate-y-1/2 z-[9999] flex items-center justify-center bg-[#25D366] p-2 rounded-full shadow-lg border-2 border-white cursor-pointer"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <FaWhatsapp className="text-white text-3xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock */}
      {isOpen && (
        <motion.div
          ref={dockRef}
          className="fixed left-2 top-1/2 -translate-y-1/2 z-50"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
        >
          <motion.div
            onMouseMove={({ pageY }) => {
              isHovered.set(1);
              mouseY.set(pageY);
            }}
            onMouseLeave={() => {
              isHovered.set(0);
              mouseY.set(Infinity);
            }}
            className={`${className} flex flex-col items-center gap-4 rounded-2xl border-neutral-700 border-2 py-4 px-2`}
            style={{ width: panelWidth }}
            role="toolbar"
            aria-label="Application dock"
          >
            {items.map((item, index) => (
              <DockItem
                key={index}
                onClick={item.onClick}
                className={item.className}
                mouseY={mouseY}
                spring={spring}
                distance={distance}
                magnification={magnification}
                baseItemSize={baseItemSize}
              >
                {item.icon}
              </DockItem>
            ))}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
