import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  Filter,
  Grid,
  List as ListIcon,
  SlidersHorizontal,
  X,
  Heart,
  Share2,
  Home,
  Building,
  TreePine,
  Store,
  Car,
  Shield,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Hammer,
  HardHat,
  Ruler,
  Building2,
  Landmark,
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
// DESIGN COMPONENTS
// ============================================================================

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

// ============================================================================
// CONSTANTS
// ============================================================================

const HARARE_REGIONS = {
  "Harare North": [
    "Northwood", "Borrowdale", "Borrowdale Brooke", "Glen Lorne",
    "Chishawesha", "Emerald Hill", "Mt Pleasant", "Avondale",
    "Belgravia", "Highlands", "Marlborough", "Vainona",
    "Cedrre Valley", "Chisipiti", "Mandara",
  ],
  "Harare East": [
    "Greendale", "Athlone", "Eastlea", "Eastgate", "Ruwa",
    "Zimre Park", "Arcturus", "Epworth", "Machipisa",
  ],
  "Harare South": [
    "Hatfield", "Prospect", "Waterfalls", "Glen View",
    "Mbare", "Workington", "Southerton", "Willowvale",
  ],
  "Harare West": [
    "Westgate", "Mabelreign", "Milton Park", "Belvedere",
    "Kuwadzana", "Dzivarasekwa", "Mufakose", "Budiriro",
  ],
  "Harare Central": [
    "City Centre", "Avenues", "Braeside", "CBD", "Kopje", "Newlands",
  ],
};

