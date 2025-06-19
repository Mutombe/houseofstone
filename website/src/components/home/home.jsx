import React, { useState, useRef } from "react";
import {
  ArrowRight,
  Home as HomeIcon,
  Building2,
  MapPin,
  Search,
  Star,
  Award,
  TrendingUp,
  Users,
  CheckCircle,
  Phone,
  Mail,
  Calendar,
  Eye,
  Heart,
  Share2,
  Sparkles,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Brand colors consistent with navbar
const COLORS = {
  primary: "#1e293b", // slate-800
  secondary: "#D4AF37", // yellow-500/gold
  accent: "#b07e28", // yellow-600 for darker gold
  light: "#ffffff", // white
  dark: "#0f172a", // slate-900 for deeper contrast
  gray: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
};

// Sample data
const featuredProperties = [
  {
    id: 1,
    title: "Luxury Villa in Borrowdale",
    location: "Borrowdale, Harare",
    price: 450000,
    type: "villa",
    beds: 4,
    baths: 3,
    sqft: 3200,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
    ],
    featured: true,
    status: "For Sale",
  },
  {
    id: 2,
    title: "Modern Apartment in Highlands",
    location: "Highlands, Harare",
    price: 180000,
    type: "apartment",
    beds: 2,
    baths: 2,
    sqft: 1200,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    ],
    featured: true,
    status: "For Rent",
  },
  {
    id: 3,
    title: "Executive Townhouse",
    location: "Mount Pleasant, Harare",
    price: 320000,
    type: "house",
    beds: 3,
    baths: 2,
    sqft: 2400,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    ],
    featured: true,
    status: "For Sale",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Property Investor",
    content:
      "House of Stone Properties helped me find the perfect investment opportunity. Their market knowledge is exceptional.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "First-time Buyer",
    content:
      "The team made my first home purchase seamless and stress-free. Highly recommended!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    role: "Property Developer",
    content:
      "Professional service and deep market insights. They've been our go-to real estate partner for years.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];

// Animated counter component
const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      let startTime = null;
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// Floating animation component
const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

// Glowing button component
const GlowButton = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) => (
  <motion.button
    onClick={onClick}
    className={`
      relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform
      ${
        variant === "primary"
          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 shadow-lg hover:shadow-yellow-500/25"
          : "bg-slate-800 text-white border-2 border-yellow-600 hover:bg-yellow-400 hover:text-slate-900"
      }
      hover:scale-105 active:scale-95 overflow-hidden
      ${className}
    `}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    {...props}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.6 }}
    />
    <span className="relative z-10 flex items-center justify-center">
      {children}
    </span>
  </motion.button>
);

