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

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const StatItem = ({ end, label, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.h3
        className="text-3xl md:text-4xl font-bold mb-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
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
      <p className="text-stone-400">{label}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-[url('/home2.webp')] opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full md:w-2/3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-stone-900 mb-6"
            >
              Discover Your Dream Home
              <span className="text-stone-500"> with House of Stone</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-stone-600 mb-8"
            >
              Experience luxury living with our handpicked selection of premium
              properties.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-lg shadow-xl p-4 md:p-6 flex flex-col md:flex-row gap-4"
            >
              <div className="flex-1">
                <label className="text-sm text-stone-500">Location</label>
                <div className="flex items-center mt-1">
                  <MapPin className="w-5 h-5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="ml-2 w-full outline-none text-stone-800"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="text-sm text-stone-500">Property Type</label>
                <select className="w-full mt-1 outline-none text-stone-800 bg-transparent">
                  <option>Any Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                </select>
              </div>
              <button onClick={() => {navigate('/properties')}} className="bg-stone-300 text-black px-8 py-3 rounded-lg hover:bg-stone-700 hover:text-white transition-colors flex items-center justify-center">
                <Search className="w-5 h-5 mr-2" />
                Search
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Featured Properties */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Explore our handpicked selection of premium properties that define
              luxury living.
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
                        <div className="absolute inset-0 bg-gradient-to-r from-stone-500 to-stone-700">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-semibold">{property.location}</p>
                    <p className="text-2xl font-bold">
                      ${property.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    {property.title}
                  </h3>
                  <p className="text-stone-600 mb-4">
                    {property.beds} Beds • {property.baths} Baths •{" "}
                    {property.sqft} sqft
                  </p>
                  <Link
                    to={`/properties/${property.id}`}
                    className="flex items-center text-stone-900 font-semibold hover:text-stone-700"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Animated Statistics Section */}
          <StatsSection />
    </div>
  );
};

export default Home;
