import React, { useEffect, useState, useMemo } from "react";
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
  List,
  SlidersHorizontal,
  X,
  Heart,
  Share2,
  TrendingUp,
  DollarSign,
  Home,
  Building,
  TreePine,
  Store,
  Car,
  Wifi,
  Shield,
  Star,
} from "lucide-react";
import { selectAllProperties } from "../../redux/selectors";
import { fetchProperties } from "../../redux/slices/propertySlice";

// Add this skeleton component near the top of your file
const PropertySkeleton = ({ viewMode }) => {
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
};

const Properties = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.properties);
  const properties = useSelector(selectAllProperties);
  console.log("selctor", properties);

  // Enhanced state management
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
    listingType: "sale", // for sale/rent
    amenities: [],
    sqftRange: "all",
    location: "",
  });

  // Fetch properties on initial load
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  // Advanced frontend filtering
  const filteredAndSortedProperties = useMemo(() => {
    if (!Array.isArray(properties)) return [];

    let filtered = properties.filter((property) => {
      if (property.category !== "sale") return false;
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          property.title?.toLowerCase().includes(searchLower) ||
          property.location?.toLowerCase().includes(searchLower) ||
          property.description?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Property type filter
      if (filters.type !== "all" && property.property_type !== filters.type) {
        return false;
      }

      // Listing type filter (sale/rent)
      if (filters.listingType !== "all") {
        const isForSale =
          property.category?.toLowerCase().includes("sale") ||
          property.category?.toLowerCase().includes("sale");
        const isForRent =
          property.category?.toLowerCase().includes("rental") ||
          property.category?.toLowerCase().includes("rental");

        if (filters.category === "sale" && !isForSale) return false;
        if (filters.category === "rental" && !isForRent) return false;
      }

      // Price range filter
      if (filters.priceRange !== "all") {
        const price = parseFloat(property.price) || 0;
        const [min, max] = filters.priceRange.split("-").map(Number);
        if (price < min || (max && price > max)) return false;
      }

      // Bedrooms filter
      if (filters.bedrooms !== "all") {
        const beds = parseInt(property.beds) || 0;
        const minBeds = parseInt(filters.bedrooms);
        if (beds < minBeds) return false;
      }

      // Bathrooms filter
      if (filters.bathrooms !== "all") {
        const baths = parseInt(property.baths) || 0;
        const minBaths = parseInt(filters.bathrooms);
        if (baths < minBaths) return false;
      }

      // Square footage filter
      if (filters.sqftRange !== "all") {
        const sqft = parseInt(property.sqft) || 0;
        const [min, max] = filters.sqftRange.split("-").map(Number);
        if (sqft < min || (max && sqft > max)) return false;
      }

      // Location filter
      if (
        filters.location &&
        !property.location
          ?.toLowerCase()
          .includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    // Sorting
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

  {
    filteredAndSortedProperties.length === 0 && status === "loading" ? (
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "space-y-6"
        }
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <PropertySkeleton key={i} viewMode={viewMode} />
        ))}
      </div>
    ) : (
      // Your existing properties list
      <></>
    );
  }

  const clearFilters = () => {
    setFilters({
      type: "all",
      priceRange: "all",
      bedrooms: "all",
      bathrooms: "all",
      listingType: "all",
      amenities: [],
      sqftRange: "all",
      location: "",
    });
    setSearchTerm("");
  };

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

  if (status === "loading") {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-stone-50 via-white to-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Bar Skeleton */}
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
            <div className="flex-1 w-full relative">
              <div className="w-full h-16 bg-stone-200 rounded-xl animate-pulse" />
            </div>
            <div className="flex gap-2 w-full lg:w-auto">
              <div className="h-16 bg-stone-200 rounded-xl w-32 animate-pulse" />
              <div className="h-16 bg-stone-200 rounded-xl w-16 animate-pulse" />
            </div>
          </div>

          {/* Filters Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-12 bg-stone-200 rounded-lg animate-pulse"
              />
            ))}
          </div>

          {/* Properties Grid Skeleton */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PropertySkeleton key={i} viewMode={viewMode} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen pt-8 flex items-center justify-center bg-gradient-to-br from-red-50 to-stone-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-white rounded-xl shadow-lg"
        >
          <div className="text-red-500 text-xl mb-4">
            ⚠️ Error Loading Properties
          </div>
          <div className="text-stone-600">
            {error && typeof error === "object"
              ? error.message || error.detail || JSON.stringify(error)
              : String(error)}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100">
      {/* Enhanced Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                  className="absolute right-4 top-4 text-stone-400 hover:text-stone-600"
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
                  <List className="w-5 h-5" />
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
                  {/* Listing Type 
                  <select
                    className="px-4 py-3 rounded-lg border-2 border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
                    value={filters.listingType}
                    onChange={(e) =>
                      setFilters({ ...filters, listingType: e.target.value })
                    }
                  >
                    <option value="all">Sale & Rent</option>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>*/}

                  {/* Property Type */}
                  <select
                    className="px-4 py-3 rounded-lg border-2 border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
                    value={filters.type}
                    onChange={(e) =>
                      setFilters({ ...filters, type: e.target.value })
                    }
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
                      setFilters({ ...filters, priceRange: e.target.value })
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
                      setFilters({ ...filters, bedrooms: e.target.value })
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
                      setFilters({ ...filters, bathrooms: e.target.value })
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
                      setFilters({ ...filters, sqftRange: e.target.value })
                    }
                  >
                    <option value="all">Any Size</option>
                    <option value="0-1000">Under 1K sq ft</option>
                    <option value="1000-2000">1K - 2K sq ft</option>
                    <option value="2000-3000">2K - 3K sq ft</option>
                    <option value="3000-5000">3K - 5K sq ft</option>
                    <option value="5000-999999">5K+ sq ft</option>
                  </select>
                </div>

                {/* Location Filter & Sort */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      value={filters.location}
                      onChange={(e) =>
                        setFilters({ ...filters, location: e.target.value })
                      }
                      placeholder="Filter by location..."
                      className="w-full px-4 py-3 rounded-lg border-2 border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500"
                    />
                  </div>

                  <select
                    className="px-4 py-3 rounded-lg border-2 border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500 bg-white"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="beds">Most Bedrooms</option>
                    <option value="sqft">Largest First</option>
                  </select>

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
              {filteredAndSortedProperties.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-stone-900">
              {properties?.length || 0}
            </span>{" "}
            properties
          </div>
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <Filter className="w-4 h-4" />
            {Object.values(filters).filter(
              (v) => v !== "all" && v !== "" && v.length === 0
            ).length > 0
              ? "Filters applied"
              : "No filters"}
          </div>
        </motion.div>
      </div>

      {/* Properties Display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredAndSortedProperties.length === 0 ? (
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
              {filteredAndSortedProperties.map((property, i) => (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  <Link
                    to={`/properties/${property.id}`}
                    className={viewMode === "list" ? "flex w-full" : "block"}
                  >
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
                            onError={(e) => {
                              e.target.src = "/placeholder-house.jpg";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white text-lg">
                            🏠 No Image
                          </div>
                        )}
                      </div>

                      {/* Overlay Elements */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <div className="bg-white px-3 py-1 rounded-full text-stone-900 font-bold text-lg">
                          ${parseFloat(property.price).toLocaleString()}
                        </div>
                        {property.listing_type && (
                          <div className="bg-stone-900 bg-opacity-75 px-3 py-1 rounded-full text-white text-sm font-semibold">
                            {property.listing_type}
                          </div>
                        )}
                      </div>

                      <div className="absolute top-4 right-4 flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(property.id);
                          }}
                          className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                            favorites.has(property.id)
                              ? "bg-red-500 text-white"
                              : "bg-white bg-opacity-75 text-stone-700 hover:bg-red-500 hover:text-white"
                          }`}
                        >
                          <Heart
                            className="w-4 h-4"
                            fill={
                              favorites.has(property.id)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            // Share functionality would go here
                          }}
                          className="p-2 rounded-full bg-white bg-opacity-75 text-stone-700 hover:bg-stone-900 hover:text-white transition-colors backdrop-blur-sm"
                        >
                          <Share2 className="w-4 h-4" />
                        </motion.button>
                      </div>

                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <div className="bg-stone-900 bg-opacity-75 px-3 py-1 rounded-full text-white text-sm flex items-center gap-1">
                          {getPropertyTypeIcon(property.property_type)}
                          {property.property_type || "Property"}
                        </div>
                        <div className="bg-green-500 bg-opacity-90 px-3 py-1 rounded-full text-white text-sm font-semibold">
                          {property.status || "Available"}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                          {property.title}
                        </h3>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm text-stone-600 ml-1">
                            4.{Math.floor(Math.random() * 5 + 3)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center text-stone-600 mb-4">
                        <MapPin className="w-4 h-4 mr-2 text-red-500" />
                        <span className="truncate">{property.location}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-stone-600 mb-4">
                        <div className="flex items-center justify-center bg-stone-50 rounded-lg py-2">
                          <Bed className="w-4 h-4 mr-1 text-blue-500" />
                          <span className="font-semibold">
                            {property.beds || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-center bg-stone-50 rounded-lg py-2">
                          <Bath className="w-4 h-4 mr-1 text-green-500" />
                          <span className="font-semibold">
                            {property.baths || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-center bg-stone-50 rounded-lg py-2">
                          <Square className="w-4 h-4 mr-1 text-purple-500" />
                          <span className="font-semibold text-xs">
                            {property.sqft || 0}
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
                          {property.description}
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
              ))}
            </AnimatePresence>
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
