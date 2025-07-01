'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel1 from "./components/Carousel";
import CountUp from './components/count-up';
import Stack from './components/stack';
import CelebrationSection from './components/CelebrationSection';
import { Footer } from './components/footer';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import VideoSection from './components/VideoSection';
import Dock from './components/connection';
import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaPhone } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Features from './components/features';
import VenueShowcase from './components/venue';
import Services from './components/services';








const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    alert(`Phone number ${text} copied to clipboard!`);
  }).catch(err => console.error('Failed to copy:', err));
};

const items = [
  { 
    icon: <FaWhatsapp size={18} color="#25D366" />, 
    label: "WhatsApp", 
    onClick: () => window.open("https://wa.me/917600616660", "_blank") 
  },
  { 
    icon: <FaInstagram size={18} color="#E4405F" />, 
    label: "Instagram", 
    onClick: () => window.open("https://www.instagram.com/chhaya_partyplot", "_blank") 
  },
  { 
    icon: <FaPhone size={18} color="#34B7F1" />, 
    label: "Call", 
    onClick: () => copyToClipboard("+91 76006 16660") 
  },
  {
  icon: <FaMapMarkerAlt size={18} color="#d9534f" />,
  label: "Map",
  onClick: () =>
    window.open(
      "https://www.google.com/maps/place/Chhaya+Party+Plot/@20.7288678,73.0306851,17z/data=!3m1!4b1!4m6!3m5!1s0x3be0ed1aac0027a3:0xa2d6c4b636ce3d7f!8m2!3d20.7288678!4d73.0306851!16s%2Fg%2F11v0y548kr?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D",
  
      "_blank"
    ),
}
];

const images = [
  { id: 1, img: "/p1.jpeg" },
  { id: 2, img: "/p2.jpeg" },
  { id: 3, img: "/p3.jpeg" },
  { id: 4, img: "/p4.jpeg" },
  { id: 5, img: "/p1.jpeg" }
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
      <div className="fixed top-0 left-0 w-full h-[90vh] z-20 ">
        <Carousel1 />
      </div>

  
      <div className="flex-grow relative z-20 mt-[100vh] bg-[#FEFFF1] ">
       {/*  <motion.div
          className="bg-cream text-gray-900 px-6 md:px-12 lg:px-24 py-12 flex items-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
           
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >


              <p className="text-2xl md:text-3xl font-semibold mt-4 text-[#4e4b42] italic">
                A premium event destination where timeless elegance meets grand celebration.
              </p>


<div className="mt-8 space-y-2 text-gray-800 text-base md:text-md max-w-xl font-medium">
    <p>📍 <span className="font-semibold text-green-700">Location:</span> Prime, easily accessible spot in [Your City Name].</p>

  <p>🌿 <span className="font-semibold text-green-700">Lawn Area:</span> 
  <span className="font-semibold text-green-800">
  
  <CountUp
  from={1000}
  to={3000}
  separator=","
  direction="up"
  duration={2}
  className="count-up-text"
/> sq. ft. 
</span>
lawn –Ideal for weddings, receptions, and cultural events.</p>
  <p>❄️ <span className="font-semibold text-green-700">Banquet Hall:</span> Spacious, fully air-conditioned hall – Perfect for all-season Rain-Winter-Summer indoor events.</p>
  <p>🚗 <span className="font-semibold text-green-700">Parking:</span> Accommodates   <span className="font-semibold text-green-800">
  
  <CountUp
  from={0}
  to={300}
  separator=","
  direction="up"
  duration={2}
  className="count-up-text"
/> sq. ft. 
</span>+ Hassle-free for all your guests</p>
  <p>🛠️ <span className="font-semibold text-green-700">Amenities:</span> Modern infrastructure – For a comfortable and seamless experience.</p>
  <p>🎨 <span className="font-semibold text-green-700">Customization:</span> Tailored décor, themes, and planning – Aligned with your event vision.</p>
  <p>🎉 <span className="font-semibold text-green-700">Events:</span> Weddings, birthdays, corporate events & more – Hosted with style.</p>
  <p>👥 <span className="font-semibold text-green-700">Capacity:</span> Seats   <span className="font-semibold text-green-800">
  
  <CountUp
  from={100}
  to={2000}
  separator=","
  direction="up"
  duration={2}
  className="count-up-text"
/> sq. ft. 
</span>+ guests – Ideal for both grand and intimate gatherings.</p>
</div> 


        </motion.div>

            <motion.div
              className="w-full h-96 md:h-[450px] rounded-lg"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Stack
                randomRotation={true}
                sendToBackOnClick={false}
                cardDimensions={cardDimensions}
                cardsData={images}
              />
            </motion.div>
          </div>
        </motion.div>
        */}
      
        {/* Intro Heading */}
        <div className="px-6 md:px-12 lg:px-24 py-5">
          <h1 className="text-3xl md:text-5xl font-serif text-[#5a4a31] tracking-wide leading-tight text-center">
            Welcome to{" "}
            <span className="text-green-800 font-extrabold italic drop-shadow-lg">
              Chhaya Party Plot
            </span>
          </h1>
      
      <Features/>
      <div className="mt-8 max-w-xl flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 text-green-800 font-bold tracking-wide">

</div>
      </div>
      
      <VenueShowcase/>
       <VideoSection/>
       <Services/>

      </div> 
      


      {/* Footer */}
      <Footer />

      <Dock items={items} />
    </main>
  );
}
