import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, MapPin, Bed, Bath, Square } from "lucide-react";
import { fetchProperties } from "../../redux/slices/propertySlice";

const Properties = () => {
  const dispatch = useDispatch();
  const {
    items: properties,
    status,
    error,
  } = useSelector((state) => state.properties);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    priceRange: "all",
    bedrooms: "all",
  });

  // Fetch properties on initial load
  useEffect(() => {
    console.log("Component mounted, fetching properties");
    dispatch(fetchProperties());
  }, [dispatch]);

  console.log("component properties", properties);

  // Fetch properties when filters change
  useEffect(() => {
    console.log("Filters changed:", filters);

    // Convert filter state to API parameters
    const apiFilters = {};

    if (filters.type !== "all") {
      apiFilters.property_type = filters.type;
    }

    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      apiFilters.price_min = min;
      if (max) apiFilters.price_max = max;
    }

    if (filters.bedrooms !== "all") {
      apiFilters.beds = filters.bedrooms;
    }

    // If there are actual filters to apply, fetch filtered properties
    if (Object.keys(apiFilters).length > 0) {
      console.log("Applying filters to API call:", apiFilters);
      dispatch(fetchProperties(apiFilters));
    }
  }, [dispatch, filters]);

  // Handle search separately with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        console.log("Searching for:", searchTerm);
        dispatch(fetchProperties({ search: searchTerm }));
      }
    }, 500); // 500ms debounce

    console.log("properties", properties);

    return () => clearTimeout(handler);
  }, [searchTerm, dispatch]);

  // Client-side filtering when we already have the data
  const filteredProperties = Array.isArray(properties)
    ? properties.filter((property) => {
        // If we're applying filters through the API, we may not need client-side filtering
        return true;
      })
    : [];

  if (status === "loading") {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-900"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-red-500">
          Error loading properties:{" "}
          {error && typeof error === "object"
            ? error.message || error.detail || JSON.stringify(error)
            : String(error)}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Filters Section */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search properties..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-stone-400" />
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <select
                className="px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500"
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
              <select
                className="px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500"
                value={filters.priceRange}
                onChange={(e) =>
                  setFilters({ ...filters, priceRange: e.target.value })
                }
              >
                <option value="all">Any Price</option>
                <option value="0-100000">$0 - $100,000</option>
                <option value="100000-500000">$100,000 - $500,000</option>
                <option value="500000-1000000">$500,000 - $1,000,000</option>
                <option value="1000000-5000000">$1,000,000+</option>
              </select>
              <select
                className="px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500"
                value={filters.bedrooms}
                onChange={(e) =>
                  setFilters({ ...filters, bedrooms: e.target.value })
                }
              >
                <option value="all">Any Bedrooms</option>
                <option value="1">1+ Bed</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid - with checks for empty results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-stone-700">
              No properties match your criteria
            </h3>
            <p className="text-stone-500 mt-2">
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, i) => (
              <Link to={`/properties/${property.id}`} key={property.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-64">
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-500 to-stone-700">
                      {property.images && property.images.length > 0 ? (
                        <img
                          src={property.images[0].image}
                          alt={property.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.log("Image failed to load:", e);
                            e.target.src = "/placeholder-house.jpg"; // Fallback image
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-stone-900 font-semibold">
                      ${parseFloat(property.price).toLocaleString()}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-stone-800 bg-opacity-75 px-3 py-1 rounded-full text-white text-sm">
                      {property.status}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-900 mb-2">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-stone-600 mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        {property.beds || 0} Beds
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        {property.baths || 0} Baths
                      </div>
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        {property.sqft || 0} sqft
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
