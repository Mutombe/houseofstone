import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  User, 
  MessageSquare,
  Sparkles,
  CheckCircle,
  Star,
  Award,
  Shield,
  Zap
} from 'lucide-react';

// Brand colors consistent with homepage
const COLORS = {
  primary: "#1e293b", // slate-800
  secondary: "#DCC471", // yellow-500/gold
  accent: "#b07e28", // yellow-600 for darker gold
  light: "#ffffff", // white
  dark: "#0f172a", // slate-900 for deeper contrast
  gray: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
};

// Floating animation component
const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

// Glowing button component
const GlowButton = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  ...props
}) => (
  <motion.button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`
      relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform
      ${
        variant === "primary"
          ? "bg-[#DCC471] text-slate-900 shadow-lg hover:shadow-yellow-500/25"
          : "bg-slate-800 text-white border-2 border-[#DCC471] hover:bg-yellow-400 hover:text-slate-900"
      }
      ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"}
      overflow-hidden
      ${className}
    `}
    whileHover={disabled ? {} : { scale: 1.05 }}
    whileTap={disabled ? {} : { scale: 0.95 }}
    {...props}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.6 }}
    />
    <span className="relative z-10 flex items-center justify-center">
      {children}
    </span>
  </motion.button>
);

// Enhanced Interactive Map Component
const LeafletMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let linkElement = null;
    let scriptElement = null;

    const loadLeaflet = () => {
      try {
        // Check if Leaflet is already loaded
        if (window.L) {
          setIsLoaded(true);
          initializeMap();
          return;
        }

        // Add CSS
        linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
        linkElement.integrity = 'sha512-h9FkTHeGtQlgrO8Yj4UnyYRTfNhqE+/fzfONBUJeFa6Lx1sK/5qGH0GZJa0VdZGKMixvWwHRvPyv5xHfUvmWIA==';
        linkElement.crossOrigin = 'anonymous';
        document.head.appendChild(linkElement);

        // Add JavaScript
        scriptElement = document.createElement('script');
        scriptElement.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
        scriptElement.integrity = 'sha512-xqttKF0hzaF1yUGnWL3KQQHHVjgJKCFP9VdVk3YT3aZzKJ5LDQBcWWIaxjdqSVZhO2VNvQpbN9XpQWKWtaGTqg==';
        scriptElement.crossOrigin = 'anonymous';
        
        scriptElement.onload = () => {
          // Wait a bit for the library to be fully ready
          setTimeout(() => {
            if (window.L) {
              setIsLoaded(true);
              initializeMap();
            } else {
              setLoadError(true);
            }
          }, 100);
        };
        
        scriptElement.onerror = () => {
          console.error('Failed to load Leaflet');
          setLoadError(true);
        };
        
        document.head.appendChild(scriptElement);

      } catch (error) {
        console.error('Error loading Leaflet:', error);
        setLoadError(true);
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.L || mapInstanceRef.current) {
        return;
      }

      try {
        // Harare coordinates
        const lat = -17.8252;
        const lng = 31.0335;

        // Initialize map
        mapInstanceRef.current = window.L.map(mapRef.current, {
          center: [lat, lng],
          zoom: 13,
          zoomControl: true,
          scrollWheelZoom: true,
          dragging: true,
          touchZoom: true,
          doubleClickZoom: true,
          boxZoom: true,
          keyboard: true,
        });

        // Add tile layer
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(mapInstanceRef.current);

        // Custom marker HTML
        const markerHtml = `
          <div style="
            width: 40px;
            height: 40px;
            background: #DCC471;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 3px solid white;
            position: relative;
          ">
            <div style="
              width: 20px;
              height: 20px;
              background: #1e293b;
              border-radius: 50%;
            "></div>
          </div>
        `;

        // Create custom icon
        const customIcon = window.L.divIcon({
          html: markerHtml,
          className: 'custom-leaflet-marker',
          iconSize: [40, 40],
          iconAnchor: [20, 20],
          popupAnchor: [0, -20],
        });

        // Add marker
        const marker = window.L.marker([lat, lng], { icon: customIcon }).addTo(mapInstanceRef.current);

        // Create popup content
        const popupContent = `
          <div style="text-align: center; padding: 12px; font-family: system-ui, -apple-system, sans-serif; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 16px; font-weight: bold;">House of Stone Properties</h3>
            <p style="margin: 0 0 4px 0; color: #64748b; font-size: 14px;">21 Harare Dr, Harare, Zimbabwe</p>
            <p style="margin: 0 0 12px 0; color: #64748b; font-size: 12px;">+263 77 232 9569</p>
            <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" 
               target="_blank" 
               style="
                 display: inline-block;
                 background: #DCC471;
                 color: #1e293b;
                 text-decoration: none;
                 padding: 8px 16px;
                 border-radius: 6px;
                 font-size: 12px;
                 font-weight: bold;
                 transition: all 0.3s;
               "
               onmouseover="this.style.background='#b07e28'"
               onmouseout="this.style.background='#DCC471'">
              Get Directions
            </a>
          </div>
        `;

        // Bind popup
        marker.bindPopup(popupContent);

        // Add a circle to show the general area
        window.L.circle([lat, lng], {
          color: '#DCC471',
          fillColor: '#DCC471',
          fillOpacity: 0.1,
          radius: 500,
          weight: 2,
        }).addTo(mapInstanceRef.current);

        // Add custom CSS for marker
        const style = document.createElement('style');
        style.textContent = `
          .custom-leaflet-marker {
            background: none !important;
            border: none !important;
          }
          .leaflet-popup-content-wrapper {
            border-radius: 8px !important;
          }
          .leaflet-popup-tip {
            background: white !important;
          }
        `;
        document.head.appendChild(style);

      } catch (error) {
        console.error('Error initializing map:', error);
        setLoadError(true);
      }
    };

    // Load Leaflet
    loadLeaflet();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        } catch (error) {
          console.error('Error cleaning up map:', error);
        }
      }
      if (linkElement && linkElement.parentNode) {
        linkElement.parentNode.removeChild(linkElement);
      }
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);

  if (loadError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <MapPin className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Interactive Map Unavailable</h3>
          <p className="text-sm text-gray-600 mb-4">Unable to load the interactive map</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-800">House of Stone Properties</p>
            <p className="text-xs text-gray-600 mt-1">21 Harare Dr, Harare, Zimbabwe</p>
            <p className="text-xs text-gray-600">+263 77 232 9569</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-[#DCC471] rounded-full flex items-center justify-center mb-4 mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Loading Interactive Map...</h3>
          <p className="text-sm text-gray-600">Please wait while we load the map</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-xl overflow-hidden relative">
      <div ref={mapRef} className="w-full h-full" />
      {/* Loading overlay that disappears when map is ready */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-slate-700">Interactive Map</span>
        </div>
      </div>
    </div>
  );
};

const EnhancedContact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+263 77 232 9569",
      color: "text-blue-500"
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@houseofstone.com",
      color: "text-green-500"
    },
    {
      icon: MapPin,
      title: "Address",
      details: "21 Harare Dr, Harare, Zimbabwe",
      color: "text-red-500"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM",
      color: "text-purple-500"
    }
  ];

  const features = [
    {
      icon: Award,
      title: "Expert Team",
      description: "Professional real estate consultants with years of experience"
    },
    {
      icon: Shield,
      title: "Trusted Service",
      description: "Reliable and transparent property transactions"
    },
    {
      icon: Zap,
      title: "Quick Response",
      description: "Fast response times and efficient service delivery"
    },
    {
      icon: Star,
      title: "5-Star Rated",
      description: "Consistently high ratings from satisfied clients"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        {/* Background with parallax effect */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-yellow-900/40" />
        </motion.div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
          <FloatingElement delay={0}>
            <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl" />
          </FloatingElement>
          <FloatingElement delay={1}>
            <div className="absolute top-40 right-20 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl" />
          </FloatingElement>
          <FloatingElement delay={2}>
            <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          </FloatingElement>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-yellow-400/20 rounded-full mb-6 backdrop-blur-sm border border-yellow-400/30"
          >
            <Sparkles className="w-5 h-5 text-[#DCC471] mr-2" />
            <span className="text-yellow-100 font-medium">Get In Touch</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Contact Our</span>
            <br />
            <span className="text-transparent bg-clip-text bg-[#DCC471]">Expert Team</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Ready to find your dream property? Our experienced team is here to help you every step of the way.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  Contact <span className="text-[#DCC471]">Information</span>
                </h2>
                <div className="w-20 h-1 bg-[#DCC471] mb-6" />
                <p className="text-gray-600 mb-8">
                  Get in touch with our expert team for personalized property solutions and professional guidance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${item.color} bg-opacity-10`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{item.details}</p>
                  </motion.div>
                ))}
              </div>

              {/* Features */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Why Choose Us?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-[#DCC471] rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-4 h-4 text-slate-900" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">{feature.title}</h4>
                        <p className="text-xs text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Send us a <span className="text-[#DCC471]">Message</span>
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-4">Thank you for contacting us. We'll get back to you soon.</p>
                  <GlowButton onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </GlowButton>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#DCC471] focus:outline-none transition-colors text-slate-800"
                          placeholder="John"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Last Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#DCC471] focus:outline-none transition-colors text-slate-800"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#DCC471] focus:outline-none transition-colors text-slate-800"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#DCC471] focus:outline-none transition-colors text-slate-800"
                        placeholder="+263 77 123 4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#DCC471] focus:outline-none transition-colors text-slate-800"
                      placeholder="Property Inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#DCC471] focus:outline-none transition-colors text-slate-800 resize-none"
                        placeholder="Tell us about your property needs..."
                      />
                    </div>
                  </div>

                  <GlowButton 
                    onClick={handleSubmit}
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full mr-2"
                        />
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </GlowButton>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Visit Our <span className="text-[#DCC471]">Office</span>
            </h2>
            <div className="w-24 h-1 bg-[#DCC471] mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Come visit us at our office in Harare for personalized consultations and expert advice.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="h-96 lg:h-[500px]">
              <LeafletMap />
            </div>
            
            <div className="p-6 bg-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#DCC471] rounded-full flex items-center justify-center mb-3">
                    <MapPin className="w-6 h-6 text-slate-900" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Address</h3>
                  <p className="text-gray-300 text-sm">21 Harare Dr, Harare, Zimbabwe</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#DCC471] rounded-full flex items-center justify-center mb-3">
                    <Phone className="w-6 h-6 text-slate-900" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Phone</h3>
                  <p className="text-gray-300 text-sm">+263 77 232 9569</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#DCC471] rounded-full flex items-center justify-center mb-3">
                    <Clock className="w-6 h-6 text-slate-900" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Hours</h3>
                  <p className="text-gray-300 text-sm">Mon-Fri: 9AM-6PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedContact;