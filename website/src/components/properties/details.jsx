// src/pages/PropertyDetail.jsx
import { motion } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Calendar,
  Mail,
  Phone,
  Eye,
  Clock,
  Camera,
  ChevronLeft,
  ChevronRight,
  Star,
  Building,
  Car,
  Home,
  Users,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import PropertyShareModal from "./shareModal";
import PropertyMap from "./propertyMap";

const PropertyDetail = () => {
  const { id } = useParams();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 500) + 100);
  
  const {
    items: properties,
    status,
    error,
  } = useSelector((state) => state.properties);
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (property && properties.length > 0) {
      // Find similar properties based on location, price range, property type
      const similar = properties
        .filter(
          (p) =>
            p.id !== parseInt(id) &&
            (p.location === property.location ||
              Math.abs(p.price - property.price) / property.price < 0.2 || // Within 20% price range
              p.type === property.type)
        )
        .slice(0, 3); // Limit to 3 similar properties

      setSimilarProperties(similar);
    }
  }, [property, properties, id]);

  // Simulate view count increment
  useEffect(() => {
    const timer = setTimeout(() => {
      setViewCount(prev => prev + 1);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!property)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900 mx-auto mb-4"></div>
          <p className="text-stone-600">Loading property details...</p>
        </div>
      </div>
    );

  // Get primary agent or fallback to default contact
  const getPrimaryAgent = (property) => {
    if (property.property_agents && property.property_agents.length > 0) {
      const primaryAgent = property.property_agents.find(
        (agent) => agent.is_primary
      );
      return primaryAgent || property.property_agents[0];
    }
    return null;
  };

  // Function to create WhatsApp link
  const getWhatsAppLink = (property) => {
    const primaryAgent = getPrimaryAgent(property);
    const phoneNumber = primaryAgent?.agent?.phone || "263772329569";
    const agentName = primaryAgent?.agent?.full_name || "HSP Team";

    return `https://wa.me/${phoneNumber}?text=Hello%20${encodeURIComponent(
      agentName
    )},%20I%27m%20interested%20in%20your%20property%20"${encodeURIComponent(
      property.title
    )}"%20in%20${encodeURIComponent(property.location)}`;
  };

  // Function to get email address
  const getEmailAddress = (property) => {
    const primaryAgent = getPrimaryAgent(property);
    return primaryAgent?.agent?.email || "info@hsp.co.zw";
  };

  // Function to create email link
  const getEmailLink = (property) => {
    const email = getEmailAddress(property);
    const subject = `Inquiry about ${property.title}`;
    const body = `Hello,\n\nI'm interested in your property "${property.title}" located in ${property.location}.\n\nPlease provide me with more information.\n\nThank you.`;

    return `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const nextImage = () => {
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  const propertyStats = [
    { icon: Bed, label: "Bedrooms", value: property.beds || "N/A" },
    { icon: Bath, label: "Bathrooms", value: property.baths || "N/A" },
    { icon: Square, label: "Land Size", value: property.sqft || "N/A" },
    { icon: Car, label: "Garage", value: property.garage || "N/A" },
    { icon: Home, label: "Floor Size", value: property.floor_size || "N/A" },
    { icon: Building, label: "Year Built", value: property.year_built || "N/A" },
    { icon: Users, label: "Dining Rooms", value: property.dining_rooms || "N/A" },
    { icon: Home, label: "Lounges", value: property.lounges || "N/A" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <Helmet>
        <title>{property.title} | Real Estate</title>
        <meta
          name="description"
          content={property.description?.substring(0, 160)}
        />
        <meta property="og:title" content={property.title} />
        <meta
          property="og:description"
          content={property.description?.substring(0, 160)}
        />
        {property.images && property.images.length > 0 && (
          <meta property="og:image" content={property.images[0].image} />
        )}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css"
          integrity="sha512-Zcn6bjR/8RZbLEpLIeOwNtzREBAJnUKESxces60Mpoj+2okopSAcSUIUOseddDm0cxnGQzxIR7vJgsLZbdYx7w=="
          crossOrigin="anonymous"
        />
      </Helmet>

      {/* Enhanced Image Gallery with Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="h-64 sm:h-80 md:h-96 bg-gradient-to-r from-stone-500 to-stone-700 relative overflow-hidden">
          {property.images && property.images.length > 0 ? (
            <>
              <img
                src={property.images[currentImageIndex].image}
                alt={property.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setIsImageModalOpen(true)}
              />
              
              {/* Image Navigation */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <Camera className="w-4 h-4 mr-1" />
                {currentImageIndex + 1} / {property.images.length}
              </div>

              {/* Image Dots */}
              {property.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-stone-200 flex items-center justify-center">
              <p className="text-stone-500">No images available</p>
            </div>
          )}

          {/* Action Buttons Overlay */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFavorited(!isFavorited)}
              className={`p-2 rounded-full transition-colors ${
                isFavorited 
                  ? 'bg-red-500 text-white' 
                  : 'bg-black/50 text-white hover:bg-black/70'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsShareModalOpen(true)}
              className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Property Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col space-y-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center text-stone-600 mb-2">
                  <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{property.location}</span>
                </div>
                
                {/* Property Stats */}
                <div className="flex items-center space-x-4 text-sm text-stone-500">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {viewCount} views
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Updated today
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    4.8 rating
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-stone-900">
                    ${parseFloat(property.price).toLocaleString()}
                  </p>
                  <p className="text-sm text-stone-500 uppercase font-medium">
                    {property.status}
                  </p>
                </div>
                
                {/* Quick Stats for Mobile */}
                <div className="grid grid-cols-3 gap-4 mt-4 sm:mt-0 sm:flex sm:space-x-6">
                  {property.beds && (
                    <div className="flex items-center text-stone-600">
                      <Bed className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.beds}</span>
                    </div>
                  )}
                  {property.baths && (
                    <div className="flex items-center text-stone-600">
                      <Bath className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.baths}</span>
                    </div>
                  )}
                  {property.sqft && (
                    <div className="flex items-center text-stone-600">
                      <Square className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.sqft}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Property Content - Mobile First Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-12 lg:space-y-0">
          
          {/* MOBILE: Sidebar comes first, DESKTOP: Sidebar on right */}
          <div className="lg:order-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24"
            >
              {/* Agent Information */}
              {getPrimaryAgent(property) && (
                <div className="mb-6 p-4 bg-gradient-to-r from-stone-50 to-stone-100 rounded-lg border border-stone-200">
                  <h3 className="text-lg font-semibold text-stone-900 mb-3 flex items-center">
                    <div className="w-10 h-10 bg-stone-300 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-stone-600" />
                    </div>
                    Primary Agent
                  </h3>
                  <div className="space-y-2">
                    <p className="text-stone-700 font-medium">
                      {getPrimaryAgent(property).agent.full_name}
                    </p>
                    {getPrimaryAgent(property).agent.email && (
                      <div className="flex items-center text-stone-600 text-sm">
                        <Mail className="w-4 h-4 mr-2" />
                        {getPrimaryAgent(property).agent.email}
                      </div>
                    )}
                    {getPrimaryAgent(property).agent.phone && (
                      <div className="flex items-center text-stone-600 text-sm">
                        <Phone className="w-4 h-4 mr-2" />
                        {getPrimaryAgent(property).agent.phone}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Property Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {propertyStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 bg-stone-50 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-2">
                      <stat.icon className="w-4 h-4 text-stone-500 mr-2" />
                      <p className="text-stone-500 text-xs font-medium uppercase tracking-wide">
                        {stat.label}
                      </p>
                    </div>
                    <p className="font-semibold text-stone-900">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={getWhatsAppLink(property)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center font-medium shadow-lg"
                >
                  <FaWhatsapp className="w-5 h-5 mr-2" />
                  Contact via WhatsApp
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={getEmailLink(property)}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center font-medium shadow-lg"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-stone-600 to-stone-700 text-white py-3 px-4 rounded-lg hover:from-stone-700 hover:to-stone-800 transition-all flex items-center justify-center font-medium shadow-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Tour
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* MOBILE: Main content comes second, DESKTOP: Main content on left */}
          <div className="lg:order-1 lg:col-span-2 space-y-8">
            
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
            >
              <h2 className="text-2xl font-bold text-stone-900 mb-4 flex items-center">
                <Home className="w-6 h-6 mr-3 text-stone-600" />
                About This Property
              </h2>
              <div className="prose prose-stone max-w-none">
                <p className="text-stone-600 leading-relaxed">
                  {property.description}
                </p>
              </div>
            </motion.div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
              >
                <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center">
                  <Star className="w-6 h-6 mr-3 text-stone-600" />
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="flex items-center text-stone-600 p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                      <span className="font-medium">{feature.feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Property Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
            >
              <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-stone-600" />
                Location & Neighborhood
              </h2>
              <div className="h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-inner">
                {property.latitude && property.longitude ? (
                  <PropertyMap
                    position={[property.latitude, property.longitude]}
                    title={property.title}
                    address={property.location}
                  />
                ) : (
                  <div className="w-full h-full bg-stone-200 flex flex-col items-center justify-center">
                    <MapPin className="w-12 h-12 text-stone-400 mb-2" />
                    <p className="text-stone-500 font-medium">
                      Map coordinates not available
                    </p>
                    <p className="text-stone-400 text-sm mt-2">
                      {property.location}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
              >
                <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center">
                  <Building className="w-6 h-6 mr-3 text-stone-600" />
                  Similar Properties
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {similarProperties.map((prop, index) => (
                    <motion.div
                      key={prop.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-stone-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                      onClick={() => navigate(`/properties/${prop.id}`)}
                    >
                      <div className="h-48 bg-stone-200 relative overflow-hidden">
                        {prop.images && prop.images.length > 0 ? (
                          <img
                            src={prop.images[0].image}
                            alt={prop.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-stone-300 to-stone-400">
                            <Home className="w-12 h-12 text-stone-500" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-stone-700">
                          {prop.status}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-stone-900 truncate mb-1">
                          {prop.title}
                        </h3>
                        <p className="text-stone-600 text-sm mb-3 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {prop.location}
                        </p>
                        <p className="text-stone-900 font-bold text-lg mb-3">
                          ${parseFloat(prop.price).toLocaleString()}
                        </p>
                        <div className="flex items-center justify-between text-sm text-stone-500">
                          <div className="flex items-center space-x-3">
                            {prop.beds && (
                              <div className="flex items-center">
                                <Bed className="w-4 h-4 mr-1" />
                                {prop.beds}
                              </div>
                            )}
                            {prop.baths && (
                              <div className="flex items-center">
                                <Bath className="w-4 h-4 mr-1" />
                                {prop.baths}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-600 transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <PropertyShareModal
        property={property}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Image Modal */}
      {isImageModalOpen && property.images && property.images.length > 0 && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={property.images[currentImageIndex].image}
              alt={property.title}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-stone-300 text-2xl"
            >
              ×
            </button>
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-stone-300 text-2xl"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-stone-300 text-2xl"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;