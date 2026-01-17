// website/src/components/properties/SavedProperties.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, Trash2, ArrowLeft, Home, MapPin, X, AlertTriangle } from 'lucide-react';
import { toggleSaveProperty, clearSavedProperties } from '../../redux/slices/localSavesSlice';

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#0A1628] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                  <p className="text-gray-400 text-sm">{message}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SavedPropertyCard = ({ property, onRemove }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-[#0F1E32] rounded-xl border border-white/10 overflow-hidden hover:border-[#C9A962]/30 transition-all duration-300 group"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
          {(property.primaryImage || property.images?.[0]?.image) ? (
            <img
              src={property.primaryImage || property.images[0].image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#1a2942] flex items-center justify-center">
              <Home className="w-12 h-12 text-white/20" />
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded ${
              property.status === 'available'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : property.status === 'pending'
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                : 'bg-white/10 text-white/60 border border-white/20'
            }`}>
              {property.status || 'Available'}
            </span>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <Link
              to={`/properties/${property.id}`}
              className="text-lg font-semibold text-white hover:text-[#C9A962] transition-colors line-clamp-1"
            >
              {property.title}
            </Link>
            <button
              onClick={() => onRemove(property)}
              className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Remove from saved"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center text-gray-400 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1 text-[#C9A962]" />
            {property.location}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-[#C9A962]">
              ${property.price?.toLocaleString()}
            </span>
            <div className="flex gap-4 text-sm text-gray-400">
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
            className="mt-4 inline-flex items-center text-sm font-medium text-[#C9A962] hover:text-[#D4B978] transition-colors"
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
  const [showClearModal, setShowClearModal] = useState(false);

  const handleRemove = (property) => {
    dispatch(toggleSaveProperty(property));
  };

  const handleClearAll = () => {
    dispatch(clearSavedProperties());
  };

  return (
    <div className="min-h-screen bg-[#0A1628] pt-20 pb-24 lg:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/properties"
              className="inline-flex items-center text-sm text-gray-400 hover:text-[#C9A962] mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to listings
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Saved Properties
            </h1>
            <p className="text-gray-400 mt-1">
              {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
              {!isAuthenticated && ' (saved locally)'}
            </p>
          </div>
          {savedProperties.length > 0 && (
            <button
              onClick={() => setShowClearModal(true)}
              className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Saved Properties List */}
        {savedProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0F1E32] rounded-xl border border-white/10 p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#1a2942] flex items-center justify-center">
              <Heart className="w-10 h-10 text-white/20" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              No saved properties yet
            </h2>
            <p className="text-gray-400 mb-6 max-w-sm mx-auto">
              Click the heart icon on any property to save it here for easy access later.
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center px-6 py-3 bg-[#C9A962] hover:bg-[#B8985A] text-[#0A1628] font-semibold rounded-xl transition-colors"
            >
              Browse Properties
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {savedProperties.map((property) => (
                <SavedPropertyCard
                  key={property.id}
                  property={property}
                  onRemove={handleRemove}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Login prompt for unauthenticated users */}
        {!isAuthenticated && savedProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-gradient-to-r from-[#C9A962]/10 to-[#C9A962]/5 border border-[#C9A962]/20 rounded-xl p-6"
          >
            <h3 className="font-semibold text-white mb-2">
              Want to access your saved properties on any device?
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Create an account or sign in to sync your saved properties across all your devices.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openAuthModal', { detail: 'login' }))}
                className="px-5 py-2.5 bg-[#C9A962] hover:bg-[#B8985A] text-[#0A1628] font-semibold rounded-xl transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openAuthModal', { detail: 'register' }))}
                className="px-5 py-2.5 border border-white/20 text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                Create Account
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Clear All Confirmation Modal */}
      <ConfirmationModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleClearAll}
        title="Clear all saved properties?"
        message="This will remove all properties from your saved list. This action cannot be undone."
      />
    </div>
  );
};

export default SavedProperties;
