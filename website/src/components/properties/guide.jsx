// website/src/components/properties/guide.jsx
import React, { useState } from "react";
import {
  PlusCircle,
  Calculator,
  FileText,
  Home,
  TrendingUp,
  Eye,
  DollarSign,
  CheckCircle,
  Phone,
  Mail,
  Camera,
  Star,
  Award,
  Clock,
  Users,
  BookOpen,
  Target,
  Heart,
  Sparkles,
  ArrowRight,
  Download,
  ChevronDown,
  MapPin,
  Handshake,
  Scale,
  ChevronUp,
  Shield,
  Lightbulb,
  Zap,
  ThumbsUp,
  TrendingDown,
  AlertCircle,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

// Grid Pattern Background
const GridPattern = () => (
  <div className="absolute inset-0 opacity-[0.02]">
    <svg width="100%" height="100%">
      <defs>
        <pattern id="guide-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#guide-grid)" />
    </svg>
  </div>
);

// Floating Element Animation
const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
  >
    {children}
  </motion.div>
);

const SellingGuidePage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const guideSteps = [
    {
      id: "location",
      title: "1. Know Your Location",
      icon: MapPin,
      overview: "Your location significantly impacts your asking price. Proper research ensures you price competitively.",
      details: [
        {
          subtitle: "Work with Registered Professionals",
          content: "List with a registered real estate agency regulated by the EAC. House of Stone Properties is a registered brand with experience providing accurate appraisals in your neighborhood."
        },
        {
          subtitle: "Research Comparable Properties",
          content: "Check with competing properties in your neighborhood to acquire precise insight on market rates and buyer expectations."
        },
        {
          subtitle: "Professional Marketing Approach",
          content: "House of Stone Properties utilizes online platforms, produces professional photos, and conducts open houses to reach potential buyers using expert real estate tactics."
        }
      ],
      checklist: [
        "Verify agency registration with EAC",
        "Research neighborhood comparables",
        "Review professional marketing plan",
        "Understand location advantages"
      ]
    },
    {
      id: "preparation",
      title: "2. Property Preparation",
      icon: Home,
      overview: "First impressions matter. Proper preparation increases perceived value and buyer interest.",
      details: [
        {
          subtitle: "Repair and Clean Thoroughly",
          content: "Dirty and damaged infrastructure demotivates potential buyers. Bathrooms, walls and floors need professional cleaning and grooming."
        },
        {
          subtitle: "Create Lasting Impressions",
          content: "Sell a property you would be happy to buy and feel safe in. This approach ensures buyer confidence and higher offers."
        },
        {
          subtitle: "Depersonalize and Declutter",
          content: "Remove personal items and additional furniture to help buyers envision themselves in the space."
        },
        {
          subtitle: "Enhance Exterior Appeal",
          content: "Improve the exterior of your property with landscaping, painting, or other enhancements to boost curb appeal."
        }
      ],
      checklist: [
        "Professional cleaning of key areas",
        "Repair visible damages",
        "Remove personal items",
        "Declutter living spaces",
        "Enhance exterior appearance"
      ]
    },
    {
      id: "closing",
      title: "3. Close the Sale & Make Money",
      icon: Handshake,
      overview: "Expert negotiation and transaction management ensure you get the best possible terms and price.",
      details: [
        {
          subtitle: "Comprehensive Offer Review",
          content: "We help review offers, considering not only the price but also the buyer's financing, timeline, and contingencies."
        },
        {
          subtitle: "Expert Negotiation",
          content: "Our prowess is to negotiate favorable terms with potential buyers that protect your interests."
        },
        {
          subtitle: "Transaction Finalization",
          content: "Once we secure your interests along with the buyer's, we finalize the sale with all necessary paperwork and work with a conveyancer to complete the transaction."
        }
      ],
      checklist: [
        "Review all offer terms",
        "Negotiate favorable conditions",
        "Secure buyer commitments",
        "Complete legal paperwork",
        "Finalize transaction with conveyancer"
      ]
    },
    {
      id: "considerations",
      title: "4. What to Consider?",
      icon: Scale,
      overview: "Choosing the right agency ensures your interests are protected throughout the selling process.",
      details: [
        {
          subtitle: "Select a Reputable Agency",
          content: "House of Stone is a reputable real estate agency. Choose an agency you are sure will exhaust all effort to secure your interests as we will faithfully do."
        },
        {
          subtitle: "Transparency in Process",
          content: "With our mission escorted with transparency, we commit to helping you understand the costs of selling your property and the legal aspects of selling your home."
        }
      ],
      checklist: [
        "Verify agency reputation",
        "Understand all associated costs",
        "Review legal requirements",
        "Ensure transparent communication"
      ]
    },
  ];

  const timeline = [
    { phase: "Location Analysis", duration: "1 week", description: "Research comparables, determine optimal pricing" },
    { phase: "Property Preparation", duration: "2-3 weeks", description: "Cleaning, repairs, and staging" },
    { phase: "Marketing & Showings", duration: "3-6 weeks", description: "Professional photos, listings, open houses" },
    { phase: "Offer Negotiation", duration: "1-2 weeks", description: "Review offers, negotiate terms" },
    { phase: "Closing Process", duration: "4-6 weeks", description: "Legal paperwork, conveyancing, finalization" }
  ];

  return (
    <div className="min-h-screen bg-[#060D16]">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#060D16] to-[#0F1D2F]" />
        <GridPattern />
        <FloatingOrb className="w-[600px] h-[600px] bg-[#C9A962] -top-40 -right-40" delay={0} />
        <FloatingOrb className="w-[400px] h-[400px] bg-[#1E3A5F] bottom-0 left-0" delay={2} />

        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-[#C9A962]/10 rounded-full mb-6 backdrop-blur-sm border border-[#C9A962]/20">
              <BookOpen className="w-5 h-5 text-[#C9A962] mr-2" />
              <span className="text-[#C9A962] font-medium">Expert Guidance</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Complete{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Selling Guide
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              Everything you need to know to sell your property successfully in Zimbabwe's market
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('guide-steps').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Start Reading
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download PDF Guide
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        <FloatingElement delay={0}>
          <div className="absolute top-20 left-10 w-16 h-16 bg-[#C9A962]/10 rounded-full backdrop-blur-sm border border-[#C9A962]/20 hidden lg:block" />
        </FloatingElement>
        <FloatingElement delay={1}>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-[#C9A962]/10 rounded-full backdrop-blur-sm border border-[#C9A962]/20 hidden lg:block" />
        </FloatingElement>
      </section>

      {/* Quick Stats */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0A1628]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: LiaAwardSolid, number: "95%", label: "Success Rate", color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { icon: Clock, number: "45", label: "Avg Days to Sell", color: "text-blue-400", bg: "bg-blue-500/10" },
              { icon: TrendingUp, number: "$12K", label: "Avg Price Increase", color: "text-[#C9A962]", bg: "bg-[#C9A962]/10" },
              { icon: FaRegCircleUser, number: "500+", label: "Happy Sellers", color: "text-purple-400", bg: "bg-purple-500/10" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-[#C9A962]/30 transition-all duration-300"
              >
                <div className={`inline-flex p-4 rounded-xl ${stat.bg} mb-4`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Guide Steps */}
      <section id="guide-steps" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] to-[#060D16]" />
        <GridPattern />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 bg-[#C9A962]/10 rounded-full mb-6 border border-[#C9A962]/20"
            >
              <Sparkles className="w-5 h-5 text-[#C9A962] mr-2" />
              <span className="text-[#C9A962] font-medium">Step-by-Step Process</span>
            </motion.div>

            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Your Selling Journey
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Follow our proven 4-step process to maximize your property's value and ensure a smooth sale
            </p>
          </div>

          <div className="space-y-6">
            {guideSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#C9A962]/30 transition-all duration-300"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => toggleSection(step.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-[#C9A962]/10 rounded-xl border border-[#C9A962]/20">
                        <step.icon className="w-6 h-6 text-[#C9A962]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                        <p className="text-gray-400 mt-1">{step.overview}</p>
                      </div>
                    </div>
                    <div className="text-[#C9A962]">
                      {expandedSection === step.id ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedSection === step.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10"
                    >
                      <div className="p-6 space-y-6">
                        {/* Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">
                              Detailed Steps
                            </h4>
                            <div className="space-y-4">
                              {step.details.map((detail, idx) => (
                                <div key={idx} className="bg-[#0A1628] p-4 rounded-xl border border-white/5">
                                  <h5 className="font-semibold text-[#C9A962] mb-2">
                                    {detail.subtitle}
                                  </h5>
                                  <p className="text-sm text-gray-400">
                                    {detail.content}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">
                              Checklist
                            </h4>
                            <div className="space-y-2">
                              {step.checklist.map((item, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-center p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20"
                                >
                                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                                  <span className="text-sm text-gray-300">{item}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0A1628]" />
        <FloatingOrb className="w-[400px] h-[400px] bg-[#C9A962] top-1/2 -left-40" delay={0} />
        <FloatingOrb className="w-[300px] h-[300px] bg-[#1E3A5F] bottom-0 right-0" delay={2} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Typical Selling Timeline
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Understanding the timeline helps you plan and set realistic expectations
            </p>
          </div>

          <div className="relative">
            {/* Timeline line - hidden on mobile */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#C9A962] via-[#C9A962]/50 to-[#C9A962]/20 hidden lg:block" />

            {/* Mobile timeline line */}
            <div className="absolute left-6 w-0.5 h-full bg-gradient-to-b from-[#C9A962] via-[#C9A962]/50 to-[#C9A962]/20 lg:hidden" />

            {timeline.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-row`}
              >
                {/* Desktop layout */}
                <div className={`hidden lg:block w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-[#C9A962]/30 transition-all duration-300">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {phase.phase}
                    </h3>
                    <div className="text-[#C9A962] font-semibold mb-2">
                      {phase.duration}
                    </div>
                    <p className="text-gray-400 text-sm">
                      {phase.description}
                    </p>
                  </div>
                </div>

                {/* Desktop center dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#C9A962] rounded-full border-4 border-[#0A1628] hidden lg:block" />

                {/* Mobile layout */}
                <div className="lg:hidden flex items-start pl-12">
                  <div className="absolute left-4 w-4 h-4 bg-[#C9A962] rounded-full border-4 border-[#0A1628]" />
                  <div className="bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {phase.phase}
                    </h3>
                    <div className="text-[#C9A962] font-semibold text-sm mb-2">
                      {phase.duration}
                    </div>
                    <p className="text-gray-400 text-sm">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] to-[#060D16]" />
        <GridPattern />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Zimbabwe Market Insights
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Local market knowledge that gives you an edge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-[#C9A962]/30 transition-all duration-300"
            >
              <div className="p-3 bg-blue-500/10 rounded-xl w-fit mb-4 border border-blue-500/20">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                Best Selling Seasons
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                March-May and August-October typically see highest buyer activity in Zimbabwe's property market.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                  Spring: New year property searches
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                  Fall: Pre-holiday relocations
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                  Avoid December-January
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-[#C9A962]/30 transition-all duration-300"
            >
              <div className="p-3 bg-emerald-500/10 rounded-xl w-fit mb-4 border border-emerald-500/20">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                Popular Areas
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Borrowdale, Mount Pleasant, and Highlands remain top choices for buyers seeking quality properties.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2" />
                  Borrowdale: Premium family homes
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2" />
                  Mount Pleasant: Central location
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2" />
                  Highlands: Established community
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-[#C9A962]/30 transition-all duration-300"
            >
              <div className="p-3 bg-[#C9A962]/10 rounded-xl w-fit mb-4 border border-[#C9A962]/20">
                <DollarSign className="w-6 h-6 text-[#C9A962]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                Price Trends
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                USD pricing remains standard, with properties under $300K seeing fastest turnover rates.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mr-2" />
                  $150K-$300K: High demand
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mr-2" />
                  $300K+: Longer market time
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mr-2" />
                  Cash buyers: 60% of market
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ready to Sell CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C9A962] to-[#B8985A]" />
        <FloatingOrb className="w-[400px] h-[400px] bg-white/20 top-1/2 -right-40" delay={0} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-4">
              Ready to Start Selling?
            </h2>
            <p className="text-lg text-[#0A1628]/80 max-w-3xl mx-auto mb-10">
              Put this guide into action with our expert team by your side
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = "/sell"}
                className="px-8 py-4 bg-[#0A1628] text-white font-semibold rounded-xl hover:bg-[#060D16] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                List Your Property
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = "/sell/valuation"}
                className="px-8 py-4 bg-white/90 text-[#0A1628] font-semibold rounded-xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Get Free Valuation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#060D16]" />
        <GridPattern />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-400">
              Quick answers to common selling questions
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How long does it typically take to sell a property?",
                answer: "On average, well-prepared and properly priced properties sell within 6-8 weeks in Zimbabwe's current market. However, this can vary based on location, price point, and market conditions."
              },
              {
                question: "What are the typical selling costs I should expect?",
                answer: "Expect to pay 3-5% in agent commission, legal fees (typically $500-$1500), marketing costs if not included, and any necessary repairs or staging expenses. We provide a detailed cost breakdown during our initial consultation."
              },
              {
                question: "Should I make renovations before selling?",
                answer: "Focus on high-impact, low-cost improvements like fresh paint, deep cleaning, and minor repairs. Major renovations rarely provide full return on investment. We can advise on specific improvements that make sense for your property."
              },
              {
                question: "How do I know if my asking price is realistic?",
                answer: "Our professional valuation considers recent comparable sales, current market conditions, and your property's unique features. We provide data-driven pricing recommendations to maximize your return while ensuring reasonable time on market."
              },
              {
                question: "What happens if my property doesn't sell?",
                answer: "We regularly review and adjust our marketing strategy. This might include price adjustments, enhanced marketing, additional staging, or addressing feedback from potential buyers. Our goal is to find the right buyer for your property."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#C9A962]/30 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#C9A962] mt-0.5 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-gray-400 pl-8">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0A1628]" />
        <FloatingOrb className="w-[300px] h-[300px] bg-[#C9A962] top-0 right-0" delay={0} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Our experienced agents are here to help you navigate the selling process with confidence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="tel:+263788479143"
              className="px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call +263 788 479 143
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:info@hsp.co.zw"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Email Our Team
            </motion.a>
          </div>
        </div>
      </section>

      {/* Download Guide CTA */}
      <section className="py-12 relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] to-[#060D16]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Take This Guide With You
              </h3>
              <p className="text-gray-400">
                Download the complete PDF version for offline reference
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download PDF Guide
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email Me the Guide
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellingGuidePage;