const EnhancedHomepage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyType: "Any Type",
  });

  const handleSearchChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleViewProperties = () => {
    console.log("Navigate to /properties");
  };

  const handleSearch = () => {
    console.log("Searching with params:", searchParams);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background with parallax effect */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-800/75 to-yellow-900/35" />
        </motion.div>

        {/* Floating decorative elements - Hidden on small screens */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
          <FloatingElement delay={0}>
            <div className="absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-yellow-400/20 rounded-full blur-xl" />
          </FloatingElement>
          <FloatingElement delay={1}>
            <div className="absolute top-40 right-4 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 bg-yellow-500/10 rounded-full blur-2xl" />
          </FloatingElement>
          <FloatingElement delay={2}>
            <div className="absolute bottom-20 left-1/4 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full blur-xl" />
          </FloatingElement>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-3 sm:px-4 py-2 bg-yellow-400/20 rounded-full mb-4 sm:mb-6 backdrop-blur-sm border border-yellow-400/30"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2" />
                <span className="text-yellow-100 font-medium text-sm sm:text-base">
                  Premium Real Estate
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
              >
                <span className="text-white">Find Your</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-700">
                  Dream Home
                </span>
                <br />
                <span className="text-white">Today</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 px-2 sm:px-0"
              >
                Discover luxury properties with House of Stone Properties. Your
                journey to the perfect home starts here.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0"
              >
                <GlowButton
                  onClick={handleViewProperties}
                  className="flex-1 sm:flex-none"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Explore Properties
                </GlowButton>
                <GlowButton variant="secondary" className="flex-1 sm:flex-none">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Contact Agent
                </GlowButton>
              </motion.div>
            </motion.div>

            {/* Right Content - Search Card - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full max-w-md mx-auto lg:mx-0 lg:justify-self-end order-1 lg:order-2"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20 mx-4 sm:mx-0">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                    Property Search
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Find your perfect property
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        placeholder="Enter location"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-slate-800 text-sm sm:text-base min-h-[48px]"
                        value={searchParams.location}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Property Type
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <select
                        name="propertyType"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-slate-800 bg-white text-sm sm:text-base min-h-[48px]"
                        value={searchParams.propertyType}
                        onChange={handleSearchChange}
                      >
                        <option>Any Type</option>
                        <option>House</option>
                        <option>Apartment</option>
                        <option>Villa</option>
                        <option>Townhouse</option>
                      </select>
                    </div>
                  </div>

                  <motion.button
                    onClick={handleViewProperties}
                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-slate-900 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-h-[48px] touch-manipulation"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
                    Search Properties
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator - Hidden on mobile */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-700" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Our <span className="text-yellow-600">Achievements</span>
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-yellow-400 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { end: 500, label: "Properties Sold", icon: HomeIcon },
              { end: 1200, label: "Happy Clients", icon: Users },
              { end: 15, label: "Years Experience", icon: Award },
              { end: 98, label: "Success Rate", icon: TrendingUp, suffix: "%" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-3 sm:mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 mb-3 sm:mb-4">
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-slate-900" />
                  </div>
                </div>
                <motion.h3
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-yellow-600 mb-1 sm:mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <CountUp end={stat.end} suffix={stat.suffix || "+"} />
                </motion.h3>
                <p className="text-gray-300 font-medium text-sm sm:text-base text-yellow-600">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
          <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Featured <span className="text-yellow-600">Properties</span>
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-yellow-400 mx-auto mb-4 sm:mb-6" />
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Discover our handpicked selection of premium properties that
              define luxury living
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProperties.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Property badges */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2">
                    <span className="px-2 sm:px-3 py-1 bg-yellow-400 text-slate-900 rounded-full text-xs sm:text-sm font-bold">
                      {property.type.charAt(0).toUpperCase() +
                        property.type.slice(1)}
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-slate-800 text-white rounded-full text-xs sm:text-sm font-bold">
                      {property.status}
                    </span>
                  </div>

                  {/* Action buttons - Larger touch targets */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors touch-manipulation">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                    </button>
                    <button className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors touch-manipulation">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                    </button>
                  </div>

                  {/* Price overlay */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <p className="text-xs sm:text-sm font-medium flex items-center mb-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {property.location}
                    </p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold">
                      ${property.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 group-hover:text-yellow-600 transition-colors">
                    {property.title}
                  </h3>

                  <div className="flex items-center justify-between text-gray-600 mb-4 text-xs sm:text-sm">
                    <div className="flex items-center">
                      <HomeIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <Building2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div>{property.sqft} sqft</div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
                    <button className="flex items-center justify-center sm:justify-start text-yellow-600 font-semibold hover:text-yellow-700 transition-colors py-2 sm:py-0 min-h-[44px] sm:min-h-0 touch-manipulation">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-yellow-500 hover:text-slate-900 transition-colors text-sm font-medium min-h-[44px] touch-manipulation">
                      Contact Agent
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <GlowButton>
              View All Properties
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </GlowButton>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Our <span className="text-yellow-600">Services</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: HomeIcon,
                title: "Property Sales",
                description:
                  "Expert guidance through every step of buying or selling your property",
                features: ["Market Analysis", "Negotiation", "Documentation"],
              },
              {
                icon: Building2,
                title: "Property Management",
                description:
                  "Complete property management services for landlords and investors",
                features: [
                  "Tenant Screening",
                  "Maintenance",
                  "Rent Collection",
                ],
              },
              {
                icon: TrendingUp,
                title: "Investment Consulting",
                description:
                  "Strategic real estate investment advice to maximize your returns",
                features: [
                  "Portfolio Planning",
                  "Market Research",
                  "ROI Analysis",
                ],
              },
              {
                icon: Shield,
                title: "Legal Services",
                description:
                  "Complete legal support for all your real estate transactions",
                features: [
                  "Contract Review",
                  "Title Search",
                  "Legal Documentation",
                ],
              },
              {
                icon: Zap,
                title: "Fast Transactions",
                description:
                  "Streamlined processes to complete your property deals quickly",
                features: [
                  "Quick Approvals",
                  "Digital Processing",
                  "Express Service",
                ],
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description:
                  "Round-the-clock customer support for all your real estate needs",
                features: ["Emergency Support", "Online Portal", "Mobile App"],
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-yellow-400/20"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-slate-900" />
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-yellow-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-700" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Client <span className="text-yellow-600">Testimonials</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear what our clients say about their experience with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-5 h-5 text-yellow-600 fill-current"
                    />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center">
                  <img
                    src="/icon.png"
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-slate-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedHomepage;
