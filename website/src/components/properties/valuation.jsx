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
import { useState } from "react";

const GlowButton = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform
      ${
        variant === "primary"
          ? "bg-[#DCC471] text-slate-900 shadow-lg hover:shadow-yellow-500/25"
          : variant === "secondary"
          ? "bg-slate-800 text-white border-2 border-[#DCC471] hover:bg-yellow-400 hover:text-slate-900"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }
      ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:scale-105 active:scale-95"
      }
      overflow-hidden ${className}
    `}
    {...props}
  >
    <span className="relative z-10 flex items-center justify-center">
      {children}
    </span>
  </button>
);

const PropertyValuationPage = () => {
  const [formData, setFormData] = useState({
    propertyType: "house",
    location: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    yearBuilt: "",
    condition: "good",
    recentRenovations: false,
    garageSpaces: "",
    lotSize: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    preferredContactTime: "anytime",
    urgency: "1-2 weeks",
  });

  const [submitted, setSubmitted] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const calculateEstimate = () => {
    // Simple estimation logic
    const basePrice = parseInt(formData.sqft) * 150; // $150 per sqft base
    const locationMultiplier = formData.location
      .toLowerCase()
      .includes("borrowdale")
      ? 1.3
      : 1.0;
    const conditionMultiplier =
      formData.condition === "excellent"
        ? 1.1
        : formData.condition === "poor"
        ? 0.85
        : 1.0;

    const estimate = basePrice * locationMultiplier * conditionMultiplier;
    setEstimatedValue(estimate);
    setSubmitted(true);
  };

  const handleSubmit = () => {
    calculateEstimate();
    console.log("Valuation request:", formData);
  };

  // Success/Results View
  if (submitted && estimatedValue) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
              <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">
                Valuation Complete!
              </h2>
              <p className="text-green-100">Your property estimate is ready</p>
            </div>

            {/* Valuation Results */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Estimated Property Value
                </h3>
                <div className="text-5xl font-bold text-[#DCC471] mb-2">
                  ${estimatedValue.toLocaleString()}
                </div>
                <p className="text-gray-600">
                  Based on current market analysis
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 p-6 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-3">
                    Property Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Type:</strong> {formData.propertyType}
                    </div>
                    <div>
                      <strong>Location:</strong> {formData.location}
                    </div>
                    <div>
                      <strong>Size:</strong> {formData.sqft} sq ft
                    </div>
                    <div>
                      <strong>Bedrooms:</strong> {formData.bedrooms}
                    </div>
                    <div>
                      <strong>Bathrooms:</strong> {formData.bathrooms}
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-3">Next Steps</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Professional agent will contact you
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Detailed market analysis provided
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Personalized selling strategy
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  This is a preliminary estimate. Our agent will contact you
                  within 24 hours for a detailed valuation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <GlowButton onClick={() => console.log("Navigate to list")}>
                    <PlusCircle className="w-5 h-5 mr-2" />
                    List This Property
                  </GlowButton>
                  <GlowButton
                    variant="secondary"
                    onClick={() => {
                      setSubmitted(false);
                      setEstimatedValue(null);
                    }}
                  >
                    Get Another Valuation
                  </GlowButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Form View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Calculator className="w-12 h-12 text-[#DCC471] mr-3" />
            <h1 className="text-4xl font-bold text-slate-900">
              Property Valuation
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get an instant estimate of your property's value with our advanced
            market analysis tools
          </p>
        </div>

        {/* Valuation Form */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#DCC471] to-yellow-500 p-6">
            <h2 className="text-2xl font-bold text-slate-900 text-center">
              Property Information
            </h2>
            <p className="text-slate-700 text-center mt-2">
              Fill in the details below for an accurate valuation
            </p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Home className="w-4 h-4 inline mr-1" />
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DCC471] focus:border-transparent"
                >
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="condo">Condo</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Borrowdale, Harare"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DCC471] focus:border-transparent"
                  required
                />
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Bed className="w-4 h-4 inline mr-1" />
                  Bedrooms
                </label>
                <select
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DCC471] focus:border-transparent"
                  required
                >
                  <option value="">Select...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Bath className="w-4 h-4 inline mr-1" />
                  Bathrooms
                </label>
                <select
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DCC471] focus:border-transparent"
                  required
                >
                  <option value="">Select...</option>
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3">3</option>
                  <option value="3.5">3.5</option>
                  <option value="4+">4+</option>
                </select>
              </div>

              {/* Square Footage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Square className="w-4 h-4 inline mr-1" />
                  Square Footage
                </label>
                <input
                  type="number"
                  name="sqft"
                  value={formData.sqft}
                  onChange={handleInputChange}
                  placeholder="e.g., 2000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DCC471] focus:border-transparent"
                  required
                />
              </div>

              {/* Year Built */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Year Built
                </label>
                <input
                  type="number"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleInputChange}
                  placeholder="e.g., 2010"
                  min="1900"
                  max="2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DCC471] focus:border-transparent"
                />
              </div>

              {/* Property Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Star className="w-4 h-4 inline mr-1" />
                  Property Condition
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DCC471] focus:border-transparent"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              {/* Garage Spaces */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Car className="w-4 h-4 inline mr-1" />
                  Garage Spaces
                </label>
                <select
                  name="garageSpaces"
                  value={formData.garageSpaces}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DCC471] focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4+">4+</option>
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DCC471] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DCC471] focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DCC471] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Recent Renovations Checkbox */}
            <div className="mt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="recentRenovations"
                  checked={formData.recentRenovations}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#DCC471] border-gray-300 rounded focus:ring-[#DCC471]"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Property has had recent renovations (within last 5 years)
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <GlowButton
                onClick={handleSubmit}
                disabled={!formData.location || !formData.sqft || !formData.contactName || !formData.contactEmail}
                className="w-full sm:w-auto"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Get My Property Valuation
              </GlowButton>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <TrendingUp className="w-8 h-8 text-[#DCC471]" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Market Analysis
            </h3>
            <p className="text-gray-600">
              Comprehensive analysis using latest market data and trends
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Clock className="w-8 h-8 text-[#DCC471]" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Instant Results
            </h3>
            <p className="text-gray-600">
              Get your property valuation in seconds, not days
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Award className="w-8 h-8 text-[#DCC471]" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Expert Follow-up
            </h3>
            <p className="text-gray-600">
              Professional agent contact for detailed consultation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyValuationPage;