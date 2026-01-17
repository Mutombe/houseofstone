// src/components/properties/forrent.jsx
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  X,
  Heart,
  Share2,
  Home,
  Building,
  TreePine,
  Store,
  Car,
  Wifi,
  Shield,
  Star,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Key,
  Calendar,
  DollarSign,
  Eye,
} from "lucide-react";
import { selectAllProperties } from "../../redux/selectors";
import { fetchProperties } from "../../redux/slices/propertySlice";
import { SiFsecure } from "react-icons/si";
import { IoCarSportOutline } from "react-icons/io5";
import { MdStarPurple500 } from "react-icons/md";

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

// Grid Pattern Background
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

// Skeleton Loader Component - Matches PropertyCard structure with colored backgrounds
const PropertySkeleton = ({ viewMode, index = 0 }) => {
  const isGrid = viewMode === "grid";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`bg-[#0A1628] border border-white/10 rounded-2xl overflow-hidden ${
        isGrid ? "" : "flex flex-row"
      }`}
    >
      {/* Image Container - matches h-56 */}
      <div className={`relative overflow-hidden ${isGrid ? "h-56" : "w-1/3 h-auto min-h-[200px]"}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a3a] to-[#0A1628]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />

        {/* Top badges skeleton - Price & For Rent */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="h-8 w-28 bg-gradient-to-r from-[#C9A962]/40 to-[#B8985A]/40 rounded-full animate-pulse" />
          <div className="h-7 w-20 bg-emerald-500/30 rounded-full animate-pulse flex items-center gap-1 px-2">
            <div className="w-3 h-3 bg-emerald-300/50 rounded animate-pulse" />
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
          <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
        </div>

        {/* Property type badge skeleton */}
        <div className="absolute bottom-4 left-4">
          <div className="h-7 w-24 bg-white/10 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Content - matches p-5 structure */}
      <div className={`p-5 ${isGrid ? "" : "flex-1"}`}>
        {/* Title and rating */}
        <div className="flex justify-between items-start mb-2">
          <div className="h-6 bg-white/10 rounded-lg w-3/4 animate-pulse" />
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse" />
            <div className="w-6 h-4 bg-white/10 rounded animate-pulse" />
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center mb-4">
          <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse mr-1" />
          <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse" />
        </div>

        {/* Stats grid - 3 columns with subtle gold-tinted backgrounds */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse" />
            <div className="w-4 h-4 bg-white/20 rounded animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse" />
            <div className="w-4 h-4 bg-white/20 rounded animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse" />
            <div className="w-6 h-4 bg-white/20 rounded animate-pulse" />
          </div>
        </div>

        {/* Amenities skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-16 bg-white/5 rounded-full animate-pulse" />
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-white/10 rounded animate-pulse" />
            <div className="h-3 w-20 bg-white/10 rounded animate-pulse" />
          </div>
          <div className="h-10 w-28 bg-gradient-to-r from-[#C9A962]/30 to-[#B8985A]/30 rounded-xl animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

// Property Card Component
const PropertyCard = ({ property, viewMode, isFavorite, onToggleFavorite }) => {
  const isGrid = viewMode === "grid";

  const getPropertyTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "house":
        return <Home className="w-4 h-4" />;
      case "apartment":
        return <Building className="w-4 h-4" />;
      case "villa":
        return <TreePine className="w-4 h-4" />;
      case "commercial":
        return <Store className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group relative ${isGrid ? "" : "flex"}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <Link
        to={`/properties/${property.id}`}
        className={`relative block bg-[#0A1628] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C9A962]/30 transition-all duration-500 ${
          isGrid ? "" : "flex w-full"
        }`}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${isGrid ? "h-56" : "w-1/3 h-auto min-h-[200px]"}`}>
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0].image}
              alt={property.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.target.src = "/placeholder-house.jpg";
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a2a3a] to-[#0A1628] flex items-center justify-center">
              <Home className="w-12 h-12 text-gray-600" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <div className="px-3 py-1.5 bg-gradient-to-r from-[#C9A962] to-[#B8985A] rounded-full text-[#0A1628] font-bold text-sm">
              ${parseFloat(property.price).toLocaleString()}/mo
            </div>
            <div className="px-3 py-1.5 bg-emerald-500/90 backdrop-blur-sm rounded-full text-white text-xs font-semibold flex items-center gap-1">
              <Key className="w-3 h-3" />
              For Rent
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite(property.id);
              }}
              className={`w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center transition-all ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-white/10 border border-white/20 text-white hover:bg-red-500"
              }`}
            >
              <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
              }}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-[#C9A962] hover:border-[#C9A962] hover:text-[#0A1628] transition-all"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Property Type */}
          <div className="absolute bottom-4 left-4">
            <div className="px-3 py-1.5 bg-white/10 backdrop-blur-xl rounded-full text-white text-xs font-medium flex items-center gap-1">
              {getPropertyTypeIcon(property.property_type)}
              {property.property_type || "Property"}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`p-5 ${isGrid ? "" : "flex-1"}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-white group-hover:text-[#C9A962] transition-colors line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center text-[#C9A962]">
              <MdStarPurple500 className="w-4 h-4 fill-current" />
              <span className="text-sm text-gray-400 ml-1">4.8</span>
            </div>
          </div>

          <div className="flex items-center text-gray-400 text-sm mb-4">
            <MapPin className="w-4 h-4 mr-1 text-[#C9A962]" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex items-center justify-center gap-2 py-2 bg-white/5 rounded-xl">
              <Bed className="w-4 h-4 text-[#C9A962]" />
              <span className="text-white text-sm font-medium">{property.beds || 0}</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 bg-white/5 rounded-xl">
              <Bath className="w-4 h-4 text-[#C9A962]" />
              <span className="text-white text-sm font-medium">{property.baths || 0}</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 bg-white/5 rounded-xl">
              <Square className="w-4 h-4 text-[#C9A962]" />
              <span className="text-white text-sm font-medium">{property.sqft || 0}</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-full text-gray-400 text-xs">
              <IoCarSportOutline className="w-3 h-3" /> Parking
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-full text-gray-400 text-xs">
              <Wifi className="w-3 h-3" /> WiFi
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-full text-gray-400 text-xs">
              <SiFsecure className="w-3 h-3" /> Secure
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-500 text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              Available now
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] rounded-xl text-sm font-semibold group-hover:shadow-lg group-hover:shadow-[#C9A962]/20 transition-all">
              View Details
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const RentalProperties = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.properties);
  const properties = useSelector(selectAllProperties);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [favorites, setFavorites] = useState(new Set());

  const [filters, setFilters] = useState({
    type: "all",
    priceRange: "all",
    bedrooms: "all",
    bathrooms: "all",
    sqftRange: "all",
    location: "",
  });

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const filteredAndSortedProperties = useMemo(() => {
    if (!Array.isArray(properties)) return [];

    let filtered = properties.filter((property) => {
      if (property.category !== "rental") return false;

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          property.title?.toLowerCase().includes(searchLower) ||
          property.location?.toLowerCase().includes(searchLower) ||
          property.description?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.type !== "all" && property.property_type !== filters.type) {
        return false;
      }

      if (filters.priceRange !== "all") {
        const price = parseFloat(property.price) || 0;
        const [min, max] = filters.priceRange.split("-").map(Number);
        if (price < min || (max && price > max)) return false;
      }

      if (filters.bedrooms !== "all") {
        const beds = parseInt(property.beds) || 0;
        const minBeds = parseInt(filters.bedrooms);
        if (beds < minBeds) return false;
      }

      if (filters.bathrooms !== "all") {
        const baths = parseInt(property.baths) || 0;
        const minBaths = parseInt(filters.bathrooms);
        if (baths < minBaths) return false;
      }

      if (filters.sqftRange !== "all") {
        const sqft = parseInt(property.sqft) || 0;
        const [min, max] = filters.sqftRange.split("-").map(Number);
        if (sqft < min || (max && sqft > max)) return false;
      }

      if (
        filters.location &&
        !property.location?.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
        case "price-high":
          return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
        case "beds":
          return (parseInt(b.beds) || 0) - (parseInt(a.beds) || 0);
        case "sqft":
          return (parseInt(b.sqft) || 0) - (parseInt(a.sqft) || 0);
        case "newest":
        default:
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      }
    });

    return filtered;
  }, [properties, searchTerm, filters, sortBy]);

  const toggleFavorite = (propertyId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  const clearFilters = () => {
    setFilters({
      type: "all",
      priceRange: "all",
      bedrooms: "all",
      bathrooms: "all",
      sqftRange: "all",
      location: "",
    });
    setSearchTerm("");
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== "all" && v !== ""
  ).length;

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-[#060D16] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-[#0A1628] border border-white/10 rounded-2xl max-w-md"
        >
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Error Loading Properties</h3>
          <p className="text-gray-400 mb-6">
            {error && typeof error === "object"
              ? error.message || error.detail || JSON.stringify(error)
              : String(error)}
          </p>
          <button
            onClick={() => dispatch(fetchProperties())}
            className="px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] rounded-xl font-semibold"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060D16]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#1a2a3a]" />
        <FloatingOrb className="w-[600px] h-[600px] bg-[#C9A962] -top-40 -right-40" />
        <FloatingOrb className="w-[400px] h-[400px] bg-emerald-500 bottom-0 -left-20" delay={2} />
        <GridPattern />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex items-center pt-32 pb-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-6"
              >
                <Key className="w-4 h-4 text-emerald-400 mr-2" />
                <span className="text-gray-300 text-sm">Rental Properties</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                <span className="text-white">Find Your Perfect</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400">
                  Rental Home
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-400 max-w-2xl mx-auto"
              >
                Browse through our exclusive collection of rental properties in Zimbabwe's most
                sought-after locations
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Search & Filter Section */}
      <section className="sticky top-0 z-40 bg-[#0A1628]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Main Search Row */}
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, location, or description..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Toggle & View Mode */}
            <div className="flex gap-3 w-full lg:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
                  showFilters
                    ? "bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628]"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-6 h-6 bg-[#0A1628] text-[#C9A962] rounded-full text-xs flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </motion.button>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-4 rounded-xl transition-all ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628]"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`hidden sm:block p-4 rounded-xl transition-all ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628]"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-white/10 mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                    {/* Property Type */}
                    <select
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C9A962] appearance-none cursor-pointer"
                      value={filters.type}
                      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    >
                      <option value="all" className="bg-[#0A1628]">All Types</option>
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

                    {/* Price Range */}
                    <select
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C9A962] appearance-none cursor-pointer"
                      value={filters.priceRange}
                      onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    >
                      <option value="all" className="bg-[#0A1628]">Any Price</option>
                      <option value="0-500" className="bg-[#0A1628]">Under $500</option>
                      <option value="500-1000" className="bg-[#0A1628]">$500 - $1K</option>
                      <option value="1000-2000" className="bg-[#0A1628]">$1K - $2K</option>
                      <option value="2000-5000" className="bg-[#0A1628]">$2K - $5K</option>
                      <option value="5000-100000" className="bg-[#0A1628]">$5K+</option>
                    </select>

                    {/* Bedrooms */}
                    <select
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C9A962] appearance-none cursor-pointer"
                      value={filters.bedrooms}
                      onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                    >
                      <option value="all" className="bg-[#0A1628]">Any Beds</option>
                      <option value="1" className="bg-[#0A1628]">1+ Bed</option>
                      <option value="2" className="bg-[#0A1628]">2+ Beds</option>
                      <option value="3" className="bg-[#0A1628]">3+ Beds</option>
                      <option value="4" className="bg-[#0A1628]">4+ Beds</option>
                    </select>

                    {/* Bathrooms */}
                    <select
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C9A962] appearance-none cursor-pointer"
                      value={filters.bathrooms}
                      onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
                    >
                      <option value="all" className="bg-[#0A1628]">Any Baths</option>
                      <option value="1" className="bg-[#0A1628]">1+ Bath</option>
                      <option value="2" className="bg-[#0A1628]">2+ Baths</option>
                      <option value="3" className="bg-[#0A1628]">3+ Baths</option>
                    </select>

                    {/* Square Footage */}
                    <select
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C9A962] appearance-none cursor-pointer"
                      value={filters.sqftRange}
                      onChange={(e) => setFilters({ ...filters, sqftRange: e.target.value })}
                    >
                      <option value="all" className="bg-[#0A1628]">Any Size</option>
                      <option value="0-1000" className="bg-[#0A1628]">Under 1K sq ft</option>
                      <option value="1000-2000" className="bg-[#0A1628]">1K - 2K sq ft</option>
                      <option value="2000-3000" className="bg-[#0A1628]">2K - 3K sq ft</option>
                      <option value="3000-999999" className="bg-[#0A1628]">3K+ sq ft</option>
                    </select>

                    {/* Sort */}
                    <select
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C9A962] appearance-none cursor-pointer"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="newest" className="bg-[#0A1628]">Newest First</option>
                      <option value="price-low" className="bg-[#0A1628]">Price: Low to High</option>
                      <option value="price-high" className="bg-[#0A1628]">Price: High to Low</option>
                      <option value="beds" className="bg-[#0A1628]">Most Bedrooms</option>
                    </select>
                  </div>

                  {/* Location & Clear */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        placeholder="Filter by location..."
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={clearFilters}
                      className="px-6 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl font-semibold hover:bg-red-500/20 transition-colors"
                    >
                      Clear All
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row justify-between items-center mb-8 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl"
          >
            <div className="text-gray-300 mb-2 sm:mb-0">
              Showing{" "}
              <span className="font-bold text-white">{filteredAndSortedProperties.length}</span>{" "}
              rental properties
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Eye className="w-4 h-4" />
              {activeFilterCount > 0 ? `${activeFilterCount} filters applied` : "No filters"}
            </div>
          </motion.div>

          {/* Properties Grid/List */}
          {status === "loading" ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <PropertySkeleton key={index} viewMode={viewMode} index={index} />
              ))}
            </div>
          ) : filteredAndSortedProperties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Rental Properties Found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search criteria or filters</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="px-8 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] rounded-xl font-semibold"
              >
                Reset Filters
              </motion.button>
            </motion.div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              <AnimatePresence mode="popLayout">
                {filteredAndSortedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    viewMode={viewMode}
                    isFavorite={favorites.has(property.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Mobile Filter FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowFilters(!showFilters)}
        className="fixed bottom-6 right-6 md:hidden w-14 h-14 bg-gradient-to-r from-[#C9A962] to-[#B8985A] rounded-full shadow-lg shadow-[#C9A962]/30 flex items-center justify-center text-[#0A1628] z-50"
      >
        <SlidersHorizontal className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default RentalProperties;
