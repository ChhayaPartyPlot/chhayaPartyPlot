'use client';
import Image from "next/image";
import { Footer } from "../comonents/footer";
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <main>
      <style jsx>{`
        @media (max-width: 767px) {
          .mobile-order-1 {
            order: 1;
          }
          .mobile-order-2 {
            order: 2;
          }
          .mobile-order-3 {
            order: 3;
          }
          .mobile-order-4 {
            order: 4;
          }
        }
      `}</style>
      
      <div className="relative min-h-screen bg-[#FeFFF1]">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full">
          <Image
            src="/image3.jpg"
            alt="Chhaya Partyplot"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
            

            <h1 className="text-sm tracking-widest font-serif italic text-gray-200">A Venue Beyond Your Imagination</h1>
            <h2 className="text-5xl font-bold mt-2 font-sans text-gray-100">Discover Our Story</h2>
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
             Chhaya Party Plot is a premier event venue offering a sprawling 30,000 sq. ft. lawn area, perfect for grand weddings, receptions, and celebrations. It features a fully air-conditioned banquet hall with modern interiors, ideal for indoor events and dining. With a capacity to accommodate large gatherings comfortably, the venue also offers ample parking space for 300+ cars, ensuring convenience for your guests. Surrounded by greenery and equipped with top-notch facilities, Chhaya Party Plot blends elegance with functionality. Whether you're planning a traditional or contemporary event, it provides the perfect setting to make your special occasion truly unforgettable.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.6 }}
              className="mt-6 text-gray-600 leading-relaxed p-4 sm:p-0"
            >
              Our mission is to embrace your unique story, style, and vision, transforming them into an unforgettable masterpiece. At Chhaya Partyplot, we don't just host events—we create timeless memories etched in elegance and love.
            </motion.p>

            {/* Image Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 mt-16">
              {/* 1. Enchanting Landscape: Image left, Text right */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInLeft}
                className="md:order-1 mobile-order-1 relative"
              >
                <Image
                  src="/p2.jpeg"
                  alt="Enchanting Landscape"
                  width={600}
                  height={400}
                  className="w-full h-auto md:h-[350px] object-cover shadow-md"
                />
                <div className="absolute bottom-4 left-4">
                  <Image
                    src="/logo.png"
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
                className="md:order-2 mobile-order-2 flex flex-col justify-center p-6 bg-amber-100"
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

              {/* 2. Bride & Groom Room: Text left, Image right */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInLeft}
                className="md:order-3 mobile-order-3 flex flex-col justify-center p-6 bg-amber-100"
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
                className="md:order-4 mobile-order-4 relative"
              >
                <Image
                  src="/p1.jpeg"
                  alt="Magnificent Bride & Groom Room"
                  width={600}
                  height={400}
                  className="w-full h-auto md:h-[350px] object-cover shadow-md"
                />
                <div className="absolute bottom-4 left-4">
                  <Image
                    src="/logo.png"
                    alt="Evergreen Party Plot Logo"
                    width={100}
                    height={50}
                  />
                </div>
              </motion.div>

              {/* 3. Lawn Area: Image left, Text right */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInLeft}
                className="md:order-5 mobile-order-5 relative"
              >
                <Image
                  src="/p5.jpeg"
                  alt="Lawn Area"
                  width={600}
                  height={400}
                  className="w-full h-auto md:h-[350px] object-cover shadow-md"
                />
                <div className="absolute bottom-4 left-4">
                  <Image
                    src="/logo.png"
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
                className="md:order-6 mobile-order-6 flex flex-col justify-center p-6 bg-amber-100"
              >
                <motion.h3
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInRight}
                  className="text-sm tracking-widest text-gray-500"
                >
                  LAWN AREA
                </motion.h3>
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInRight}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold mt-2"
                >
            
                </motion.h2>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInRight}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mt-4 leading-relaxed"
                >
                  Our expansive 30,000 sq. ft. lawn offers a vibrant open-air setting surrounded by nature, creating the perfect canvas for large-scale weddings, cultural festivities, and unforgettable evenings under the stars.
                </motion.p>
              </motion.div>

              {/* 4. Banquet Hall: Text left, Image right */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInLeft}
                className="md:order-7 mobile-order-7 flex flex-col justify-center p-6 bg-amber-100"
              >
                <motion.h3
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInLeft}
                  className="text-sm tracking-widest text-gray-500"
                >
                  BANQUET HALL
                </motion.h3>
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInLeft}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold mt-2"
                >
                
                </motion.h2>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInLeft}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mt-4 leading-relaxed"
                >
                  Our fully air-conditioned banquet hall offers a luxurious indoor atmosphere, seamlessly blending comfort with class — ideal for intimate dinners, receptions, and ceremonies no matter the season.
                </motion.p>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInRight}
                className="md:order-8 mobile-order-8 relative"
              >
                <Image
                  src="/p6.jpeg"
                  alt="Banquet Hall"
                  width={600}
                  height={400}
                  className="w-full h-auto md:h-[350px] object-cover shadow-md"
                />
                <div className="absolute bottom-4 left-4">
                  <Image
                    src="/logo.png"
                    alt="Evergreen Party Plot Logo"
                    width={100}
                    height={50}
                  />
                </div>
              </motion.div>

              {/* 5. Parking: Image left, Text right */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInLeft}
                className="md:order-9 mobile-order-9 relative"
              >
                <Image
                  src="/p7.jpeg"
                  alt="Parking"
                  width={600}
                  height={400}
                  className="w-full h-auto md:h-[350px] object-cover shadow-md"
                />
                <div className="absolute bottom-4 left-4">
                  <Image
                    src="/logo.png"
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
                className="md:order-10 mobile-order-10 flex flex-col justify-center p-6 bg-amber-100"
              >
                <motion.h3
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInRight}
                  className="text-sm tracking-widest text-gray-500"
                >
                  CONVENIENCE
                </motion.h3>
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInRight}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold mt-2"
                >
                  Parking
                </motion.h2>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInRight}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mt-4 leading-relaxed"
                >
                  With 300+ parking slots available, guests can arrive stress-free. The well-managed parking area ensures smooth flow and safety during large events.
                </motion.p>
              </motion.div>

              {/* 6. Ambience: Text left, Image right */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInLeft}
                className="md:order-11 mobile-order-11 flex flex-col justify-center p-6 bg-amber-100"
              >
                <motion.h3
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInLeft}
                  className="text-sm tracking-widest text-gray-500"
                >
                  EXPERIENCE
                </motion.h3>
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInLeft}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold mt-2"
                >
                  Ambience
                </motion.h2>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInLeft}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mt-4 leading-relaxed"
                >
                  Surrounded by greenery and open skies, our venue offers a serene and visually stunning environment that adds a magical touch to your celebration.
                </motion.p>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInRight}
                className="md:order-12 mobile-order-12 relative"
              >
                <Image
                  src="/p8.jpeg"
                  alt="Ambience"
                  width={600}
                  height={400}
                  className="w-full h-auto md:h-[350px] object-cover shadow-md"
                />
                <div className="absolute bottom-4 left-4">
                  <Image
                    src="/logo.png"
                    alt="Evergreen Party Plot Logo"
                    width={100}
                    height={50}
                  />
                </div>
              </motion.div>

              {/* 7. Amenities: Image left, Text right */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInLeft}
                className="md:order-13 mobile-order-13 relative"
              >
                <Image
                  src="/p9.jpeg"
                  alt="Amenities"
                  width={600}
                  height={400}
                  className="w-full h-auto md:h-[350px] object-cover shadow-md"
                />
                <div className="absolute bottom-4 left-4">
                  <Image
                    src="/logo.png"
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
                className="md:order-14 mobile-order-14 flex flex-col justify-center p-6 bg-amber-100"
              >
                <motion.h3
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInRight}
                  className="text-sm tracking-widest text-gray-500"
                >
                  COMFORT
                </motion.h3>
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInRight}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold mt-2"
                >
                  Amenities
                </motion.h2>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInRight}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mt-4 leading-relaxed"
                >
                  Equipped with cutting-edge facilities and thoughtful infrastructure, our venue ensures a seamless and stress-free experience for both guests and hosts.
                </motion.p>
              </motion.div>

              {/* 8. Customization: Text left, Image right */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInLeft}
                className="md:order-15 mobile-order-15 flex flex-col justify-center p-6 bg-amber-100"
              >
                <motion.h3
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInLeft}
                  className="text-sm tracking-widest text-gray-500"
                >
                  FLEXIBILITY
                </motion.h3>
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInLeft}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold mt-2"
                >
                  Customization
                </motion.h2>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInLeft}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mt-4 leading-relaxed"
                >
                  From floral setups to thematic lighting, every aspect can be tailored to reflect your unique vision — making your event truly one-of-a-kind.
                </motion.p>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInRight}
                className="md:order-16 mobile-order-16 relative"
              >
                <Image
                  src="/p10.jpeg"
                  alt="Customization"
                  width={600}
                  height={400}
                  className="w-full h-auto md:h-[350px] object-cover shadow-md"
                />
                <div className="absolute bottom-4 left-4">
                  <Image
                    src="/logo.png"
                    alt="Evergreen Party Plot Logo"
                    width={100}
                    height={50}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}