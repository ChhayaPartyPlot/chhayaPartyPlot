'use client';
import TiltedCard from './TitleCard';
import ChangingText from './changing-text';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CelebrationSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const isMobile = window.innerWidth < 640;
    if (!isMobile) return;

    const speed = 1;
    let isUserScrolling = false;
    let userScrollTimeout: NodeJS.Timeout;

    const handleUserScroll = () => {
      isUserScrolling = true;
      clearTimeout(userScrollTimeout);
      userScrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 1000);
    };

    scrollElement.addEventListener('scroll', handleUserScroll);

    const scrollInterval = setInterval(() => {
      if (!scrollElement || isUserScrolling) return;

      if (scrollElement.scrollLeft + scrollElement.clientWidth >= scrollElement.scrollWidth - 1) {
        scrollElement.scrollTo({ left: 0, behavior: 'auto' });
      } else {
        scrollElement.scrollBy({ left: speed, behavior: 'auto' });
      }
    }, 30);

    return () => {
      scrollElement.removeEventListener('scroll', handleUserScroll);
      clearInterval(scrollInterval);
    };
  }, []);

  // Rotation animation variants for the card container
  const rotateVariants = {
    hidden: {
      opacity: 0,
      rotateY: 0, // Start at 0 degrees
    },
    visible: {
      opacity: 1,
      rotateY: 180, // Rotate 180 degrees on the Y-axis
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Counter-rotation variants for the card content to keep it facing forward
  const counterRotateVariants = {
    hidden: {
      rotateY: 0,
    },
    visible: {
      rotateY: -180, // Counter-rotate the content to keep it facing forward
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cards = [
    { imageSrc: "/image1.jpeg", altText: "Wedding", captionText: "Wedding" },
    { imageSrc: "/image1.jpeg", altText: "Birthday Party", captionText: "Birthday Party" },
    { imageSrc: "/image1.jpeg", altText: "Business Party", captionText: "Business Party" },
    { imageSrc: "/image1.jpeg", altText: "Reception", captionText: "Reception" },
    { imageSrc: "/image1.jpeg", altText: "Corporate Event", captionText: "Corporate Event" },
    { imageSrc: "/image1.jpeg", altText: "Engagement", captionText: "Engagement" },
  ];

  return (
    <div className="text-center mt-12 px-4">
      <h1 className="text-3xl md:text-4xl">
        Great place to Celebrate <ChangingText />
      </h1>

      <div
        ref={scrollRef}
        className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mt-6 p-4 overflow-x-auto sm:overflow-visible whitespace-nowrap space-x-4 sm:space-x-0 scroll-smooth"
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={rotateVariants}
            transition={{ delay: index * 0.2 }} // Stagger the animation for each card
            className="inline-block sm:block"
          >
            <motion.div variants={counterRotateVariants}>
              <TiltedCard
                imageSrc={card.imageSrc}
                altText={card.altText}
                captionText={card.captionText}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}