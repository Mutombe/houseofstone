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
  Star,
  Home,
  Building,
  TreePine,
  Store,
  Car,
  Wifi,
  Shield,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  fetchProperties,
  updateFilters,
  updateSortBy,
  clearFilters as clearReduxFilters,
  selectMarketplace,
  selectPropertiesLoading,
  selectPropertiesError,
} from "./../../redux/slices/propertySlice";

// ============================================================================
// CONSTANTS
// ============================================================================

const HARARE_REGIONS = {
  "Harare North": [
    "Northwood",
    "Borrowdale",
    "Borrowdale Brooke",
    "Glen Lorne",
    "Chishawesha",
    "Emerald Hill",
    "Mt Pleasant",
    "Avondale",
    "Belgravia",
    "Highlands",
    "Marlborough",
    "Vainona",
    "Cedrre Valley",
    "Chisipiti",
    "Mandara",
  ],
  "Harare East": [
    "Greendale",
    "Athlone",
    "Eastlea",
    "Eastgate",
    "Ruwa",
    "Zimre Park",
    "Arcturus",
    "Epworth",
    "Machipisa",
  ],
  "Harare South": [
    "Hatfield",
    "Prospect",
    "Waterfalls",
    "Glen View",
    "Mbare",
    "Workington",
    "Southerton",
    "Willowvale",
  ],
  "Harare West": [
    "Westgate",
    "Mabelreign",
    "Milton Park",
    "Belvedere",
    "Kuwadzana",
    "Dzivarasekwa",
    "Mufakose",
    "Budiriro",
  ],
  "Harare Central": [
    "City Centre",
    "Avenues",
    "Braeside",
    "CBD",
    "Kopje",
    "Newlands",
  ],
};

const ALL_LOCATIONS = Object.values(HARARE_REGIONS).flat();

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

const getRegionFromLocation = (location) => {
  if (!location) return null;
  const locationLower = location.toLowerCase();

  for (const [region, locations] of Object.entries(HARARE_REGIONS)) {
    const found = locations.some(
      (loc) =>
        locationLower.includes(loc.toLowerCase()) ||
        loc.toLowerCase().includes(locationLower)
    );
    if (found) return region;
  }
  return null;
};

