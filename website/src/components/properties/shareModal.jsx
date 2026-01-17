import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  X,
  Link2,
  MapPin,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";

const PropertyShareModal = ({ property, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Generate the share link from the current URL
  const shareLink = property ? `${window.location.origin}/properties/${property.id}` : "";

  // Reset copied state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  // Copy the share link to clipboard
  const copyToClipboard = () => {
    if (!shareLink) return;

    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  // Get social sharing links
  const getSocialShareUrl = (platform) => {
    if (!shareLink) return "#";

    const text = `Check out this property: ${property.title}`;

    switch (platform) {
      case "whatsapp":
        return `https://wa.me/?text=${encodeURIComponent(text + " " + shareLink)}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
      case "twitter":
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareLink)}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`;
      default:
        return "#";
    }
  };

  // Social platform config
  const socialPlatforms = [
    {
      name: "WhatsApp",
      platform: "whatsapp",
      icon: FaWhatsapp,
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      name: "Facebook",
      platform: "facebook",
      icon: Facebook,
      bgColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
    },
    {
      name: "Twitter",
      platform: "twitter",
      icon: FaXTwitter,
      bgColor: "bg-sky-500",
      hoverColor: "hover:bg-sky-600",
    },
    {
      name: "LinkedIn",
      platform: "linkedin",
      icon: Linkedin,
      bgColor: "bg-blue-700",
      hoverColor: "hover:bg-blue-800",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-[#0A1628] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C9A962]/10 rounded-xl flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-[#C9A962]" />
                </div>
                <h2 className="text-xl font-bold text-white">Share Property</h2>
              </div>
              <button
                className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Property Preview */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <div className="flex gap-4">
                {property?.images?.[0] && (
                  <img
                    src={property.images[0].image}
                    alt={property.title}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate mb-1">
                    {property?.title}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <MapPin className="w-3 h-3 text-[#C9A962]" />
                    <span className="truncate">{property?.location}</span>
                  </div>
                  {property?.price && (
                    <div className="text-[#C9A962] font-semibold mt-2">
                      ${property.price.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Share Link Input */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Share Link
                </label>
                <div className="flex">
                  <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-l-xl px-4 py-3">
                    <Link2 className="w-4 h-4 text-[#C9A962] flex-shrink-0" />
                    <input
                      type="text"
                      value={shareLink}
                      readOnly
                      className="flex-1 bg-transparent text-white text-sm focus:outline-none truncate"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className={`px-4 rounded-r-xl flex items-center justify-center transition-all duration-300 ${
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-[#C9A962] text-[#0A1628] hover:bg-[#B8985A]"
                    }`}
                  >
                    {copied ? (
                      <IoCheckmarkDoneCircleOutline className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-xs mt-2"
                  >
                    Link copied to clipboard!
                  </motion.p>
                )}
              </div>

              {/* Social Share */}
              <div>
                <label className="block text-sm text-gray-400 mb-3">
                  Share via social media
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {socialPlatforms.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.platform}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={getSocialShareUrl(social.platform)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.bgColor} ${social.hoverColor} text-white p-3 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-gray-500 text-xs text-center">
                Share this property with friends and family via link or social media.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PropertyShareModal;
