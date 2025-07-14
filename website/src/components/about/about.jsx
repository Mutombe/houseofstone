// src/pages/About.jsx
import { motion } from 'framer-motion';
import React from 'react';
import { useState, useRef } from 'react';
import {
  Building2,
  Users,
  BookOpen,
  Award,
  Home,
  BriefcaseBusiness,
  Phone,
  Mail,
  CheckCircle,
  Star,
  Sparkles,
  Shield,
  Clock,
  Zap,
  TrendingUp,
  MapPin,
  ArrowRight,
  Heart,
  Eye,
} from "lucide-react";
import { useInView } from "framer-motion";

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

// Animated counter component
const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      let startTime = null;
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
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
  ...props
}) => (
  <motion.button
    onClick={onClick}
    className={`
      relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform
      ${
        variant === "primary"
          ? "bg-[#DCC471] text-slate-900 shadow-lg hover:shadow-yellow-500/25"
          : "bg-slate-800 text-white border-2 border-[#DCC471] hover:bg-yellow-400 hover:text-slate-900"
      }
      hover:scale-105 active:scale-95 overflow-hidden
      ${className}
    `}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
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

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
            backgroundImage: "url('/grp-hsp.jpeg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-yellow-900/40" />
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-yellow-400/20 rounded-full mb-6 backdrop-blur-sm border border-yellow-400/30"
          >
            <Sparkles className="w-5 h-5 text-[#DCC471] mr-2" />
            <span className="text-yellow-100 font-medium">
              Proudly Zimbabwean, Anchored on The Rock of All Ages
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">About</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCC471] to-yellow-300">
              House of Stone
            </span>
            <br />
            <span className="text-white">Properties</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Your Property, Our Priority — Takavimbika ~ Sithembekile
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <GlowButton>
              <Phone className="w-5 h-5 mr-2" />
              Contact Us
            </GlowButton>
            <GlowButton variant="secondary">
              <Mail className="w-5 h-5 mr-2" />
              Get in Touch
            </GlowButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[#DCC471] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#DCC471] rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};



const ValuesSection = () => {
  // Values data from company profile
  const values = [
    { 
      icon: BookOpen, 
      title: 'Purpose', 
      description: 'At HSP, we value God, family and then business. This hierarchy influences everything we do as a company and has created the culture that you see today.'
    },
    { 
      icon: BriefcaseBusiness, 
      title: 'Vision', 
      description: "We aim to become a GLOBAL BRAND providing world class real estate services that meet our clients' needs at all times, and the preferred place of employment for real estate professionals."
    },
    { 
      icon: Home, 
      title: 'Mission', 
      description: 'To provide convenience for tenants, prospective landlords, property owners and investors by bringing them together to a place of satisfaction and comfort.'
    },
    { 
      icon: Award, 
      title: 'Core Values', 
      description: 'Our business is grounded in adherence to the principles of quality, honesty, transparency, integrity, and legality.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {values.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg shadow-md border-l-4 border-slate-800"
        >
          <div className="flex items-start">
            <div className="bg-slate-800 p-3 rounded-full mr-4">
              <item.icon className="w-6 h-6 text-[#DCC471]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">{item.title}</h3>
              <p className="text-stone-600 text-sm">{item.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Property Sales",
      description: "Comprehensive listings of residential and commercial properties with extensive marketing and pre-sale enhancement advice."
    },
    {
      title: "Letting",
      description: "Legal expertise in drafting lease agreements that protect both lessors and lessees, with all documentation carefully scrutinized for legality."
    },
    {
      title: "Management",
      description: "Hands-on approach to property management, implementing preventive and corrective measures to preserve and grow rental and capital values."
    },
    {
      title: "Valuations",
      description: "Specialist property valuations for all types of properties with years of experience in valuation techniques and methods."
    },
    {
      title: "Project Management",
      description: "Expert services from inception to completion including financial studies, contract drafting, supervision, and handover of defect-free projects."
    },
    {
      title: "Auctions & More",
      description: "Additional services including property auctions, with further information available on request."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mt-12"
    >
      <h2 className="text-2xl font-bold text-stone-900 mb-6">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div key={index} className="bg-slate-200 p-4 rounded-md hover:shadow-md transition duration-300">
            <h3 className="text-lg font-semibold text-[#DCC471] mb-2">{service.title}</h3>
            <p className="text-stone-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero Section */}
      <HeroSection />

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-stone-900 mb-6">About Us</h2>
              <div className="prose text-stone-600">
                <p className="mb-4">
                  House of Stone Properties is a young and dynamic Real Estate Agency, which boasts of some of the best minds 
                  on the local Real Estate and Property Market. It possesses individuals with vast experience in excess of 35 years 
                  consultancy property negotiation encompassing identification of parties, negotiation and conclusion of sales; 
                  lease administration and property management as well as valuations.
                </p>
                <p className="mb-4">
                  We are a boutique team of full-time real estate professionals and trusted advisors. Our singular focus is 
                  achieving the highest value for our clients through expert strategy, market insight and skilled negotiations, 
                  while ensuring our clients are comfortable, well-informed and patiently guided throughout the process.
                </p>
                <p className="mb-4">
                  The huge legal experience in Property Law should suffice to give an assurance that all property dealings are done in 
                  conformity with the law. HSP is setting the new standard for exceptional real estate service across Zimbabwe.
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-stone-900 mb-4">Our Origin</h3>
                <p className="text-stone-600 mb-4">
                  HSP was established in 2017 with a vision to create an elite, professional boutique real estate company unlike any other. 
                  HSP was founded on the word of God, Matthew 7: 24-27, where its name came from.
                </p>
                <blockquote className="italic border-l-4 border-[#DCC471] pl-4 py-2 text-stone-700 bg-stone-100 rounded-r-md">
                  "Therefore everyone who hears these words of mine and puts them into practice is like a wise man who built his 
                  house on the rock." — Matthew 7:24
                </blockquote>
                <p className="text-stone-600 mt-4 font-semibold">
                  Proudly Zimbabwean, Anchored on The Rock of All Ages…
                </p>
              </div>
              
              <ServicesSection />
            </motion.div>

            <div className="space-y-8">
              <ValuesSection />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-slate-800 rounded-xl p-8 text-white shadow-xl mt-8"
              >
                <h3 className="text-2xl font-bold mb-4">Our Points of Difference</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-[#DCC471] rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm text-stone-300">Strong links with the business community and unwavering commitment to industry regulations and professional codes of conduct.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#DCC471] rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm text-stone-300">A quality team of dedicated real estate professionals delivering complete real estate services.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#DCC471] rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm text-stone-300">Results driven, continually outperforming competitors in the management, marketing, selling and leasing of property.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#DCC471] rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm text-stone-300">Focus on retaining, developing, and supporting our team with ongoing training and professional development.</p>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Our Management</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Meet the experienced professionals leading House of Stone Properties
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="col-span-1 md:col-span-3 bg-slate-200 rounded-xl p-6 shadow-md border-t-4 border-slate-800"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 bg-slate-200 rounded-full flex-shrink-0 overflow-hidden">
                  <img src="/icon.png" alt="Leonita Mhishi" className="w-full h-full object-cover" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Leonita Mhishi</h3>
                  <p className="text-slate-800 font-semibold mb-2">Managing Director & Founder</p>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Leonita is the founder of House of Stone Properties, one of the top real estate agencies in the country. 
                    She has worked for various organizations holding key positions in Zimbabwe, Australia, China and various other countries.
                    Experienced Property Consultant with a demonstrated history of working in the Real Estate industry.
                    Skilled in Commercial Property Sales, Negotiation, Real Property, Diplomatic History, and International Relations,
                    Leonita thrives in building business relationships grounded in adherence to the principles of honesty, transparency,
                    integrity and legality, giving an assurance to all clients that all property dealings are done in conformity with the law.
                  </p>
                  <p className="text-slate-600 text-sm mt-2">
                    She holds International Marketing Management, Topflight Secretarial, ICSA, International Relations and Diplomacy, 
                    Bachelor of Laws (LLB) UNISA. A Committee member of the Diplomat Business Networking Group.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-4">Team HSP</h3>
              <p className="text-stone-600 mb-6">
                The HSP team has Sales Negotiators and permanent members of staff with an unwavering commitment to 
                servicing the needs of astute property investors based on their experiences during their time in the industry.
              </p>
              <p className="text-stone-600 font-semibold">
                Our ability to analyse the real estate situations and finding the most satisfactory resolution is one of our strongest attributes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-4">Marketing Platform</h3>
              <ul className="text-stone-600 text-sm space-y-2 text-left">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#DCC471] rounded-full mr-2"></span>
                  <span>Emails Marketing - Target based email blast to registered clients</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#DCC471] rounded-full mr-2"></span>
                  <span>Virtual Tours - 360° tours for bespoke properties</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#DCC471] rounded-full mr-2"></span>
                  <span>Open House - View your property in person</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#DCC471] rounded-full mr-2"></span>
                  <span>Online Exposure - Web, online sites, blogs, social networks</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#DCC471] rounded-full mr-2"></span>
                  <span>Print Media - Magazine, brochure, newspapers</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-4">Corporate Social Responsibility</h3>
              <p className="text-stone-600">
                We currently donate food stuffs and clothing to various orphanages in Hatcliff and Hatfield. 
                House of Stone Properties is a good corporate citizen and revolves in good leadership, sustainability 
                and corporate citizenship.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Get In Touch</h2>
            <p className="text-stone-600 mb-8 max-w-xl mx-auto">
              Your property journey begins with a conversation. Reach out to us today.
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-[#DCC471] mr-2" />
                <span className="text-stone-700">+263 772 329 569, +263 719 329 569</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-[#DCC471] mr-2" />
                <a href="mailto:info@hsp.co.zw" className="text-[#DCC471] hover:text-[#DCC471]">info@hsp.co.zw</a>
              </div>
            </div>
            <p className="mt-4 text-stone-600">
              21 Harare Drive, Borrowdale Harare
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

