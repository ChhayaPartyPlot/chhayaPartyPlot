'use client'
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
}

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "350px",
  containerWidth = "100%",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = false,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  const [isMobile, setIsMobile] = useState(false);
  const [imageSize, setImageSize] = useState({ width: "350px", height: "350px" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
      setImageSize(window.innerWidth < 768 ? { width: "250px", height: "250px" } : { width: "350px", height: "350px" });

      // Listen for window resize
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        setImageSize(window.innerWidth < 768 ? { width: "250px", height: "250px" } : { width: "350px", height: "350px" });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current || isMobile) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  function handleMouseEnter() {
    if (isMobile) return;
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    if (isMobile) return;
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth,
        perspective: "800px",
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && isMobile && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative"
        style={{
          width: imageSize.width,
          height: imageSize.height,
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 object-cover rounded-lg shadow-lg"
          style={{
            width: imageSize.width,
            height: imageSize.height,
          }}
        />

        {/* Caption Overlay */}
        <motion.figcaption
          className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center text-xs py-2 rounded-b-lg"
        >
          {captionText}
        </motion.figcaption>
      </motion.div>
    </figure>
  );
}