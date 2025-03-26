import { useRef, useState } from "react";
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
  imageHeight = "350px",
  imageWidth = "250px",
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

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
          width: imageWidth,
          height: imageHeight,
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
            width: imageWidth,
            height: imageHeight,
          }}
        />
      </motion.div>

      <figcaption className="text-center text-sm mt-2">{captionText}</figcaption>
    </figure>
  );
}