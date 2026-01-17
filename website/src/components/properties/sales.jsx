import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  Award,
  TrendingUp,
  Camera,
  Users,
  Target,
  BarChart3,
  Shield,
  ArrowRight,
  Home,
  Sparkles,
  Clock,
  MessageSquare,
  FileText,
  Handshake
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

// Stat Counter Component
const StatItem = ({ value, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent mb-2">
      {value}
    </div>
    <div className="text-gray-400 text-sm uppercase tracking-wider">{label}</div>
  </motion.div>
);

// Benefit Card Component
const BenefitCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-[#C9A962]/30 transition-all duration-300">
      <div className="w-14 h-14 bg-gradient-to-br from-[#C9A962] to-[#B8985A] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7 text-[#0A1628]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// Process Step Component
const ProcessStep = ({ step, title, description, icon: Icon, index, isLast }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    viewport={{ once: true }}
    className="relative flex gap-6"
  >
    {/* Timeline Line */}
    {!isLast && (
      <div className="absolute left-7 top-16 w-0.5 h-full bg-gradient-to-b from-[#C9A962] to-[#C9A962]/20" />
    )}

    {/* Step Number */}
    <div className="relative z-10 flex-shrink-0">
      <div className="w-14 h-14 bg-gradient-to-br from-[#C9A962] to-[#B8985A] rounded-xl flex items-center justify-center shadow-lg shadow-[#C9A962]/20">
        <span className="text-[#0A1628] font-bold text-lg">{step}</span>
      </div>
    </div>

    {/* Content */}
    <div className="flex-1 pb-12">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#C9A962]/30 transition-colors duration-300">
        <div className="flex items-center gap-3 mb-3">
          <Icon className="w-5 h-5 text-[#C9A962]" />
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

const PropertySales = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const benefits = [
    {
      title: "Expert Guidance",
      description: "Our experienced agents provide personalized support throughout the entire selling process, ensuring you make informed decisions at every step.",
      icon: FaRegCircleUser,
    },
    {
      title: "Maximum Value",
      description: "Strategic pricing and targeted marketing to achieve the best possible sale price for your property in the current market.",
      icon: TrendingUp,
    },
    {
      title: "Premium Service",
      description: "Comprehensive service package including professional photography, virtual tours, and expert staging recommendations.",
      icon: LiaAwardSolid,
    },
    {
      title: "Market Intelligence",
      description: "Access to deep market insights and comparable sales data to position your property competitively.",
      icon: BarChart3,
    },
    {
      title: "Wide Network",
      description: "Leverage our extensive network of qualified buyers and partner agents to maximize exposure.",
      icon: Target,
    },
    {
      title: "Secure Transactions",
      description: "Full legal support and secure transaction handling to protect your interests throughout the sale.",
      icon: SiFsecure,
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Initial Consultation",
      description: "We meet to understand your goals, timeline, and property. Our experts assess your property's unique features and discuss the optimal selling strategy.",
      icon: MessageSquare,
    },
    {
      step: 2,
      title: "Property Preparation",
      description: "Professional staging consultation, photography session, and preparation of compelling marketing materials that showcase your property's best features.",
      icon: Camera,
    },
    {
      step: 3,
      title: "Strategic Marketing",
      description: "Multi-channel marketing campaign across digital platforms, social media, and our exclusive buyer network to reach qualified buyers.",
      icon: Target,
    },
    {
      step: 4,
      title: "Showings & Open Houses",
      description: "Expert handling of property viewings, open houses, and buyer inquiries. We pre-qualify all potential buyers to save your time.",
      icon: Home,
    },
    {
      step: 5,
      title: "Negotiation & Offers",
      description: "Skilled negotiation to secure the best possible terms. We handle all offers professionally and advise you on each one.",
      icon: FileText,
    },
    {
      step: 6,
      title: "Closing & Handover",
      description: "Seamless transaction management through to completion, including all legal documentation and final handover coordination.",
      icon: Handshake,
    },
  ];

  return (
    <div className="min-h-screen bg-[#060D16]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Elements */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#0F1D2F]" />
          <GridPattern />
          <FloatingOrb className="w-[600px] h-[600px] bg-[#C9A962] -top-40 -right-40" delay={0} />
          <FloatingOrb className="w-[400px] h-[400px] bg-[#1E3A5F] bottom-0 left-20" delay={2} />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 border border-[#C9A962]/20 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#C9A962]" />
              <span className="text-[#C9A962] text-sm font-medium">Premium Sales Service</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              Sell Your Property
              <span className="block mt-2 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                With Confidence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-400 mb-10 leading-relaxed"
            >
              Maximize your property's value with our premium sales service.
              From expert valuations to skilled negotiations, we handle every
              aspect of your property sale with professionalism and care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/valuation"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
              >
                Get Free Valuation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300"
              >
                Speak to an Agent
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Image Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('/sal.webp')] bg-cover bg-center opacity-50" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="500+" label="Properties Sold" />
            <StatItem value="98%" label="Client Satisfaction" />
            <StatItem value="21" label="Average Days to Sell" />
            <StatItem value="105%" label="Avg. Listing Price Achieved" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <GridPattern />
          <FloatingOrb className="w-[500px] h-[500px] bg-[#C9A962] top-1/4 -left-40" delay={1} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Why Sell With{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                House of Stone
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We combine market expertise with personalized service to deliver
              exceptional results for every property we sell.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24 bg-[#0A1628]/50">
        <div className="absolute inset-0">
          <GridPattern />
          <FloatingOrb className="w-[400px] h-[400px] bg-[#1E3A5F] bottom-20 right-20" delay={3} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Our Sales{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A streamlined, transparent approach to selling your property
              with maximum efficiency and results.
            </p>
          </motion.div>

          <div className="space-y-2">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                {...step}
                index={index}
                isLast={index === processSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C9A962]/10 to-transparent" />
          <GridPattern />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 border border-[#C9A962]/20 rounded-full mb-6">
              <Clock className="w-4 h-4 text-[#C9A962]" />
              <span className="text-[#C9A962] text-sm font-medium">Free No-Obligation Consultation</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Sell{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Your Property?
              </span>
            </h2>

            <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
              Contact us today for a free property valuation and personalized
              consultation. Let us show you how we can maximize your property's value.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/valuation"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
              >
                Get Your Free Valuation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300"
              >
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PropertySales;
