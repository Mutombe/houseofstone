// website/src/components/properties/SavedProperties.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, Trash2, ArrowLeft, Home, MapPin } from 'lucide-react';
import { toggleSaveProperty, clearSavedProperties } from '../../redux/slices/localSavesSlice';
import { Button } from '../ui/Button';

const SavedPropertyCard = ({ property, onRemove }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
          {property.images?.[0]?.image ? (
            <img
              src={property.images[0].image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-stone-100 flex items-center justify-center">
              <Home className="w-12 h-12 text-stone-300" />
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded ${
              property.status === 'available'
                ? 'bg-green-100 text-green-800'
                : property.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-stone-100 text-stone-800'
            }`}>
              {property.status || 'Available'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <Link
              to={`/properties/${property.id}`}
              className="text-lg font-semibold text-navy-900 hover:text-gold-600 transition-colors line-clamp-1"
            >
              {property.title}
            </Link>
            <button
              onClick={() => onRemove(property)}
              className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove from saved"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center text-stone-500 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            {property.location}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gold-600">
              ${property.price?.toLocaleString()}
            </span>
            <div className="flex gap-4 text-sm text-stone-600">
              {property.beds && (
                <span>{property.beds} beds</span>
              )}
              {property.baths && (
                <span>{property.baths} baths</span>
              )}
              {property.size && (
                <span>{property.size} sqft</span>
              )}
            </div>
          </div>

          <Link
            to={`/properties/${property.id}`}
            className="mt-4 inline-flex items-center text-sm font-medium text-gold-600 hover:text-gold-700"
          >
            View Details
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const SavedProperties = () => {
  const dispatch = useDispatch();
  const { savedProperties } = useSelector((state) => state.localSaves);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleRemove = (property) => {
    dispatch(toggleSaveProperty(property));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all saved properties?')) {
      dispatch(clearSavedProperties());
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-20 pb-24 lg:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/properties"
              className="inline-flex items-center text-sm text-stone-500 hover:text-gold-600 mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to listings
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy-900">
              Saved Properties
            </h1>
            <p className="text-stone-500 mt-1">
              {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
              {!isAuthenticated && ' (saved locally)'}
            </p>
          </div>
          {savedProperties.length > 0 && (
            <Button
              variant="ghost"
              onClick={handleClearAll}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Saved Properties List */}
        {savedProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-stone-100 p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
              <Heart className="w-10 h-10 text-stone-300" />
            </div>
            <h2 className="text-xl font-semibold text-navy-900 mb-2">
              No saved properties yet
            </h2>
            <p className="text-stone-500 mb-6 max-w-sm mx-auto">
              Click the heart icon on any property to save it here for easy access later.
            </p>
            <Link to="/properties">
              <Button variant="primary">
                Browse Properties
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {savedProperties.map((property) => (
              <SavedPropertyCard
                key={property.id}
                property={property}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}

        {/* Login prompt for unauthenticated users */}
        {!isAuthenticated && savedProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-navy-900 rounded-xl p-6 text-white"
          >
            <h3 className="font-semibold mb-2">
              Want to access your saved properties on any device?
            </h3>
            <p className="text-stone-300 text-sm mb-4">
              Create an account or sign in to sync your saved properties across all your devices.
            </p>
            <div className="flex gap-3">
              <Link to="/login">
                <Button variant="gold">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Create Account
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SavedProperties;
