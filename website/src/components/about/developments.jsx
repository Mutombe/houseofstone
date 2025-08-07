import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  Home,
  DollarSign,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Clock,
  Calculator,
  Search,
  MapPin,
  Star,
  Sparkles,
  Phone,
  Mail,
  BookOpen,
  Users,
  Building,
  Target,
  Award,
  PlusCircle,
  MinusCircle
} from "lucide-react";

// Brand colors consistent with existing pages
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
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
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
              Expert Seller Resources
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Seller</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCC471] to-yellow-300">
              Developments
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Comprehensive guides and tools to help you make informed decisions about selling your property
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <GlowButton
              onClick={() => document.getElementById('guides-section').scrollIntoView({ behavior: 'smooth' })}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Explore Guides
            </GlowButton>
            <GlowButton variant="secondary"
              onClick={() => window.location.href = "/contact"}
            >
              <Phone className="w-5 h-5 mr-2" />
              Get Expert Advice
            </GlowButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const GuideCard = ({ title, description, icon: Icon, questions, tips }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-slate-800 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-[#DCC471]" />
          </div>
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-600 hover:text-slate-800 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isExpanded ? (
              <MinusCircle className="w-6 h-6" />
            ) : (
              <PlusCircle className="w-6 h-6" />
            )}
          </motion.button>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isExpanded ? "auto" : 0, 
            opacity: isExpanded ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {questions && (
            <div className="mb-4">
              <h4 className="font-semibold text-slate-800 mb-2">Key Questions:</h4>
              <ul className="space-y-1">
                {questions.map((question, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[#DCC471] mr-2 mt-0.5 flex-shrink-0" />
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {tips && (
            <div className="mb-4">
              <h4 className="font-semibold text-slate-800 mb-2">Expert Tips:</h4>
              <ul className="space-y-1">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <Star className="w-4 h-4 text-[#DCC471] mr-2 mt-0.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-500">
            Click to {isExpanded ? 'collapse' : 'expand'}
          </span>
          
          <GlowButton
            onClick={() => window.location.href = "/contact"}
            className="px-4 py-2 text-sm"
          >
            <Users className="w-4 h-4 mr-1" />
            Get Help
          </GlowButton>
        </div>
      </div>
    </motion.div>
  );
};

const SellerGuidesSection = () => {
  const guides = [
    {
      title: "Should I sell my home now?",
      description: "Questions to ask to help you figure out if selling makes sense for you right now.",
      icon: Clock,
      questions: [
        "Is the current market favorable for sellers in my area?",
        "Do I have a clear plan for where I'll live next?",
        "Are my personal finances stable enough for a move?",
        "Have I considered the costs of selling (agent fees, taxes, repairs)?",
        "Is my mortgage situation conducive to selling now?",
        "Are there any major life changes on the horizon?"
      ],
      tips: [
        "Consider seasonal market trends in Zimbabwe",
        "Evaluate your equity position in the property",
        "Factor in current interest rates and economic conditions",
        "Assess your emotional readiness for the selling process"
      ]
    },
    {
      title: "How much is my home worth?",
      description: "Tools and advice to help you understand your home's value.",
      icon: Calculator,
      questions: [
        "What are similar properties selling for in my neighborhood?",
        "What improvements have I made that add value?",
        "How does my property compare to others on the market?",
        "What unique features does my property offer?",
        "Are there any factors that might affect my property's value?",
        "When was my last professional valuation done?"
      ],
      tips: [
        "Get a professional valuation from HSP for accurate pricing",
        "Research recent sales in your suburb using property websites",
        "Consider factors like location, size, condition, and amenities",
        "Account for current market conditions and demand trends"
      ]
    },
    {
      title: "How should I sell my home?",
      description: "Rundown of your options as well as pros and cons of each method.",
      icon: Target,
      questions: [
        "Should I use a real estate agent or sell privately?",
        "What are the benefits of working with HSP?",
        "How long am I willing to wait for the right buyer?",
        "Do I need to sell quickly or can I wait for the best price?",
        "What marketing strategies work best for my property type?",
        "Should I consider auctions or private treaty sales?"
      ],
      tips: [
        "Professional agents have market knowledge and negotiation skills",
        "Private sales save on commission but require more personal time",
        "Consider your property's unique selling points when choosing strategy",
        "HSP offers comprehensive marketing across multiple platforms"
      ]
    },
    {
      title: "How to prepare your home for sale",
      description: "Things to consider that could maximize your home's value.",
      icon: Home,
      questions: [
        "What repairs or maintenance does my property need?",
        "Which improvements will give me the best return on investment?",
        "How can I improve my property's curb appeal?",
        "Should I stage my home or sell it empty?",
        "What documents and certificates do I need ready?",
        "How can I make my property more appealing to buyers?"
      ],
      tips: [
        "Focus on cost-effective improvements like fresh paint and landscaping",
        "Declutter and depersonalize to help buyers envision themselves living there",
        "Ensure all systems (plumbing, electrical) are in working order",
        "Gather all relevant property documents including title deeds and rates clearances"
      ]
    }
  ];

  return (
    <section id="guides-section" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Seller Guides
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive resources to guide you through every step of the selling process. 
            Make informed decisions with expert insights from House of Stone Properties.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide, index) => (
            <GuideCard
              key={index}
              {...guide}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const MarketInsightsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Market Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay informed about the Zimbabwe property market with our expert analysis and trends.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-slate-800 rounded-xl p-6 text-white"
          >
            <TrendingUp className="w-8 h-8 text-[#DCC471] mb-4" />
            <h3 className="text-xl font-bold mb-3">Market Trends</h3>
            <p className="text-gray-300 text-sm mb-4">
              Current trends in the Zimbabwe property market including price movements, demand patterns, and investment opportunities.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-[#DCC471] mr-2" />
                Residential market performance
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-[#DCC471] mr-2" />
                Commercial property outlook
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-[#DCC471] mr-2" />
                Investment opportunities
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg"
          >
            <MapPin className="w-8 h-8 text-[#DCC471] mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">Location Analysis</h3>
            <p className="text-gray-600 text-sm mb-4">
              Detailed analysis of different suburbs and areas in Harare and across Zimbabwe to help you understand location-specific market dynamics.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-[#DCC471] mr-2" />
                Borrowdale & surrounding areas
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-[#DCC471] mr-2" />
                City center commercial district
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-[#DCC471] mr-2" />
                Emerging suburban developments
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#DCC471] rounded-xl p-6 text-slate-900"
          >
            <Award className="w-8 h-8 text-slate-800 mb-4" />
            <h3 className="text-xl font-bold mb-3">HSP Advantage</h3>
            <p className="text-slate-800 text-sm mb-4">
              Why sellers choose House of Stone Properties for their property transactions and development guidance.
            </p>
            <ul className="space-y-2 text-sm text-slate-800">
              <li className="flex items-center">
                <Star className="w-4 h-4 text-slate-800 mr-2" />
                35+ years combined experience
              </li>
              <li className="flex items-center">
                <Star className="w-4 h-4 text-slate-800 mr-2" />
                Comprehensive marketing platform
              </li>
              <li className="flex items-center">
                <Star className="w-4 h-4 text-slate-800 mr-2" />
                Legal expertise and compliance
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    {
      step: "1",
      title: "Initial Consultation",
      description: "Meet with our experts to discuss your property and selling goals",
      icon: Users
    },
    {
      step: "2", 
      title: "Property Valuation",
      description: "Professional assessment of your property's current market value",
      icon: Calculator
    },
    {
      step: "3",
      title: "Marketing Strategy",
      description: "Develop a comprehensive marketing plan tailored to your property",
      icon: Target
    },
    {
      step: "4",
      title: "Property Preparation",
      description: "Guidance on preparing your property to maximize its appeal",
      icon: Home
    },
    {
      step: "5",
      title: "Marketing Launch",
      description: "Execute marketing across our extensive platform and networks",
      icon: TrendingUp
    },
    {
      step: "6",
      title: "Sale Completion",
      description: "Negotiate offers and complete the sale with full legal compliance",
      icon: CheckCircle
    }
  ];

  return (
    <section className="py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Selling Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A proven step-by-step approach to selling your property efficiently and at the best possible price.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 relative"
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#DCC471] rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">
                {step.step}
              </div>
              
              <div className="mb-4">
                <step.icon className="w-8 h-8 text-slate-800" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {step.title}
              </h3>
              
              <p className="text-gray-600 text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Selling Journey?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Let our experienced team guide you through every step of selling your property. 
            Get started with a free consultation and property valuation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <GlowButton
              onClick={() => window.location.href = "/contact"}
              className="px-8 py-4 text-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Schedule Consultation
            </GlowButton>
            <GlowButton 
              variant="secondary"
              onClick={() => window.location.href = "mailto:info@hsp.co.zw"}
              className="px-8 py-4 text-lg"
            >
              <Mail className="w-5 h-5 mr-2" />
              Request Valuation
            </GlowButton>
          </div>

          <div className="border-t border-gray-600 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <DollarSign className="w-8 h-8 text-[#DCC471] mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-1">Free Valuation</h3>
                <p className="text-gray-400 text-sm">No obligation property assessment</p>
              </div>
              <div>
                <Users className="w-8 h-8 text-[#DCC471] mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-1">Expert Guidance</h3>
                <p className="text-gray-400 text-sm">35+ years of combined experience</p>
              </div>
              <div>
                <Award className="w-8 h-8 text-[#DCC471] mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-1">Proven Results</h3>
                <p className="text-gray-400 text-sm">Track record of successful sales</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Developments = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <SellerGuidesSection />
      <MarketInsightsSection />
      <ProcessSection />
      <CTASection />
      
      {/* Contact Footer */}
      <section className="py-16 bg-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Get Expert Advice</h2>
            <p className="text-stone-600 mb-8 max-w-xl mx-auto">
              Contact our team for personalized guidance on selling your property or development opportunities.
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

export default Developments;