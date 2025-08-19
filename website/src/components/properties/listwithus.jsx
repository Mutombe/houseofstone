import React, { useState, useRef, useEffect } from "react";
import {
  PlusCircle,
  Calculator,
  FileText,
  Upload,
  MapPin,
  Home,
  Building2,
  TrendingUp,
  Briefcase,
  Camera,
  CheckCircle,
  X,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Square,
  Bed,
  Bath,
  Car,
  Wifi,
  Shield,
  Sparkles,
  ArrowRight,
  Download,
  Award,
  Clock,
  Users,
  BookOpen,
  Target,
  Eye,
  Heart,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Brand colors
const COLORS = {
  primary: "#1e293b",
  secondary: "#DCC471",
  accent: "#b07e28",
  light: "#ffffff",
  dark: "#0f172a",
};

// Reusable components
const GlowButton = ({ children, onClick, variant = "primary", className = "", disabled = false, ...props }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    className={`
      relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform
      ${variant === "primary"
        ? "bg-[#DCC471] text-slate-900 shadow-lg hover:shadow-yellow-500/25"
        : variant === "secondary"
        ? "bg-slate-800 text-white border-2 border-[#DCC471] hover:bg-yellow-400 hover:text-slate-900"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }
      ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"}
      overflow-hidden ${className}
    `}
    whileHover={disabled ? {} : { scale: 1.05 }}
    whileTap={disabled ? {} : { scale: 0.95 }}
    {...props}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      initial={{ x: "-100%" }}
      whileHover={disabled ? {} : { x: "100%" }}
      transition={{ duration: 0.6 }}
    />
    <span className="relative z-10 flex items-center justify-center">
      {children}
    </span>
  </motion.button>
);

const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
  >
    {children}
  </motion.div>
);

// 1. List Property Page
const ListPropertyPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    propertyType: "house",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    amenities: [],
    images: [],
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const amenitiesList = [
    "Swimming Pool", "Garage", "Garden", "Security", "WiFi", "Air Conditioning",
    "Fireplace", "Balcony", "Gym", "Tennis Court", "Solar Panels", "Generator"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...files.map(f => ({ file: f, url: URL.createObjectURL(f) }))]
          }));
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting property:", formData);
    // Here you would normally submit to your backend
    alert("Property listing submitted successfully! Our team will contact you within 24 hours.");
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.location && formData.propertyType;
      case 2:
        return formData.price && formData.bedrooms && formData.bathrooms;
      case 3:
        return formData.images.length > 0;
      case 4:
        return formData.contactName && formData.contactPhone && formData.contactEmail;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-700" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 rounded-full mb-6 backdrop-blur-sm border border-yellow-400/30">
              <Sparkles className="w-5 h-5 text-[#DCC471] mr-2" />
              <span className="text-yellow-100 font-medium">Sell With Confidence</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              List Your <span className="text-[#DCC471]">Property</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join thousands of satisfied sellers who`ve found success with House of Stone Properties
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                currentStep >= step
                  ? "bg-[#DCC471] text-slate-900"
                  : "bg-gray-200 text-gray-500"
              }`}>
                {isStepComplete(step) ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              {step < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > step ? "bg-[#DCC471]" : "bg-gray-200"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Property Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Property Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Beautiful 4BR Family Home"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Property Type *
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="commercial">Commercial</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Borrowdale, Harare"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your property's unique features, location benefits, and what makes it special..."
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none resize-none"
                    required
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Property Specifications</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Asking Price (USD) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="250000"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Square Footage
                    </label>
                    <div className="relative">
                      <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="sqft"
                        value={formData.sqft}
                        onChange={handleInputChange}
                        placeholder="2500"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Bedrooms *
                    </label>
                    <div className="relative">
                      <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                        required
                      >
                        <option value="">Select</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} Bedroom{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Bathrooms *
                    </label>
                    <div className="relative">
                      <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                        required
                      >
                        <option value="">Select</option>
                        {[1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} Bathroom{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4">
                    Property Amenities
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {amenitiesList.map((amenity) => (
                      <motion.button
                        key={amenity}
                        type="button"
                        onClick={() => handleAmenityToggle(amenity)}
                        className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                          formData.amenities.includes(amenity)
                            ? "border-[#DCC471] bg-yellow-50 text-slate-900"
                            : "border-gray-200 hover:border-yellow-300"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {amenity}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Property Images</h2>
                
                <div className="text-center">
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-yellow-400 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload photos or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#DCC471] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {formData.images.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Uploaded Images ({formData.images.length})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image.url}
                            alt={`Property ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="+263 123 456 789"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                    required
                  />
                </div>

                {/* Summary */}
                <div className="bg-slate-50 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Listing Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Title:</strong> {formData.title || "Not specified"}</div>
                    <div><strong>Type:</strong> {formData.propertyType}</div>
                    <div><strong>Location:</strong> {formData.location || "Not specified"}</div>
                    <div><strong>Price:</strong> ${formData.price ? parseInt(formData.price).toLocaleString() : "Not specified"}</div>
                    <div><strong>Bedrooms:</strong> {formData.bedrooms || "Not specified"}</div>
                    <div><strong>Bathrooms:</strong> {formData.bathrooms || "Not specified"}</div>
                    <div><strong>Images:</strong> {formData.images.length} uploaded</div>
                    <div><strong>Amenities:</strong> {formData.amenities.length} selected</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <GlowButton
              variant="tertiary"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </GlowButton>

            {currentStep < 4 ? (
              <GlowButton
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!isStepComplete(currentStep)}
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </GlowButton>
            ) : (
              <GlowButton
                onClick={handleSubmit}
                disabled={!isStepComplete(4)}
              >
                Submit Listing
                <CheckCircle className="w-4 h-4 ml-2" />
              </GlowButton>
            )}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Help Listing?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our expert agents are here to help you every step of the way
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowButton onClick={() => window.location.href = "tel:+263788479143"}>
              <Phone className="w-5 h-5 mr-2" />
              Call +263 788 479 143
            </GlowButton>
            <GlowButton variant="secondary" onClick={() => window.location.href = "mailto:info@hsp.co.zw"}>
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </GlowButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListPropertyPage;