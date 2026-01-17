// src/components/properties/details.jsx
// Immersive Property Details - House of Stone Properties
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
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
  Download,
  Car,
  Home,
  Users,
  X,
  Play,
  Maximize2,
  Grid3X3,
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  MessageCircle,
  ExternalLink,
  ZoomIn,
  Ruler,
} from "lucide-react";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineBrunchDining } from "react-icons/md";
import { MdStarPurple500 } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";


import { FaWhatsapp } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import PropertyShareModal from "./shareModal";
import PropertyMap from "./propertyMap";
import InquiryForm from "./InquiryForm";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { propertyAPI } from "./../../utils/api";
import { fetchProperty } from "./../../redux/slices/propertySlice";
import { toggleSaveProperty, selectSavedProperties } from "./../../redux/slices/localSavesSlice";

// Premium Skeleton Loader - Matches actual property detail layout with colored backgrounds
const PropertyDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Hero Skeleton - matches h-[80vh] */}
      <div className="relative h-[80vh] overflow-hidden">
        {/* Background gradient with shimmer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F2E44] to-[#0A1628]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>

        {/* Overlays like real hero */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/80 to-transparent" />

        {/* Floating orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#C9A962]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#C9A962]/10 rounded-full blur-3xl animate-pulse" />

        {/* Back button skeleton */}
        <div className="absolute top-24 left-6 z-10">
          <div className="h-10 w-24 bg-white/10 rounded-full animate-pulse" />
        </div>

        {/* Action buttons skeleton */}
        <div className="absolute top-24 right-6 z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/10 animate-pulse" />
          <div className="w-12 h-12 rounded-full bg-white/10 animate-pulse" />
        </div>

        {/* Gallery navigation skeleton */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 animate-pulse" />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 animate-pulse" />

        {/* View all photos button skeleton */}
        <div className="absolute bottom-32 right-6">
          <div className="h-12 w-40 bg-white/10 rounded-xl animate-pulse" />
        </div>

        {/* Property Info Overlay skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Status Badge */}
            <div className="h-10 w-28 bg-[#C9A962]/40 rounded-full animate-pulse mb-4" />
            {/* Title */}
            <div className="h-12 sm:h-14 bg-white/10 rounded-2xl w-2/3 animate-pulse mb-4" />
            {/* Location */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 bg-[#C9A962]/30 rounded animate-pulse" />
              <div className="h-5 w-48 bg-white/10 rounded animate-pulse" />
            </div>
            {/* Price */}
            <div className="h-12 w-40 bg-[#C9A962]/30 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="relative z-10 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Grid - matches 4 columns with colored backgrounds */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#C9A962]/20 animate-pulse mb-4" />
                <div className="h-4 w-16 bg-white/10 rounded animate-pulse mb-2" />
                <div className="h-7 w-12 bg-white/20 rounded animate-pulse" />
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description Card */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A962]/20 animate-pulse" />
                  <div className="h-7 w-48 bg-white/10 rounded animate-pulse" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-white/10 rounded animate-pulse" />
                </div>
              </div>

              {/* Property Details Card */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A962]/20 animate-pulse" />
                  <div className="h-7 w-40 bg-white/10 rounded animate-pulse" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-[#C9A962]/30 rounded animate-pulse" />
                        <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
                      </div>
                      <div className="h-6 w-10 bg-white/20 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Card */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 animate-pulse" />
                  <div className="h-7 w-36 bg-white/10 rounded animate-pulse" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-xl border border-emerald-500/20">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/30 animate-pulse" />
                      <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Card */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <div className="h-5 w-28 bg-white/10 rounded animate-pulse mb-4" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#C9A962]/20 animate-pulse" />
                  <div>
                    <div className="h-5 w-24 bg-white/20 rounded animate-pulse mb-2" />
                    <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#C9A962]/30 rounded animate-pulse" />
                    <div className="h-4 w-40 bg-white/10 rounded animate-pulse" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#C9A962]/30 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-14 w-full bg-[#C9A962]/30 rounded-xl animate-pulse" />
                  <div className="h-14 w-full bg-emerald-500/30 rounded-xl animate-pulse" />
                  <div className="h-14 w-full bg-white/10 rounded-xl animate-pulse" />
                </div>
              </div>

              {/* Brochure Card */}
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm rounded-3xl p-6 border border-purple-500/20">
                <div className="h-5 w-36 bg-white/20 rounded animate-pulse mb-2" />
                <div className="h-4 w-48 bg-white/10 rounded animate-pulse mb-4" />
                <div className="h-14 w-full bg-purple-500/30 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Floating Action Bar - Repositioned for mobile to avoid bottom nav
const FloatingActionBar = ({ property, onShare, onFavorite, isFavorited, onInquiry }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop version - centered bottom */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden lg:block"
          >
            <div className="bg-[#0A1628]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/30 px-6 py-4 flex items-center gap-6">
              {/* Price */}
              <div>
                <p className="text-[#C9A962] text-2xl font-semibold tabular-nums tracking-wide">
                  ${parseFloat(property.price).toLocaleString()}
                </p>
                <p className="text-white/50 text-xs uppercase">{property.status}</p>
              </div>

              <div className="h-12 w-px bg-white/10" />

              {/* Actions */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onFavorite}
                  className={`p-3 rounded-xl transition-colors ${
                    isFavorited
                      ? "bg-red-500 text-white"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onShare}
                  className="p-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onInquiry}
                  className="px-6 py-3 rounded-xl bg-[#C9A962] text-[#0A1628] font-semibold hover:bg-[#B8985A] transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Inquire</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Mobile version - vertical on right side */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed bottom-28 right-3 z-40 lg:hidden"
          >
            <div className="bg-[#0A1628]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/30 p-2 flex flex-col items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onFavorite}
                className={`p-3 rounded-xl transition-colors ${
                  isFavorited
                    ? "bg-red-500 text-white"
                    : "bg-white/10 text-white"
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onShare}
                className="p-3 rounded-xl bg-white/10 text-white transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onInquiry}
                className="p-3 rounded-xl bg-[#C9A962] text-[#0A1628] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Image Gallery Modal
const ImageGalleryModal = ({ images, currentIndex, onClose, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate("prev");
      if (e.key === "ArrowRight") onNavigate("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNavigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
    >
      {/* Close button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </motion.button>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate("prev")}
            className="absolute left-6 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate("next")}
            className="absolute right-6 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </motion.button>
        </>
      )}

      {/* Image */}
      <motion.img
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        src={images[currentIndex]?.image}
        alt={`Property image ${currentIndex + 1}`}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
        onError={(e) => {
          e.target.src = "/hsp-fallback1.png";
        }}
      />

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto p-2">
        {images.slice(0, 10).map((img, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            onClick={() => onNavigate(idx)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
              idx === currentIndex ? "border-[#C9A962]" : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <img
              src={img.image}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/hsp-fallback1.png";
              }}
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#C9A962]/50 transition-all duration-300 hover:bg-white/10"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-[#C9A962]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-[#C9A962]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A962]/20 transition-colors">
          <Icon className="w-6 h-6 text-[#C9A962]" />
        </div>
        <p className="text-white/50 text-sm uppercase tracking-wider mb-1">{label}</p>
        <p className="text-white text-2xl font-bold">{value || "N/A"}</p>
      </div>
    </motion.div>
  );
};

// Feature Item Component
const FeatureItem = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-xl border border-emerald-500/20 group hover:from-emerald-500/20 transition-all"
    >
      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
        <IoCheckmarkDoneCircleOutline className="w-4 h-4 text-white" />
      </div>
      <span className="text-white/80 font-medium group-hover:text-white transition-colors">
        {feature.feature}
      </span>
    </motion.div>
  );
};

// Similar Property Card
const SimilarPropertyCard = ({ property, index }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => navigate(`/properties/${property.id}`)}
      className="group cursor-pointer"
    >
      <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#C9A962]/50 transition-all duration-500 hover:transform hover:scale-[1.02]">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0].image}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.target.src = "/hsp-fallback2.png";
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1F2E44] to-[#0A1628] flex items-center justify-center">
              <Home className="w-12 h-12 text-white/20" />
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />

          {/* Status badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-[#C9A962] text-[#0A1628] text-xs font-bold rounded-full uppercase">
            {property.status}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-1 group-hover:text-[#C9A962] transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center text-white/50 text-sm mb-4">
            <MapPin className="w-4 h-4 mr-1 text-[#C9A962]" />
            {property.location}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[#C9A962] text-xl font-semibold tabular-nums tracking-wide">
              ${parseFloat(property.price).toLocaleString()}
            </p>

            <div className="flex items-center gap-3 text-white/50 text-sm">
              {property.beds && (
                <span className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  {property.beds}
                </span>
              )}
              {property.baths && (
                <span className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  {property.baths}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="w-5 h-5 text-[#C9A962]" />
        </div>
      </div>
    </motion.div>
  );
};

// Main Property Detail Component
const PropertyDetail = () => {
  const { id, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const heroRef = useRef(null);

  // State
  const [sharedProperty, setSharedProperty] = useState(null);
  const [sharedError, setSharedError] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isGeneratingBrochure, setIsGeneratingBrochure] = useState(false);

  const isSharedRoute = !!token;

  // Redux state
  const {
    items: properties,
    selectedProperty,
    itemLoading,
    itemErrors,
  } = useSelector((state) => state.properties);

  // Saved properties from Redux
  const savedProperties = useSelector(selectSavedProperties);
  const isFavorited = savedProperties.some(p => p.id === parseInt(id));

  const property = isSharedRoute
    ? sharedProperty
    : selectedProperty?.id === parseInt(id)
    ? selectedProperty
    : properties.find((p) => p.id === parseInt(id));

  const isLoadingProperty = isSharedRoute
    ? !sharedProperty && !sharedError
    : itemLoading[id] || false;
  const propertyError = isSharedRoute ? sharedError : itemErrors[id] || null;

  // Parallax effect - only use target ref when property data is available
  // This prevents the "ref not hydrated" error when skeleton is shown
  const { scrollYProgress } = useScroll({
    target: property ? heroRef : undefined,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Fetch shared property
  useEffect(() => {
    if (isSharedRoute && token && !sharedProperty && !sharedError) {
      const fetchSharedProperty = async () => {
        try {
          const response = await propertyAPI.getShared(token);
          setSharedProperty(response.data);
        } catch (error) {
          console.error("Error fetching shared property:", error);
          if (error.response?.status === 410) {
            setSharedError({ message: "This shared link has expired." });
          } else {
            setSharedError({ message: "Property not found or link is invalid." });
          }
        }
      };
      fetchSharedProperty();
    }
  }, [token, isSharedRoute, sharedProperty, sharedError]);

  // Fetch property
  useEffect(() => {
    if (!isSharedRoute && !property && id && !itemLoading[id]) {
      dispatch(fetchProperty(id));
    }
  }, [id, dispatch, isSharedRoute]);

  // Similar properties
  useEffect(() => {
    if (property && properties.length > 0) {
      const similar = properties
        .filter(
          (p) =>
            p.id !== parseInt(id) &&
            (p.location === property.location ||
              Math.abs(p.price - property.price) / property.price < 0.2 ||
              p.type === property.type)
        )
        .slice(0, 3);
      setSimilarProperties(similar);
    }
  }, [property, properties, id]);

  // Agent image mapping - matches first names to their profile pictures
  const agentImageMap = {
    'Leonita': 'leo.jpeg',
    'Nairgel': '/ngl.jpeg',
    'Winnifilda': 'winnie.jpeg',
    'Winnie': 'winnie.jpeg',
    'James': 'james.jpeg',
    'Arthur': 'arthur.jpeg',
    'Sarah': 'sarah.jpeg',
    'Tsitsi': 'tsitsi.jpeg',
    'Chomu': 'chomu.jpeg',
    'Emily': 'emily.jpeg',
    'Tanaka': 'tanaka.jpeg',
    'Prince': 'prnc.jpeg',
    'Heather': 'heather.jpeg',
    'Michael': 'mic.jpeg',
    'Tatenda': 'Tatenda.jpeg',
    'Lloyd': 'caretaker.jpeg',
  };

  const getAgentImage = (firstName) => {
    if (!firstName) return null;
    // Try exact match first
    if (agentImageMap[firstName]) return agentImageMap[firstName];
    // Try case-insensitive match
    const key = Object.keys(agentImageMap).find(
      k => k.toLowerCase() === firstName.toLowerCase()
    );
    return key ? agentImageMap[key] : null;
  };

  // Helper functions
  const getPrimaryAgent = (property) => {
    if (property.property_agents && property.property_agents.length > 0) {
      const primaryAgent = property.property_agents.find((agent) => agent.is_primary);
      return primaryAgent || property.property_agents[0];
    }
    return null;
  };

  const getWhatsAppLink = (property) => {
    const primaryAgent = getPrimaryAgent(property);
    const phoneNumber = primaryAgent?.agent?.cell_number || "263772329569";
    const agentName = primaryAgent?.agent?.first_name || "HSP Team";
    return `https://wa.me/${phoneNumber}?text=Hello%20${encodeURIComponent(
      agentName
    )},%20I%27m%20interested%20in%20your%20property%20"${encodeURIComponent(
      property.title
    )}"%20in%20${encodeURIComponent(property.location)}`;
  };

  const handleNavigateGallery = (direction) => {
    if (!property?.images) return;
    if (typeof direction === "number") {
      setCurrentImageIndex(direction);
    } else if (direction === "prev") {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Loading state
  if (isLoadingProperty || (!property && !propertyError)) {
    return <PropertyDetailSkeleton />;
  }

  // Error state
  if (propertyError || (!property && !isLoadingProperty)) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
            <Home className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Property Not Found</h2>
          <p className="text-white/60 mb-8">
            {propertyError?.message ||
              "The property you're looking for doesn't exist or has been removed."}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/sale")}
            className="px-8 py-4 bg-[#C9A962] text-[#0A1628] rounded-xl font-semibold hover:bg-[#B8985A] transition-colors"
          >
            Browse Properties
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Filter out stats that don't have values - cleaner UI for farm properties etc.
  const propertyStats = [
    { icon: Bed, label: "Bedrooms", value: property.beds },
    { icon: Bath, label: "Bathrooms", value: property.baths },
    { icon: Square, label: "Land Size", value: property.sqft },
    { icon: Car, label: "Garage", value: property.garage },
    { icon: Ruler, label: "Floor Size", value: property.floor_size },
    { icon: Building, label: "Year Built", value: property.year_built },
    { icon: MdOutlineBrunchDining, label: "Dining", value: property.dining_rooms },
    { icon: Home, label: "Lounges", value: property.lounges },
  ].filter(stat => stat.value !== null && stat.value !== undefined && stat.value !== '' && stat.value !== 0);

  // Helper to convert image URL to base64 for PDF generation
  const imageToBase64 = async (url) => {
    try {
      // Use a proxy approach - create an image and draw to canvas
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth || 400;
            canvas.height = img.naturalHeight || 300;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
          } catch (e) {
            resolve(null);
          }
        };
        img.onerror = () => resolve(null);
        // Add timestamp to bypass cache and try direct load
        img.src = url;
        // Timeout fallback
        setTimeout(() => resolve(null), 5000);
      });
    } catch (e) {
      return null;
    }
  };

  // Generate PDF brochure using html2canvas for better image support
  const generateBrochure = async () => {
    setIsGeneratingBrochure(true);

    try {
      // Preload images as base64 to avoid CORS issues
      const imagePromises = (property.images || []).slice(0, 5).map(async (img) => {
        const base64 = await imageToBase64(img.image);
        return base64 || img.image; // Fallback to original URL if conversion fails
      });
      const preloadedImages = await Promise.all(imagePromises);

      // Preload logo
      const logoBase64 = await imageToBase64('/logo.png') || '/logo.png';

      // Create a hidden container for the brochure
      const brochureContainer = document.createElement('div');
      brochureContainer.style.position = 'fixed';
      brochureContainer.style.left = '-9999px';
      brochureContainer.style.top = '0';
      brochureContainer.style.width = '210mm';
      brochureContainer.style.background = 'white';

      const primaryAgent = getPrimaryAgent(property);

      // Generate HTML content for the brochure
      brochureContainer.innerHTML = `
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .brochure-content {
            width: 210mm;
            background: white;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #1e293b;
          }
          .content-width {
            max-width: 180mm;
            margin: 0 auto;
            padding: 0 15mm;
          }
          .header {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            padding: 35px 0;
            position: relative;
          }
          .header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, #CBA65F 0%, #d4b676 50%, #CBA65F 100%);
          }
          .logo-section {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          .logo-container {
            background: white;
            padding: 18px 30px;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          }
          .logo {
            height: 65px;
            width: auto;
          }
          .company-tagline {
            color: #CBA65F;
            font-size: 15px;
            font-weight: 600;
            letter-spacing: 1px;
            text-align: right;
            text-transform: uppercase;
          }
          .property-title {
            font-size: 38px;
            color: white;
            margin-bottom: 15px;
            font-weight: 700;
            letter-spacing: -0.5px;
            line-height: 1.2;
          }
          .property-location {
            font-size: 17px;
            color: #e2e8f0;
            margin-bottom: 18px;
            display: flex;
            align-items: center;
          }
          .property-price-status {
            display: flex;
            align-items: center;
            gap: 20px;
            flex-wrap: wrap;
          }
          .property-price {
            font-size: 42px;
            color: #CBA65F;
            font-weight: 800;
            letter-spacing: -1px;
          }
          .status-badge {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 10px 24px;
            border-radius: 30px;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .content-wrapper {
            padding: 45px 0;
          }
          .property-images {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 45px;
            border-radius: 16px;
            overflow: hidden;
          }
          .property-images img {
            width: 100%;
            height: 240px;
            object-fit: cover;
          }
          .main-image {
            grid-column: 1 / -1;
            height: 360px !important;
          }
          .section {
            margin-bottom: 45px;
          }
          .section-title {
            font-size: 28px;
            color: #0f172a;
            margin-bottom: 25px;
            font-weight: 700;
            padding-bottom: 12px;
            border-bottom: 3px solid #CBA65F;
          }
          .details-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
            margin-bottom: 25px;
          }
          .detail-item {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            padding: 24px 18px;
            border-radius: 12px;
            text-align: center;
            border: 2px solid #e2e8f0;
            position: relative;
          }
          .detail-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(90deg, #CBA65F 0%, #d4b676 100%);
          }
          .detail-item .label {
            font-size: 11px;
            color: #64748b;
            text-transform: uppercase;
            font-weight: 700;
            margin-bottom: 10px;
            letter-spacing: 0.8px;
          }
          .detail-item .value {
            font-size: 26px;
            color: #0f172a;
            font-weight: 800;
          }
          .description {
            font-size: 15px;
            line-height: 1.9;
            color: #475569;
            margin-bottom: 20px;
            text-align: justify;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 28px;
            border-radius: 12px;
            border-left: 5px solid #CBA65F;
          }
          .features-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
            margin-bottom: 30px;
          }
          .feature-item {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            padding: 14px 20px;
            border-radius: 10px;
            border-left: 5px solid #22c55e;
            font-size: 14px;
            color: #166534;
            font-weight: 600;
            display: flex;
            align-items: center;
          }
          .feature-check {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            background: #22c55e;
            color: white;
            border-radius: 50%;
            margin-right: 14px;
            font-weight: bold;
            font-size: 13px;
          }
          .agent-info {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            padding: 32px;
            border-radius: 16px;
            margin-bottom: 30px;
            color: white;
            position: relative;
          }
          .agent-info::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(90deg, #CBA65F 0%, #d4b676 100%);
          }
          .agent-info h3 {
            color: #CBA65F;
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: 700;
          }
          .agent-details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .agent-detail {
            display: flex;
            align-items: center;
            font-size: 14px;
            background: rgba(255, 255, 255, 0.05);
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid rgba(203, 166, 95, 0.2);
          }
          .agent-detail strong {
            color: #CBA65F;
            margin-right: 10px;
            min-width: 70px;
            font-weight: 600;
          }
          .footer {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            padding: 35px 0;
            color: white;
            position: relative;
          }
          .footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, #CBA65F 0%, #d4b676 50%, #CBA65F 100%);
          }
          .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          .footer-left .company-name {
            color: #CBA65F;
            font-weight: 700;
            font-size: 20px;
            margin-bottom: 10px;
          }
          .footer-left p {
            margin-bottom: 6px;
            font-size: 13px;
            color: #cbd5e1;
          }
          .footer-right {
            text-align: right;
          }
          .footer-contact {
            font-size: 13px;
            margin-bottom: 8px;
            color: #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
          .footer-contact strong {
            color: #CBA65F;
            margin-right: 8px;
            font-weight: 600;
          }
        </style>

        <div class="brochure-content">
          <div class="header">
            <div class="content-width">
              <div class="logo-section">
                <div class="logo-container">
                  <img src="${logoBase64}" alt="House of Stone Properties" class="logo"/>
                </div>
                <div class="company-tagline">Your Property, Our Priority</div>
              </div>

              <div class="property-title-section">
                <h1 class="property-title">${property.title || 'Property'}</h1>
                <div class="property-location">📍 ${property.location || 'Location'}</div>
                <div class="property-price-status">
                  <div class="property-price">$${parseFloat(property.price || 0).toLocaleString()}</div>
                  <div class="status-badge">${property.status || 'Available'}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="content-wrapper">
            <div class="content-width">
              <div class="property-images">
                ${preloadedImages.map((imgSrc, index) => `
                  <img src="${imgSrc}" alt="Property Image ${index + 1}" class="${index === 0 ? 'main-image' : ''}" style="${!imgSrc || imgSrc === 'null' ? 'display:none' : ''}"/>
                `).join('')}
              </div>

              <div class="section">
                <h2 class="section-title">Property Details</h2>
                <div class="details-grid">
                  ${propertyStats.slice(0, 6).map(stat => `
                    <div class="detail-item">
                      <div class="label">${stat.label}</div>
                      <div class="value">${stat.value}</div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="section">
                <h2 class="section-title">About This Property</h2>
                <div class="description">
                  ${(property.description || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()}
                </div>
              </div>

              ${property.features && property.features.length > 0 ? `
                <div class="section">
                  <h2 class="section-title">Key Features</h2>
                  <div class="features-grid">
                    ${property.features.map(feature => `
                      <div class="feature-item">
                        <span class="feature-check">✓</span>
                        ${feature.feature || feature.name || feature}
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <div class="agent-info">
                <h3>Contact Our Agent</h3>
                <div class="agent-details">
                  <div class="agent-detail"><strong>Name:</strong> ${primaryAgent?.agent?.first_name || 'Lionita'}</div>
                  <div class="agent-detail"><strong>Email:</strong> ${primaryAgent?.agent?.email || 'info@hsp.co.zw'}</div>
                  <div class="agent-detail"><strong>Phone:</strong> ${primaryAgent?.agent?.cell_number || '+263 772 329 569'}</div>
                  <div class="agent-detail"><strong>Office:</strong> +263 867 717 3442</div>
                </div>
              </div>
            </div>
          </div>

          <div class="footer">
            <div class="content-width">
              <div class="footer-content">
                <div class="footer-left">
                  <div class="company-name">House of Stone Properties</div>
                  <p>Your Property, Our Priority</p>
                  <p style="font-size: 11px; color: #94a3b8; margin-top: 12px;">Generated on ${new Date().toLocaleDateString()}</p>
                </div>
                <div class="footer-right">
                  <div class="footer-contact"><strong>Email:</strong> info@hsp.co.zw</div>
                  <div class="footer-contact"><strong>Phone:</strong> +263 867 717 3442</div>
                  <div class="footer-contact"><strong>Website:</strong> www.hsp.co.zw</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Append to body temporarily
      document.body.appendChild(brochureContainer);

      // Wait for fonts and images to load
      await document.fonts.ready;
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate PDF using html2canvas and jsPDF
      const canvas = await html2canvas(brochureContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 794,
      });

      // Remove temporary container
      document.body.removeChild(brochureContainer);

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = 297;
      let heightLeft = imgHeight;
      let position = 0;

      // Add image to PDF (split into pages if needed)
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }

      // Download the PDF
      const filename = `${(property.title || 'property').replace(/[^a-z0-9]/gi, '_')}_Brochure.pdf`;
      pdf.save(filename);

    } catch (error) {
      console.error('Error generating brochure:', error);
      alert('Error generating brochure. Please try again.');
    } finally {
      setIsGeneratingBrochure(false);
    }
  };

  // Compute OG image URL for social sharing
  const getOgImageUrl = () => {
    const imgUrl = property.images?.[0]?.image;
    if (!imgUrl) return 'https://hsp.co.zw/logo.png';
    if (imgUrl.startsWith('http')) return imgUrl;
    return `https://api.hsp.co.zw${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}`;
  };
  const ogImageUrl = getOgImageUrl();

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Helmet>
        <title>{property.title} | House of Stone Properties</title>
        <meta
          name="description"
          content={property.description?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().substring(0, 160)}
        />
        {/* Open Graph meta tags for social sharing */}
        <meta property="og:title" content={`${property.title} | House of Stone Properties`} />
        <meta property="og:description" content={property.description?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().substring(0, 160) || `Beautiful ${property.property_type} in ${property.location}`} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={property.title} />
        <meta property="og:url" content={`https://hsp.co.zw/properties/${property.id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="House of Stone Properties" />
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${property.title} | House of Stone Properties`} />
        <meta name="twitter:description" content={property.description?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().substring(0, 160) || `Beautiful ${property.property_type} in ${property.location}`} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:image:alt" content={property.title} />
      </Helmet>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[currentImageIndex]?.image}
              alt={property.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/hsp-fallback1.png";
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1F2E44] to-[#0A1628]" />
          )}
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/80 to-transparent" />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="absolute top-24 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </motion.button>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-24 right-6 z-10 flex items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => property && dispatch(toggleSaveProperty(property))}
            className={`p-3 rounded-full backdrop-blur-sm transition-colors ${
              isFavorited
                ? "bg-red-500 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Heart className={`w-6 h-6 ${isFavorited ? "fill-current" : ""}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsShareModalOpen(true)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          >
            <Share2 className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* Image Gallery Controls */}
        {property.images && property.images.length > 1 && (
          <>
            <button
              onClick={() => handleNavigateGallery("prev")}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleNavigateGallery("next")}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Open Gallery Button */}
        {property.images && property.images.length > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsGalleryOpen(true);
            }}
            className="absolute bottom-48 sm:bottom-32 right-4 sm:right-6 z-30 flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-black/70 backdrop-blur-md rounded-xl text-white hover:bg-black/90 transition-colors border border-white/30 cursor-pointer"
          >
            <Grid3X3 className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">View All Photos</span>
            <span className="px-2 py-0.5 bg-white/30 rounded-full text-xs sm:text-sm font-medium">
              {property.images.length}
            </span>
          </motion.button>
        )}

        {/* Property Info Overlay */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-0 left-0 right-0 p-6 pb-12 sm:p-12"
        >
          <div className="max-w-7xl mx-auto">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962] rounded-full mb-4"
            >
              <Sparkles className="w-4 h-4 text-[#0A1628]" />
              <span className="text-[#0A1628] font-semibold uppercase text-sm">
                {property.status}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {property.title}
            </motion.h1>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center text-white/80 text-lg mb-6"
            >
              <MapPin className="w-5 h-5 mr-2 text-[#C9A962]" />
              {property.location}
            </motion.div>

            {/* Price */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl font-semibold tabular-nums text-[#C9A962] tracking-wide pb-4"
            >
              ${parseFloat(property.price).toLocaleString()}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Grid - Only show if there are stats */}
          {propertyStats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {propertyStats.slice(0, 4).map((stat, index) => (
                <StatCard key={stat.label} {...stat} delay={index * 0.1} />
              ))}
            </div>
          )}
        </div>

        {/* Full-width Location Map */}
        {property.latitude && property.longitude && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="relative">
              {/* Map Header Overlay */}
              <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-[#0A1628] to-transparent h-24 pointer-events-none" />

              {/* Map */}
              <div className="h-[50vh] min-h-[400px]">
                <PropertyMap
                  position={[parseFloat(property.latitude), parseFloat(property.longitude)]}
                  title={property.title}
                  address={property.location}
                  zoom={12}
                />
              </div>

              {/* Map Footer Overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#0A1628] to-transparent h-24 pointer-events-none" />
            </div>
          </motion.div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A962]/10 flex items-center justify-center">
                    <Home className="w-5 h-5 text-[#C9A962]" />
                  </div>
                  About This Property
                </h2>
                <div
                  className="prose prose-invert max-w-none text-white/80 leading-relaxed text-xl sm:text-2xl font-description
                    [&>div]:mb-4 [&>p]:mb-4 [&>b]:text-white [&>div>b]:text-white
                    [&>div>span]:bg-transparent [&_span]:!bg-transparent
                    first-letter:text-5xl first-letter:font-bold first-letter:text-[#C9A962] first-letter:mr-1 first-letter:float-left first-letter:leading-none"
                  dangerouslySetInnerHTML={{ __html: property.description }}
                />
              </motion.div>

              {/* All Stats - Only show if there are stats */}
              {propertyStats.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#C9A962]/10 flex items-center justify-center">
                      <Building className="w-5 h-5 text-[#C9A962]" />
                    </div>
                    Property Details
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {propertyStats.map((stat, index) => (
                      <div
                        key={stat.label}
                        className="p-4 bg-white/5 rounded-xl border border-white/5"
                      >
                        <div className="flex items-center gap-2 text-white/50 text-sm mb-2">
                          <stat.icon className="w-4 h-4 text-[#C9A962]" />
                          {stat.label}
                        </div>
                        <p className="text-white text-xl font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <MdStarPurple500 className="w-5 h-5 text-emerald-500" />
                    </div>
                    Key Features
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} index={index} />
                    ))}
                  </div>
                </motion.div>
              )}

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Card */}
              {getPrimaryAgent(property) && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 sticky top-24"
                >
                  <h3 className="text-lg font-bold text-white mb-4">Primary Agent</h3>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#C9A962]/10 flex items-center justify-center">
                      {getAgentImage(getPrimaryAgent(property).agent.first_name) ? (
                        <img
                          src={getAgentImage(getPrimaryAgent(property).agent.first_name)}
                          alt={getPrimaryAgent(property).agent.first_name}
                          className="w-full h-full object-cover object-top "
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full items-center justify-center ${getAgentImage(getPrimaryAgent(property).agent.first_name) ? 'hidden' : 'flex'}`}>
                        <FaRegCircleUser className="w-8 h-8 text-[#C9A962]" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {getPrimaryAgent(property).agent.first_name}
                      </p>
                      <p className="text-white/50 text-sm">Property Consultant</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    {getPrimaryAgent(property).agent.email && (
                      <div className="flex items-center gap-3 text-white/70">
                        <Mail className="w-5 h-5 text-[#C9A962]" />
                        <span className="text-sm truncate">
                          {getPrimaryAgent(property).agent.email}
                        </span>
                      </div>
                    )}
                    {getPrimaryAgent(property).agent.cell_number && (
                      <div className="flex items-center gap-3 text-white/70">
                        <Phone className="w-5 h-5 text-[#C9A962]" />
                        <span className="text-sm">
                          {getPrimaryAgent(property).agent.cell_number}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsInquiryModalOpen(true)}
                      className="w-full py-4 bg-[#C9A962] text-[#0A1628] rounded-xl font-semibold hover:bg-[#B8985A] transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      Inquire Now
                    </motion.button>

                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={getWhatsAppLink(property)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      WhatsApp
                    </motion.a>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate("/contact")}
                      className="w-full py-4 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 border border-white/10"
                    >
                      <Calendar className="w-5 h-5" />
                      Schedule Tour
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Download Brochure */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm rounded-3xl p-6 border border-purple-500/20"
              >
                <h3 className="text-lg font-bold text-white mb-2">Property Brochure</h3>
                <p className="text-white/50 text-sm mb-4">
                  Download a PDF with all property details
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generateBrochure}
                  disabled={isGeneratingBrochure}
                  className="w-full py-4 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingBrochure ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download Brochure
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#C9A962]/10 flex items-center justify-center">
                  <Building className="w-6 h-6 text-[#C9A962]" />
                </div>
                Similar Properties
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProperties.map((prop, index) => (
                  <SimilarPropertyCard key={prop.id} property={prop} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Floating Action Bar */}
      <FloatingActionBar
        property={property}
        onShare={() => setIsShareModalOpen(true)}
        onFavorite={() => property && dispatch(toggleSaveProperty(property))}
        isFavorited={isFavorited}
        onInquiry={() => setIsInquiryModalOpen(true)}
      />

      {/* Image Gallery Modal */}
      <AnimatePresence mode="wait">
        {isGalleryOpen && property.images && property.images.length > 0 && (
          <ImageGalleryModal
            key="gallery-modal"
            images={property.images}
            currentIndex={currentImageIndex}
            onClose={() => setIsGalleryOpen(false)}
            onNavigate={handleNavigateGallery}
          />
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <PropertyShareModal
        property={property}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Inquiry Modal */}
      <InquiryForm
        property={property}
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />

      {/* Bottom Spacing */}
      <div className="h-32" />
    </div>
  );
};

export default PropertyDetail;
