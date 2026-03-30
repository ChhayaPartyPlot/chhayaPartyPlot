import React, { useState, useEffect } from "react";
import {
  Heart,
  Gift,
  Briefcase,
  Users2,
  Calendar,
  Star,
  ChevronLeft,
  ChevronRight,
  Cake,
} from "lucide-react";
import Link from "next/link";
import { FaRing } from "react-icons/fa";

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % services.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [isMobile]);

  const services = [
    {
      icon: Heart,
      title: "Wedding Celebrations",
      description:
        "Host grand wedding ceremonies with elegant décor, spacious halls, and dedicated arrangements for your special day.",
      features: [
        "Mandap Setup",
        "Bridal & Groom Rooms",
        "Floral Decorations",
        "Wedding Coordination",
      ],
      image: "S1.png",
      color: "from-pink-500 to-rose-600",
    },

    {
      icon: Gift,
      title: "Engagement Ceremonies",
      description:
        "Celebrate your engagement in style with beautifully arranged décor and comfortable seating for your guests.",
      features: [
        "Stage Decoration",
        "Ring Ceremony Setup",
        "Lighting & Sound",
        "Photo-Friendly Backdrops",
      ],
      image: "S2.jpg",
      color: "from-purple-500 to-indigo-600",
    },

    {
      icon: Cake,
      title: "Birthday Parties",
      description:
        "Make birthdays memorable with themed decorations and spacious party arrangements.",
      features: [
        "Theme Decorations",
        "Cake Table Setup",
        "Music & Lighting",
        "Kids Play Area Setup",
      ],
      image: "S5.jpg",
      color: "from-orange-500 to-pink-500",
    },

    {
      icon: Users2,
      title: "Reception & Social Events",
      description:
        "Perfect venue for receptions, anniversaries, and family gatherings with flexible seating arrangements.",
      features: [
        "Reception Stage Setup",
        "Dining Arrangements",
        "Music System",
        "Decoration Services",
      ],
      image: "S4.jpg",
      color: "from-green-500 to-emerald-600",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section id="services" className="py-20 bg-[#FEFFF1]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {/* Heading */}
          <h2
            className="
    text-3xl sm:text-4xl md:text-5xl
    font-bold
    text-gray-800
    mb-6
  "
          >
            Our{" "}
            <span
              className="
      text-transparent
      bg-clip-text
      bg-gradient-to-r
      from-green-600
      to-emerald-600
    "
            >
              Services
            </span>
          </h2>

          {/* Description */}
          <p
            className="
    text-base sm:text-lg md:text-xl
    text-gray-600
    max-w-3xl
    mx-auto
    leading-relaxed
  "
          >
            From intimate celebrations to grand events, we offer comprehensive
            services tailored to make your special moments truly extraordinary.
          </p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <div
                    className={`bg-gradient-to-r ${service.color} p-3 rounded-2xl shadow-lg`}
                  >
                    <service.icon className="text-white" size={28} />
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-2 text-sm text-gray-700"
                    >
                      <Star className="text-green-500 fill-current" size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden relative mb-16">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {services.map((service, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-lg mx-2">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <div
                          className={`bg-gradient-to-r ${service.color} p-2 rounded-xl shadow-lg`}
                        >
                          <service.icon className="text-white" size={20} />
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {service.title}
                      </h3>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center space-x-2 text-xs text-gray-700"
                          >
                            <Star
                              className="text-green-500 fill-current"
                              size={12}
                            />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm p-2 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="text-gray-800" size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm p-2 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronRight className="text-gray-800" size={20} />
          </button>

          {/* Mobile Carousel Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-green-600 w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Service Counter for Mobile */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500">
              {currentSlide + 1} of {services.length}
            </span>
          </div>
        </div>

        {/* Call to Action */}

        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl px-6 md:px-12 py-10 md:py-12 text-white shadow-xl">
            {/* Icon */}

            <Calendar className="mx-auto mb-6 text-green-200" size={48} />

            {/* Heading */}

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Plan Your Special Event at Chhaya Party Plot
            </h3>

            {/* Description */}

            <p className="text-sm md:text-lg text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Check available dates and reserve your venue today. From weddings
              to celebrations, we make every moment memorable with elegant
              spaces and seamless service.
            </p>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* Reservation Button */}

              <Link
                href="/reservation"
                className="
          inline-block
          bg-white text-green-600
          hover:bg-green-50
          px-8 py-4
          rounded-full
          font-semibold
          text-lg
          transition-all duration-300
          transform hover:scale-105
          hover:shadow-lg
        "
              >
                Book Your Event
              </Link>

              {/* Optional Call Button */}

              <a
                href="tel:+917600616660"
                className="
          inline-block
          bg-green-800 text-white
          hover:bg-green-900
          px-8 py-4
          rounded-full
          font-semibold
          text-lg
          transition-all duration-300
          transform hover:scale-105
        "
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
