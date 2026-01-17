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

// Floating Action Bar
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
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-[#0A1628]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/30 px-6 py-4 flex items-center gap-6">
            {/* Price */}
            <div className="hidden sm:block">
              <p className="text-[#C9A962] text-2xl font-bold">
                ${parseFloat(property.price).toLocaleString()}
              </p>
              <p className="text-white/50 text-xs uppercase">{property.status}</p>
            </div>

            <div className="h-12 w-px bg-white/10 hidden sm:block" />

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
                <span className="hidden sm:inline">Inquire</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
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
            <p className="text-[#C9A962] text-xl font-bold">
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
  const [isFavorited, setIsFavorited] = useState(false);
  const [isGeneratingBrochure, setIsGeneratingBrochure] = useState(false);

  const isSharedRoute = !!token;

  // Redux state
  const {
    items: properties,
    selectedProperty,
    itemLoading,
    itemErrors,
  } = useSelector((state) => state.properties);

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

  const propertyStats = [
    { icon: Bed, label: "Bedrooms", value: property.beds },
    { icon: Bath, label: "Bathrooms", value: property.baths },
    { icon: Square, label: "Land Size", value: property.sqft },
    { icon: Car, label: "Garage", value: property.garage },
    { icon: Ruler, label: "Floor Size", value: property.floor_size },
    { icon: Building, label: "Year Built", value: property.year_built },
    { icon: MdOutlineBrunchDining, label: "Dining", value: property.dining_rooms },
    { icon: Home, label: "Lounges", value: property.lounges },
  ];

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Helmet>
        <title>{property.title} | House of Stone Properties</title>
        <meta
          name="description"
          content={property.description?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().substring(0, 160)}
        />
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
            onClick={() => setIsFavorited(!isFavorited)}
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
          className="absolute bottom-0 left-0 right-0 p-6 sm:p-12"
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
              className="text-4xl sm:text-5xl font-bold text-[#C9A962]"
            >
              ${parseFloat(property.price).toLocaleString()}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {propertyStats.slice(0, 4).map((stat, index) => (
              <StatCard key={stat.label} {...stat} delay={index * 0.1} />
            ))}
          </div>
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
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-6 py-3 bg-[#0A1628]/90 backdrop-blur-md rounded-full border border-[#C9A962]/30">
                <div className="w-8 h-8 rounded-lg bg-[#C9A962]/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#C9A962]" />
                </div>
                <span className="text-white font-medium">{property.location}</span>
              </div>

              {/* Map */}
              <div className="h-[50vh] min-h-[400px]">
                <PropertyMap
                  position={[parseFloat(property.latitude), parseFloat(property.longitude)]}
                  title={property.title}
                  address={property.location}
                  zoom={14}
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
                  className="prose prose-invert max-w-none text-white/70 leading-relaxed text-lg
                    [&>div]:mb-2 [&>p]:mb-2 [&>b]:text-white [&>div>b]:text-white
                    [&>div>span]:bg-transparent [&_span]:!bg-transparent"
                  dangerouslySetInnerHTML={{ __html: property.description }}
                />
              </motion.div>

              {/* All Stats */}
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
                      <p className="text-white text-xl font-bold">{stat.value || "N/A"}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

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
                    <div className="w-16 h-16 rounded-2xl bg-[#C9A962]/10 flex items-center justify-center">
                      <FaRegCircleUser className="w-8 h-8 text-[#C9A962]" />
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
        onFavorite={() => setIsFavorited(!isFavorited)}
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
