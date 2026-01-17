// src/components/properties/properties.jsx
// Creative, world-class property listing page

import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  Search, MapPin, Bed, Bath, Maximize, SlidersHorizontal, X, Heart, Share2,
  Grid, LayoutList, ChevronDown, ChevronLeft, ChevronRight, Home, Building2,
  TreePine, Warehouse, Check, AlertCircle, ArrowUpRight, Filter, Sparkles,
  Car, Wifi, Shield, Eye, TrendingUp, Clock
} from "lucide-react";
import {
  fetchProperties,
  selectMarketplace,
  selectPropertiesLoading,
  selectPropertiesError,
} from "./../../redux/slices/propertySlice";
import { SiFsecure } from "react-icons/si";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

// ============================================================================
// CONSTANTS
// ============================================================================

const HARARE_REGIONS = {
  "Harare North": ["Northwood", "Borrowdale", "Borrowdale Brooke", "Glen Lorne", "Chishawesha", "Emerald Hill", "Mt Pleasant", "Avondale", "Belgravia", "Highlands", "Marlborough", "Vainona", "Chisipiti", "Mandara"],
  "Harare East": ["Greendale", "Athlone", "Eastlea", "Eastgate", "Ruwa", "Zimre Park", "Arcturus", "Epworth"],
  "Harare South": ["Hatfield", "Prospect", "Waterfalls", "Glen View", "Mbare", "Workington", "Southerton", "Willowvale"],
  "Harare West": ["Westgate", "Mabelreign", "Milton Park", "Belvedere", "Kuwadzana", "Dzivarasekwa", "Mufakose", "Budiriro"],
  "Harare Central": ["City Centre", "Avenues", "Braeside", "CBD", "Kopje", "Newlands"],
};

const INITIAL_FILTERS = {
  type: "all",
  priceRange: "all",
  bedrooms: "all",
  bathrooms: "all",
  sqftRange: "all",
  location: "",
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatPrice = (price) => {
  if (!price) return "POA";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(parseFloat(price) || 0);
};

const getPropertyIcon = (type) => {
  const icons = {
    house: Home,
    apartment: Building2,
    villa: TreePine,
    commercial: Warehouse,
  };
  return icons[type?.toLowerCase()] || Home;
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

// Toast Notification
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className="fixed top-24 right-4 z-50"
    >
      <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}>
        {type === "success" ? <IoCheckmarkDoneCircleOutline className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-75"><X className="w-4 h-4" /></button>
      </div>
    </motion.div>
  );
};

