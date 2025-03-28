'use client';
import Image from "next/image";
import { Footer } from "../comonents/footer";
import { motion } from "framer-motion";

export default function About() {
  // Animation variants for sliding in from left
  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animation variants for sliding in from right
  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animation variants for fading in from bottom
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="relative min-h-screen bg-[#FeFFF1]">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <Image
          src="/image1.jpeg"
          alt="Chhaya Partyplot"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-sm tracking-widest">A Venue Beyond Your Imagination</h1>
          <h2 className="text-5xl font-bold mt-2">Discover Our Story</h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col min-h-screen bg:p-10 md:p-20 bg-[#FeFFF1]">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-sm tracking-widest text-gray-500 p-4 sm:p-0"
          >
            CHHAYA PARTY PLOT - A Celebration Redefined
          </motion.h3>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold my-4 p-4 sm:p-0"
          >
            Where Your Love Story Unfolds in Grandeur
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="text-gray-600 leading-relaxed p-4 sm:p-0"
          >
            Welcome to Ahmedabad’s most exquisite event destination—Chhaya Partyplot. We craft experiences beyond expectations, where every detail is meticulously designed to leave an everlasting impression. From the grandeur of our entrance to the enchanting landscape and breathtaking décor, we create the perfect setting for a wedding, reception, or any grand celebration.
          </motion.p>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
            className="mt-6 text-gray-600 leading-relaxed p-4 sm:p-0"
          >
            Our mission is to embrace your unique story, style, and vision, transforming them into an unforgettable masterpiece. At Chhaya Partyplot, we don’t just host events—we create timeless memories etched in elegance and love.
          </motion.p>

          {/* Image Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 mt-16">
            {/* First section: Image left, Text right */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
              className="order-2 md:order-1 relative"
            >
              <Image
                src="/image2.jpeg"
                alt="Enchanting Landscape"
                width={600}
                height={400}
                className=" shadow-md"
              />
              <div className="absolute bottom-4 left-4 opacity-50">
                <Image
                  src="/logo.png" // Replace with your actual logo path
                  alt="Evergreen Party Plot Logo"
                  width={100}
                  height={50}
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
              className="order-1 md:order-2 flex flex-col justify-center p-6 bg-amber-100 "
            >
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInRight}
                className="text-sm tracking-widest text-gray-500"
              >
                DISCOVER
              </motion.h3>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInRight}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mt-2"
              >
                Enchanting Landscape
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInRight}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mt-4 leading-relaxed"
              >
                Our enchanting landscape becomes the natural backdrop for your memories. The elegance of the lush green lawns brings out the life in the venue and allows you to set up any kind of theme.
              </motion.p>
            </motion.div>

            {/* Second section: Text left, Image right */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
              className="order-3 md:order-3 flex flex-col justify-center p-6 bg-amber-100 "
            >
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInLeft}
                className="text-sm tracking-widest text-gray-500"
              >
                LUXURY
              </motion.h3>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInLeft}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mt-2"
              >
                Magnificent Bride & Groom Room
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInLeft}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mt-4 leading-relaxed"
              >
                The most special day of your life can sometimes be hectic and stressful, so you can partake in the joy of the occasion. We have exclusive and luxurious air-conditioned rooms for the bride and groom.
              </motion.p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
              className="order-4 md:order-4 relative"
            >
              <Image
                src="/image1.jpeg"
                alt="Luxury Bride & Groom Room"
                width={600}
                height={400}
                className=" shadow-md"
              />
              <div className="absolute bottom-4 left-4 opacity-50">
                <Image
                  src="/logo.png" // Replace with your actual logo path
                  alt="Evergreen Party Plot Logo"
                  width={100}
                  height={50}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}