'use client'
import TiltedCard from './TitleCard';
import ChangingText from './changing-text';
import { useEffect, useRef } from 'react';

export default function CelebrationSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let scrollAmount = 0;
    const speed = 2; // Adjust speed here
    const scrollInterval = setInterval(() => {
      if (scrollAmount >= scrollElement.scrollWidth - scrollElement.clientWidth) {
        scrollAmount = 0; // Reset scroll
      } else {
        scrollAmount += speed;
      }
      scrollElement.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 50);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="text-center mt-12 px-4">
      <h1 className="text-3xl md:text-4xl">
        Great place to Celebrate <ChangingText />
      </h1>

      <div
        ref={scrollRef}
        className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mt-6 p-4 overflow-x-auto sm:overflow-visible whitespace-nowrap scroll-smooth space-x-4 sm:space-x-0"
      >
        <TiltedCard imageSrc="/image1.jpeg" altText="Wedding" captionText="Wedding"  />
        <TiltedCard imageSrc="/image1.jpeg" altText="Birthday Party" captionText="Birthday Party" />
        <TiltedCard imageSrc="/image1.jpeg" altText="Business Party" captionText="Business Party" />
        <TiltedCard imageSrc="/image1.jpeg" altText="Reception" captionText="Reception" />
        <TiltedCard imageSrc="/image1.jpeg" altText="Corporate Event" captionText="Corporate Event" />
        <TiltedCard imageSrc="/image1.jpeg" altText="Engagement" captionText="Engagement" />
      </div>
    </div>
  );
}