// src/components/footer/footer.jsx
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
  CheckCircle,
  Clock,
  ChevronUp,
  Building,
  Home,
  Users,
  Briefcase,
  Calculator,
  TrendingUp,
  Shield,
  Award,
  Heart,
  Sparkles,
} from "lucide-react";
import { SiFsecure } from "react-icons/si";
import { LiaAwardSolid } from "react-icons/lia";
import { FaXTwitter } from "react-icons/fa6";

// Floating Orb Component
const FloatingOrb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.05, 0.1, 0.05],
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
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(#C9A962 1px, transparent 1px), linear-gradient(90deg, #C9A962 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

// Animated Link Component
const FooterLink = ({ to, children, external = false }) => {
  const LinkComponent = external ? "a" : Link;
  const props = external
    ? { href: to, target: "_blank", rel: "noopener noreferrer" }
    : { to };

  return (
    <LinkComponent
      {...props}
      className="group flex items-center text-gray-400 hover:text-[#C9A962] active:text-[#C9A962] transition-all duration-300 text-xs xs:text-sm py-0.5"
    >
      <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 mr-1.5 xs:mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
      <span className="relative">
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A962] group-hover:w-full transition-all duration-300" />
      </span>
    </LinkComponent>
  );
};

// Social Link Component
const SocialLink = ({ href, icon: Icon, name, hoverColor }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group relative w-10 h-10 xs:w-12 xs:h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg xs:rounded-xl flex items-center justify-center text-gray-400 overflow-hidden ${hoverColor} transition-all duration-300 active:scale-95`}
    whileHover={{ scale: 1.1, y: -3 }}
    whileTap={{ scale: 0.95 }}
    aria-label={name}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <Icon className="w-4 h-4 xs:w-5 xs:h-5 relative z-10 group-hover:text-white transition-colors" />
  </motion.a>
);

// Contact Item Component
const ContactItem = ({ icon: Icon, children, href, type = "link" }) => {
  const content = (
    <div className="flex items-center text-gray-400 hover:text-[#C9A962] transition-colors group">
      <div className="w-9 h-9 xs:w-11 xs:h-11 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg xs:rounded-xl flex items-center justify-center mr-3 xs:mr-4 group-hover:bg-[#C9A962]/10 group-hover:border-[#C9A962]/30 transition-all flex-shrink-0">
        <Icon className="w-4 h-4 xs:w-5 xs:h-5 text-[#C9A962]" />
      </div>
      <span className="text-xs xs:text-sm">{children}</span>
    </div>
  );

  if (type === "link" && href) {
    return <a href={href} className="active:opacity-70">{content}</a>;
  }

  return content;
};

// Stats Item Component
const StatItem = ({ value, label }) => (
  <div className="text-center">
    <div className="text-xl xs:text-2xl font-bold text-[#C9A962]">{value}</div>
    <div className="text-[10px] xs:text-xs text-gray-500">{label}</div>
  </div>
);

const Footer = ({ className = '' }) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email && !isSubmitting) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail("");
      setIsSubmitting(false);
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Properties for Sale", path: "/sale" },
    { name: "Properties for Rent", path: "/rent" },
    { name: "Our Agents", path: "/agents" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    { name: "Property Sales", path: "/sales", icon: Building },
    { name: "Property Management", path: "/management", icon: Home },
    { name: "Investment Consulting", path: "/consulting", icon: TrendingUp },
    { name: "Property Valuation", path: "/valuation", icon: LiaAwardSolid },
    { name: "Market Analysis", path: "/market", icon: TrendingUp },
    { name: "Mortgage Calculator", path: "/mortgage", icon: Calculator },
  ];

  const propertyTypes = [
    { name: "Residential", path: "/sale" },
    { name: "Commercial", path: "/commercial" },
    { name: "Industrial", path: "/industrial" },
    { name: "Land & Development", path: "/development" },
    { name: "Luxury Estates", path: "/sale?type=villa" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/houseofstoneproperties",
      hoverColor: "hover:bg-blue-600 hover:border-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/houseofstoneproperties/",
      hoverColor: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:border-pink-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/company/house-of-stone-properties/about/",
      hoverColor: "hover:bg-blue-700 hover:border-blue-700",
    },
    {
      name: "Twitter",
      icon: FaXTwitter,
      href: "#",
      hoverColor: "hover:bg-sky-500 hover:border-sky-500",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className={`relative bg-gradient-to-b from-[#0A1628] via-[#0A1628] to-[#060D16] text-white overflow-hidden ${className}`}
    >
      {/* Decorative Elements */}
      <FloatingOrb className="w-[600px] h-[600px] bg-[#C9A962] -top-40 -left-40" />
      <FloatingOrb className="w-[500px] h-[500px] bg-blue-500 -bottom-40 -right-40" delay={2} />
      <GridPattern />

      {/* Newsletter Section */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 lg:gap-16 items-center"
          >
            {/* Newsletter Text */}
            <div>
              <div className="inline-flex items-center px-3 xs:px-4 py-1.5 xs:py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-4 xs:mb-6">
                <Sparkles className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#C9A962] mr-1.5 xs:mr-2" />
                <span className="text-gray-300 text-xs xs:text-sm">Stay Connected</span>
              </div>
              <h3 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-3 xs:mb-4 leading-tight">
                Stay Updated with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#DCC471]">
                  New Listings
                </span>
              </h3>
              <p className="text-gray-400 text-sm xs:text-base sm:text-lg leading-relaxed">
                Subscribe to our newsletter for exclusive property listings, market insights, and
                real estate tips delivered straight to your inbox.
              </p>
            </div>

            {/* Newsletter Form */}
            <motion.form
              onSubmit={handleSubscribe}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl xs:rounded-2xl p-1.5 xs:p-2">
                <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full pl-10 xs:pl-12 pr-3 xs:pr-4 py-3 xs:py-4 bg-white/5 border border-white/10 rounded-lg xs:rounded-xl text-white text-sm xs:text-base placeholder-gray-500 focus:outline-none focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 transition-all"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 xs:px-8 py-3 xs:py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] rounded-lg xs:rounded-xl font-semibold text-sm xs:text-base flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#C9A962]/20 active:scale-95 transition-all whitespace-nowrap disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubscribed ? (
                      <>
                        <CheckCircle className="w-4 h-4 xs:w-5 xs:h-5" />
                        <span className="hidden xs:inline">Subscribed!</span>
                        <span className="xs:hidden">Done!</span>
                      </>
                    ) : isSubmitting ? (
                      <div className="w-4 h-4 xs:w-5 xs:h-5 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <Send className="w-4 h-4 xs:w-5 xs:h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
              <p className="text-gray-500 text-xs xs:text-sm mt-3 xs:mt-4 flex items-center">
                <SiFsecure className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-1.5 xs:mr-2 flex-shrink-0" />
                <span>We respect your privacy. Unsubscribe at any time.</span>
              </p>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 xs:gap-10 lg:gap-8">
          {/* Company Info - Spans 4 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <Link to="/" className="inline-block mb-4 xs:mb-6">
              <img
                src="/logo.png"
                alt="House of Stone Properties"
                className="h-10 xs:h-12 sm:h-14 w-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/logo2.webp";
                }}
              />
            </Link>

            <p className="text-gray-400 text-sm xs:text-base mb-4 xs:mb-6 leading-relaxed max-w-sm">
              Zimbabwe's premier real estate agency, dedicated to helping you find your perfect
              property. Your Property, Our Priority — Takavimbika ~ Sithembekile.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 xs:space-y-4 mb-6 xs:mb-8">
              <ContactItem icon={Phone} href="tel:+263772329569" type="link">
                +263 772 329 569
              </ContactItem>
              <ContactItem icon={Mail} href="mailto:info@hsp.co.zw" type="link">
                info@hsp.co.zw
              </ContactItem>
              <ContactItem icon={MapPin} type="text">
                21 Harare Drive, Borrowdale, Harare
              </ContactItem>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 xs:gap-3">
              {socialLinks.map((social) => (
                <SocialLink key={social.name} {...social} />
              ))}
            </div>
          </motion.div>

          {/* Quick Links - Spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h4 className="text-base xs:text-lg font-semibold mb-4 xs:mb-6 text-white flex items-center">
              <div className="w-1 h-5 xs:h-6 bg-gradient-to-b from-[#C9A962] to-[#B8985A] mr-2 xs:mr-3 rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-2 xs:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <FooterLink to={link.path}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services - Spans 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <h4 className="text-base xs:text-lg font-semibold mb-4 xs:mb-6 text-white flex items-center">
              <div className="w-1 h-5 xs:h-6 bg-gradient-to-b from-[#C9A962] to-[#B8985A] mr-2 xs:mr-3 rounded-full" />
              Our Services
            </h4>
            <ul className="space-y-2 xs:space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <FooterLink to={service.path}>{service.name}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Property Types + Office Hours - Spans 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <h4 className="text-base xs:text-lg font-semibold mb-4 xs:mb-6 text-white flex items-center">
              <div className="w-1 h-5 xs:h-6 bg-gradient-to-b from-[#C9A962] to-[#B8985A] mr-2 xs:mr-3 rounded-full" />
              Property Types
            </h4>
            <ul className="space-y-2 xs:space-y-3 mb-6 xs:mb-8">
              {propertyTypes.map((type) => (
                <li key={type.name}>
                  <FooterLink to={type.path}>{type.name}</FooterLink>
                </li>
              ))}
            </ul>

            {/* Office Hours Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl xs:rounded-2xl p-4 xs:p-5">
              <h5 className="font-semibold text-white text-sm xs:text-base mb-3 xs:mb-4 flex items-center">
                <Clock className="w-4 h-4 xs:w-5 xs:h-5 text-[#C9A962] mr-2" />
                Office Hours
              </h5>
              <div className="space-y-1.5 xs:space-y-2 text-xs xs:text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Mon - Fri</span>
                  <span className="text-white">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Saturday</span>
                  <span className="text-white">9:00 AM - 1:00 PM</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Sunday</span>
                  <span className="text-red-400">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 xs:mt-12 sm:mt-16 pt-8 xs:pt-10 border-t border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xs:gap-6 sm:gap-8">
            <StatItem value="8+" label="Years Experience" />
            <StatItem value="500+" label="Properties Sold" />
            <StatItem value="1000+" label="Happy Clients" />
            <StatItem value="15+" label="Expert Agents" />
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 xs:py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 xs:gap-5 sm:gap-6">
            {/* Copyright - mobile friendly */}
            <div className="flex flex-col xs:flex-row items-center text-gray-500 text-[10px] xs:text-xs sm:text-sm text-center xs:text-left">
              <span>&copy; {currentYear} House of Stone Properties</span>
              <span className="hidden xs:inline mx-1 sm:mx-2">|</span>
              <span className="flex items-center mt-1 xs:mt-0">
                Made with <Heart className="w-3 h-3 xs:w-4 xs:h-4 text-red-500 mx-0.5 xs:mx-1" /> in Zimbabwe
              </span>
            </div>

            {/* Legal links - centered on mobile */}
            <div className="flex flex-wrap justify-center gap-3 xs:gap-4 sm:gap-6 text-[10px] xs:text-xs sm:text-sm order-last sm:order-none">
              <Link
                to="/privacy"
                className="text-gray-500 hover:text-[#C9A962] active:text-[#C9A962] transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-gray-500 hover:text-[#C9A962] active:text-[#C9A962] transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/sitemap"
                className="text-gray-500 hover:text-[#C9A962] active:text-[#C9A962] transition-colors"
              >
                Sitemap
              </Link>
            </div>

            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-r from-[#C9A962] to-[#B8985A] rounded-lg xs:rounded-xl flex items-center justify-center text-[#0A1628] hover:shadow-lg hover:shadow-[#C9A962]/20 active:scale-95 transition-all"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
            >
              <ChevronUp className="w-4 h-4 xs:w-5 xs:h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom padding for mobile nav - only shows on mobile */}
      <div className="h-20 xs:h-24 lg:h-0 bg-[#060D16]" />
    </footer>
  );
};

export default Footer;
