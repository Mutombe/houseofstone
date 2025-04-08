// src/pages/Home.jsx
import {
  ArrowRight,
  Home as HomeIcon,
  Building2,
  MapPin,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { featuredProperties } from "../data/properties";
import CountUp from 'react-countup';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Brand color constants
const COLORS = {
  primary: '#8B7355', // Stone brown as primary brand color
  secondary: '#D2B48C', // Tan/light stone color
  accent: '#5D4037', // Dark stone color for accents
  light: '#F5F5DC', // Beige/off-white for light backgrounds
  dark: '#3E2723', // Very dark brown for text
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9F7F5',
    100: '#F0EBE5',
    200: '#E0D5C9',
    300: '#C9B8A8',
    400: '#B39E89',
    500: '#8B7355',
    600: '#6D5A43',
    700: '#4F4132',
    800: '#332B21',
    900: '#1A1610',
  }
};

const StatItem = ({ end, label, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay }}
      className="text-center"
    >
      <motion.h3
        className="text-3xl md:text-4xl font-bold mb-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        style={{ color: COLORS.secondary }}
      >
        <CountUp
          end={end}
          duration={2.5}
          suffix="+"
          useEasing={true}
          start={0}
          enableScrollSpy={true}
          scrollSpyOnce={true}
        />
      </motion.h3>
      <p className="text-gray-300">{label}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20" style={{ backgroundColor: COLORS.dark }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { end: 500, label: 'Properties' },
            { end: 1000, label: 'Happy Clients' },
            { end: 50, label: 'Cities' },
            { end: 10, label: 'Awards' },
          ].map((stat, i) => (
            <StatItem
              key={i}
              end={stat.end}
              label={stat.label}
              delay={i * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: 'Any Type'
  });

  const handleSearchChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = () => {
    // Navigate to properties page with search parameters
    navigate('/properties', { 
      state: { 
        location: searchParams.location,
        propertyType: searchParams.propertyType 
      } 
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{
            backgroundImage: "url('/home2.webp')",
            opacity: 0.8,
          }} 
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundColor: 'rgba(94, 77, 61, 0.4)' // Brand overlay color with transparency
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full md:w-2/3 lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Discover Your Dream Home
                <span style={{ color: COLORS.primary }}> with House of Stone</span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-700 mb-8"
              >
                Experience luxury living with our handpicked selection of premium properties.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-lg shadow-lg p-4 md:p-6"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm text-gray-500 font-medium">Location</label>
                    <div className="flex items-center mt-1 border-b-2 border-gray-200 focus-within:border-gray-800 pb-1">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        placeholder="Enter location"
                        className="ml-2 w-full outline-none text-gray-800"
                        value={searchParams.location}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-500 font-medium">Property Type</label>
                    <div className="border-b-2 border-gray-200 focus-within:border-gray-800 pb-1 mt-1">
                      <select 
                        name="propertyType"
                        className="w-full outline-none text-gray-800 bg-transparent"
                        value={searchParams.propertyType}
                        onChange={handleSearchChange}
                      >
                        <option>Any Type</option>
                        <option>House</option>
                        <option>Apartment</option>
                        <option>Villa</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    onClick={handleSearch} 
                    style={{ backgroundColor: COLORS.primary }}
                    className="text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20" style={{ backgroundColor: COLORS.gray[50] }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.dark }}>
              Featured Properties
            </h2>
            <div className="h-1 w-24 mx-auto mb-6" style={{ backgroundColor: COLORS.primary }}></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of premium properties that define luxury living.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <div className="absolute inset-0">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
                    >
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-semibold flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </p>
                    <p className="text-2xl font-bold">
                      ${property.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.dark }}>
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <div className="flex items-center mr-4">
                      <HomeIcon className="w-4 h-4 mr-1" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <Building2 className="w-4 h-4 mr-1" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                  <Link
                    to={`/properties/${property.id}`}
                    className="flex items-center font-semibold hover:underline"
                    style={{ color: COLORS.primary }}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/properties"
              className="inline-flex items-center px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
              style={{ 
                backgroundColor: COLORS.secondary,
                color: COLORS.dark
              }}
            >
              View All Properties
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Animated Statistics Section */}
      <StatsSection />

      {/* Call to Action Section */}
      <section className="py-16" style={{ backgroundColor: COLORS.light }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.dark }}>
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-gray-600 max-w-lg">
                Contact our real estate experts today and let us help you find the perfect property.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-lg font-semibold"
                style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
              >
                Contact Us
              </Link>
              <Link
                to="/properties"
                className="px-6 py-3 rounded-lg font-semibold border-2"
                style={{ 
                  borderColor: COLORS.primary,
                  color: COLORS.primary
                }}
              >
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;