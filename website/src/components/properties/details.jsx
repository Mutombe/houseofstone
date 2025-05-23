// src/pages/PropertyDetail.jsx
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Heart, Share2, Calendar, Mail } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropertyShareModal from './shareModal';
import PropertyMap from './propertyMap';

const PropertyDetail = () => {
  const { id } = useParams();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [similarProperties, setSimilarProperties] = useState([]);
  const { items: properties, status, error } = useSelector((state) => state.properties);
  const navigate = useNavigate();
  const property = properties.find(p => p.id === parseInt(id));
  
  useEffect(() => {
    if (property && properties.length > 0) {
      // Find similar properties based on location, price range, property type
      const similar = properties.filter(p => 
        p.id !== parseInt(id) && 
        (p.location === property.location || 
         Math.abs(p.price - property.price) / property.price < 0.2 || // Within 20% price range
         p.type === property.type)
      ).slice(0, 3); // Limit to 3 similar properties
      
      setSimilarProperties(similar);
    }
  }, [property, properties, id]);
  
  if (!property) return <div className="min-h-screen flex justify-center items-center">Loading property...</div>;

  // Get primary agent or fallback to default contact
  const getPrimaryAgent = (property) => {
    if (property.property_agents && property.property_agents.length > 0) {
      const primaryAgent = property.property_agents.find(agent => agent.is_primary);
      return primaryAgent || property.property_agents[0]; // Fallback to first agent if no primary
    }
    return null;
  };

  // Function to create WhatsApp link
  const getWhatsAppLink = (property) => {
    const primaryAgent = getPrimaryAgent(property);
    const phoneNumber = primaryAgent?.agent?.phone || '263772329569'; // Fallback number
    const agentName = primaryAgent?.agent?.full_name || 'HSP Team';
    
    return `https://wa.me/${phoneNumber}?text=Hello%20${encodeURIComponent(agentName)},%20I%27m%20interested%20in%20your%20property%20"${encodeURIComponent(
      property.title
    )}"%20in%20${encodeURIComponent(property.location)}`;
  };

  // Function to get email address
  const getEmailAddress = (property) => {
    const primaryAgent = getPrimaryAgent(property);
    return primaryAgent?.agent?.email || 'info@hsp.co.zw'; // Fallback email
  };

  // Function to create email link
  const getEmailLink = (property) => {
    const email = getEmailAddress(property);
    const subject = `Inquiry about ${property.title}`;
    const body = `Hello,\n\nI'm interested in your property "${property.title}" located in ${property.location}.\n\nPlease provide me with more information.\n\nThank you.`;
    
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Helmet>
        <title>{property.title} | Real Estate</title>
        <meta name="description" content={property.description?.substring(0, 160)} />
        <meta property="og:title" content={property.title} />
        <meta property="og:description" content={property.description?.substring(0, 160)} />
        {property.images && property.images.length > 0 && (
          <meta property="og:image" content={property.images[0].image} />
        )}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Add Leaflet CSS */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css" 
          integrity="sha512-Zcn6bjR/8RZbLEpLIeOwNtzREBAJnUKESxces60Mpoj+2okopSAcSUIUOseddDm0cxnGQzxIR7vJgsLZbdYx7w==" 
          crossOrigin="anonymous" 
        />
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

            {/* Property Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-stone-900 mb-4">Location</h2>
              <div className="h-96 rounded-xl overflow-hidden">
                {property ? (
                  <PropertyMap 
                    position={[property.latitude, property.longitude]} 
                    title={property.title}
                    address={property.location}
                  />
                ) : (
                  <div className="w-full h-full bg-stone-200 flex flex-col items-center justify-center">
                    <p className="text-stone-500">Map coordinates not available</p>
                    <p className="text-stone-400 text-sm mt-2">{property.location}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
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
            
            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-stone-900 mb-6">Similar Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {similarProperties.map((prop) => (
                    <div 
                      key={prop.id} 
                      className="bg-stone-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      onClick={() => navigate(`/properties/${prop.id}`)}
                      role="button"
                    >
                      <div className="h-48 bg-stone-200 relative">
                        {prop.images && prop.images.length > 0 ? (
                          <img 
                            src={prop.images[0].image} 
                            alt={prop.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <p className="text-stone-400">No image</p>
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-sm font-medium">
                          {prop.status}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-stone-900 truncate">{prop.title}</h3>
                        <p className="text-stone-600 text-sm mb-2">{prop.location}</p>
                        <p className="text-stone-900 font-bold">${parseFloat(prop.price).toLocaleString()}</p>
                        <div className="flex items-center mt-3 text-sm text-stone-500">
                          {prop.beds && (
                            <div className="flex items-center mr-4">
                              <Bed className="w-4 h-4 mr-1" />
                              {prop.beds}
                            </div>
                          )}
                          {prop.baths && (
                            <div className="flex items-center mr-4">
                              <Bath className="w-4 h-4 mr-1" />
                              {prop.baths}
                            </div>
                          )}
                          {prop.sqft && (
                            <div className="flex items-center">
                              <Square className="w-4 h-4 mr-1" />
                              {prop.sqft} sqft
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
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
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center text-stone-600 hover:text-stone-900"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>

              {/* Agent Information */}
              {getPrimaryAgent(property) && (
                <div className="mb-8 p-4 bg-stone-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">Primary Agent</h3>
                  <p className="text-stone-700 font-medium">{getPrimaryAgent(property).agent.full_name}</p>
                  {getPrimaryAgent(property).agent.email && (
                    <p className="text-stone-600 text-sm">{getPrimaryAgent(property).agent.email}</p>
                  )}
                  {getPrimaryAgent(property).agent.phone && (
                    <p className="text-stone-600 text-sm">{getPrimaryAgent(property).agent.phone}</p>
                  )}
                </div>
              )}

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
                  <p className="text-stone-500 text-sm mb-1">Floor Size</p>
                  <p className="font-semibold">{property.floor_size || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-sm mb-1">Garage</p>
                  <p className="font-semibold">{property.garage || 'N/A'}</p>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <a 
                  href={getWhatsAppLink(property)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <FaWhatsapp className="w-5 h-5 mr-2" />
                  Contact via WhatsApp
                </a>

                <a 
                  href={getEmailLink(property)}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Share Modal */}
      <PropertyShareModal 
        property={property}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};

export default PropertyDetail;