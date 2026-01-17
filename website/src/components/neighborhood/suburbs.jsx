import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  ArrowLeft,
  ArrowRight,
  Building2,
  DollarSign,
  Navigation,
  Cloud,
  Thermometer,
} from "lucide-react";

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

// Sample data - in a real app this would come from an API
const cityData = {
  harare: {
    name: "Harare",
    coordinates: "17.4532° S, 31.0339° E",
    description:
      "The capital and largest city of Zimbabwe, known for its vibrant urban life, cultural attractions, and economic opportunities.",
    suburbs: [
      {
        name: "Borrowdale",
        description:
          "Borrowdale Brooke is arguably Harare's most prestigious area, anchored by its world-class 18-hole golf course designed by Peter Matkovich and Nick Price. ",
        avgPrice: "$350K",
        avgRent: "$1,200",
        distanceToCBD: "8 km",
        image:
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
      },
      {
        name: "Adylinn",
        description:
          "Tranquil suburban neighborhood with spacious family homes",
        avgPrice: "$185K",
        avgRent: "$700",
        distanceToCBD: "13 km",
        image:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      },
      {
        name: "Highlands",
        description:
          "Established neighborhood with mature trees and quality homes",
        avgPrice: "$275K",
        avgRent: "$900",
        distanceToCBD: "5 km",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      },
      {
        name: "Mount Pleasant",
        description:
          "Popular with young professionals and families, near universities",
        avgPrice: "$220K",
        avgRent: "$750",
        distanceToCBD: "6 km",
        image:
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
      },
      {
        name: "Avondale",
        description:
          "Central location with mix of residential and commercial properties",
        avgPrice: "$195K",
        avgRent: "$650",
        distanceToCBD: "3 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      },
      {
        name: "Greendale",
        description: "Leafy suburb with excellent schools and community feel",
        avgPrice: "$240K",
        avgRent: "$800",
        distanceToCBD: "10 km",
        image:
          "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop",
      },
    ],
  },
  bulawayo: {
    name: "Bulawayo",
    coordinates: "20.1440° S, 28.3531° E",
    description:
      "Zimbabwe's second largest city with wide streets, colonial architecture, and rich cultural heritage.",
    suburbs: [
      {
        name: "Thorngrove",
        description: "Quiet residential area with spacious homes and gardens",
        avgPrice: "$450K",
        avgRent: "$1,500",
        distanceToCBD: "8 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      },
      {
        name: "Barbour Fields",
        description: "Bustling commercial area with a mix of residential and business properties",
        avgPrice: "$450K",
        avgRent: "$1,500",
        distanceToCBD: "8 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      },
      {
        name: "Bradfield",
        description: "Bradfield is a well-established suburb in Bulawayo, known for its spacious homes and family-friendly environment.",
        avgPrice: "$300K",
        avgRent: "$1,200",
        distanceToCBD: "6 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      },
      {
        name: "Khumalo",
        description: "Khumalo is a prestigious suburb in Bulawayo, known for its large homes and well-maintained gardens.",
        avgPrice: "$500K",
        avgRent: "$1,500",
        distanceToCBD: "7 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      },
      {
        name: "Ascot",
        description: "Ascot is a vibrant suburb in Bulawayo, known for its lively atmosphere and diverse community.",
        avgPrice: "$350K",
        avgRent: "$1,500",
        distanceToCBD: "8 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      },
      {
        name: "Malindela",
        description: "Malindela is a peaceful suburb in Bulawayo, known for its spacious homes and family-friendly environment.",
        avgPrice: "$400K",
        avgRent: "$1,500",
        distanceToCBD: "9 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      },
      {
        name: "Morningside",
        description: "Morningside is a charming suburb in Bulawayo, known for its friendly community and well-kept homes.",
        avgPrice: "$350K",
        avgRent: "$1,500",
        distanceToCBD: "7 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      },
    ],
  },
  masvingo: {
    name: "Masvingo",
    coordinates: "20.0625° S, 30.8236° E",
    description:
      "Zimbabwe's oldest colonial settlement, gateway to Great Zimbabwe ruins.",
    suburbs: [
      {
        name: "Rhodene",
        description: "Affluent low-density suburb with manicured gardens",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$140K",
        avgRent: "$700",
        distanceToCBD: "3 km",
      },
      {
        name: "Mucheke",
        description:
          "High-density township with vibrant markets and community life",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$45K",
        avgRent: "$200",
        distanceToCBD: "1.5 km",
      },
    ],
  },
  mutare: {
    name: "Mutare",
    coordinates: "18.967° S, 32.633° E",
    description: "Zimbabwe's gateway to Mozambique and the Eastern Highlands.",
    suburbs: [
      {
        name: "Murambi",
        description: "Upscale hillside neighborhood with panoramic views",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$220K",
        avgRent: "$950",
        distanceToCBD: "4 km",
      },
      {
        name: "Dangamvura",
        description: "High-density suburb with bustling informal markets",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$90K",
        avgRent: "$350",
        distanceToCBD: "7 km",
      },
    ],
  },
  chinhoyi: {
    name: "Chinhoyi",
    coordinates: "17.3497° S, 30.1944° E",
    description: "College town near the Chinhoyi Caves National Park.",
    suburbs: [
      {
        name: "Gadzema",
        description: "Cultural hub with strong community traditions",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$75K",
        avgRent: "$300",
        distanceToCBD: "5 km",
      },
      {
        name: "Hunyani Hills",
        description: "Affluent area near universities and nature reserves",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$150K",
        avgRent: "$600",
        distanceToCBD: "2 km",
      },
    ],
  },
  gweru: {
    name: "Gweru",
    coordinates: "19.4614° S, 29.8022° E",
    description:
      "Industrial hub in Midlands Province with a mix of urban and rural landscapes.",
    suburbs: [
      {
        name: "Windsor Park",
        description: "Leafy suburb with spacious homes and gardens",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$300K",
        avgRent: "$1,200",
        distanceToCBD: "3 km",
      },
      {
        name: "Mtapa",
        description: "Vibrant high-density area with lively markets",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$50K",
        avgRent: "$250",
        distanceToCBD: "4 km",
      },
    ],
  },
};

// Suburb Card Component
const SuburbCard = ({ suburb, cityName, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <Link
      to={`/neighborhoods/${cityName.toLowerCase()}/${suburb.name
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
      className="group block h-full"
    >
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-full hover:border-[#C9A962]/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={suburb.image}
            alt={suburb.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/50 to-transparent" />

          {/* Suburb Name Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white group-hover:text-[#C9A962] transition-colors duration-300">
              {suburb.name}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
            {suburb.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <DollarSign className="w-4 h-4 text-[#C9A962] mx-auto mb-1" />
              <div className="text-xs text-gray-500 mb-1">Avg. Price</div>
              <div className="text-sm font-semibold text-white">{suburb.avgPrice}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <DollarSign className="w-4 h-4 text-[#C9A962] mx-auto mb-1" />
              <div className="text-xs text-gray-500 mb-1">Avg. Rent</div>
              <div className="text-sm font-semibold text-white">{suburb.avgRent}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <Navigation className="w-4 h-4 text-[#C9A962] mx-auto mb-1" />
              <div className="text-xs text-gray-500 mb-1">To CBD</div>
              <div className="text-sm font-semibold text-white">{suburb.distanceToCBD}</div>
            </div>
          </div>

          {/* View More */}
          <div className="flex items-center justify-end gap-1 text-[#C9A962] font-medium text-sm group-hover:gap-2 transition-all duration-300">
            Explore Area
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const CitySuburbs = () => {
  const { cityName } = useParams();
  const city = cityData[cityName.toLowerCase()] || {
    name: cityName,
    description:
      "Explore the neighborhoods and suburbs of this beautiful Zimbabwean city.",
    suburbs: [],
  };

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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/neighborhoods"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#C9A962] transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to all cities
            </Link>
          </motion.div>

          {/* City Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 border border-[#C9A962]/20 rounded-full mb-4">
                  <Building2 className="w-4 h-4 text-[#C9A962]" />
                  <span className="text-[#C9A962] text-sm font-medium">
                    {city.suburbs?.length || 0} Neighborhoods
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {city.name}
                </h1>

                <div className="flex items-center gap-2 text-gray-400 mb-6">
                  <MapPin className="w-5 h-5 text-[#C9A962]" />
                  <span>{city.coordinates || "Coordinates not available"}</span>
                </div>

                <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                  {city.description}
                </p>
              </div>

              {/* Weather Badge */}
              <div className="bg-gradient-to-br from-[#C9A962]/20 to-[#C9A962]/5 border border-[#C9A962]/20 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#C9A962]/20 rounded-full flex items-center justify-center">
                    <Cloud className="w-5 h-5 text-[#C9A962]" />
                  </div>
                  <span className="text-white font-medium">Weather</span>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-gray-400" />
                  <span className="text-2xl font-bold text-white">65°F</span>
                  <span className="text-gray-400 text-sm">Mostly cloudy</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Suburbs Grid */}
      <section className="relative py-16 pb-32">
        <div className="absolute inset-0">
          <GridPattern />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Neighborhoods in{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                {city.name}
              </span>
            </h2>
            <p className="text-gray-400">
              Discover the unique character of each area
            </p>
          </motion.div>

          {city.suburbs && city.suburbs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {city.suburbs.map((suburb, index) => (
                <SuburbCard
                  key={index}
                  suburb={suburb}
                  cityName={cityName}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No neighborhoods listed yet
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                We're working on adding detailed neighborhood information for {city.name}.
                Check back soon!
              </p>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Looking for properties in {city.name}?
              </h3>
              <p className="text-gray-400 mb-8">
                Browse our extensive collection of homes, apartments, and commercial
                properties available in {city.name} and its neighborhoods.
              </p>
              <Link
                to={`/properties?city=${city.name}`}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
              >
                View Properties
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CitySuburbs;
