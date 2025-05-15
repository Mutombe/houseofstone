import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Heart, Share2, WhatsApp } from 'lucide-react';
import { fetchProperties, createProperty, updateProperty, deleteProperty } from '../redux/slices/propertySlice';
import { Helmet } from 'react-helmet';

// Property Detail Component
const PropertyDetail = ({ property, onShare }) => {
  if (!property) return <div>Loading property...</div>;

  // Function to create WhatsApp link
  const getWhatsAppLink = (property) => {
    return `https://wa.me/263775625292?text=Hello%20I%27m%20interested%20in%20your%20property%20in%20${encodeURIComponent(
      property.location
    )}`;
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Helmet>
        <title>{property.title} | Real Estate</title>
        <meta name="description" content={property.description.substring(0, 160)} />
        <meta property="og:title" content={property.title} />
        <meta property="og:description" content={property.description.substring(0, 160)} />
        {property.images && property.images.length > 0 && (
          <meta property="og:image" content={property.images[0].image} />
        )}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Property Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-stone-900 mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center text-stone-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {property.location}
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-3xl font-bold text-stone-900">
                  ${parseFloat(property.price).toLocaleString()}
                </p>
                <p className="text-sm text-stone-500 uppercase">{property.status}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Property Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {property.images && property.images.length > 0 ? (
                <>
                  <div className="col-span-2 h-96 bg-gradient-to-r from-stone-500 to-stone-700 rounded-xl overflow-hidden">
                    <img
                      src={property.images[0].image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {property.images.length > 1 && (
                    <div className="h-48 bg-gradient-to-r from-stone-400 to-stone-600 rounded-xl overflow-hidden">
                      <img
                        src={property.images[1].image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {property.images.length > 2 && (
                    <div className="h-48 bg-gradient-to-r from-stone-400 to-stone-600 rounded-xl overflow-hidden">
                      <img
                        src={property.images[2].image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="col-span-2 h-96 bg-stone-200 flex items-center justify-center rounded-xl">
                  <p className="text-stone-500">No images available</p>
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-stone-900 mb-4">Description</h2>
              <p className="text-stone-600">{property.description}</p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-stone-900 mb-4">Features</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.features && property.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-stone-600">
                    <div className="w-2 h-2 bg-stone-500 rounded-full mr-2" />
                    {feature.feature}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8 sticky top-24"
            >
              <div className="flex justify-between mb-8">
                <button className="flex items-center text-stone-600 hover:text-stone-900">
                  <Heart className="w-5 h-5 mr-2" />
                  Save
                </button>
                <button 
                  onClick={onShare} 
                  className="flex items-center text-stone-600 hover:text-stone-900"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <p className="text-stone-500 text-sm mb-1">Bedrooms</p>
                  <p className="font-semibold">{property.beds || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-sm mb-1">Bathrooms</p>
                  <p className="font-semibold">{property.baths || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-sm mb-1">Square Feet</p>
                  <p className="font-semibold">{property.sqft || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-sm mb-1">Year Built</p>
                  <p className="font-semibold">{property.year_built || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-sm mb-1">Lot Size</p>
                  <p className="font-semibold">{property.lot_size || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-sm mb-1">Garage</p>
                  <p className="font-semibold">{property.garage || 'N/A'}</p>
                </div>
              </div>

              <a 
                href={getWhatsAppLink(property)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <WhatsApp className="w-5 h-5 mr-2" />
                Contact via WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropertyList Component
const PropertyList = () => {
  const dispatch = useDispatch();
  const { items: properties, status, error } = useSelector((state) => state.properties);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filters, setFilters] = React.useState({
    type: 'all',
    priceRange: 'all',
  });

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  // Filter properties based on search and filter criteria
  const filteredProperties = properties.filter(property => {
    const matchesType = filters.type === 'all' || property.property_type === filters.type;
    const matchesSearch = property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesPriceRange = true;
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      const price = parseFloat(property.price);
      matchesPriceRange = price >= min && (!max || price <= max);
    }

    return matchesType && matchesSearch && matchesPriceRange;
  });

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-900"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-red-500 p-4">Error loading properties: {error}</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProperties.map((property, i) => (
        <PropertyCard key={property.id} property={property} index={i} />
      ))}
    </div>
  );
};

// Property Card Component
const PropertyCard = ({ property, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="relative h-64">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-500 to-stone-700">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0].image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">No Image</div>
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
  );
};

// Demo component showing both list and selected property detail
const PropertyDemo = () => {
  const dispatch = useDispatch();
  const [selectedProperty, setSelectedProperty] = React.useState(null);
  const { items: properties } = useSelector((state) => state.properties);
  
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);
  
  useEffect(() => {
    if (properties.length > 0 && !selectedProperty) {
      setSelectedProperty(properties[0]);
    }
  }, [properties, selectedProperty]);
  
  const handleShareProperty = async () => {
    if (!selectedProperty) return;
    
    try {
      const response = await fetch(`/api/properties/${selectedProperty.id}/share/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      
      const data = await response.json();
      if (data.share_link) {
        navigator.clipboard.writeText(data.share_link);
        alert('Share link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing property:', error);
      alert('Failed to generate share link');
    }
  };
  
  return (
    <div className="flex flex-col gap-8">
      {selectedProperty ? (
        <PropertyDetail 
          property={selectedProperty} 
          onShare={handleShareProperty}
        />
      ) : (
        <div className="text-center p-8">Select a property to view details</div>
      )}
      
      <div className="p-4 bg-stone-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">All Properties</h2>
        <PropertyList />
      </div>
    </div>
  );
};

export { PropertyCard, PropertyList, PropertyDetail, PropertyDemo };