const INITIAL_FILTERS = {
  type: "all",
  priceRange: "all",
  bedrooms: "all",
  bathrooms: "all",
  listingType: "sale",
  amenities: [],
  sqftRange: "all",
  location: "",
  page: 1,
  page_size: 12,
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getPropertyTypeIcon = (type) => {
  const icons = {
    house: <Home className="w-4 h-4" />,
    apartment: <Building className="w-4 h-4" />,
    villa: <TreePine className="w-4 h-4" />,
    commercial: <Store className="w-4 h-4" />,
    development: <Hammer className="w-4 h-4" />,
    land: <Landmark className="w-4 h-4" />,
  };
  return icons[type?.toLowerCase()] || <Hammer className="w-4 h-4" />;
};

const getDescriptionPreview = (description, maxLength = 150) => {
  if (!description) return "";
  const plainText = description
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plainText.length > maxLength
    ? plainText.substring(0, maxLength) + "..."
    : plainText;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseFloat(price) || 0);
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const Toast = React.memo(({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className="fixed top-20 right-4 z-50 max-w-sm"
    >
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm border ${
          type === "success"
            ? "bg-green-500/90 border-green-400/30 text-white"
            : "bg-red-500/90 border-red-400/30 text-white"
        }`}
      >
        {type === "success" ? (
          <IoCheckmarkDoneCircleOutline className="w-5 h-5 flex-shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
        )}
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-75 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
});

Toast.displayName = "Toast";

const PropertySkeleton = React.memo(({ viewMode, index = 0 }) => {
  const isGrid = viewMode === "grid";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden ${
        isGrid ? "" : "flex flex-row"
      }`}
    >
      {/* Image Container - matches h-64 */}
      <div className={`relative overflow-hidden ${isGrid ? "h-64" : "w-1/3 h-48"}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F] to-[#0A1628]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />

        {/* Price & Category badges skeleton */}
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="h-9 w-24 bg-gradient-to-r from-[#C9A962]/40 to-[#B8985A]/40 rounded-lg animate-pulse" />
          <div className="h-9 w-24 bg-[#0A1628]/60 border border-white/10 rounded-lg animate-pulse" />
        </div>

        {/* Action buttons skeleton */}
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="w-10 h-10 rounded-xl bg-white/10 animate-pulse" />
          <div className="w-10 h-10 rounded-xl bg-white/10 animate-pulse" />
        </div>

        {/* Type & Status badges skeleton - amber for Pre-Sale */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <div className="h-8 w-28 bg-[#0A1628]/60 border border-white/10 rounded-lg animate-pulse" />
          <div className="h-8 w-20 bg-amber-500/30 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Content - matches p-6 structure */}
      <div className={`p-6 ${isGrid ? "" : "flex-1"}`}>
        {/* Title */}
        <div className="flex justify-between items-start mb-3">
          <div className="h-7 bg-white/10 rounded-lg w-4/5 animate-pulse" />
        </div>

        {/* Location */}
        <div className="flex items-center mb-4">
          <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse mr-2" />
          <div className="h-4 bg-white/10 rounded w-2/3 animate-pulse" />
        </div>

        {/* Stats grid - beds, baths, sqft */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex items-center justify-center bg-white/5 border border-white/10 rounded-xl py-2.5">
            <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse mr-1.5" />
            <div className="w-4 h-4 bg-white/20 rounded animate-pulse" />
          </div>
          <div className="flex items-center justify-center bg-white/5 border border-white/10 rounded-xl py-2.5">
            <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse mr-1.5" />
            <div className="w-4 h-4 bg-white/20 rounded animate-pulse" />
          </div>
          <div className="flex items-center justify-center bg-white/5 border border-white/10 rounded-xl py-2.5">
            <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse mr-1.5" />
            <div className="w-8 h-4 bg-white/20 rounded animate-pulse" />
          </div>
        </div>

        {/* Development Features skeleton - New Build, Modern Design, Warranty */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg"
            >
              <div className="w-3 h-3 bg-[#C9A962]/30 rounded animate-pulse mr-1" />
              <div className="w-16 h-3 bg-white/10 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Description skeleton */}
        <div className="h-4 bg-white/5 rounded w-full animate-pulse mb-2" />
        <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse mb-4" />

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <div className="h-4 bg-white/10 rounded w-24 animate-pulse" />
          <div className="h-10 w-28 bg-gradient-to-r from-[#C9A962]/30 to-[#B8985A]/30 rounded-lg animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
});

PropertySkeleton.displayName = "PropertySkeleton";

const PropertyCard = React.memo(
  ({ property, viewMode, favorites, onToggleFavorite, onShare }) => {
    const formattedPrice = useMemo(
      () => formatPrice(property.price),
      [property.price]
    );

    const daysListed = useMemo(() => {
      if (!property.created_at) return 0;
      const createdDate = new Date(property.created_at);
      const today = new Date();
      const diffTime = Math.abs(today - createdDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }, [property.created_at]);

    const handleFavoriteClick = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleFavorite(property.id);
      },
      [property.id, onToggleFavorite]
    );

    const handleShareClick = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onShare(property);
      },
      [property, onShare]
    );

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#C9A962]/30 hover:shadow-xl hover:shadow-[#C9A962]/5 transition-all duration-300 ${
          viewMode === "list" ? "flex flex-row" : ""
        }`}
      >
        <Link
          to={`/properties/${property.id}`}
          className={viewMode === "list" ? "flex w-full" : "block"}
        >
          {/* Property Image */}
          <div
            className={`relative ${
              viewMode === "list" ? "w-1/3 h-48" : "h-64"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F] to-[#0A1628]">
              {property.images && property.images.length > 0 ? (
                <img
                  src={property.images[0].image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/hsp-fallback2.png";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Hammer className="w-12 h-12" />
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />

            {/* Price & Category Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="bg-gradient-to-r from-[#C9A962] to-[#B8985A] px-3 py-1.5 rounded-lg text-[#0A1628] font-bold text-lg shadow-lg">
                {formattedPrice}
              </div>
              {property.category && (
                <div className="bg-[#0A1628]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-sm font-medium capitalize border border-white/10">
                  {property.category}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFavoriteClick}
                className={`p-2.5 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                  favorites.has(property.id)
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                    : "bg-white/10 text-white hover:bg-red-500 border border-white/20"
                }`}
              >
                <Heart
                  className="w-4 h-4"
                  fill={favorites.has(property.id) ? "currentColor" : "none"}
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShareClick}
                className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-[#C9A962] hover:text-[#0A1628] transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Type & Status Badges */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <div className="bg-[#0A1628]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-sm flex items-center gap-1.5 border border-white/10">
                {getPropertyTypeIcon(property.property_type)}
                <span>{property.property_type || "Development"}</span>
              </div>
              <div className="bg-amber-500/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-sm font-medium capitalize">
                {property.status || "Pre-Sale"}
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-white group-hover:text-[#C9A962] transition-colors line-clamp-2">
                {property.title}
              </h3>
            </div>

            <div className="flex items-center text-gray-400 mb-4">
              <MapPin className="w-4 h-4 mr-2 text-[#C9A962] flex-shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="flex items-center justify-center bg-white/5 border border-white/10 rounded-xl py-2.5">
                <Bed className="w-4 h-4 mr-1.5 text-[#C9A962]" />
                <span className="font-semibold text-white">{property.beds || 0}</span>
              </div>
              <div className="flex items-center justify-center bg-white/5 border border-white/10 rounded-xl py-2.5">
                <Bath className="w-4 h-4 mr-1.5 text-[#C9A962]" />
                <span className="font-semibold text-white">{property.baths || 0}</span>
              </div>
              <div className="flex items-center justify-center bg-white/5 border border-white/10 rounded-xl py-2.5">
                <Square className="w-4 h-4 mr-1.5 text-[#C9A962]" />
                <span className="font-semibold text-white text-xs">
                  {property.sqft || property.area_measurement || 0}
                </span>
              </div>
            </div>

            {/* Development Features Preview */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <div className="flex items-center text-xs text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg">
                <HardHat className="w-3 h-3 mr-1 text-[#C9A962]" /> New Build
              </div>
              <div className="flex items-center text-xs text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg">
                <Ruler className="w-3 h-3 mr-1 text-[#C9A962]" /> Modern Design
              </div>
              <div className="flex items-center text-xs text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg">
                <SiFsecure className="w-3 h-3 mr-1 text-[#C9A962]" /> Warranty
              </div>
            </div>

            {property.description && (
              <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                {getDescriptionPreview(property.description)}
              </p>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <div className="text-sm text-gray-500">
                Listed {daysListed === 0 ? 'today' : `${daysListed} day${daysListed !== 1 ? 's' : ''} ago`}
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
              >
                View Details
              </motion.div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.property.id === nextProps.property.id &&
      prevProps.property.updated_at === nextProps.property.updated_at &&
      prevProps.viewMode === nextProps.viewMode &&
      prevProps.favorites.has(prevProps.property.id) ===
        nextProps.favorites.has(nextProps.property.id)
    );
  }
);

PropertyCard.displayName = "PropertyCard";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const Developments = () => {
  const dispatch = useDispatch();

  const marketplace = useSelector(selectMarketplace);
  const loading = useSelector(selectPropertiesLoading);
  const error = useSelector(selectPropertiesError);

  const { results: allProperties = [] } = marketplace || {};

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [favorites, setFavorites] = useState(new Set());
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const pageSize = 12;

  // Frontend Filtering & Sorting
  const filteredAndSortedProperties = useMemo(() => {
    let filtered = [...allProperties];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.title?.toLowerCase().includes(searchLower) ||
          property.location?.toLowerCase().includes(searchLower) ||
          property.description?.toLowerCase().includes(searchLower)
      );
    }

    if (selectedRegion !== "all") {
      const regionLocations = HARARE_REGIONS[selectedRegion];
      if (regionLocations) {
        filtered = filtered.filter((property) => {
          const propertyLocation = property.location?.toLowerCase() || "";
          return regionLocations.some((loc) =>
            propertyLocation.includes(loc.toLowerCase())
          );
        });
      }
    }

    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter((property) =>
        property.location?.toLowerCase().includes(locationLower)
      );
    }

    if (filters.type !== "all") {
      filtered = filtered.filter(
        (property) => property.property_type?.toLowerCase() === filters.type.toLowerCase()
      );
    }

    if (filters.bedrooms !== "all") {
      const minBeds = parseInt(filters.bedrooms);
      filtered = filtered.filter((property) => (property.beds || 0) >= minBeds);
    }

    if (filters.bathrooms !== "all") {
      const minBaths = parseInt(filters.bathrooms);
      filtered = filtered.filter((property) => (property.baths || 0) >= minBaths);
    }

    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter((property) => {
        const price = parseFloat(property.price) || 0;
        if (max) return price >= min && price <= max;
        return price >= min;
      });
    }

    if (filters.sqftRange !== "all") {
      const [min, max] = filters.sqftRange.split("-").map(Number);
      filtered = filtered.filter((property) => {
        const sqft = parseFloat(property.sqft || property.area_measurement) || 0;
        if (max && max < 999999) return sqft >= min && sqft <= max;
        return sqft >= min;
      });
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "oldest":
          return new Date(a.created_at) - new Date(b.created_at);
        case "price-low":
          return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
        case "price-high":
          return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
        case "beds":
          return (b.beds || 0) - (a.beds || 0);
        case "sqft":
          return (
            (parseFloat(b.sqft || b.area_measurement) || 0) -
            (parseFloat(a.sqft || a.area_measurement) || 0)
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [allProperties, searchTerm, selectedRegion, filters, sortBy]);

  const totalProperties = filteredAndSortedProperties.length;
  const totalPages = Math.ceil(totalProperties / pageSize);

  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredAndSortedProperties.slice(startIndex, endIndex);
  }, [filteredAndSortedProperties, currentPage, pageSize]);

  const showToast = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((value) => {
    setSortBy(value);
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setSearchTerm("");
    setSelectedRegion("all");
    setSortBy("newest");
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleFavorite = useCallback((propertyId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  }, []);

  const handleShare = useCallback(
    async (property) => {
      const shareData = {
        title: property.title,
        text: `Check out this new development: ${property.title} - ${property.location}`,
        url: `${window.location.origin}/properties/${property.id}`,
      };

      try {
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          const shareText = `${property.title}\n${property.location}\n\n${shareData.url}`;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(shareText);
            showToast("Link copied to clipboard!", "success");
          }
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          showToast("Unable to share.", "error");
        }
      }
    },
    [showToast]
  );

  const getPageRange = useCallback(() => {
    const range = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }, [currentPage, totalPages]);

  useEffect(() => {
    const backendFilters = {
      page: 1,
      page_size: 10000,
      category: "development",
    };
    dispatch(fetchProperties(backendFilters));
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRegion, filters, sortBy]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.type !== "all") count++;
    if (filters.priceRange !== "all") count++;
    if (filters.bedrooms !== "all") count++;
    if (filters.bathrooms !== "all") count++;
    if (filters.sqftRange !== "all") count++;
    if (filters.location) count++;
    if (selectedRegion !== "all") count++;
    if (searchTerm) count++;
    return count;
  }, [filters, selectedRegion, searchTerm]);

  // Loading state
  if (loading && allProperties.length === 0) {
    return (
      <div className="min-h-screen bg-[#060D16]">
        <div className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#0F1D2F]" />
            <GridPattern />
            <FloatingOrb className="w-[600px] h-[600px] bg-[#C9A962] -top-40 -right-40" delay={0} />
            <FloatingOrb className="w-[400px] h-[400px] bg-[#1E3A5F] bottom-0 left-20" delay={2} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 bg-white/5 rounded-xl animate-pulse mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <PropertySkeleton key={index} viewMode={viewMode} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#060D16] flex items-center justify-center">
        <div className="absolute inset-0">
          <GridPattern />
          <FloatingOrb className="w-[400px] h-[400px] bg-red-500/20 top-1/4 right-1/4" delay={0} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl max-w-md"
        >
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Error Loading Properties</h3>
          <p className="text-gray-400 mb-6">
            {typeof error === "object"
              ? error.message || error.detail || "An error occurred"
              : String(error)}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(fetchProperties({ page: 1, page_size: 9999, category: "development" }))}
            className="px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060D16]">
      {/* Toast Notifications */}
      <AnimatePresence>
        {toast.show && (
          <Toast message={toast.message} type={toast.type} onClose={hideToast} />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
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
            <Hammer className="w-4 h-4 text-[#C9A962]" />
            <span className="text-[#C9A962] text-sm font-medium">New Developments</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            New{" "}
            <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
              Developments
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            Discover brand new construction projects and off-plan properties. Be among
            the first to secure your dream home in Zimbabwe's newest developments.
          </motion.p>

          {/* Region Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 justify-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRegion("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedRegion === "all"
                  ? "bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] shadow-lg shadow-[#C9A962]/25"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:border-[#C9A962]/30 hover:text-white"
              }`}
            >
              All Regions
            </motion.button>
            {Object.keys(HARARE_REGIONS).map((region) => (
              <motion.button
                key={region}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedRegion === region
                    ? "bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] shadow-lg shadow-[#C9A962]/25"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:border-[#C9A962]/30 hover:text-white"
                }`}
              >
                {region}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="relative -mt-8 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            {/* Main Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
              <div className="flex-1 w-full relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search new builds, off-plan properties, developments..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors text-lg"
                />
                <Search className="absolute left-4 top-4 w-6 h-6 text-gray-500" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Quick Filters */}
              <div className="flex gap-2 flex-wrap lg:flex-nowrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
                    showFilters
                      ? "bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] shadow-lg shadow-[#C9A962]/25"
                      : "bg-white/5 border border-white/10 text-white hover:border-[#C9A962]/30"
                  }`}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </motion.button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-4 rounded-xl transition-all ${
                      viewMode === "grid"
                        ? "bg-[#C9A962] text-[#0A1628]"
                        : "bg-white/5 border border-white/10 text-white hover:border-[#C9A962]/30"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`hidden sm:inline-block p-4 rounded-xl transition-all ${
                      viewMode === "list"
                        ? "bg-[#C9A962] text-[#0A1628]"
                        : "bg-white/5 border border-white/10 text-white hover:border-[#C9A962]/30"
                    }`}
                  >
                    <ListIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10 pt-6 overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
                    <select
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C9A962]/50"
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                    >
                      <option value="oldest" className="bg-[#0A1628]">Oldest First</option>
                      <option value="newest" className="bg-[#0A1628]">Newest First</option>
                      <option value="price-low" className="bg-[#0A1628]">Price: Low to High</option>
                      <option value="price-high" className="bg-[#0A1628]">Price: High to Low</option>
                      <option value="beds" className="bg-[#0A1628]">Most Bedrooms</option>
                      <option value="sqft" className="bg-[#0A1628]">Largest First</option>
                    </select>

                    <select
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C9A962]/50"
                      value={filters.priceRange}
                      onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                    >
                      <option value="all" className="bg-[#0A1628]">Any Price</option>
                      <option value="0-100000" className="bg-[#0A1628]">$0 - $100K</option>
                      <option value="100000-300000" className="bg-[#0A1628]">$100K - $300K</option>
                      <option value="300000-500000" className="bg-[#0A1628]">$300K - $500K</option>
                      <option value="500000-1000000" className="bg-[#0A1628]">$500K - $1M</option>
                      <option value="1000000-5000000" className="bg-[#0A1628]">$1M+</option>
                    </select>

                    <select
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C9A962]/50"
                      value={filters.bedrooms}
                      onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
                    >
                      <option value="all" className="bg-[#0A1628]">Any Beds</option>
                      <option value="1" className="bg-[#0A1628]">1+ Bed</option>
                      <option value="2" className="bg-[#0A1628]">2+ Beds</option>
                      <option value="3" className="bg-[#0A1628]">3+ Beds</option>
                      <option value="4" className="bg-[#0A1628]">4+ Beds</option>
                      <option value="5" className="bg-[#0A1628]">5+ Beds</option>
                    </select>

                    <select
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C9A962]/50"
                      value={filters.bathrooms}
                      onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
                    >
                      <option value="all" className="bg-[#0A1628]">Any Baths</option>
                      <option value="1" className="bg-[#0A1628]">1+ Bath</option>
                      <option value="2" className="bg-[#0A1628]">2+ Baths</option>
                      <option value="3" className="bg-[#0A1628]">3+ Baths</option>
                      <option value="4" className="bg-[#0A1628]">4+ Baths</option>
                    </select>

                    <select
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C9A962]/50"
                      value={filters.sqftRange}
                      onChange={(e) => handleFilterChange("sqftRange", e.target.value)}
                    >
                      <option value="all" className="bg-[#0A1628]">Any Size</option>
                      <option value="0-1000" className="bg-[#0A1628]">Under 1K sq ft</option>
                      <option value="1000-2000" className="bg-[#0A1628]">1K - 2K sq ft</option>
                      <option value="2000-3000" className="bg-[#0A1628]">2K - 3K sq ft</option>
                      <option value="3000-5000" className="bg-[#0A1628]">3K - 5K sq ft</option>
                      <option value="5000-999999" className="bg-[#0A1628]">5K+ sq ft</option>
                    </select>

                    <select
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C9A962]/50"
                      value={filters.type}
                      onChange={(e) => handleFilterChange("type", e.target.value)}
                    >
                      <option value="all" className="bg-[#0A1628]">Any Type</option>
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

                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex-1 w-full">
                      <input
                        type="text"
                        value={filters.location}
                        onChange={(e) => handleFilterChange("location", e.target.value)}
                        placeholder="Filter by location..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearFilters}
                      className="px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors font-semibold"
                    >
                      Clear All
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="relative py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row justify-between items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
          >
            <div className="text-gray-400 mb-2 sm:mb-0">
              Showing{" "}
              <span className="font-bold text-white">
                {totalProperties > 0 ? (currentPage - 1) * pageSize + 1 : 0}
              </span>{" "}
              to{" "}
              <span className="font-bold text-white">
                {Math.min(currentPage * pageSize, totalProperties)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-[#C9A962]">{totalProperties}</span>{" "}
              properties
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Filter className="w-4 h-4 text-[#C9A962]" />
                {activeFiltersCount > 0
                  ? `${activeFiltersCount} filters applied`
                  : "No filters"}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="relative pb-20">
        <div className="absolute inset-0">
          <GridPattern />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {paginatedProperties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
            >
              <div className="w-20 h-20 bg-[#C9A962]/10 border border-[#C9A962]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Hammer className="w-10 h-10 text-[#C9A962]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No Developments Found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search criteria or filters
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="px-8 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
              >
                Reset Filters
              </motion.button>
            </motion.div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }
            >
              <AnimatePresence mode="popLayout">
                {paginatedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    viewMode={viewMode}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onShare={handleShare}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-2 ${
                    currentPage === 1
                      ? "border-white/5 text-gray-600 cursor-not-allowed"
                      : "border-white/10 text-white hover:border-[#C9A962]/30 hover:text-[#C9A962]"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </motion.button>

                <div className="flex items-center gap-2">
                  {getPageRange().map((page) => (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePageChange(page)}
                      className={`min-w-[40px] h-10 px-3 rounded-xl font-medium transition-all ${
                        page === currentPage
                          ? "bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] shadow-lg shadow-[#C9A962]/25"
                          : "border border-white/10 text-white hover:border-[#C9A962]/30"
                      }`}
                    >
                      {page}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-2 ${
                    currentPage === totalPages
                      ? "border-white/5 text-gray-600 cursor-not-allowed"
                      : "border-white/10 text-white hover:border-[#C9A962]/30 hover:text-[#C9A962]"
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Floating Action Button for Mobile Filters */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowFilters(!showFilters)}
        className="fixed bottom-24 right-6 md:hidden bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] p-4 rounded-full shadow-2xl shadow-[#C9A962]/25 z-50"
      >
        <SlidersHorizontal className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default Developments;
