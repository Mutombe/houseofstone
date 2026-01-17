import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Building2, Sparkles } from "lucide-react";

// Floating Orb Component
const FloatingOrb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.2, 0.1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

// Grid Pattern Component
const GridPattern = () => (
  <div className="absolute inset-0 opacity-[0.02]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(#C9A962 1px, transparent 1px), linear-gradient(90deg, #C9A962 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

const cities = [
  {
    name: "Harare",
    province: "Harare",
    coordinates: "17.4532° S, 31.0339° E",
    description: "The capital city of Zimbabwe with vibrant urban life",
    image: "harare1.jpg",
    suburbCount: 6,
  },
  {
    name: "Bulawayo",
    province: "Bulawayo",
    coordinates: "20.1440° S, 28.3531° E",
    description: "Zimbabwe's second largest city with rich history",
    image: "bulawayo.png",
    suburbCount: 7,
  },
  {
    name: "Mutare",
    province: "Manicaland",
    coordinates: "18.3786° S, 32.1746° E",
    description: "Picturesque city near the Eastern Highlands",
    image: "mutare.webp",
    suburbCount: 2,
  },
  {
    name: "Masvingo",
    province: "Masvingo",
    coordinates: "20.8242° S, 31.2626° E",
    description: "Gateway to the Great Zimbabwe ruins",
    image: "masvingo.webp",
    suburbCount: 2,
  },
  {
    name: "Chinhoyi",
    province: "Mashonaland West",
    coordinates: "17.4831° S, 28.7889° E",
    description: "Known for the Chinhoyi Caves and agricultural lands",
    image: "chinhoyi.webp",
    suburbCount: 2,
  },
  {
    name: "Gweru",
    province: "Midlands",
    coordinates: "19.0532° S, 29.6035° E",
    description: "Industrial hub in the center of Zimbabwe",
    image: "gweru.png",
    suburbCount: 2,
  },
];

// City Card Component
const CityCard = ({ city, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <Link
      to={`/neighborhoods/${city.name.toLowerCase()}`}
      className="group block h-full"
    >
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-full hover:border-[#C9A962]/30 transition-all duration-300">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/50 to-transparent" />

          {/* Province Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-[#C9A962]/90 text-[#0A1628] text-xs font-semibold rounded-full">
            {city.province}
          </div>

          {/* City Name Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white group-hover:text-[#C9A962] transition-colors duration-300">
              {city.name}
            </h2>
            <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
              <MapPin className="w-3 h-3" />
              <span>{city.coordinates}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-400 mb-4 leading-relaxed">
            {city.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Building2 className="w-4 h-4 text-[#C9A962]" />
              <span>{city.suburbCount} neighborhoods</span>
            </div>
            <div className="flex items-center gap-1 text-[#C9A962] font-medium text-sm group-hover:gap-2 transition-all duration-300">
              Explore
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const CitiesOverview = () => {
  return (
    <div className="min-h-screen bg-[#060D16]">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#0F1D2F]" />
          <GridPattern />
          <FloatingOrb className="w-[600px] h-[600px] bg-[#C9A962] -top-40 -right-40" delay={0} />
          <FloatingOrb className="w-[400px] h-[400px] bg-[#1E3A5F] bottom-0 left-20" delay={2} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 border border-[#C9A962]/20 rounded-full mb-6"
          >
            <MapPin className="w-4 h-4 text-[#C9A962]" />
            <span className="text-[#C9A962] text-sm font-medium">Discover Zimbabwe</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Explore All of{" "}
            <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
              Zimbabwe
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            A deep dive into all the suburbs and neighborhoods in every
            Zimbabwean province, city and town. Find your perfect location.
          </motion.p>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="relative py-16 pb-32">
        <div className="absolute inset-0">
          <GridPattern />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((city, index) => (
              <CityCard key={index} city={city} index={index} />
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 border border-[#C9A962]/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#C9A962]" />
              <span className="text-[#C9A962] text-sm font-medium">
                Can't find your area?
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Looking for a specific neighborhood?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Our database is constantly expanding. Contact us if you'd like
              information about a specific area.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
            >
              Contact Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CitiesOverview;