const getPropertyTypeIcon = (type) => {
  const icons = {
    house: <Home className="w-4 h-4" />,
    apartment: <Building className="w-4 h-4" />,
    villa: <TreePine className="w-4 h-4" />,
    commercial: <Store className="w-4 h-4" />,
  };
  return icons[type?.toLowerCase()] || <Home className="w-4 h-4" />;
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

// Toast Notification Component
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
        className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm ${
          type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {type === "success" ? (
          <Check className="w-5 h-5 flex-shrink-0" />
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

// Property Skeleton Component
const PropertySkeleton = React.memo(({ viewMode }) => {
  const isGrid = viewMode === "grid";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden group ${
        isGrid ? "" : "flex flex-row"
      }`}
    >
      <div className={`relative ${isGrid ? "h-64" : "w-1/3 h-48"}`}>
        <div className="absolute inset-0 bg-stone-200 animate-pulse" />
      </div>

      <div className={`p-6 ${isGrid ? "" : "flex-1"}`}>
        <div className="flex justify-between mb-3">
          <div className="h-6 bg-stone-200 rounded-full w-3/4 animate-pulse" />
          <div className="h-4 bg-stone-200 rounded-full w-1/6 animate-pulse" />
        </div>

        <div className="flex items-center mb-4">
          <div className="h-4 bg-stone-200 rounded-full w-1/2 animate-pulse" />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 bg-stone-100 rounded-lg animate-pulse"
            />
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 bg-stone-100 rounded-full w-20 animate-pulse"
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="h-4 bg-stone-200 rounded-full w-1/3 animate-pulse" />
          <div className="h-8 bg-stone-200 rounded-lg w-24 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
});

PropertySkeleton.displayName = "PropertySkeleton";

// Property Card Component
const PropertyCard = React.memo(
  ({ property, viewMode, favorites, onToggleFavorite, onShare }) => {
    const formattedPrice = useMemo(
      () => formatPrice(property.price),
      [property.price]
    );

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
        className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group ${
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
            <div className="absolute inset-0 bg-gradient-to-r from-stone-500 to-stone-700">
              {property.images && property.images.length > 0 ? (
                <img
                  src={property.images[0].image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/hsp-fallback2.png";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-lg">
                  🏠 No Image
                </div>
              )}
            </div>

            {/* Overlay Elements - Top Left */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="bg-white px-3 py-1 rounded-full text-stone-900 font-bold text-lg">
                {formattedPrice}
              </div>
              {property.category && (
                <div className="bg-stone-900 bg-opacity-75 px-3 py-1 rounded-full text-white text-sm font-semibold capitalize">
                  {property.category}
                </div>
              )}
            </div>

            {/* Overlay Elements - Top Right */}
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFavoriteClick}
                className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                  favorites.has(property.id)
                    ? "bg-red-500 text-white"
                    : "bg-white bg-opacity-75 text-stone-700 hover:bg-red-500 hover:text-white"
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
                className="p-2 rounded-full bg-white bg-opacity-75 text-stone-700 hover:bg-stone-900 hover:text-white transition-colors backdrop-blur-sm"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Overlay Elements - Bottom Left */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <div className="bg-stone-900 bg-opacity-75 px-3 py-1 rounded-full text-white text-sm flex items-center gap-1">
                {getPropertyTypeIcon(property.property_type)}
                {property.property_type || "Property"}
              </div>
              <div className="bg-green-500 bg-opacity-90 px-3 py-1 rounded-full text-white text-sm font-semibold capitalize">
                {property.status || "Available"}
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-2">
                {property.title}
              </h3>
              <div className="flex items-center text-yellow-500 flex-shrink-0 ml-2">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm text-stone-600 ml-1">
                  4.{Math.floor(Math.random() * 5 + 3)}
                </span>
              </div>
            </div>

            <div className="flex items-center text-stone-600 mb-4">
              <MapPin className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-stone-600 mb-4">
              <div className="flex items-center justify-center bg-stone-50 rounded-lg py-2">
                <Bed className="w-4 h-4 mr-1 text-blue-500" />
                <span className="font-semibold">{property.beds || 0}</span>
              </div>
              <div className="flex items-center justify-center bg-stone-50 rounded-lg py-2">
                <Bath className="w-4 h-4 mr-1 text-green-500" />
                <span className="font-semibold">{property.baths || 0}</span>
              </div>
              <div className="flex items-center justify-center bg-stone-50 rounded-lg py-2">
                <Square className="w-4 h-4 mr-1 text-purple-500" />
                <span className="font-semibold text-xs">
                  {property.sqft || property.area_measurement || 0}
                </span>
              </div>
            </div>

            {/* Amenities Preview */}
            <div className="flex gap-2 mb-4">
              <div className="flex items-center text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-full">
                <Car className="w-3 h-3 mr-1" /> Parking
              </div>
              <div className="flex items-center text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-full">
                <Wifi className="w-3 h-3 mr-1" /> WiFi
              </div>
              <div className="flex items-center text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-full">
                <Shield className="w-3 h-3 mr-1" /> Secure
              </div>
            </div>

            {property.description && (
              <p className="text-stone-600 text-sm line-clamp-2 mb-4">
                {getDescriptionPreview(property.description)}
              </p>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-stone-500">
                Listed {Math.floor(Math.random() * 30 + 1)} days ago
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-stone-800 transition-colors"
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

const Properties = () => {
  const dispatch = useDispatch();

  // ========================================
  // Redux State
  // ========================================
  const marketplace = useSelector(selectMarketplace);
  const loading = useSelector(selectPropertiesLoading);
  const error = useSelector(selectPropertiesError);

  const {
    results: properties = [],
    count: totalProperties = 0,
    currentPage = 1,
    totalPages = 1,
    pageSize = 12,
  } = marketplace || {};

  // ========================================
  // Local State
  // ========================================
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [favorites, setFavorites] = useState(new Set());
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // ========================================
  // Callbacks
  // ========================================
  const showToast = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const handleSortChange = useCallback(
    (value) => {
      setSortBy(value);
      setFilters((prev) => ({ ...prev, page: 1 }));
      dispatch(updateSortBy(value));
    },
    [dispatch]
  );

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setSearchTerm("");
    setSelectedRegion("all");
    setSortBy("newest");
    dispatch(clearReduxFilters());
  }, [dispatch]);

  const handlePageChange = useCallback((newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
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
        text: `Check out this property: ${property.title} - ${property.location}`,
        url: `${window.location.origin}/properties/${property.id}`,
      };

      try {
        if (
          navigator.share &&
          navigator.canShare &&
          navigator.canShare(shareData)
        ) {
          await navigator.share(shareData);
        } else {
          const shareText = `${property.title}\n${property.location}\n\n${shareData.url}`;

          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(shareText);
            showToast("Link copied to clipboard!", "success");
          } else {
            const textArea = document.createElement("textarea");
            textArea.value = shareText;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            document.body.appendChild(textArea);
            textArea.select();

            try {
              document.execCommand("copy");
              showToast("Link copied to clipboard!", "success");
            } catch (err) {
              showToast("Unable to copy link.", "error");
            } finally {
              document.body.removeChild(textArea);
            }
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

  // ========================================
  // Effects
  // ========================================
  useEffect(() => {
    const controller = new AbortController();

    // Build backend-compatible filters
    const backendFilters = {
      search: searchTerm,
      ordering:
        sortBy === "newest"
          ? "-created_at"
          : sortBy === "price-low"
          ? "price"
          : sortBy === "price-high"
          ? "-price"
          : sortBy === "beds"
          ? "-beds"
          : sortBy === "sqft"
          ? "-sqft"
          : "-created_at",
      page: filters.page,
      page_size: filters.page_size,
      category: "sale",
    };

    // Add property type filter
    if (filters.type !== "all") {
      backendFilters.property_type = filters.type;
    }

    // Add location filter
    if (filters.location) {
      backendFilters.location__icontains = filters.location;
    }

    // Add region filter
    if (selectedRegion !== "all") {
      const regionLocations = HARARE_REGIONS[selectedRegion];
      if (regionLocations) {
        backendFilters.location__icontains = regionLocations.join("|");
      }
    }

    // Add bedrooms filter
    if (filters.bedrooms !== "all") {
      backendFilters.beds__gte = filters.bedrooms;
    }

    // Add bathrooms filter
    if (filters.bathrooms !== "all") {
      backendFilters.baths__gte = filters.bathrooms;
    }

    // Add price range filter
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      if (min) backendFilters.price__gte = min;
      if (max) backendFilters.price__lte = max;
    }

    // Add square footage filter
    if (filters.sqftRange !== "all") {
      const [min, max] = filters.sqftRange.split("-").map(Number);
      if (min) backendFilters.sqft__gte = min;
      if (max) backendFilters.sqft__lte = max;
    }

    dispatch(fetchProperties(backendFilters));

    return () => {
      controller.abort();
    };
  }, [dispatch, searchTerm, filters, sortBy, selectedRegion]);

  // ========================================
  // Computed Values
  // ========================================
  const activeFiltersCount = useMemo(() => {
    return Object.entries(filters).filter(([key, value]) => {
      return (
        value &&
        key !== "sortBy" &&
        key !== "page" &&
        key !== "page_size" &&
        value !== "all" &&
        value !== ""
      );
    }).length;
  }, [filters]);

  // ========================================
  // Render States
  // ========================================

  // Loading state
  if (loading && properties.length === 0) {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-stone-50 via-white to-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PropertySkeleton key={i} viewMode={viewMode} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen pt-8 flex items-center justify-center bg-gradient-to-br from-red-50 to-stone-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md"
        >
          <div className="text-red-500 text-xl mb-4">
            ⚠️ Error Loading Properties
          </div>
          <div className="text-stone-600 mb-4">
            {typeof error === "object"
              ? error.message || error.detail || "An error occurred"
              : String(error)}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(fetchProperties())}
            className="px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // ========================================
  // Main Render
  // ========================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 pt-16">
      {/* Toast Notifications */}
      <AnimatePresence>
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        )}
      </AnimatePresence>

      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl relative z-10 pt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Region Filter Bar */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedRegion("all");
                  setFilters((prev) => ({ ...prev, page: 1 }));
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedRegion === "all"
                    ? "bg-stone-900 text-white shadow-lg"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                All Regions
              </motion.button>
              {Object.keys(HARARE_REGIONS).map((region) => (
                <motion.button
                  key={region}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedRegion(region);
                    setFilters((prev) => ({ ...prev, page: 1 }));
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedRegion === region
                      ? "bg-stone-900 text-white shadow-lg"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {region}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
            <div className="flex-1 w-full relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, location, or description..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent shadow-sm text-lg"
              />
              <Search className="absolute left-4 top-4 w-6 h-6 text-stone-400" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-4 text-stone-400 hover:text-stone-600 transition-colors"
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
                    ? "bg-stone-900 text-white shadow-lg"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
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
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`hidden sm:inline-block p-4 rounded-xl transition-all ${
                    viewMode === "list"
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
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
                className="border-t border-stone-200 pt-6 overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
                  {/* Property Type */}
                  <select
                    className="px-4 py-3 rounded-lg border-2 border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
                    value={filters.type}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                  </select>

                  {/* Price Range */}
                  <select
                    className="px-4 py-3 rounded-lg border-2 border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
                    value={filters.priceRange}
                    onChange={(e) =>
                      handleFilterChange("priceRange", e.target.value)
                    }
                  >
                    <option value="all">Any Price</option>
                    <option value="0-100000">$0 - $100K</option>
                    <option value="100000-300000">$100K - $300K</option>
                    <option value="300000-500000">$300K - $500K</option>
                    <option value="500000-1000000">$500K - $1M</option>
                    <option value="1000000-5000000">$1M+</option>
                  </select>

                  {/* Bedrooms */}
                  <select
                    className="px-4 py-3 rounded-lg border-2 border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
                    value={filters.bedrooms}
                    onChange={(e) =>
                      handleFilterChange("bedrooms", e.target.value)
                    }
                  >
                    <option value="all">Any Beds</option>
                    <option value="1">1+ Bed</option>
                    <option value="2">2+ Beds</option>
                    <option value="3">3+ Beds</option>
                    <option value="4">4+ Beds</option>
                    <option value="5">5+ Beds</option>
                  </select>

                  {/* Bathrooms */}
                  <select
                    className="px-4 py-3 rounded-lg border-2 border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
                    value={filters.bathrooms}
                    onChange={(e) =>
                      handleFilterChange("bathrooms", e.target.value)
                    }
                  >
                    <option value="all">Any Baths</option>
                    <option value="1">1+ Bath</option>
                    <option value="2">2+ Baths</option>
                    <option value="3">3+ Baths</option>
                    <option value="4">4+ Baths</option>
                  </select>

                  {/* Square Footage */}
                  <select
                    className="px-4 py-3 rounded-lg border-2 border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
                    value={filters.sqftRange}
                    onChange={(e) =>
                      handleFilterChange("sqftRange", e.target.value)
                    }
                  >
                    <option value="all">Any Size</option>
                    <option value="0-1000">Under 1K sq ft</option>
                    <option value="1000-2000">1K - 2K sq ft</option>
                    <option value="2000-3000">2K - 3K sq ft</option>
                    <option value="3000-5000">3K - 5K sq ft</option>
                    <option value="5000-999999">5K+ sq ft</option>
                  </select>

                  {/* Sort By */}
                  <select
                    className="px-4 py-3 rounded-lg border-2 border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="beds">Most Bedrooms</option>
                    <option value="sqft">Largest First</option>
                  </select>
                </div>

                {/* Location Filter & Clear */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      value={filters.location}
                      onChange={(e) =>
                        handleFilterChange("location", e.target.value)
                      }
                      placeholder="Filter by location..."
                      className="w-full px-4 py-3 rounded-lg border-2 border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                  >
                    Clear All
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Results Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-xl p-4 shadow-sm"
        >
          <div className="text-stone-700 mb-2 sm:mb-0">
            Showing{" "}
            <span className="font-bold text-stone-900">
              {(currentPage - 1) * pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-stone-900">
              {Math.min(currentPage * pageSize, totalProperties)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-stone-900">{totalProperties}</span>{" "}
            properties
            {loading && (
              <span className="ml-2 text-stone-500">(Loading...)</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <Filter className="w-4 h-4" />
              {activeFiltersCount > 0
                ? `${activeFiltersCount} filters applied`
                : "No filters"}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Properties Display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {properties.length === 0 && !loading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-xl shadow-sm"
          >
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              No Properties Found
            </h3>
            <p className="text-stone-600 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="px-8 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-semibold"
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
              {properties.map((property) => (
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

        {/* Loading more indicator */}
        {loading && properties.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2 text-stone-500">
              <div className="w-4 h-4 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin" />
              Loading properties...
            </div>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-10 flex justify-center px-4">
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Previous Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-2 sm:px-4 py-2 rounded-lg border transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base ${
                  currentPage === 1
                    ? "border-stone-200 text-stone-400 cursor-not-allowed"
                    : "border-stone-300 text-stone-700 hover:bg-stone-50 active:bg-stone-100"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </motion.button>

              {/* Page Numbers - Responsive display */}
              <div className="flex items-center gap-1 sm:gap-2">
                {getPageRange().map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[36px] sm:min-w-[40px] h-9 sm:h-10 px-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                      page === currentPage
                        ? "bg-stone-900 text-white shadow-lg"
                        : "border border-stone-300 text-stone-700 hover:bg-stone-50 active:bg-stone-100"
                    }`}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-2 sm:px-4 py-2 rounded-lg border transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base ${
                  currentPage === totalPages
                    ? "border-stone-200 text-stone-400 cursor-not-allowed"
                    : "border-stone-300 text-stone-700 hover:bg-stone-50 active:bg-stone-100"
                }`}
                aria-label="Next page"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile Filters */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowFilters(!showFilters)}
        className="fixed bottom-6 right-6 md:hidden bg-stone-900 text-white p-4 rounded-full shadow-2xl z-50"
      >
        <SlidersHorizontal className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default Properties;