// Property Card Skeleton - Matches PropertyCard structure exactly
const PropertyCardSkeleton = ({ index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="group"
  >
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
      {/* Image Container - matches h-64 */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#0A1628]/5 to-[#0A1628]/10">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
             style={{ backgroundSize: '200% 100%' }} />

        {/* Gradient overlay like real card */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 via-transparent to-transparent" />

        {/* Top badges skeleton */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex gap-2">
            <div className="h-7 w-20 bg-[#C9A962]/30 rounded-full animate-pulse" />
            <div className="h-7 w-14 bg-green-500/20 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Bottom price/type skeleton */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="h-8 w-32 bg-white/30 rounded-lg animate-pulse mb-2" />
              <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
            </div>
            <div className="h-7 w-20 bg-green-500/30 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content - matches p-6 structure */}
      <div className="p-6">
        {/* Title skeleton */}
        <div className="h-6 bg-[#0A1628]/10 rounded-lg w-4/5 animate-pulse mb-2" />

        {/* Location skeleton */}
        <div className="flex items-center mb-4">
          <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse mr-2" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
        </div>

        {/* Property specs grid - 3 columns */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50">
            <div className="w-4 h-4 bg-blue-200 rounded animate-pulse" />
            <div className="w-6 h-4 bg-blue-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-50">
            <div className="w-4 h-4 bg-green-200 rounded animate-pulse" />
            <div className="w-6 h-4 bg-green-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-50">
            <div className="w-4 h-4 bg-purple-200 rounded animate-pulse" />
            <div className="w-8 h-4 bg-purple-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Amenities tags skeleton */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-7 w-16 bg-gray-100 rounded-full animate-pulse" />
          ))}
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-20 bg-[#0A1628]/10 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  </motion.div>
);

// Premium Property Card
const PropertyCard = ({ property, favorites, onToggleFavorite, onShare, index }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const primaryImage = property.images?.[0]?.image || "/hsp-fallback2.png";
  const PropertyIcon = getPropertyIcon(property.property_type);

  const daysListed = useMemo(() => {
    if (!property.created_at) return 0;
    return Math.floor((new Date() - new Date(property.created_at)) / (1000 * 60 * 60 * 24));
  }, [property.created_at]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <motion.div
        className="bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer border border-gray-100"
        whileHover={{ y: -12, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={() => navigate(`/properties/${property.id}`)}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={primaryImage}
            alt={property.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6 }}
            onError={(e) => { e.target.src = "/hsp-fallback2.png"; }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />

          {/* Top Row - Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1.5 bg-[#C9A962] text-[#0A1628] text-xs font-bold rounded-full uppercase tracking-wider">
                {property.category || "For Sale"}
              </span>
              {daysListed <= 7 && (
                <span className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> New
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(property.id); }}
                className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                  favorites.has(property.id)
                    ? "bg-red-500 text-white"
                    : "bg-white/20 text-white hover:bg-white hover:text-[#0A1628]"
                }`}
              >
                <Heart className={`w-4 h-4 ${favorites.has(property.id) ? "fill-current" : ""}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onShare(property); }}
                className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-[#0A1628] transition-all"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>

          {/* Bottom Row - Price & Type */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-white mb-1">{formatPrice(property.price)}</p>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <PropertyIcon className="w-4 h-4" />
                  <span className="capitalize">{property.property_type || "Property"}</span>
                </div>
              </div>
              <div className="px-3 py-1.5 bg-green-500/90 text-white text-xs font-semibold rounded-full capitalize">
                {property.status || "Available"}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#0A1628] mb-2 line-clamp-1 group-hover:text-[#C9A962] transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center text-gray-500 mb-4">
            <MapPin className="w-4 h-4 mr-2 text-[#C9A962]" />
            <span className="text-sm truncate">{property.location}</span>
          </div>

          {/* Property Specs */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { icon: Bed, value: property.beds || 0, label: "Beds", color: "bg-blue-50 text-blue-600" },
              { icon: Bath, value: property.baths || 0, label: "Baths", color: "bg-green-50 text-green-600" },
              { icon: Maximize, value: property.sqft || property.area_measurement || 0, label: "sqft", color: "bg-purple-50 text-purple-600" },
            ].map((spec, idx) => (
              <div key={idx} className={`flex items-center justify-center gap-2 py-2.5 rounded-xl ${spec.color}`}>
                <spec.icon className="w-4 h-4" />
                <span className="font-semibold text-sm">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Amenities Tags */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {[
              { icon: Car, label: "Parking" },
              { icon: Wifi, label: "WiFi" },
              { icon: SiFsecure, label: "Security" },
            ].map((amenity, idx) => (
              <span key={idx} className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-full whitespace-nowrap">
                <amenity.icon className="w-3 h-3 text-[#C9A962]" />
                {amenity.label}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center text-gray-400 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {daysListed === 0 ? "Today" : `${daysListed}d ago`}
            </div>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-[#0A1628] text-white text-sm font-semibold rounded-xl hover:bg-[#C9A962] hover:text-[#0A1628] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="w-4 h-4" />
              View
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Filter Chip Component
const FilterChip = ({ label, active, onClick, count }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
      active
        ? "bg-[#0A1628] text-white shadow-lg"
        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
    }`}
  >
    {label}
    {count !== undefined && (
      <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${active ? "bg-[#C9A962] text-[#0A1628]" : "bg-gray-100"}`}>
        {count}
      </span>
    )}
  </motion.button>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const Properties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const headerRef = useRef(null);
  const searchInputRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  // Redux State
  const marketplace = useSelector(selectMarketplace);
  const loading = useSelector(selectPropertiesLoading);
  const error = useSelector(selectPropertiesError);
  const { results: allProperties = [] } = marketplace || {};

  // Local State
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [favorites, setFavorites] = useState(new Set());
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const pageSize = 12;

  // Filtering & Sorting
  const filteredAndSortedProperties = useMemo(() => {
    let filtered = [...allProperties];

    // Search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((p) =>
        p.title?.toLowerCase().includes(searchLower) ||
        p.location?.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower)
      );
    }

    // Region
    if (selectedRegion !== "all") {
      const regionLocations = HARARE_REGIONS[selectedRegion];
      if (regionLocations) {
        filtered = filtered.filter((p) => {
          const loc = p.location?.toLowerCase() || "";
          return regionLocations.some((r) => loc.includes(r.toLowerCase()));
        });
      }
    }

    // Type
    if (filters.type !== "all") {
      filtered = filtered.filter((p) => p.property_type?.toLowerCase() === filters.type.toLowerCase());
    }

    // Bedrooms
    if (filters.bedrooms !== "all") {
      filtered = filtered.filter((p) => (p.beds || 0) >= parseInt(filters.bedrooms));
    }

    // Bathrooms
    if (filters.bathrooms !== "all") {
      filtered = filtered.filter((p) => (p.baths || 0) >= parseInt(filters.bathrooms));
    }

    // Price Range
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter((p) => {
        const price = parseFloat(p.price) || 0;
        return max ? (price >= min && price <= max) : price >= min;
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest": return new Date(b.created_at) - new Date(a.created_at);
        case "oldest": return new Date(a.created_at) - new Date(b.created_at);
        case "price-low": return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
        case "price-high": return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
        case "beds": return (b.beds || 0) - (a.beds || 0);
        default: return 0;
      }
    });

    return filtered;
  }, [allProperties, searchTerm, selectedRegion, filters, sortBy]);

  // Pagination
  const totalProperties = filteredAndSortedProperties.length;
  const totalPages = Math.ceil(totalProperties / pageSize);
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedProperties.slice(start, start + pageSize);
  }, [filteredAndSortedProperties, currentPage]);

  // Callbacks
  const showToast = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setSearchTerm("");
    setSelectedRegion("all");
    setSortBy("newest");
    setCurrentPage(1);
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleShare = useCallback(async (property) => {
    const url = `${window.location.origin}/properties/${property.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: property.title, text: property.location, url });
      } else {
        await navigator.clipboard.writeText(url);
        showToast("Link copied!", "success");
      }
    } catch (e) {
      if (e.name !== "AbortError") showToast("Unable to share", "error");
    }
  }, [showToast]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  }, []);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.type !== "all") count++;
    if (filters.priceRange !== "all") count++;
    if (filters.bedrooms !== "all") count++;
    if (filters.bathrooms !== "all") count++;
    if (selectedRegion !== "all") count++;
    if (searchTerm) count++;
    return count;
  }, [filters, selectedRegion, searchTerm]);

  // Effects
  useEffect(() => {
    dispatch(fetchProperties({ page: 1, page_size: 10000, category: "sale" }));
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRegion, filters, sortBy]);

  // Handle search focus from mobile nav
  useEffect(() => {
    const handleFocusSearch = () => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        // Scroll to search input smoothly
        searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    window.addEventListener('focusPropertySearch', handleFocusSearch);
    return () => window.removeEventListener('focusPropertySearch', handleFocusSearch);
  }, []);

  // Handle focus=search URL parameter
  useEffect(() => {
    if (searchParams.get('focus') === 'search') {
      // Small delay to ensure component is mounted
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      // Clear the parameter after handling
      searchParams.delete('focus');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Determine if we're in initial loading state (show skeletons in grid)
  const isInitialLoading = loading && allProperties.length === 0;

  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-[#060D16] flex items-center justify-center">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.02]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(#C9A962 1px, transparent 1px), linear-gradient(90deg, #C9A962 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>
          <div className="absolute w-[400px] h-[400px] bg-red-500/10 rounded-full blur-3xl top-1/4 right-1/4 animate-pulse" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl max-w-md mx-4"
        >
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Error Loading Properties</h3>
          <p className="text-gray-400 mb-6">
            {typeof error === "object"
              ? error.message || error.detail || "An error occurred while loading properties"
              : String(error)}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(fetchProperties({ page: 1, page_size: 10000, category: "sale" }))}
            className="px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Toast */}
      <AnimatePresence>
        {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast((p) => ({ ...p, show: false }))} />}
      </AnimatePresence>

      {/* Page Header */}
      <section ref={headerRef} className="relative pt-32 pb-16 bg-gradient-to-br from-[#0A1628] via-[#0F1E32] to-[#0A1628] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A962]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A962]/10 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg width="100%" height="100%"><defs><pattern id="propertyGrid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#propertyGrid)" /></svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-1 bg-[#C9A962] rounded-full" />
              <span className="text-[#C9A962] text-sm font-semibold tracking-wider uppercase">Properties for Sale</span>
              <div className="w-12 h-1 bg-[#C9A962] rounded-full" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Find Your <span className="text-[#C9A962]">Dream Home</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Browse our exclusive collection of {totalProperties} premium properties in Zimbabwe's finest neighborhoods
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 max-w-3xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, location, or keywords..."
                className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 text-lg transition-all"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Region Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            <FilterChip label="All Regions" active={selectedRegion === "all"} onClick={() => setSelectedRegion("all")} />
            {Object.keys(HARARE_REGIONS).map((region) => (
              <FilterChip key={region} label={region} active={selectedRegion === region} onClick={() => setSelectedRegion(region)} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          {/* Left - Filter Toggle & Count */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                showFilters ? "bg-[#0A1628] text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-[#C9A962]"
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="px-2 py-0.5 bg-[#C9A962] text-[#0A1628] text-xs font-bold rounded-full">{activeFiltersCount}</span>
              )}
            </motion.button>
            <div className="text-gray-500">
              {isInitialLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-8 h-5 bg-gray-200 rounded animate-pulse" />
                  <span>properties loading...</span>
                </span>
              ) : (
                <>
                  <span className="font-bold text-[#0A1628]">{totalProperties}</span> properties found
                </>
              )}
            </div>
          </div>

          {/* Right - View Mode & Sort */}
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-[#C9A962] cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="beds">Most Bedrooms</option>
            </select>

            <div className="flex bg-white rounded-xl border border-gray-200 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-[#0A1628] text-white" : "text-gray-500 hover:text-[#0A1628]"}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-colors hidden sm:block ${viewMode === "list" ? "bg-[#0A1628] text-white" : "text-gray-500 hover:text-[#0A1628]"}`}
              >
                <LayoutList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A962] bg-gray-50"
                  >
                    <option value="all">All Types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="flat">Flat</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                    <option value="villa">Villa</option>
                    <option value="cluster">Cluster</option>
                    <option value="stand">Stand</option>
                    <option value="duplex">Duplex</option>
                    <option value="townhouse">Townhouse</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A962] bg-gray-50"
                  >
                    <option value="all">Any Price</option>
                    <option value="0-100000">Under $100K</option>
                    <option value="100000-300000">$100K - $300K</option>
                    <option value="300000-500000">$300K - $500K</option>
                    <option value="500000-1000000">$500K - $1M</option>
                    <option value="1000000-99999999">$1M+</option>
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A962] bg-gray-50"
                  >
                    <option value="all">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                  <select
                    value={filters.bathrooms}
                    onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A962] bg-gray-50"
                  >
                    <option value="all">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                {/* Clear Button */}
                <div className="flex items-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearFilters}
                    className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
                  >
                    Clear All
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Properties Grid */}
        {isInitialLoading ? (
          /* Show skeleton cards while loading - only this dynamic section */
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
            {[...Array(6)].map((_, index) => (
              <PropertyCardSkeleton key={index} index={index} />
            ))}
          </div>
        ) : paginatedProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-3xl shadow-lg"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A1628] mb-2">No Properties Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearFilters}
              className="px-8 py-3 bg-[#0A1628] text-white rounded-xl font-semibold"
            >
              Reset Filters
            </motion.button>
          </motion.div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
            {paginatedProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onShare={handleShare}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Pagination - hide during initial loading */}
        {!isInitialLoading && totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`p-3 rounded-xl border transition-colors ${
                  currentPage === 1 ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-300 text-gray-700 hover:border-[#C9A962] hover:text-[#C9A962]"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page;
                if (totalPages <= 5) page = i + 1;
                else if (currentPage <= 3) page = i + 1;
                else if (currentPage >= totalPages - 2) page = totalPages - 4 + i;
                else page = currentPage - 2 + i;
                return (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(page)}
                    className={`w-12 h-12 rounded-xl font-medium transition-colors ${
                      page === currentPage ? "bg-[#C9A962] text-[#0A1628]" : "bg-white border border-gray-200 text-gray-700 hover:border-[#C9A962]"
                    }`}
                  >
                    {page}
                  </motion.button>
                );
              })}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`p-3 rounded-xl border transition-colors ${
                  currentPage === totalPages ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-300 text-gray-700 hover:border-[#C9A962] hover:text-[#C9A962]"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        )}
      </section>

      {/* Mobile Filter FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowFilters(!showFilters)}
        className="fixed bottom-24 right-6 md:hidden w-14 h-14 bg-[#C9A962] text-[#0A1628] rounded-full shadow-2xl flex items-center justify-center z-50"
      >
        <SlidersHorizontal className="w-6 h-6" />
        {activeFiltersCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#0A1628] text-white text-xs font-bold rounded-full flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default Properties;
