import React from 'react';
import { Heart, Gift, Briefcase, Users2, Calendar, Star } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: "Wedding Celebrations",
      description: "Create magical moments with our comprehensive wedding packages including decoration, catering, and coordination services.",
      features: ["Bridal Suite", "Mandap Setup", "Floral Decorations", "Wedding Coordination"],
      image: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: Gift,
      title: "Birthday Parties",
      description: "Make birthdays unforgettable with themed decorations, entertainment, and customized celebration packages.",
      features: ["Theme Decorations", "Entertainment", "Custom Cakes", "Photography"],
      image: "https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: Briefcase,
      title: "Corporate Events",
      description: "Professional venue for meetings, conferences, and corporate gatherings with modern AV equipment and catering.",
      features: ["AV Equipment", "Business Catering", "Meeting Rooms", "WiFi & Tech Support"],
      image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: Users2,
      title: "Social Gatherings",
      description: "Perfect space for family reunions, anniversaries, and social events with flexible arrangements.",
      features: ["Flexible Seating", "Music System", "Catering Options", "Decoration Services"],
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From intimate celebrations to grand events, we offer comprehensive services 
            tailored to make your special moments truly extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
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

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white">
            <Calendar className="mx-auto mb-6 text-green-200" size={48} />
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Plan Your Event?
            </h3>

            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              reservation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;