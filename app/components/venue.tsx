import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

const VenueShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const venueImages = [
    {
      src: "/H2.JPG",
      title: "Banquet Hall Exterior",
      description:
        "Elegant exterior view of the banquet hall showcasing its grand entrance and spacious design.",
    },
    {
      src: "/H1.jpg",
      title: "Air-Conditioned Banquet Hall",
      description:
        "Spacious air-conditioned hall perfect for weddings, receptions, and large gatherings.",
    },
    {
      src: "/H3.JPG",
      title: "Lawn Area",
      description:
        "Spacious green lawn ideal for weddings, receptions, and outdoor celebrations.",
    },
    {
      src: "/H5.JPG",
      title: "Banquet Hall Side View",
      description:
        "Side view of the banquet hall showcasing its spacious structure and elegant exterior design.",
    },
    {
      src: "/T1.JPG",
      title: "Aerial View",
      description:
        "A stunning aerial view highlighting the full property layout, including halls, lawn, and parking areas.",
    },
    {
      src: "/H6.JPG",
      title: "Parking Aerial View",
      description:
        "Aerial view of the spacious parking area designed for smooth vehicle movement and guest convenience.",
    },
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
    setCurrentSlide(
      (prev) => (prev - 1 + venueImages.length) % venueImages.length,
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-2 bg-[#FEFFF1]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Venue{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Highlights
            </span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-96 md:h-[500px]  rounded-3xl overflow-hidden shadow-2xl">
            {venueImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 transform ${
                  index === currentSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {image.title}
                  </h3>
                  <p className="text-lg text-white/90">{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className="
            hidden md:block
    absolute
    left-4
    top-1/2
    -translate-y-1/2
    p-3
    text-white
    rounded-full
    transition-all
    duration-300
    hover:scale-110
   
  "
          >
            <ChevronLeft className="text-white drop-shadow-lg" size={26} />
          </button>

          <button
            onClick={nextSlide}
            className="
            hidden md:block
    absolute
    right-4
    top-1/2
    -translate-y-1/2
    p-3
    text-white
    rounded-full 
    transition-all
    duration-300
    hover:scale-110
    
  "
          >
            <ChevronRight className="text-white drop-shadow-lg" size={26} />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="
    absolute
    top-4
    right-4
    p-3
    text-white
    rounded-full
    transition-all
    duration-300
    hover:scale-110
    hover:shadow-xl
  "
          >
            {isPlaying ? (
              <Pause className="text-white drop-shadow-lg" size={20} />
            ) : (
              <Play className="text-white drop-shadow-lg" size={20} />
            )}
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center items-center mt-8 gap-3">
            {venueImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`
        relative
        h-2
        rounded-full
        transition-all
        duration-300
        ease-in-out
        ${
          index === currentSlide
            ? "w-8 bg-green-600 shadow-md shadow-green-600/40 scale-110"
            : "w-2 bg-gray-300 hover:bg-gray-400 hover:scale-110"
        }
      `}
              />
            ))}
          </div>

          {/* Thumbnail Navigation */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-8">
            {venueImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`
        relative
        w-full
        aspect-[4/3]
        rounded-2xl
        overflow-hidden
        transition-all
        duration-300

        ${
          index === currentSlide
            ? "ring-2 ring-green-600 scale-105 shadow-lg"
            : "opacity-70 hover:opacity-100 hover:scale-105"
        }
      `}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover rounded-2xl "
                />

                {index === currentSlide && (
                  <div className="absolute inset-0 bg-green-600/20 rounded-2xl"></div>
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
