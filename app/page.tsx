'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel1 from "./comonents/Carousel";
import CountUp from './comonents/count-up';
import Stack from './comonents/stack';
import CelebrationSection from './comonents/CelebrationSection';
import { Footer } from './comonents/footer';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

const images = [
  { id: 1, img: "/image1.jpeg" },
  { id: 2, img: "/image2.jpeg" }
];

export default function Home() {
  const [cardDimensions, setCardDimensions] = useState({ width: 500, height: 500 });

  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth < 768) {
        setCardDimensions({ width: 300, height: 300 });
      } else {
        setCardDimensions({ width: 500, height: 500 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Carousel stays fixed at the top */}
      <div className="fixed top-0 left-0 w-full h-[90vh] ">
        <Carousel1 />
      </div>

      {/* Content starts after the carousel */}
      <div className="flex-grow relative z-20 mt-[100vh] bg-[#FeFFF1] ">
        <motion.div
          className="bg-cream text-gray-900 px-6 md:px-12 lg:px-24 py-12 flex items-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Section: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h1 className="text-3xl md:text-4xl font-serif">
                Welcome to{" "}
                <span className="text-green-700 font-bold italic">Chhaya Party Plot</span>
              </h1>
              <p className="text-2xl md:text-3xl font-medium mt-4">
                A premium event destination where elegance meets celebration!
              </p>
              <p className="mt-4 text-gray-700">
                Whether it's a grand wedding or an intimate gathering, we provide the perfect space to create lasting memories.
              </p>

              {/* Quick Highlights */}
              <div className="mt-6 space-y-2 text-gray-800">
                <p>📍 Location: Easily accessible in <span className="font-semibold">[Your City Name]</span></p>
                <p>🎉 Events Hosted: Weddings, Receptions, Corporate Events, Birthdays & More</p>
                <p>📖 Capacity: Accommodates :
                  <CountUp from={0} to={2000} separator="," direction="up" duration={1} />
                  + guests
                </p>
                <p>🚗 Parking: Spacious parking for over 200 vehicles</p>
                <p>💡 Customization: Theme-based decorations & event planning available</p>
              </div>

              {/* Reservation Contact */}
              <div className="mt-6 text-lg font-semibold">
                <p>For reservation:</p>
                <p className="text-xl text-green-700">99999999999999</p>
              </div>
            </motion.div>

            {/* Right Section: Image Stack with Animation */}
            <motion.div
              className="w-full h-96 md:h-[450px] rounded-lg"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={false}
                cardDimensions={cardDimensions}
                cardsData={images}
              />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Additional Sections */}
        <CelebrationSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}