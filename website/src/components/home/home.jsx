// src/components/home/home.jsx
// A completely fresh, creative design showcasing world-class UI/UX

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Search, ArrowRight, ArrowUpRight, MapPin, Bed, Bath, Maximize,
  Play, ChevronDown, Star, Quote, Phone, Mail, Sparkles,
  Home as HomeIcon, Building2, TrendingUp, Users, Award, Shield,
  Heart, Share2, Eye, Check, Send, ChevronLeft, ChevronRight,
  Compass, Key, Briefcase, Clock, Zap, Globe
} from "lucide-react";
import { fetchProperties } from "../../redux/slices/propertySlice";
import { selectAllProperties } from "../../redux/selectors";
import { SiFsecure } from "react-icons/si";
import { LiaAwardSolid } from "react-icons/lia";
import { TbMoodHappy } from "react-icons/tb";
import { TfiWorld } from "react-icons/tfi";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { GiHouseKeys } from "react-icons/gi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { PiBriefcase } from "react-icons/pi";
import AllPropertiesMap from "../properties/AllPropertiesMap";
import { MdStarPurple500 } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

// =====================================================
// ANIMATED BACKGROUND COMPONENTS
// =====================================================

// Floating gradient orbs that move slowly
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(201,169,98,0.15) 0%, transparent 70%)",
        top: "-10%",
        right: "-10%",
      }}
      animate={{
        x: [0, 50, 0],
        y: [0, 30, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-[800px] h-[800px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(201,169,98,0.1) 0%, transparent 70%)",
        bottom: "-20%",
        left: "-20%",
      }}
      animate={{
        x: [0, -30, 0],
        y: [0, -50, 0],
        scale: [1, 1.15, 1],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-[400px] h-[400px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(10,22,40,0.3) 0%, transparent 70%)",
        top: "40%",
        left: "30%",
      }}
      animate={{
        x: [0, 40, 0],
        y: [0, -40, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

// Animated grid pattern
const GridPattern = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
    <svg width="100%" height="100%">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

// Noise texture overlay
const NoiseOverlay = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }}
  />
);

// =====================================================
// IMMERSIVE HERO SECTION
// =====================================================

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    title: "Luxury Living",
    subtitle: "Redefined",
    location: "Borrowdale, Harare"
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    title: "Modern",
    subtitle: "Elegance",
    location: "Glen Lorne, Harare"
  },
  {
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=80",
    title: "Timeless",
    subtitle: "Services",
    location: "Highlands, Harare"
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovering]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] overflow-hidden bg-[#0A1628]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Images with Ken Burns Effect */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }
            }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <motion.img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
              animate={{ scale: [1, 1.05] }}
              transition={{ duration: 10, ease: "linear" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Sophisticated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0A1628]/40 to-[#0A1628]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/80 via-transparent to-[#0A1628]/60" />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner Accents */}
        <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-[#C9A962]/30" />
        <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-[#C9A962]/30" />
        <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-[#C9A962]/30" />
        <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-[#C9A962]/30" />

        {/* Vertical Lines */}
        <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-[#C9A962]/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-[#C9A962]/20 to-transparent" />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col"
        style={{ y, opacity }}
      >
        {/* Top Bar */}
        <div className="pt-28 sm:pt-32 px-6 sm:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-3 text-[#C9A962]"
          >
            <div className="w-12 h-px bg-[#C9A962]" />
            <span className="text-sm tracking-[0.3em] uppercase font-light">
              Zimbabwe's Premier Real Estate
            </span>
          </motion.div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex items-center px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Typography */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.9] tracking-tight">
                    {heroSlides[currentSlide].title}
                    <span className="block text-[#C9A962] mt-2">
                      {heroSlides[currentSlide].subtitle}
                    </span>
                  </h1>

                  <motion.div
                    className="flex items-center gap-3 mt-8 text-white/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <MapPin className="w-5 h-5 text-[#C9A962]" />
                    <span className="text-lg">{heroSlides[currentSlide].location}</span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4 mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.button
                  onClick={() => navigate("/sale")}
                  className="group relative px-8 py-4 bg-[#C9A962] text-[#0A1628] font-semibold rounded-full overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Explore Properties
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ opacity: 0.2 }}
                  />
                </motion.button>

                <motion.button
                  onClick={() => navigate("/contact")}
                  className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:border-[#C9A962] hover:text-[#C9A962] transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Get in Touch
                  </span>
                </motion.button>
              </motion.div>
            </div>

            {/* Right Side - Featured Card */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 50, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 1, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="relative">
                {/* Glassmorphism Card */}
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <h3 className="text-xl font-semibold text-white mb-6">Quick Search</h3>

                  <div className="space-y-4">
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                      <input
                        type="text"
                        placeholder="Location"
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:border-[#C9A962] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <HiOutlineBuildingOffice2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                        <select className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white/80 focus:border-[#C9A962] focus:outline-none appearance-none cursor-pointer transition-colors">
                          <option value="" className="bg-[#0A1628]">Type</option>
                          <option value="house" className="bg-[#0A1628]">House</option>
                          <option value="apartment" className="bg-[#0A1628]">Apartment</option>
                          <option value="flat" className="bg-[#0A1628]">Flat</option>
                          <option value="land" className="bg-[#0A1628]">Land</option>
                          <option value="commercial" className="bg-[#0A1628]">Commercial</option>
                          <option value="villa" className="bg-[#0A1628]">Villa</option>
                          <option value="cluster" className="bg-[#0A1628]">Cluster</option>
                          <option value="stand" className="bg-[#0A1628]">Stand</option>
                          <option value="duplex" className="bg-[#0A1628]">Duplex</option>
                          <option value="townhouse" className="bg-[#0A1628]">Townhouse</option>
                        </select>
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A962] font-semibold">$</span>
                        <select className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white/80 focus:border-[#C9A962] focus:outline-none appearance-none cursor-pointer transition-colors">
                          <option value="" className="bg-[#0A1628]">Price</option>
                          <option value="100k" className="bg-[#0A1628]">&lt; $100k</option>
                          <option value="250k" className="bg-[#0A1628]">$100k - $250k</option>
                          <option value="500k" className="bg-[#0A1628]">$250k+</option>
                        </select>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => navigate("/sale")}
                      className="w-full py-4 bg-[#C9A962] text-[#0A1628] font-bold rounded-xl flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Search className="w-5 h-5" />
                      Search Now
                    </motion.button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                    {[
                      { value: "500+", label: "Sold" },
                      { value: "15+", label: "Years" },
                      { value: "98%", label: "Happy" },
                    ].map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <p className="text-2xl font-bold text-[#C9A962]">{stat.value}</p>
                        <p className="text-xs text-white/50">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom - Slide Indicators & Scroll */}
        <div className="pb-8 px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto flex items-end justify-between">
            {/* Slide Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                className="p-3 rounded-full border border-white/20 text-white/60 hover:border-[#C9A962] hover:text-[#C9A962] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      idx === currentSlide ? "w-12 bg-[#C9A962]" : "w-6 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                className="p-3 rounded-full border border-white/20 text-white/60 hover:border-[#C9A962] hover:text-[#C9A962] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              className="hidden md:flex items-center gap-4 text-white/40"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm tracking-wider">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// =====================================================
// MARQUEE STATS STRIP
// =====================================================

const MarqueeStats = () => {
  const stats = [
    { icon: HiOutlineHomeModern, text: "500+ Properties Sold" },
    { icon: TbMoodHappy, text: "1,200+ Happy Clients" },
    { icon: LiaAwardSolid, text: "15+ Years Experience" },
    { icon: HiArrowTrendingUp, text: "98% Success Rate" },
    { icon: TfiWorld, text: "Nationwide Coverage" },
    { icon: SiFsecure, text: "Trusted Partner" },
  ];

  return (
    <div className="bg-[#0A1628] py-6 overflow-hidden border-y border-white/10">
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...stats, ...stats].map((stat, idx) => (
          <div key={idx} className="flex items-center gap-3 text-white/60">
            <stat.icon className="w-5 h-5 text-[#C9A962]" />
            <span className="text-sm font-medium tracking-wide">{stat.text}</span>
            <div className="w-2 h-2 rounded-full bg-[#C9A962]/30 ml-8" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// =====================================================
// EXPLORE PROPERTIES MAP SECTION
// =====================================================

const ExploreMapSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative bg-[#0A1628] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9A962]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#C9A962]/5 rounded-full blur-3xl" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 pt-16 pb-8 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 border border-[#C9A962]/20 rounded-full mb-6"
          >
            <MapPin className="w-4 h-4 text-[#C9A962]" />
            <span className="text-[#C9A962] text-sm font-medium tracking-wide">Explore Locations</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Discover Properties{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#E8D5A3]">
              Across Harare
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Browse our exclusive listings across prime locations. From Borrowdale to Glen Lorne,
            find your perfect property in Zimbabwe's most sought-after neighborhoods.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#C9A962]" />
              <span className="text-white/70 text-sm">For Sale</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-white/70 text-sm">For Rent</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="text-white/50 text-sm">
              Click on markers to explore
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >
        {/* Top Gradient Fade */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0A1628] to-transparent z-10 pointer-events-none" />

        {/* Map */}
        <AllPropertiesMap height="70vh" showFilters={true} />

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A1628] to-transparent z-10 pointer-events-none" />
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 pb-16 pt-4 px-4"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/sale')}
            className="px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-[#C9A962]/20 hover:shadow-[#C9A962]/30 transition-all"
          >
            <Building2 className="w-5 h-5" />
            Browse All Properties
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/rent')}
            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all"
          >
            <Key className="w-5 h-5" />
            Rental Properties
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

// =====================================================
// FEATURED PROPERTIES - MAGAZINE LAYOUT
// =====================================================

const PropertyCard = ({ property, index, variant = "default" }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const primaryImage = property.images?.[0]?.image || "/hsp-fallback2.png";

  const formatPrice = (price) => {
    if (!price) return "POA";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (variant === "featured") {
    return (
      <motion.div
        ref={cardRef}
        className="group relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/properties/${property.id}`)}
      >
        <motion.img
          src={primaryImage}
          alt={property.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          onError={(e) => { e.target.src = "/hsp-fallback2.png"; }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/20 to-transparent" />

        {/* Status */}
        <div className="absolute top-6 left-6 flex gap-2">
          {property.featured && (
            <span className="px-4 py-1.5 bg-[#C9A962] text-[#0A1628] text-xs font-bold rounded-full uppercase tracking-wider">
              Featured
            </span>
          )}
          <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-medium rounded-full capitalize">
            {property.listing_type || "For Sale"}
          </span>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="absolute top-6 right-6 flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
        >
          <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-[#0A1628] transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-[#0A1628] transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {formatPrice(property.price)}
            </p>
            <h3 className="text-xl font-semibold text-white mb-3 line-clamp-1">
              {property.title}
            </h3>
            <p className="flex items-center text-white/70 mb-4">
              <MapPin className="w-4 h-4 mr-2 text-[#C9A962]" />
              {property.location}
            </p>

            {/* Specs */}
            <div className="flex gap-4 text-white/80">
              {property.beds && (
                <span className="flex items-center gap-1.5 text-sm">
                  <Bed className="w-4 h-4 text-[#C9A962]" />
                  {property.beds}
                </span>
              )}
              {property.baths && (
                <span className="flex items-center gap-1.5 text-sm">
                  <Bath className="w-4 h-4 text-[#C9A962]" />
                  {property.baths}
                </span>
              )}
              {property.sqft && (
                <span className="flex items-center gap-1.5 text-sm">
                  <Maximize className="w-4 h-4 text-[#C9A962]" />
                  {property.sqft?.toLocaleString()} sqft
                </span>
              )}
            </div>
          </motion.div>

          {/* View Button */}
          <motion.div
            className="mt-6 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="w-full py-3 bg-[#C9A962] text-[#0A1628] font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors">
              View Property
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Default compact card
  return (
    <motion.div
      ref={cardRef}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/properties/${property.id}`)}
    >
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={primaryImage}
          alt={property.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          onError={(e) => { e.target.src = "/hsp-fallback2.png"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#C9A962] text-[#0A1628] text-xs font-bold rounded-full capitalize">
            {property.listing_type || "For Sale"}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-2xl font-bold text-white">{formatPrice(property.price)}</p>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-[#0A1628] mb-2 line-clamp-1 group-hover:text-[#C9A962] transition-colors">
          {property.title}
        </h3>
        <p className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1 text-[#C9A962]" />
          {property.location}
        </p>

        <div className="flex gap-4 text-gray-600 text-sm">
          {property.beds && <span className="flex items-center gap-1"><Bed className="w-4 h-4 text-[#C9A962]" />{property.beds}</span>}
          {property.baths && <span className="flex items-center gap-1"><Bath className="w-4 h-4 text-[#C9A962]" />{property.baths}</span>}
          {property.sqft && <span className="flex items-center gap-1"><Maximize className="w-4 h-4 text-[#C9A962]" />{property.sqft?.toLocaleString()}</span>}
        </div>
      </div>
    </motion.div>
  );
};

// Featured Properties Skeleton Card
const FeaturedPropertySkeleton = ({ variant = "default", index = 0 }) => {
  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden"
      >
        {/* Background with shimmer */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/20 to-transparent" />

        {/* Status badges skeleton */}
        <div className="absolute top-6 left-6 flex gap-2">
          <div className="h-7 w-20 bg-[#C9A962]/40 rounded-full animate-pulse" />
          <div className="h-7 w-16 bg-white/20 rounded-full animate-pulse" />
        </div>

        {/* Action buttons skeleton */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          <div className="w-11 h-11 rounded-full bg-white/10 animate-pulse" />
          <div className="w-11 h-11 rounded-full bg-white/10 animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="h-10 w-32 bg-white/30 rounded-xl animate-pulse mb-3" />
          <div className="h-7 w-3/4 bg-white/20 rounded-lg animate-pulse mb-3" />
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse" />
            <div className="h-4 w-32 bg-white/20 rounded animate-pulse" />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse" />
              <div className="w-4 h-4 bg-white/20 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse" />
              <div className="w-4 h-4 bg-white/20 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse" />
              <div className="w-10 h-4 bg-white/20 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default compact skeleton
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
    >
      <div className="relative h-56 bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 left-4">
          <div className="h-6 w-20 bg-[#C9A962]/40 rounded-full animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="h-8 w-24 bg-white/30 rounded-lg animate-pulse" />
        </div>
      </div>
      <div className="p-5">
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="flex items-center gap-1 mb-4">
          <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse" />
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse" />
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse" />
            <div className="w-10 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const properties = useSelector(selectAllProperties);
  const { loading } = useSelector((state) => state.properties);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const featuredProperties = properties.slice(0, 5);
  const mainProperty = featuredProperties[0];
  const sideProperties = featuredProperties.slice(1, 3);
  const bottomProperties = featuredProperties.slice(3, 5);

  const isLoading = loading && properties.length === 0;

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-[#FAFAFA] relative overflow-hidden">
      <FloatingOrbs />
      <GridPattern />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-1 bg-[#C9A962] rounded-full" />
              <span className="text-[#C9A962] text-sm font-semibold tracking-wider uppercase">Featured Listings</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A1628] leading-tight">
              Curated
              <span className="text-[#C9A962]"> Properties</span>
            </h2>
            <p className="text-gray-600 text-lg mt-4 max-w-lg">
              Handpicked premium properties that define luxury living in Zimbabwe's finest neighborhoods.
            </p>
          </div>

          <motion.button
            onClick={() => navigate("/sale")}
            className="group flex items-center gap-3 px-6 py-3 bg-[#0A1628] text-white rounded-full font-medium hover:bg-[#C9A962] hover:text-[#0A1628] transition-all duration-300 self-start md:self-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Properties
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Loading Skeletons */}
        {isLoading ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Main Featured Skeleton */}
              <div className="lg:col-span-2 lg:row-span-2">
                <FeaturedPropertySkeleton variant="featured" index={0} />
              </div>
              {/* Side Skeletons */}
              <FeaturedPropertySkeleton variant="featured" index={1} />
              <FeaturedPropertySkeleton variant="featured" index={2} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeaturedPropertySkeleton index={3} />
              <FeaturedPropertySkeleton index={4} />
            </div>
          </>
        ) : (
          <>
            {/* Magazine Grid Layout */}
            {mainProperty && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Main Featured */}
                <div className="lg:col-span-2 lg:row-span-2">
                  <PropertyCard property={mainProperty} index={0} variant="featured" />
                </div>

                {/* Side Properties */}
                {sideProperties.map((property, idx) => (
                  <PropertyCard key={property.id} property={property} index={idx + 1} variant="featured" />
                ))}
              </div>
            )}

            {/* Bottom Row */}
            {bottomProperties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bottomProperties.map((property, idx) => (
                  <PropertyCard key={property.id} property={property} index={idx + 3} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

// =====================================================
// SERVICES - BENTO GRID
// =====================================================

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const services = [
    {
      icon: GiHouseKeys,
      title: "Property Sales",
      description: "Expert guidance for buying or selling with maximum value realization.",
      size: "large",
      color: "gold"
    },
    {
      icon: HiOutlineBuildingOffice2,
      title: "Property Management",
      description: "Complete management for landlords and investors.",
      size: "small",
      color: "navy"
    },
    {
      icon: HiArrowTrendingUp,
      title: "Investment Advisory",
      description: "Strategic advice for portfolio growth.",
      size: "small",
      color: "navy"
    },
    {
      icon: Compass,
      title: "Market Analysis",
      description: "In-depth research and valuation services for informed decisions.",
      size: "medium",
      color: "white"
    },
    {
      icon: PiBriefcase,
      title: "Commercial Real Estate",
      description: "Office spaces, retail, and industrial properties.",
      size: "medium",
      color: "white"
    },
    {
      icon: SiFsecure,
      title: "Legal Support",
      description: "Complete documentation and transfer services.",
      size: "small",
      color: "navy"
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-[#C9A962] rounded-full" />
            <span className="text-[#C9A962] text-sm font-semibold tracking-wider uppercase">What We Offer</span>
            <div className="w-12 h-1 bg-[#C9A962] rounded-full" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A1628]">
            Our <span className="text-[#C9A962]">Services</span>
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Comprehensive real estate solutions tailored to your unique needs
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, idx) => {
            const sizeClasses = {
              large: "md:col-span-2 md:row-span-2",
              medium: "md:col-span-2",
              small: ""
            };

            const colorClasses = {
              gold: "bg-[#C9A962] text-[#0A1628]",
              navy: "bg-[#0A1628] text-white",
              white: "bg-white border-2 border-gray-100 text-[#0A1628]"
            };

            return (
              <motion.div
                key={idx}
                className={`group relative p-6 sm:p-8 rounded-3xl ${sizeClasses[service.size]} ${colorClasses[service.color]} overflow-hidden cursor-pointer`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    service.color === "gold" ? "bg-[#0A1628]" :
                    service.color === "navy" ? "bg-[#C9A962]" :
                    "bg-[#C9A962]/10"
                  }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <service.icon className={`w-7 h-7 ${
                    service.color === "gold" ? "text-[#C9A962]" :
                    service.color === "navy" ? "text-[#0A1628]" :
                    "text-[#C9A962]"
                  }`} />
                </motion.div>

                <h3 className={`text-xl sm:text-2xl font-bold mb-3 ${
                  service.color === "white" ? "group-hover:text-[#C9A962]" : ""
                } transition-colors`}>
                  {service.title}
                </h3>
                <p className={`${
                  service.color === "gold" ? "text-[#0A1628]/80" :
                  service.color === "navy" ? "text-white/70" :
                  "text-gray-600"
                } leading-relaxed`}>
                  {service.description}
                </p>

                {/* Arrow */}
                <motion.div
                  className={`absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center ${
                    service.color === "gold" ? "bg-[#0A1628]" :
                    service.color === "navy" ? "bg-white" :
                    "bg-[#0A1628]"
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                >
                  <ArrowUpRight className={`w-5 h-5 ${
                    service.color === "navy" ? "text-[#0A1628]" : "text-white"
                  }`} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// =====================================================
// TESTIMONIALS
// =====================================================

const testimonials = [
  {
    id: 1,
    name: "James Clarke",
    role: "Property Investor",
    content: "House of Stone Properties helped me find the perfect investment opportunity. Their market knowledge and professional approach exceeded all my expectations. Truly world-class service.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Linda Moyo",
    role: "First-time Buyer",
    content: "The team made my first home purchase seamless and stress-free. They guided me through every step with patience and genuine care. I couldn't be happier!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "John Ncube",
    role: "Property Developer",
    content: "Professional service and deep market insights. They've been our trusted real estate partner for years. Outstanding results every single time.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-[#0A1628] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C9A962]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C9A962]/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left - Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-1 bg-[#C9A962] rounded-full" />
              <span className="text-[#C9A962] text-sm font-semibold tracking-wider uppercase">Testimonials</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              What Our
              <span className="text-[#C9A962]"> Clients</span>
              <br />Say About Us
            </h2>
            <p className="text-white/60 text-lg max-w-md">
              Real stories from real clients who trusted us with their property journey.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              {[
                { value: "500+", label: "Properties Sold" },
                { value: "1.2k+", label: "Happy Clients" },
                { value: "4.9", label: "Average Rating" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <p className="text-3xl sm:text-4xl font-bold text-[#C9A962]">{stat.value}</p>
                  <p className="text-white/50 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Testimonial Cards */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="bg-white rounded-3xl p-8 sm:p-10 relative"
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -30, rotateX: 10 }}
                transition={{ duration: 0.5 }}
              >
                {/* Quote Icon */}
                <Quote className="absolute top-8 right-8 w-16 h-16 text-[#C9A962]/10" />

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <MdStarPurple500 key={i} className="w-5 h-5 text-[#C9A962] fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-[#0A1628] text-xl leading-relaxed mb-8 italic">
                  "{testimonials[activeIndex].content}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#C9A962]"
                    onError={(e) => { e.target.src = "/icon.png"; }}
                  />
                  <div className="ml-4">
                    <h4 className="font-bold text-[#0A1628] text-lg">{testimonials[activeIndex].name}</h4>
                    <p className="text-gray-500">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "w-8 bg-[#C9A962]" : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// =====================================================
// CTA SECTION
// =====================================================

const CTASection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0F1E32] to-[#0A1628] p-12 sm:p-16 lg:p-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="cta-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1" fill="#C9A962" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-pattern)" />
            </svg>
          </div>

          {/* Glowing Orbs */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C9A962]/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#C9A962]/10 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#C9A962]/20 rounded-full border border-[#C9A962]/30 mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#C9A962]" />
              <span className="text-[#C9A962] font-medium text-sm">Start Your Journey</span>
            </motion.div>

            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Ready to Find Your
              <span className="text-[#C9A962]"> Dream Home?</span>
            </motion.h2>

            <motion.p
              className="text-white/70 text-xl mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Let our experienced team guide you through your property journey. Contact us today for a free consultation.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.button
                onClick={() => navigate("/sale")}
                className="group px-8 py-4 bg-[#C9A962] text-[#0A1628] font-bold rounded-full flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="w-5 h-5" />
                Browse Properties
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => navigate("/contact")}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" />
                Contact Us
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// =====================================================
// NEWSLETTER
// =====================================================

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl border border-gray-100 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A962]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0A1628]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-8 h-8 text-[#C9A962]" />
                <span className="text-[#C9A962] font-semibold">Newsletter</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-4">
                Stay Updated with
                <span className="text-[#C9A962]"> New Listings</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Subscribe to our newsletter for exclusive property listings, market insights, and special deals.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A962] transition-colors"
                />
              </div>
              <motion.button
                type="submit"
                className="px-8 py-4 bg-[#C9A962] text-[#0A1628] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#B8985A] transition-colors whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubscribed ? (
                  <>
                    <IoCheckmarkDoneCircleOutline className="w-5 h-5" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// =====================================================
// MAIN COMPONENT
// =====================================================

const Homepage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <MarqueeStats />
      <ExploreMapSection />
      <FeaturedProperties />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
      <NewsletterSection />
    </div>
  );
};

export default Homepage;
