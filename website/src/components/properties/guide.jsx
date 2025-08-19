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

const SellingGuidePage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const guideSteps = [
    {
      id: "preparation",
      title: "1. Prepare Your Property",
      icon: Home,
      overview: "First impressions matter. Proper preparation can add thousands to your sale price.",
      details: [
        {
          subtitle: "Declutter and Clean",
          content: "Remove personal items and excess furniture. Deep clean every room, paying special attention to kitchens and bathrooms. Consider professional cleaning services for carpets and windows."
        },
        {
          subtitle: "Minor Repairs and Touch-ups",
          content: "Fix leaky faucets, squeaky doors, and minor wall damage. Fresh paint in neutral colors can make spaces feel larger and more appealing to buyers."
        },
        {
          subtitle: "Enhance Curb Appeal",
          content: "Maintain landscaping, clean exterior surfaces, and ensure the entrance is welcoming. Consider adding potted plants or updating exterior hardware."
        },
        {
          subtitle: "Staging Tips",
          content: "Arrange furniture to maximize space and flow. Use mirrors to create illusion of larger spaces. Ensure good lighting throughout the property."
        }
      ],
      checklist: [
        "Deep clean all rooms",
        "Declutter and depersonalize",
        "Complete minor repairs",
        "Enhance curb appeal",
        "Stage key rooms",
        "Ensure good lighting"
      ]
    },
    {
      id: "valuation",
      title: "2. Get Professional Valuation",
      icon: Calculator,
      overview: "Accurate pricing is crucial for a successful sale. Price too high and you'll sit on the market; too low and you'll leave money on the table.",
      details: [
        {
          subtitle: "Market Analysis",
          content: "Our experts analyze recent sales of similar properties in your area, current market conditions, and unique features of your property."
        },
        {
          subtitle: "Pricing Strategy",
          content: "We'll recommend a pricing strategy based on your timeline and goals. Sometimes pricing slightly below market value can generate multiple offers and higher final sale price."
        },
        {
          subtitle: "Regular Reviews",
          content: "Market conditions change. We'll regularly review and adjust pricing strategy if needed to ensure optimal results."
        }
      ],
      checklist: [
        "Request professional valuation",
        "Review comparable sales",
        "Understand market conditions",
        "Set realistic price expectations",
        "Plan pricing strategy"
      ]
    },
    {
      id: "marketing",
      title: "3. Marketing Your Property",
      icon: TrendingUp,
      overview: "Effective marketing reaches the right buyers and showcases your property's best features.",
      details: [
        {
          subtitle: "Professional Photography",
          content: "High-quality photos are essential. We arrange professional photography that highlights your property's best features and maximizes online appeal."
        },
        {
          subtitle: "Online Presence",
          content: "Your property will be listed on major real estate websites, our company website, and promoted through social media channels to maximize exposure."
        },
        {
          subtitle: "Traditional Marketing",
          content: "We use proven traditional methods including signage, print advertising, and direct mail to local area to reach all potential buyers."
        },
        {
          subtitle: "Virtual Tours",
          content: "360-degree virtual tours and video walkthroughs allow remote buyers to experience your property from anywhere in the world."
        }
      ],
      checklist: [
        "Professional photos taken",
        "Online listings active",
        "Social media promotion",
        "Signage installed",
        "Virtual tour created",
        "Marketing materials prepared"
      ]
    },
    {
      id: "showings",
      title: "4. Showings and Open Houses",
      icon: Eye,
      overview: "Make every showing count with proper preparation and presentation.",
      details: [
        {
          subtitle: "Scheduling Showings",
          content: "We handle all showing requests and work around your schedule. Flexible availability often leads to more viewings and offers."
        },
        {
          subtitle: "Preparing for Showings",
          content: "Ensure the property is clean and well-lit. Remove pets if possible, play soft background music, and consider light refreshments for open houses."
        },
        {
          subtitle: "Following Up",
          content: "We follow up with every potential buyer to gather feedback and gauge interest, keeping you informed throughout the process."
        }
      ],
      checklist: [
        "Schedule convenient showing times",
        "Prepare property before each showing",
        "Ensure good lighting and ambiance",
        "Collect and review feedback",
        "Follow up with interested buyers"
      ]
    },
    {
      id: "offers",
      title: "5. Receiving and Negotiating Offers",
      icon: DollarSign,
      overview: "When offers come in, skilled negotiation can make a significant difference to your final sale price.",
      details: [
        {
          subtitle: "Evaluating Offers",
          content: "We help you evaluate not just the price, but also the terms, buyer's financial qualification, and timeline to close."
        },
        {
          subtitle: "Negotiation Strategy",
          content: "Our experienced negotiators work to get you the best possible terms while keeping the deal on track to closing."
        },
        {
          subtitle: "Multiple Offers",
          content: "If you receive multiple offers, we'll help you navigate this situation to maximize your return while choosing the most reliable buyer."
        }
      ],
      checklist: [
        "Review all offer terms carefully",
        "Verify buyer's financing pre-approval",
        "Consider timeline and conditions",
        "Negotiate favorable terms",
        "Choose the best overall offer"
      ]
    },
    {
      id: "closing",
      title: "6. Closing the Sale",
      icon: CheckCircle,
      overview: "The final steps to transfer ownership and complete your successful sale.",
      details: [
        {
          subtitle: "Purchase Agreement",
          content: "Once you accept an offer, we'll manage the purchase agreement process, ensuring all legal requirements are met and your interests are protected."
        },
        {
          subtitle: "Inspections and Appraisals",
          content: "We coordinate buyer's inspections and appraisals, helping resolve any issues that arise to keep the sale on track."
        },
        {
          subtitle: "Final Walkthrough",
          content: "Before closing, the buyer will do a final walkthrough. We ensure the property is in the agreed-upon condition."
        },
        {
          subtitle: "Closing Day",
          content: "We'll be with you at closing to ensure all paperwork is properly executed and you receive your proceeds promptly."
        }
      ],
      checklist: [
        "Sign purchase agreement",
        "Coordinate inspections",
        "Address any issues found",
        "Prepare for final walkthrough",
        "Complete closing paperwork",
        "Receive your proceeds"
      ]
    }
  ];

  const tips = [
    {
      icon: Star,
      title: "Price Competitively",
      description: "Properties priced correctly from the start sell faster and often for more money."
    },
    {
      icon: Camera,
      title: "Invest in Great Photos",
      description: "Professional photography can increase your property's online views by up to 60%."
    },
    {
      icon: Clock,
      title: "Time Your Sale Right",
      description: "Spring and fall typically see higher buyer activity in the Zimbabwe market."
    },
    {
      icon: Shield,
      title: "Be Transparent",
      description: "Disclose known issues upfront to build trust and avoid delays during closing."
    },
    {
      icon: Users,
      title: "Work with Professionals",
      description: "Experienced agents, photographers, and lawyers save time and often pay for themselves."
    },
    {
      icon: Target,
      title: "Know Your Market",
      description: "Understanding local buyer preferences helps you present your property effectively."
    },
    {
      icon: Heart,
      title: "Stay Emotionally Detached",
      description: "Making decisions based on market data rather than emotions leads to better outcomes."
    },
    {
      icon: Zap,
      title: "Respond Quickly",
      description: "Fast responses to inquiries and offers show serious intent and keep momentum going."
    }
  ];

  const commonMistakes = [
    {
      icon: TrendingDown,
      title: "Overpricing Your Property",
      description: "The most common mistake. Overpriced properties sit on the market longer and often sell for less than well-priced ones.",
      solution: "Get a professional valuation and price competitively from day one."
    },
    {
      icon: AlertCircle,
      title: "Poor Quality Photos",
      description: "Blurry, dark, or unflattering photos turn away potential buyers before they even consider viewing.",
      solution: "Invest in professional photography - it's worth every penny."
    },
    {
      icon: Home,
      title: "Not Preparing the Property",
      description: "Selling a cluttered, dirty, or damaged property significantly reduces its appeal and value.",
      solution: "Spend time and money on preparation - the ROI is almost always positive."
    },
    {
      icon: Info,
      title: "Hiding Property Issues",
      description: "Concealing problems leads to deal collapse, legal issues, and damaged reputation.",
      solution: "Full disclosure builds trust and prevents costly surprises later."
    }
  ];

  const timeline = [
    { phase: "Preparation", duration: "2-4 weeks", description: "Clean, repair, and stage your property" },
    { phase: "Marketing Launch", duration: "1 week", description: "Professional photos, listings go live" },
    { phase: "Active Marketing", duration: "4-8 weeks", description: "Showings, open houses, feedback collection" },
    { phase: "Offer & Negotiation", duration: "1-2 weeks", description: "Review offers, negotiate terms" },
    { phase: "Closing Process", duration: "4-6 weeks", description: "Inspections, financing, legal completion" }
  ];

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
              <BookOpen className="w-5 h-5 text-[#DCC471] mr-2" />
              <span className="text-yellow-100 font-medium">Expert Guidance</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Complete <span className="text-[#DCC471]">Selling Guide</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Everything you need to know to sell your property successfully in Zimbabwe's market
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton onClick={() => document.getElementById('guide-steps').scrollIntoView({ behavior: 'smooth' })}>
                <BookOpen className="w-5 h-5 mr-2" />
                Start Reading
              </GlowButton>
              <GlowButton variant="secondary">
                <Download className="w-5 h-5 mr-2" />
                Download PDF Guide
              </GlowButton>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <FloatingElement delay={0}>
          <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-400/10 rounded-full backdrop-blur-sm border border-yellow-400/20" />
        </FloatingElement>
        <FloatingElement delay={1}>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-yellow-400/10 rounded-full backdrop-blur-sm border border-yellow-400/20" />
        </FloatingElement>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Award, number: "95%", label: "Success Rate", color: "text-green-500" },
              { icon: Clock, number: "45", label: "Avg Days to Sell", color: "text-blue-500" },
              { icon: TrendingUp, number: "$12K", label: "Avg Price Increase", color: "text-[#DCC471]" },
              { icon: Users, number: "500+", label: "Happy Sellers", color: "text-purple-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex p-4 rounded-full bg-slate-50 mb-4 ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Guide Steps */}
      <section id="guide-steps" className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 bg-[#DCC471]/10 rounded-full mb-6"
            >
              <Sparkles className="w-5 h-5 text-[#b07e28] mr-2" />
              <span className="text-slate-700 font-medium">Step-by-Step Process</span>
            </motion.div>
            
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Your Selling Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow our proven 6-step process to maximize your property's value and ensure a smooth sale
            </p>
          </div>

          <div className="space-y-6">
            {guideSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => toggleSection(step.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-[#DCC471]/10 rounded-xl">
                        <step.icon className="w-6 h-6 text-[#b07e28]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                        <p className="text-gray-600 mt-1">{step.overview}</p>
                      </div>
                    </div>
                    <div className="text-[#b07e28]">
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
                      className="border-t border-gray-100"
                    >
                      <div className="p-6 space-y-6">
                        {/* Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-4">
                              Detailed Steps
                            </h4>
                            <div className="space-y-4">
                              {step.details.map((detail, idx) => (
                                <div key={idx} className="bg-slate-50 p-4 rounded-xl">
                                  <h5 className="font-semibold text-slate-800 mb-2">
                                    {detail.subtitle}
                                  </h5>
                                  <p className="text-sm text-gray-700">
                                    {detail.content}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-4">
                              Checklist
                            </h4>
                            <div className="space-y-2">
                              {step.checklist.map((item, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-center p-3 bg-green-50 rounded-lg"
                                >
                                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                  <span className="text-sm text-slate-700">{item}</span>
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
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Typical Selling Timeline
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Understanding the timeline helps you plan and set realistic expectations
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#DCC471]/30" />
            
            {timeline.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {phase.phase}
                    </h3>
                    <div className="text-[#b07e28] font-semibold mb-2">
                      {phase.duration}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {phase.description}
                    </p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#DCC471] rounded-full border-4 border-slate-800" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 bg-[#DCC471]/10 rounded-full mb-6"
            >
              <Lightbulb className="w-5 h-5 text-[#b07e28] mr-2" />
              <span className="text-slate-700 font-medium">Expert Insights</span>
            </motion.div>
            
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Professional Selling Tips
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insider knowledge from our experienced agents to help you get the best price
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="p-3 bg-[#DCC471]/10 rounded-xl w-fit mb-4">
                  <tip.icon className="w-6 h-6 text-[#b07e28]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {tip.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full mb-6"
            >
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-700 font-medium">Avoid These Pitfalls</span>
            </motion.div>
            
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Common Selling Mistakes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from others' mistakes and avoid costly errors that could impact your sale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commonMistakes.map((mistake, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-400"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <mistake.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {mistake.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {mistake.description}
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg border-l-2 border-green-400">
                      <p className="text-sm text-green-800">
                        <strong>Solution:</strong> {mistake.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Zimbabwe Market Insights
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Local market knowledge that gives you an edge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700"
            >
              <div className="p-3 bg-blue-500/10 rounded-xl w-fit mb-4">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                Best Selling Seasons
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                March-May and August-October typically see highest buyer activity in Zimbabwe's property market.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Spring: New year property searches</li>
                <li>• Fall: Pre-holiday relocations</li>
                <li>• Avoid December-January</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700"
            >
              <div className="p-3 bg-green-500/10 rounded-xl w-fit mb-4">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                Popular Areas
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Borrowdale, Mount Pleasant, and Highlands remain top choices for buyers seeking quality properties.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Borrowdale: Premium family homes</li>
                <li>• Mount Pleasant: Central location</li>
                <li>• Highlands: Established community</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700"
            >
              <div className="p-3 bg-yellow-500/10 rounded-xl w-fit mb-4">
                <DollarSign className="w-6 h-6 text-[#DCC471]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                Price Trends
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                USD pricing remains standard, with properties under $300K seeing fastest turnover rates.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• $150K-$300K: High demand</li>
                <li>• $300K+: Longer market time</li>
                <li>• Cash buyers: 60% of market</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ready to Sell CTA */}
      <section className="py-16 bg-gradient-to-r from-[#DCC471] to-[#b07e28]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Ready to Start Selling?
            </h2>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-8">
              Put this guide into action with our expert team by your side
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton 
                variant="secondary" 
                onClick={() => window.location.href = "/sell"}
                className="bg-slate-900 text-white border-2 border-slate-900 hover:bg-white hover:text-slate-900"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                List Your Property
              </GlowButton>
              <GlowButton 
                variant="secondary"
                onClick={() => window.location.href = "/sell/valuation"}
                className="bg-slate-900 text-white border-2 border-slate-900 hover:bg-white hover:text-slate-900"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Get Free Valuation
              </GlowButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
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
                className="bg-slate-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our experienced agents are here to help you navigate the selling process with confidence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowButton onClick={() => window.location.href = "tel:+263788479143"}>
              <Phone className="w-5 h-5 mr-2" />
              Call +263 788 479 143
            </GlowButton>
            <GlowButton variant="secondary" onClick={() => window.location.href = "mailto:info@hsp.co.zw"}>
              <Mail className="w-5 h-5 mr-2" />
              Email Our Team
            </GlowButton>
          </div>
        </div>
      </section>

      {/* Download Guide CTA */}
      <section className="py-12 bg-gradient-to-r from-slate-700 to-slate-900 border-t border-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">
                Take This Guide With You
              </h3>
              <p className="text-gray-300">
                Download the complete PDF version for offline reference
              </p>
            </div>
            <div className="flex gap-4">
              <GlowButton>
                <Download className="w-5 h-5 mr-2" />
                Download PDF Guide
              </GlowButton>
              <GlowButton variant="secondary">
                <Mail className="w-5 h-5 mr-2" />
                Email Me the Guide
              </GlowButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellingGuidePage;