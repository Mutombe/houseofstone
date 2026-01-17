// src/components/contact/contact.jsx
// Premium Contact Page - House of Stone Properties
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  CheckCircle,
  Star,
  Building2,
  Globe,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Calendar,
  Shield,
  Zap,
  ChevronRight,
} from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiFsecure } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

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

// Grid Pattern Background
const GridPattern = () => (
  <div className="absolute inset-0 opacity-[0.02]">
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `linear-gradient(#C9A962 1px, transparent 1px), linear-gradient(90deg, #C9A962 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

// Contact Info Card
const ContactCard = ({ icon: Icon, title, content, link, linkType, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.a
      ref={ref}
      href={link}
      target={linkType === "map" ? "_blank" : undefined}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-[#C9A962]/50 transition-all duration-500 block"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-[#C9A962]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A962]/20 to-[#C9A962]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-8 h-8 text-[#C9A962]" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/70 group-hover:text-white transition-colors">{content}</p>

        <div className="mt-4 flex items-center text-[#C9A962] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Get in touch</span>
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.a>
  );
};

// Office Hours Card
const OfficeHoursCard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const hours = [
    { day: "Monday - Friday", time: "8:00 AM - 5:00 PM" },
    { day: "Saturday", time: "9:00 AM - 1:00 PM" },
    { day: "Sunday", time: "Closed" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-gradient-to-br from-[#C9A962]/10 to-transparent backdrop-blur-sm rounded-3xl p-8 border border-[#C9A962]/20"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#C9A962]/20 flex items-center justify-center">
          <Clock className="w-6 h-6 text-[#C9A962]" />
        </div>
        <h3 className="text-xl font-bold text-white">Office Hours</h3>
      </div>

      <div className="space-y-4">
        {hours.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
          >
            <span className="text-white/70">{item.day}</span>
            <span className="text-white font-medium">{item.time}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Social Links Component
const SocialLinks = () => {
  const socials = [
    { icon: FaWhatsapp, href: "https://wa.me/263772329569", label: "WhatsApp", color: "hover:bg-emerald-500" },
    { icon: FaFacebook, href: "https://www.facebook.com/houseofstoneproperties", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: FaInstagram, href: "https://www.instagram.com/houseofstoneproperties/", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/company/house-of-stone-properties/", label: "LinkedIn", color: "hover:bg-blue-700" },
  ];

  return (
    <div className="flex gap-3">
      {socials.map((social, index) => (
        <motion.a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/70 hover:text-white ${social.color} transition-all duration-300`}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <social.icon className="w-5 h-5" />
        </motion.a>
      ))}
    </div>
  );
};

// Contact Form Component
const ContactForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const subjects = [
    "Property Inquiry",
    "Schedule Viewing",
    "Property Valuation",
    "List Property",
    "Investment Advice",
    "General Inquiry",
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/10"
    >
      {/* Success Message */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 bg-[#0A1628]/95 backdrop-blur-xl rounded-3xl flex items-center justify-center z-10"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-20 h-20 mx-auto mb-6 bg-emerald-500 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-white/60">We'll get back to you shortly.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Send Us a Message</h2>
        <p className="text-white/60">
          Fill out the form below and we'll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name & Email Row */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 focus:outline-none transition-all"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Phone & Subject Row */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 focus:outline-none transition-all"
            />
          </div>

          <div className="relative">
            <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="" className="bg-[#0A1628]">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject} className="bg-[#0A1628]">
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="relative">
          <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-white/40" />
          <textarea
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 focus:outline-none transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-[#C9A962] text-[#0A1628] rounded-xl font-semibold hover:bg-[#B8985A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-[#0A1628] border-t-transparent rounded-full"
              />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

// Map Component
const MapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10"
    >
      <div className="p-6 border-b border-white/10">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C9A962]/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-[#C9A962]" />
          </div>
          Find Us Here
        </h3>
      </div>

      <div className="h-80">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.2736123456789!2d31.0833!3d-17.7875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQ3JzE1LjAiUyAzMcKwMDUnMDAuMCJF!5e0!3m2!1sen!2szw!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
        />
      </div>
    </motion.div>
  );
};

// Quick Actions Component
const QuickActions = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const actions = [
    {
      icon: Calendar,
      title: "Schedule Viewing",
      description: "Book a property tour",
      color: "from-purple-500/20 to-purple-600/5",
      borderColor: "border-purple-500/20",
    },
    {
      icon: Building2,
      title: "Property Valuation",
      description: "Get a free estimate",
      color: "from-blue-500/20 to-blue-600/5",
      borderColor: "border-blue-500/20",
    },
    {
      icon: SiFsecure,
      title: "List Property",
      description: "Sell with us",
      color: "from-emerald-500/20 to-emerald-600/5",
      borderColor: "border-emerald-500/20",
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>

      {actions.map((action, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r ${action.color} border ${action.borderColor} text-left transition-all`}
        >
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <action.icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold">{action.title}</p>
            <p className="text-white/50 text-sm">{action.description}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-white/50" />
        </motion.button>
      ))}
    </motion.div>
  );
};

// Main Contact Component
const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0A1628] overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <FloatingOrb className="w-[600px] h-[600px] bg-[#C9A962] -top-64 -right-64 opacity-10" />
        <FloatingOrb className="w-[400px] h-[400px] bg-[#C9A962] bottom-0 -left-32 opacity-10" delay={2} />
        <GridPattern />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 rounded-full border border-[#C9A962]/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#C9A962]" />
              <span className="text-[#C9A962] text-sm font-medium">Get In Touch</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Let's Start a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#E8D5A3]">
                Conversation
              </span>
            </h1>

            <p className="text-xl text-white/60 leading-relaxed">
              Have questions about properties or need expert advice? Our team is here to help
              you every step of the way.
            </p>
          </motion.div>

          {/* Contact Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <ContactCard
              icon={Phone}
              title="Call Us"
              content="+263 772 329 569"
              link="tel:+263772329569"
              delay={0}
            />
            <ContactCard
              icon={Mail}
              title="Email Us"
              content="info@hsp.co.zw"
              link="mailto:info@hsp.co.zw"
              delay={0.1}
            />
            <ContactCard
              icon={FaWhatsapp}
              title="WhatsApp"
              content="+263 772 329 569"
              link="https://wa.me/263772329569"
              delay={0.2}
            />
            <ContactCard
              icon={MapPin}
              title="Visit Us"
              content="21 Harare Drive, Borrowdale"
              link="https://maps.google.com"
              linkType="map"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form - Larger */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Office Hours */}
              <OfficeHoursCard />

              {/* Quick Actions */}
              <QuickActions />

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-6">Connect With Us</h3>
                <SocialLinks />
              </motion.div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <MapSection />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
