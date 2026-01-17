import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  MapPin,
  Home,
  Bed,
  Bath,
  Car,
  Square,
  Calendar,
  Star,
  Phone,
  Mail,
  Users,
  CheckCircle,
  TrendingUp,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Building2,
  Shield
} from 'lucide-react';
import { SiFsecure } from "react-icons/si";
import { LiaAwardSolid } from "react-icons/lia";
import { FaRegCircleUser } from "react-icons/fa6";

// Floating Orb Component
const FloatingOrb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.2, 0.1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

// Grid Pattern Component
const GridPattern = () => (
  <div className="absolute inset-0 opacity-[0.02]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(#C9A962 1px, transparent 1px), linear-gradient(90deg, #C9A962 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

// Input Field Component
const InputField = ({ label, icon: Icon, type = 'text', value, onChange, name, placeholder, required, options, suffix, error }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
      <Icon className="w-4 h-4 text-[#C9A962]" />
      {label}
      {required && <span className="text-[#C9A962]">*</span>}
    </label>
    <div className="relative">
      {options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C9A962]/50 focus:ring-2 focus:ring-[#C9A962]/20 transition-all appearance-none cursor-pointer"
          required={required}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt.value} className="bg-[#0A1628] text-white">
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 focus:ring-2 focus:ring-[#C9A962]/20 transition-all ${
            error ? 'border-red-500/50' : 'border-white/10'
          } ${suffix ? 'pr-16' : ''}`}
        />
      )}
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          {suffix}
        </span>
      )}
    </div>
    {error && <p className="text-red-400 text-sm">{error}</p>}
  </div>
);

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:border-[#C9A962]/30 transition-colors">
      <Icon className="w-8 h-8 text-[#C9A962]" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const PropertyValuationPage = () => {
  const [formData, setFormData] = useState({
    propertyType: 'house',
    location: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    yearBuilt: '',
    condition: 'good',
    recentRenovations: false,
    garageSpaces: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const calculateEstimate = () => {
    setLoading(true);
    // Simulated calculation
    setTimeout(() => {
      const basePrice = parseInt(formData.sqft) * 150;
      const locationMultiplier = formData.location.toLowerCase().includes('borrowdale') ? 1.3 : 1.0;
      const conditionMultiplier = formData.condition === 'excellent' ? 1.1 : formData.condition === 'poor' ? 0.85 : 1.0;
      const estimate = basePrice * locationMultiplier * conditionMultiplier;
      setEstimatedValue(estimate);
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateEstimate();
  };

  const resetForm = () => {
    setFormData({
      propertyType: 'house',
      location: '',
      bedrooms: '',
      bathrooms: '',
      sqft: '',
      yearBuilt: '',
      condition: 'good',
      recentRenovations: false,
      garageSpaces: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
    });
    setSubmitted(false);
    setEstimatedValue(null);
  };

  // Results View
  if (submitted && estimatedValue) {
    return (
      <div className="min-h-screen bg-[#060D16]">
        {/* Background */}
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#0F1D2F]" />
          <GridPattern />
          <FloatingOrb className="w-[600px] h-[600px] bg-[#C9A962] -top-40 -right-40" delay={0} />
          <FloatingOrb className="w-[400px] h-[400px] bg-[#1E3A5F] bottom-0 left-20" delay={2} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
          >
            {/* Success Header */}
            <div className="relative bg-gradient-to-r from-[#C9A962] to-[#B8985A] p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <CheckCircle className="w-16 h-16 text-[#0A1628] mx-auto mb-4" />
              </motion.div>
              <h2 className="text-3xl font-bold text-[#0A1628] mb-2">
                Valuation Complete!
              </h2>
              <p className="text-[#0A1628]/70">Your preliminary estimate is ready</p>
            </div>

            {/* Results Content */}
            <div className="p-8">
              <div className="text-center mb-10">
                <p className="text-gray-400 mb-2">Estimated Property Value</p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent mb-2"
                >
                  ${estimatedValue.toLocaleString()}
                </motion.div>
                <p className="text-gray-500 text-sm">Based on current market analysis</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h4 className="font-semibold text-white mb-4">Property Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type</span>
                      <span className="text-white capitalize">{formData.propertyType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location</span>
                      <span className="text-white">{formData.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Size</span>
                      <span className="text-white">{formData.sqft} sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bedrooms</span>
                      <span className="text-white">{formData.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Condition</span>
                      <span className="text-white capitalize">{formData.condition}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#C9A962]/10 border border-[#C9A962]/20 rounded-xl p-6">
                  <h4 className="font-semibold text-white mb-4">Next Steps</h4>
                  <ul className="space-y-3">
                    {[
                      'A professional agent will contact you within 24 hours',
                      'Schedule an in-person property assessment',
                      'Receive a detailed market analysis report',
                      'Get a personalized selling strategy'
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#C9A962] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                <p className="text-gray-400 text-sm text-center leading-relaxed">
                  This is a preliminary estimate based on the information provided.
                  Our expert team will contact you at <span className="text-white">{formData.contactEmail}</span> within
                  24 hours to schedule a comprehensive property assessment.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/sales"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
                >
                  <Building2 className="w-5 h-5" />
                  List This Property
                </Link>
                <button
                  onClick={resetForm}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300"
                >
                  <RotateCcw className="w-5 h-5" />
                  New Valuation
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Form View
  return (
    <div className="min-h-screen bg-[#060D16]">
      {/* Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#0F1D2F]" />
        <GridPattern />
        <FloatingOrb className="w-[600px] h-[600px] bg-[#C9A962] -top-40 -right-40" delay={0} />
        <FloatingOrb className="w-[400px] h-[400px] bg-[#1E3A5F] bottom-0 left-20" delay={2} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 border border-[#C9A962]/20 rounded-full mb-6">
            <Calculator className="w-4 h-4 text-[#C9A962]" />
            <span className="text-[#C9A962] text-sm font-medium">Free Property Valuation</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            What's Your Property{' '}
            <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
              Worth?
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get an instant estimate of your property's value using our advanced
            market analysis tools. It's free and takes just 2 minutes.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#C9A962] to-[#B8985A] p-6">
            <h2 className="text-2xl font-bold text-[#0A1628] text-center">
              Property Information
            </h2>
            <p className="text-[#0A1628]/70 text-center mt-1">
              Fill in the details below for an accurate valuation
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <InputField
                label="Property Type"
                icon={Home}
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                options={[
                  { value: 'house', label: 'House' },
                  { value: 'apartment', label: 'Apartment' },
                  { value: 'townhouse', label: 'Townhouse' },
                  { value: 'villa', label: 'Villa' },
                  { value: 'cottage', label: 'Cottage' }
                ]}
              />

              <InputField
                label="Location"
                icon={MapPin}
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Borrowdale, Harare"
                required
              />

              <InputField
                label="Bedrooms"
                icon={Bed}
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                options={[
                  { value: '', label: 'Select...' },
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                  { value: '4', label: '4' },
                  { value: '5+', label: '5+' }
                ]}
                required
              />

              <InputField
                label="Bathrooms"
                icon={Bath}
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                options={[
                  { value: '', label: 'Select...' },
                  { value: '1', label: '1' },
                  { value: '1.5', label: '1.5' },
                  { value: '2', label: '2' },
                  { value: '2.5', label: '2.5' },
                  { value: '3', label: '3' },
                  { value: '3.5', label: '3.5' },
                  { value: '4+', label: '4+' }
                ]}
                required
              />

              <InputField
                label="Square Footage"
                icon={Square}
                type="number"
                name="sqft"
                value={formData.sqft}
                onChange={handleInputChange}
                placeholder="e.g., 2000"
                suffix="sq ft"
                required
              />

              <InputField
                label="Year Built"
                icon={Calendar}
                type="number"
                name="yearBuilt"
                value={formData.yearBuilt}
                onChange={handleInputChange}
                placeholder="e.g., 2010"
              />

              <InputField
                label="Property Condition"
                icon={Star}
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                options={[
                  { value: 'excellent', label: 'Excellent' },
                  { value: 'good', label: 'Good' },
                  { value: 'fair', label: 'Fair' },
                  { value: 'poor', label: 'Needs Work' }
                ]}
              />

              <InputField
                label="Garage Spaces"
                icon={Car}
                name="garageSpaces"
                value={formData.garageSpaces}
                onChange={handleInputChange}
                options={[
                  { value: '', label: 'Select...' },
                  { value: '0', label: 'None' },
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                  { value: '4+', label: '4+' }
                ]}
              />
            </div>

            {/* Contact Section */}
            <div className="border-t border-white/10 pt-8 mb-8">
              <h3 className="text-lg font-semibold text-white mb-6">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  icon={FaRegCircleUser}
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />

                <InputField
                  label="Phone Number"
                  icon={Phone}
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  required
                />

                <div className="md:col-span-2">
                  <InputField
                    label="Email Address"
                    icon={Mail}
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Renovations Checkbox */}
            <div className="mb-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="recentRenovations"
                    checked={formData.recentRenovations}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 border-2 rounded-md transition-all ${
                    formData.recentRenovations
                      ? 'bg-[#C9A962] border-[#C9A962]'
                      : 'bg-white/5 border-white/20 group-hover:border-[#C9A962]/50'
                  }`}>
                    {formData.recentRenovations && (
                      <CheckCircle className="w-5 h-5 text-[#0A1628]" />
                    )}
                  </div>
                </div>
                <span className="text-gray-300">
                  Property has had recent renovations (within last 5 years)
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.location || !formData.sqft || !formData.contactName || !formData.contactEmail}
              className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#0A1628]/30 border-t-[#0A1628] rounded-full animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5" />
                  Get My Property Valuation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <FeatureCard
            icon={TrendingUp}
            title="Market Analysis"
            description="Comprehensive analysis using the latest market data and property trends in your area"
            index={0}
          />
          <FeatureCard
            icon={Clock}
            title="Instant Results"
            description="Get your property valuation in seconds, not days. Quick and accurate estimates"
            index={1}
          />
          <FeatureCard
            icon={LiaAwardSolid}
            title="Expert Follow-up"
            description="Professional agent contact for detailed consultation and personalized advice"
            index={2}
          />
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-500"
        >
          {[
            { icon: SiFsecure, text: 'Secure & Private' },
            { icon: CheckCircle, text: 'No Obligation' },
            { icon: Clock, text: '2 Min Process' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon className="w-5 h-5 text-[#C9A962]" />
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyValuationPage;
