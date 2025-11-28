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
  Download,
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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { propertyAPI } from './../../utils/api';
import { fetchProperty } from './../../redux/slices/propertySlice';

// Add this component at the top of your file, before PropertyDetail component
const PropertyDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-stone-50 pt-16">
      {/* Image Gallery Skeleton */}
      <div className="relative">
        <div className="h-64 sm:h-80 md:h-96 bg-stone-200 animate-pulse relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          
          {/* Navigation buttons skeleton */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-stone-300 rounded-full animate-pulse" />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-stone-300 rounded-full animate-pulse" />
          
          {/* Image counter skeleton */}
          <div className="absolute bottom-4 right-4 bg-stone-300 rounded-full px-4 py-2 w-20 h-8 animate-pulse" />
          
          {/* Action buttons skeleton */}
          <div className="absolute top-4 right-4 flex space-x-2 pt-10">
            <div className="w-10 h-10 bg-stone-300 rounded-full animate-pulse" />
            <div className="w-10 h-10 bg-stone-300 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Property Header Skeleton */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-4">
            {/* Title skeleton */}
            <div className="h-8 bg-stone-200 rounded-lg w-3/4 animate-pulse" />
            
            {/* Location skeleton */}
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-stone-200 rounded animate-pulse" />
              <div className="h-5 bg-stone-200 rounded w-1/2 animate-pulse" />
            </div>

            {/* Stats skeleton */}
            <div className="flex items-center space-x-4">
              <div className="h-4 bg-stone-200 rounded w-24 animate-pulse" />
              <div className="h-4 bg-stone-200 rounded w-24 animate-pulse" />
              <div className="h-4 bg-stone-200 rounded w-24 animate-pulse" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4">
              {/* Price skeleton */}
              <div>
                <div className="h-10 bg-stone-200 rounded-lg w-40 mb-2 animate-pulse" />
                <div className="h-4 bg-stone-200 rounded w-24 animate-pulse" />
              </div>

              {/* Quick stats skeleton */}
              <div className="grid grid-cols-3 gap-4 mt-4 sm:mt-0">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-stone-200 rounded animate-pulse" />
                  <div className="h-4 bg-stone-200 rounded w-8 animate-pulse" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-stone-200 rounded animate-pulse" />
                  <div className="h-4 bg-stone-200 rounded w-8 animate-pulse" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-stone-200 rounded animate-pulse" />
                  <div className="h-4 bg-stone-200 rounded w-12 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-12 lg:space-y-0">
          {/* Sidebar Skeleton (Mobile first, desktop right) */}
          <div className="lg:order-2 lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              {/* Agent Info Skeleton */}
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-stone-200 rounded-full animate-pulse mr-3" />
                  <div className="h-6 bg-stone-200 rounded w-32 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-5 bg-stone-200 rounded w-40 animate-pulse" />
                  <div className="h-4 bg-stone-200 rounded w-48 animate-pulse" />
                  <div className="h-4 bg-stone-200 rounded w-44 animate-pulse" />
                </div>
              </div>

              {/* Property Stats Grid Skeleton */}
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="p-3 bg-stone-50 rounded-lg border">
                    <div className="h-4 bg-stone-200 rounded w-20 mb-2 animate-pulse" />
                    <div className="h-6 bg-stone-200 rounded w-16 animate-pulse" />
                  </div>
                ))}
              </div>

              {/* Buttons Skeleton */}
              <div className="space-y-3">
                <div className="h-12 bg-stone-200 rounded-lg animate-pulse" />
                <div className="h-12 bg-stone-200 rounded-lg animate-pulse" />
                <div className="h-12 bg-stone-200 rounded-lg animate-pulse" />
                <div className="h-12 bg-stone-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:order-1 lg:col-span-2 space-y-8">
            {/* Description Section Skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-stone-200 rounded mr-3 animate-pulse" />
                <div className="h-7 bg-stone-200 rounded w-48 animate-pulse" />
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-stone-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-stone-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-stone-200 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-stone-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-stone-200 rounded w-4/5 animate-pulse" />
              </div>
            </div>

            {/* Features Section Skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <div className="w-6 h-6 bg-stone-200 rounded mr-3 animate-pulse" />
                <div className="h-7 bg-stone-200 rounded w-40 animate-pulse" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center p-3 bg-stone-50 rounded-lg">
                    <div className="w-2 h-2 bg-stone-200 rounded-full mr-3 animate-pulse" />
                    <div className="h-4 bg-stone-200 rounded w-32 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Map Section Skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <div className="w-6 h-6 bg-stone-200 rounded mr-3 animate-pulse" />
                <div className="h-7 bg-stone-200 rounded w-56 animate-pulse" />
              </div>
              <div className="h-64 sm:h-80 md:h-96 bg-stone-200 rounded-xl animate-pulse" />
            </div>

            {/* Similar Properties Skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <div className="w-6 h-6 bg-stone-200 rounded mr-3 animate-pulse" />
                <div className="h-7 bg-stone-200 rounded w-48 animate-pulse" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-stone-50 rounded-lg overflow-hidden shadow-md">
                    <div className="h-48 bg-stone-200 animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-5 bg-stone-200 rounded w-3/4 animate-pulse" />
                      <div className="h-4 bg-stone-200 rounded w-1/2 animate-pulse" />
                      <div className="h-6 bg-stone-200 rounded w-24 animate-pulse" />
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-3">
                          <div className="h-4 bg-stone-200 rounded w-12 animate-pulse" />
                          <div className="h-4 bg-stone-200 rounded w-12 animate-pulse" />
                        </div>
                        <div className="w-4 h-4 bg-stone-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertyDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [viewCount, setViewCount] = useState(
    Math.floor(Math.random() * 500) + 100
  );
  const [isGeneratingBrochure, setIsGeneratingBrochure] = useState(false);

  const {
    items: properties,
    selectedProperty,
    status,
    error,
    itemLoading,
    itemErrors,
  } = useSelector((state) => state.properties);

  // Use selectedProperty from Redux if available, otherwise find in items
  const property = selectedProperty?.id === parseInt(id) 
    ? selectedProperty 
    : properties.find((p) => p.id === parseInt(id));

  // Check if this specific property is loading
  const isLoadingProperty = itemLoading[id] || false;
  const propertyError = itemErrors[id] || null;

  // Fetch property if not available - SIMPLIFIED DEPENDENCIES
  useEffect(() => {
    console.log("PropertyDetail useEffect:", { id, hasProperty: !!property, isLoadingProperty });
    
    if (!property && id && !isLoadingProperty) {
      console.log("Dispatching fetchProperty for id:", id);
      dispatch(fetchProperty(id));
    }
  }, [id, dispatch]);

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
      setViewCount((prev) => prev + 1);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // UPDATE THE LOADING STATE CHECK
  if (isLoadingProperty || (!property && !propertyError)) {
    return <PropertyDetailSkeleton />;
  }

  // ADD ERROR STATE HANDLING
  if (propertyError || (!property && !isLoadingProperty)) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-red-50 to-stone-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md"
        >
          <div className="text-red-500 text-xl mb-4">
            ⚠️ Property Not Found
          </div>
          <div className="text-stone-600 mb-4">
            {propertyError?.message || "The property you're looking for doesn't exist or has been removed."}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/properties")}
            className="px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            View All Properties
          </motion.button>
        </motion.div>
      </div>
    );
  }

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
    const phoneNumber = primaryAgent?.agent?.cell_number || "263772329569";
    const agentName = primaryAgent?.agent?.first_name || "HSP Team";

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

  const generatePDFBrochure = async () => {
  setIsGeneratingBrochure(true);

  try {
    // Create a hidden container for the brochure
    const brochureContainer = document.createElement('div');
    brochureContainer.style.position = 'fixed';
    brochureContainer.style.left = '-9999px';
    brochureContainer.style.top = '0';
    brochureContainer.style.width = '210mm'; // A4 width
    brochureContainer.style.background = 'white';
    
    // Generate HTML content for the brochure
    brochureContainer.innerHTML = `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #1e293b;
          background: white;
        }
        
        .brochure-content {
          width: 210mm;
          background: white;
        }
        
        .content-width {
          max-width: 180mm;
          margin: 0 auto;
          padding: 0 15mm;
        }
        
        /* Header */
        .header {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          padding: 35px 0;
          position: relative;
          overflow: hidden;
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
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
        }
        
        .property-title-section {
          position: relative;
          z-index: 1;
        }
        
        .property-title {
          font-family: 'Playfair Display', Georgia, serif;
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
          font-weight: 400;
        }
        
        .location-icon {
          width: 20px;
          height: 20px;
          margin-right: 10px;
          color: #CBA65F;
        }
        
        .property-price-status {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        .property-price {
          font-family: 'Inter', sans-serif;
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
        
        /* Main Content */
        .content-wrapper {
          padding: 45px 0;
        }
        
        /* Property Images Grid */
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


        
        /* Sections */
        .section {
          margin-bottom: 45px;
          page-break-inside: avoid;
        }
        
        .section-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 28px;
          color: #0f172a;
          margin-bottom: 25px;
          font-weight: 700;
          padding-bottom: 12px;
          border-bottom: 3px solid #CBA65F;
          position: relative;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 80px;
          height: 3px;
          background: #0f172a;
        }
        
        /* Property Details Grid */
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
          font-family: 'Inter', sans-serif;
        }
        
        .detail-item .value {
          font-family: 'Inter', sans-serif;
          font-size: 26px;
          color: #0f172a;
          font-weight: 800;
        }
        
        /* Description */
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
          font-weight: 400;
        }
        
        /* Features Grid */
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
        
        .feature-item::before {
          content: '✓';
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
        
        /* Agent Info */
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
          font-family: 'Playfair Display', Georgia, serif;
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
        
        /* Footer */
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
          font-family: 'Playfair Display', Georgia, serif;
          color: #CBA65F;
          font-weight: 700;
          font-size: 20px;
          margin-bottom: 10px;
        }
        
        .footer-left p {
          margin-bottom: 6px;
          font-size: 13px;
          color: #cbd5e1;
          font-weight: 400;
        }
        
        .footer-left .tagline {
          font-size: 12px;
          color: #94a3b8;
          font-style: italic;
          margin-top: 12px;
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
          min-width: 70px;
          text-align: right;
        }
        
        .generated-date {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 15px;
          font-style: italic;
        }
      </style>
      
      <div class="brochure-content">
        <!-- Header -->
        <div class="header">
          <div class="content-width">
            <div class="logo-section">
              <div class="logo-container">
                <img src="/logo.png" alt="House of Stone Properties" class="logo" crossorigin="anonymous"/>
              </div>
              <div class="company-tagline">
                Your Property, Our Priority
              </div>
            </div>
            
            <div class="property-title-section">
              <h1 class="property-title">${property.title}</h1>
              <div class="property-location">
                📍 ${property.location}
              </div>
              <div class="property-price-status">
                <div class="property-price">$${parseFloat(property.price).toLocaleString()}</div>
                <div class="status-badge">${property.status}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="content-wrapper">
          <div class="content-width">
            <!-- Property Images -->
            <div class="property-images">
              ${property.images
                .slice(0, 5)
                .map(
                  (img, index) => `
                <img src="${img.image}" 
                     alt="${img.caption || `Property Image ${index + 1}`}" 
                     class="${index === 0 ? "main-image" : ""}"
                     crossorigin="anonymous"/>
              `
                )
                .join("")}
            </div>
            
            <!-- Property Details -->
            <div class="section">
              <h2 class="section-title">Property Details</h2>
              <div class="details-grid">
                <div class="detail-item">
                  <div class="label">Bedrooms</div>
                  <div class="value">${property.beds || "N/A"}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Bathrooms</div>
                  <div class="value">${property.baths || "N/A"}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Garage</div>
                  <div class="value">${property.garage || "N/A"}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Land Size</div>
                  <div class="value">${property.sqft || "N/A"}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Floor Size</div>
                  <div class="value">${property.floor_size || "N/A"}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Year Built</div>
                  <div class="value">${property.year_built || "N/A"}</div>
                </div>
              </div>
            </div>
            
            <!-- Description -->
            <div class="section">
              <h2 class="section-title">About This Property</h2>
              <div class="description">
                ${property.description}
              </div>
            </div>
            
            <!-- Features -->
            ${
              property.features && property.features.length > 0
                ? `
            <div class="section">
              <h2 class="section-title">Key Features</h2>
              <div class="features-grid">
                ${property.features
                  .map(
                    (feature) => `
                  <div class="feature-item">${feature.feature}</div>
                `
                  )
                  .join("")}
              </div>
            </div>
            `
                : ""
            }
            
            <!-- Agent Info -->
            ${
              getPrimaryAgent(property)
                ? `
            <div class="agent-info">
              <h3>Contact Our Primary Agent</h3>
              <div class="agent-details">
                <div class="agent-detail">
                  <strong>Name:</strong> ${getPrimaryAgent(property).agent.first_name}
                </div>
                <div class="agent-detail">
                  <strong>Email:</strong> ${getPrimaryAgent(property).agent.email}
                </div>
                <div class="agent-detail">
                  <strong>Phone:</strong> ${getPrimaryAgent(property).agent.cell_number}
                </div>
                <div class="agent-detail">
                  <strong>Office:</strong> +263 867 717 3442
                </div>
              </div>
            </div>
            `
                : ""
            }
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div class="content-width">
            <div class="footer-content">
              <div class="footer-left">
                <div class="company-name">House of Stone Properties</div>
                <p class="tagline">Your Property, Our Priority</p>
                <p class="generated-date">Property Brochure - Generated on ${new Date().toLocaleDateString()}</p>
              </div>
              <div class="footer-right">
                <div class="footer-contact">
                  <strong>Email:</strong> info@hsp.co.zw
                </div>
                <div class="footer-contact">
                  <strong>Phone:</strong> +263 867 717 3442
                </div>
                <div class="footer-contact">
                  <strong>Alt:</strong> +263 712 525 654
                </div>
                <div class="footer-contact">
                  <strong>Website:</strong> www.hsp.co.zw
                </div>
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate PDF using html2canvas and jsPDF
    const canvas = await html2canvas(brochureContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794, // A4 width in pixels at 96 DPI
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
    
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = 297; // A4 height in mm
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
    const filename = `${property.title.replace(/[^a-z0-9]/gi, '_')}_Brochure.pdf`;
    pdf.save(filename);
    
    setIsGeneratingBrochure(false);
    
  } catch (error) {
    console.error("Error generating brochure:", error);
    alert("Error generating brochure. Please try again.");
    setIsGeneratingBrochure(false);
  }
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

  const isHtmlContent = (content) => {
    if (!content) return false;
    // Check for common HTML tags that would be generated by the rich text editor
    const htmlTags = /<(p|div|ul|li|ol|h[1-6]|strong|b|em|i|u|br)(\s[^>]*)?>/i;
    return htmlTags.test(content);
  };

  // Clean HTML content function (same as before)
  const cleanHtmlContent = (html) => {
    if (!html) return "";

    return html
      .replace(/<p><br><\/p>/g, "")
      .replace(/<p><\/p>/g, "")
      .replace(/<div><br><\/div>/g, "")
      .replace(/<div><\/div>/g, "")
      .replace(/<br><\/br>/g, "<br>")
      .replace(/<li><br><\/li>/g, "")
      .replace(/<li><\/li>/g, "")
      .replace(/<p><ul>/g, "<ul>")
      .replace(/<\/ul><\/p>/g, "</ul>")
      .trim();
  };
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

  const handleScheduleTour = () => {
    navigate("/contact");
  };

  const handleCloseScheduleTourModal = () => {
    setShowScheduleTourModal(false);
  };

  const propertyStats = [
    { icon: Bed, label: "Bedrooms", value: property.beds || "N/A" },
    { icon: Bath, label: "Bathrooms", value: property.baths || "N/A" },
    { icon: Square, label: "Land Size", value: property.sqft || "N/A" },
    { icon: Car, label: "Garage", value: property.garage || "N/A" },
    { icon: Home, label: "Floor Size", value: property.floor_size || "N/A" },
    {
      icon: Building,
      label: "Year Built",
      value: property.year_built || "N/A",
    },
    {
      icon: Users,
      label: "Dining Rooms",
      value: property.dining_rooms || "N/A",
    },
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
                onError={(e) => {
                  e.target.src = "/hsp-fallback1.png";
                }}
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
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
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
          <div className="absolute top-4 right-4 flex space-x-2 pt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFavorited(!isFavorited)}
              className={`p-2 rounded-full transition-colors ${
                isFavorited
                  ? "bg-red-500 text-white"
                  : "bg-black/50 text-white hover:bg-black/70"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`}
              />
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
                  <span className="text-sm sm:text-base">
                    {property.location}
                  </span>
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
                      {getPrimaryAgent(property).agent.first_name}
                    </p>
                    {getPrimaryAgent(property).agent.email && (
                      <div className="flex items-center text-stone-600 text-sm">
                        <Mail className="w-4 h-4 mr-2" />
                        {getPrimaryAgent(property).agent.email}
                      </div>
                    )}
                    {getPrimaryAgent(property).agent.cell_number && (
                      <div className="flex items-center text-stone-600 text-sm">
                        <Phone className="w-4 h-4 mr-2" />
                        {getPrimaryAgent(property).agent.cell_number}
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

              {/* Download Brochure Button */}
              <div className="mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generatePDFBrochure}
                  disabled={isGeneratingBrochure}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all flex items-center justify-center font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingBrochure ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Download Brochure
                    </>
                  )}
                </motion.button>
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
                  onClick={handleScheduleTour}
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
                {isHtmlContent(property.description) ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: cleanHtmlContent(property.description),
                    }}
                    className="rich-text-content"
                  />
                ) : (
                  <div className="preserve-formatting">
                    {property.description}
                  </div>
                )}
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
                            onError={(e) => {
                              e.target.src = "/hsp-fallback2.png";
                            }}
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
              onError={(e) => {
                e.target.src = "/hsp-fallback2.png";
              }}
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
