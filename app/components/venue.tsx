import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const VenueShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const venueImages = [
    {
      src: "/p1.jpeg",
      title: "Elegant Dining Setup",
      description: "Beautifully arranged dining spaces for your special occasions"
    },
    {
      src: "/p2.jpeg",
      title: "Grand Reception Hall",
      description: "Spacious AC hall perfect for large gatherings and celebrations"
    },
    {
      src: "/p3.jpeg",
      title: "Outdoor Garden Area",
      description: "Lush green lawn area ideal for outdoor ceremonies"
    },
    {
      src: "/p4.jpeg",
      title: "Party Setup",
      description: "Vibrant party arrangements with professional lighting"
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % venueImages.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, venueImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % venueImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + venueImages.length) % venueImages.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-2 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Venue <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Showcase</span>
          </h2>

        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            {venueImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 transform ${
                  index === currentSlide 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{image.title}</h3>
                  <p className="text-lg text-white/90">{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="text-gray-800" size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="text-gray-800" size={24} />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="text-gray-800" size={20} />
            ) : (
              <Play className="text-gray-800" size={20} />
            )}
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {venueImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-green-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Thumbnail Navigation */}
          <div className="grid grid-cols-5 gap-4 mt-8">
            {venueImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                  index === currentSlide 
                    ? 'ring-4 ring-green-500 scale-105' 
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-green-500/20"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        
      </div>
    </section>
  );
};

export default VenueShowcase;