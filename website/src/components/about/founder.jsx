// src/pages/Founders.jsx
import { motion } from 'framer-motion';
import React from 'react';
import { useState, useRef } from 'react';
import {
  Crown,
  Award,
  Star,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Users,
  Heart,
  Eye,
  CheckCircle,
  BookOpen,
  Building2,
  TrendingUp,
  Globe,
  Trophy,
  Target,
  Zap,
  Shield,
  Home,
} from "lucide-react";
import { useInView } from "framer-motion";
import { SiFsecure } from "react-icons/si";
import { LiaAwardSolid } from "react-icons/lia";
import { FaRegCircleUser } from "react-icons/fa6";

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
            <Crown className="w-5 h-5 text-[#DCC471] mr-2" />
            <span className="text-yellow-100 font-medium">
              Leadership Excellence
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Meet Our</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCC471] to-yellow-300">
              Founders
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Visionary Leadership Built on The Rock
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <GlowButton
              onClick={() => window.location.href = "/contact"}
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact Leadership
            </GlowButton>
            <GlowButton variant="secondary"
              onClick={() => window.location.href = "/about"}
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Learn More About HSP
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

const FounderProfile = () => {
  const achievements = [
    { year: "2022", title: "Agency of the Year", organization: "Propertybook" },
    { year: "2023-Present", title: "Executive Producer and Presenter", organization: "*Property Unlocked* on ZTN Prime DSTV" },
    { year: "2023", title: "Megafest Director of the Year", organization: "Platinum Winner" },
    { year: "2025", title: "Women in Real Estate and Construction Award", organization: "Best Salesperson in Luxury Real Estate and Property Management" },
    { year: "2025", title: "Women in Business Award Nominee", organization: "Real Estate" },
    { year: "2025", title: "Women in Construction Nominee", organization: "Construction Industry" },
  ];

  const qualifications = [
    "Bachelor of Laws (LLB) UNISA",
    "International Relations and Diplomacy",
    "International Marketing Management",
    "Topflight Secretarial",
    "ICSA Certification",
    "Estate Agents Council Certification"
  ];

  const expertise = [
    { icon: Building2, title: "Luxury Properties", description: "Specializes in high-end residential and commercial properties" },
    { icon: TrendingUp, title: "Investment Properties", description: "Expert guidance in property investment opportunities" },
    { icon: Home, title: "New Construction", description: "Extensive experience in new development projects" },
    { icon: Target, title: "Resales", description: "Strategic approach to property resales and market positioning" },
    { icon: Globe, title: "International Relations", description: "Diplomatic experience across multiple countries" },
    { icon: SiFsecure, title: "Legal Compliance", description: "Ensures all transactions comply with legal requirements" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Leonita Mhishi</h2>
          <div className="flex items-center justify-center mb-6">
            <Crown className="w-6 h-6 text-[#DCC471] mr-2" />
            <p className="text-xl text-[#DCC471] font-semibold">CEO/Principal Registered Estate Agent & Founder</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Profile Image and Basic Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-slate-50 to-yellow-50 rounded-2xl p-8 shadow-lg">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-xl border-4 border-[#DCC471]">
                <img src="/icon.png" alt="Leonita Mhishi" className="w-full h-full object-cover" />
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Leonita Mhishi</h3>
                <p className="text-[#DCC471] font-semibold mb-4">Managing Director & Co-Founder</p>
                <div className="flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-slate-600 mr-2" />
                  <span className="text-slate-600">Committee member, Diplomat Business Networking Group</span>
                </div>
              </div>
            </div>

            {/* Personal Note Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-800 rounded-xl p-6 text-white shadow-lg"
            >
              <h4 className="text-xl font-bold mb-4 text-[#DCC471]">Personal Note</h4>
              <blockquote className="italic text-slate-300 text-sm leading-relaxed">
                "I care very deeply about my client's individual situation, goals, and dreams. 
                Zimbabwean real estate is exciting, challenging and often exhilarating. 
                It's not for the faint of heart! My team and I are honoured to be your trusted real estate advisor. 
                It's a role we take very seriously."
              </blockquote>
            </motion.div>
          </motion.div>

          {/* Detailed Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Professional Background */}
            <div className="bg-slate-50 rounded-xl p-6 shadow-md">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Professional Background</h4>
              <p className="text-slate-600 mb-4 leading-relaxed">
                With over a decade of experience, Leonita has helped countless families find their dream homes with grit and enthusiasm. 
                As the Principal Registered Estate Agent and manager of House of Stone Properties, she specializes in working with 
                buyers, sellers, investors, businesses, developers, and land transactions across both residential and commercial sectors.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Known as a clear, innovative leader in the industry, she has spearheaded numerous real estate initiatives, 
                demonstrating exceptional sales volume and efficiency. Leonita feels blessed to work in the best business in the world 
                and is humbled to collaborate with so many forward-thinking, hard-working agents.
              </p>
              <p className="text-slate-600 leading-relaxed">
                She has worked for various organizations holding key positions in Zimbabwe, Australia, China and various other countries. 
                Her results-driven approach distinguishes her in the industry, focusing on building relationships, mutual respect, 
                and personal touches to achieve the best outcomes for her clients.
              </p>
            </div>

            {/* Areas of Expertise */}
            <div className="bg-slate-50 rounded-xl p-6 shadow-md">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Areas of Expertise</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-[#DCC471] rounded-full p-2 mr-3 mt-1">
                      <item.icon className="w-4 h-4 text-slate-900" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-900 text-sm">{item.title}</h5>
                      <p className="text-xs text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualifications */}
            <div className="bg-slate-50 rounded-xl p-6 shadow-md">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Qualifications & Certifications</h4>
              <div className="grid grid-cols-1 gap-2">
                {qualifications.map((qualification, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#DCC471] mr-2 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">{qualification}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Awards & Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-200 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="flex items-start">
                  <div className="bg-[#DCC471] rounded-full p-2 mr-4 mt-1">
                    <Trophy className="w-5 h-5 text-slate-900" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#DCC471] mb-1">{achievement.year}</div>
                    <h4 className="font-semibold text-slate-900 mb-2 text-sm">{achievement.title}</h4>
                    <p className="text-xs text-slate-600">{achievement.organization}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Co-Founder Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 text-white"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Co-Founder</h3>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h4 className="text-xl font-semibold text-[#DCC471] mb-2">Loraine Gatsi</h4>
              <p className="text-slate-300 mb-4">Co-Founder, Based in Australia</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Leonita, together with Loraine Gatsi based in Australia, Co-founded House of Stone Properties. 
                Their combined vision and international perspective have been instrumental in establishing HSP 
                as a premier real estate agency with global standards and local expertise.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const VisionSection = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Founder's Vision</h2>
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-lg italic text-slate-700 mb-6 leading-relaxed">
              "In other words, I am straightforward yet forward thinking, super social yet down to earth. 
              I have a competitive spirit and like to win on behalf of my clients, but do so with a calm demeanour, 
              polite manners, and always a smile. Everyone on our team is smart, educated, experienced and dedicated 
              to continual improvement."
            </blockquote>
            <cite className="text-[#DCC471] font-semibold">- Leonita Mhishi, Founder & CEO</cite>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-md text-center"
          >
            <div className="w-16 h-16 bg-[#DCC471] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-slate-900" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Client-Centric Approach</h3>
            <p className="text-slate-600 text-sm">
              Deeply committed to client satisfaction, ensuring every client feels valued and supported 
              throughout their real estate journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-md text-center"
          >
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-[#DCC471]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Innovation & Excellence</h3>
            <p className="text-slate-600 text-sm">
              Clear, innovative leadership in the industry, spearheading numerous real estate initiatives 
              with exceptional sales volume and efficiency.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-md text-center"
          >
            <div className="w-16 h-16 bg-[#DCC471] rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-slate-900" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Global Perspective</h3>
            <p className="text-slate-600 text-sm">
              International experience across Zimbabwe, Australia, China and other countries, 
              bringing global standards to the local market.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section className="py-16 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Connect With Our Founder</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Ready to work with visionary leadership? Get in touch with our founding team today.
          </p>
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-[#DCC471] mr-2" />
              <span className="text-slate-300">+263 772 329 569, +263 788 479 143</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-[#DCC471] mr-2" />
              <a href="mailto:info@hsp.co.zw" className="text-[#DCC471] hover:text-yellow-300 transition">info@hsp.co.zw</a>
            </div>
          </div>
          <p className="mt-4 text-slate-300 flex items-center justify-center">
            <MapPin className="w-4 h-4 mr-2" />
            21, Harare Drive, Borrowdale, Harare
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Founders = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Founder Profile Section */}
      <FounderProfile />
      
      {/* Vision Section */}
      <VisionSection />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Founders;