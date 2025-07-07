'use client';
import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Trees,
  Building2,
  Car,
  Settings,
  Palette,
  Users,
  CalendarHeart,
} from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import CountUp from './count-up';
import Stack from './stack';
import { motion } from 'framer-motion';

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    alert(`Phone number ${text} copied to clipboard!`);
  }).catch(err => console.error('Failed to copy:', err));
};

const Features = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const features = [
    {
      icon: MapPin,
      title: 'Prime Location',
      description: 'Centrally located in Chikhli,Navsari , making it easily accessible for all your guests.',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Trees,
      title: 'Sprawling Lawn',
      countUpFrom: 1000,
      countUpTo: 3000,
      unit: 'sq. ft.',
      description: 'of lush green space for outdoor ceremonies and joyful gatherings.',
      color: 'from-lime-500 to-green-600',
    },
    {
      icon: Building2,
      title: 'Banquet Hall',
      description: 'Fully air-conditioned and spacious — perfect for elegant indoor events year-round.',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Car,
      title: 'Ample Parking',
      countUpFrom: 0,
      countUpTo: 300,
      unit: '+ vehicles',
      description: 'with dedicated space to ensure a stress-free arrival for everyone.',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      icon: Settings,
      title: 'Modern Amenities',
      description: 'State-of-the-art infrastructure ensures comfort, convenience, and a smooth experience.',
      color: 'from-gray-500 to-slate-600',
    },
    {
      icon: Palette,
      title: 'Customizable Decor',
      description: 'From classic themes to bold creativity — we shape every detail to your vision.',
      color: 'from-pink-500 to-rose-600',
    },
    {
      icon: CalendarHeart,
      title: 'Versatile Events',
      description: 'Host weddings, birthdays, corporate functions, and more — all in one iconic venue.',
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: Users,
      title: 'Large Guest Capacity',
      countUpFrom: 100,
      countUpTo: 2000,
      unit: '+ guests',
      description: 'comfortably seated — ideal for both intimate and grand occasions.',
      color: 'from-teal-500 to-cyan-600',
    },
  ];

  const cardDimensions = { width: 260, height: 360 }; // example
  const images = [
  { id: 1, img: "/p1.jpeg" },
  { id: 2, img: "/p2.jpeg" },
  { id: 3, img: "/p3.jpeg" },
  { id: 4, img: "/p4.jpeg" },
  { id: 5, img: "/p1.jpeg" }
];// supply actual image cards here

  return (
    <section id="features" className="bg-[#FEFFF1]">
      {isMobile ? (
        // === 📱 MOBILE VERSION ===
        <motion.div
          className="px-6 md:px-12 lg:px-24 py-2 flex items-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-2xl font-semibold mt-4 text-[#4e4b42] italic">
                A premium event destination where timeless elegance meets grand celebration.
              </p>

              <div className="mt-8 space-y-2 text-gray-800 text-base font-medium">
                <p>📍 <span className="font-semibold text-green-700">Location:</span> Prime, easily accessible spot in Chikhli,Navsari.</p>
                <p>🌿 <span className="font-semibold text-green-700">Lawn Area:</span>
                  <span className="font-semibold text-green-800"> <CountUp from={1000} to={3000} duration={2} /> sq. ft. </span>
                  lawn –Ideal for weddings, receptions, and cultural events.
                </p>
                <p>❄️ <span className="font-semibold text-green-700">Banquet Hall:</span> Spacious, fully air-conditioned hall.</p>
                <p>🚗 <span className="font-semibold text-green-700">Parking:</span>
                  <span className="font-semibold text-green-800"> <CountUp from={0} to={300} duration={2} /> </span>
                  + Hassle-free for all your guests
                </p>
                <p>🛠️ <span className="font-semibold text-green-700">Amenities:</span> Modern infrastructure.</p>
                <p>🎨 <span className="font-semibold text-green-700">Customization:</span> Tailored décor & planning.</p>
                <p>🎉 <span className="font-semibold text-green-700">Events:</span> Weddings, birthdays, corporate events & more.</p>
                <p>👥 <span className="font-semibold text-green-700">Capacity:</span>
                  <span className="font-semibold text-green-800"> <CountUp from={100} to={2000} duration={2} /> </span>
                  + guests – For grand or intimate gatherings.
                </p>
              </div>
                          <p className="text-lg md:text-xl font-semibold mb-1">
              For exclusive reservations and inquiries:
            </p>

            <p
              onClick={() => copyToClipboard("+91 76006 16660")}
              className="text-2xl md:text-3xl font-semibold cursor-pointer select-text underline decoration-green-600 decoration-2 hover:decoration-green-800 transition"
              role="button"
              tabIndex={0}
              onKeyPress={e => {
                if (e.key === 'Enter') copyToClipboard("+91 76006 16660");
              }}
              aria-label="Copy phone number to clipboard"
            >
              +91 76006 16660
            </p>
              <Link
              href="/reservation"
              className="inline-block whitespace-nowrap bg-gradient-to-r from-green-700 to-green-500 text-white text-lg md:text-xl font-semibold px-8 py-2 rounded-full shadow-xl hover:scale-105 hover:from-green-800 hover:to-green-600 transition duration-300 hover:text-black ease-in-out"
            >
              Reserve Now
            </Link>

            </motion.div>
            
            


          </div>
          
        </motion.div>
      ) : (
        // === 🖥️ DESKTOP / TABLET VERSION ===
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-2xl md:text-3xl font-semibold mt-4 text-[#4e4b42] italic">
              A premium event destination where timeless elegance meets grand celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-2 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 min-h-[100px] flex flex-col justify-between"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white" size={28} />
                </div>

                <h3 className="text-l font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.countUpTo ? (
                    <>
                      <span className="font-bold text-green-700">
                        <CountUp from={feature.countUpFrom || 0} to={feature.countUpTo} duration={2} separator="," /> {feature.unit}
                      </span>{' '}
                      {feature.description}
                    </>
                  ) : (
                    feature.description
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need Under One Roof
            </h3>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, we provide comprehensive solutions to
              make your event seamless and memorable.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {['Weddings', 'Birthday Parties', 'Corporate Events', 'Cultural Functions', 'Get-togethers'].map((tag, idx) => (
                <span key={idx} className="bg-white/20 px-6 py-3 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-lg md:text-xl font-semibold mb-1">
              For exclusive reservations and inquiries:
            </p>

            <p
              onClick={() => copyToClipboard("+91 76006 16660")}
              className="text-2xl md:text-3xl font-semibold cursor-pointer select-text underline decoration-green-600 decoration-2 hover:decoration-green-800 transition"
              role="button"
              tabIndex={0}
              onKeyPress={e => {
                if (e.key === 'Enter') copyToClipboard("+91 76006 16660");
              }}
              aria-label="Copy phone number to clipboard"
            >
              +91 76006 16660
            </p>

            <div className="flex items-center my-2 gap-2">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="text-gray-200 font-medium text-sm">or</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <Link
              href="/reservation"
              className="inline-block whitespace-nowrap bg-gradient-to-r from-green-700 to-green-500 text-white text-lg md:text-xl font-semibold px-8 py-2 rounded-full shadow-xl hover:scale-105 hover:from-green-800 hover:to-green-600 transition duration-300 hover:text-black ease-in-out"
            >
              Reserve Now
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Features;
