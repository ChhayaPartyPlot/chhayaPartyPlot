'use client';
import TiltedCard from './TitleCard';
import ChangingText from './changing-text';
import { useEffect, useRef } from 'react';

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

  return (
    <div className="text-center mt-12 px-4">
      <h1 className="text-3xl md:text-4xl">
        Great place to Celebrate <ChangingText />
      </h1>

      <div
        ref={scrollRef}
        className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mt-6 p-4 overflow-x-auto sm:overflow-visible whitespace-nowrap space-x-4 sm:space-x-0 scroll-smooth"
      >
        <TiltedCard imageSrc="/image1.jpeg" altText="Wedding" captionText="Wedding" />
        <TiltedCard imageSrc="/image1.jpeg" altText="Birthday Party" captionText="Birthday Party" />
        <TiltedCard imageSrc="/image1.jpeg" altText="Business Party" captionText="Business Party" />
        <TiltedCard imageSrc="/image1.jpeg" altText="Reception" captionText="Reception" />
        <TiltedCard imageSrc="/image1.jpeg" altText="Corporate Event" captionText="Corporate Event" />
        <TiltedCard imageSrc="/image1.jpeg" altText="Engagement" captionText="Engagement" />
      </div>
    </div>
  );
}