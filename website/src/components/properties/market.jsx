import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  PieChart,
  BarChart2,
  Map,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Download,
  FileText,
  Users,
  Target,
  Building2,
  Globe,
  Phone,
  Mail,
  Clock,
  Shield
} from 'lucide-react';
import { SiFsecure } from "react-icons/si";
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

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, index }) => (
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

// Report Card Component
const ReportCard = ({ title, features, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    viewport={{ once: true }}
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#C9A962]/30 transition-all duration-300"
  >
    <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
    <ul className="space-y-4">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-[#C9A962] flex-shrink-0 mt-0.5" />
          <span className="text-gray-400">{feature}</span>
        </li>
      ))}
    </ul>
    <Link
      to="/contact"
      className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300"
    >
      <Download className="w-4 h-4" />
      Request Report
    </Link>
  </motion.div>
);

// Stat Card Component
const StatCard = ({ value, label, trend, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-[#C9A962]/30 transition-all duration-300"
  >
    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent mb-2">
      {value}
    </div>
    <div className="text-gray-400 text-sm mb-2">{label}</div>
    {trend && (
      <div className={`inline-flex items-center gap-1 text-sm ${
        trend.positive ? 'text-green-400' : 'text-red-400'
      }`}>
        <TrendingUp className={`w-4 h-4 ${!trend.positive && 'rotate-180'}`} />
        {trend.value}
      </div>
    )}
  </motion.div>
);

const MarketAnalysis = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      icon: LineChart,
      title: "Trend Analysis",
      description: "Comprehensive analysis of market trends, price movements, and historical patterns across Zimbabwe's key property markets."
    },
    {
      icon: PieChart,
      title: "Demographics Study",
      description: "Detailed insights into population growth, income levels, and consumer behavior affecting property demand."
    },
    {
      icon: BarChart2,
      title: "Competition Analysis",
      description: "Assessment of market competition, comparable properties, and strategic positioning opportunities."
    },
    {
      icon: Map,
      title: "Location Intelligence",
      description: "In-depth analysis of location-based factors including infrastructure, amenities, and growth potential."
    }
  ];

  const reports = [
    {
      title: "Market Overview",
      features: [
        "Current market conditions snapshot",
        "Price trends by property type",
        "Supply and demand analysis",
        "Key market indicators",
        "Seasonal variations data"
      ]
    },
    {
      title: "Investment Analysis",
      features: [
        "ROI projections by area",
        "Rental yield comparisons",
        "Capital growth forecasts",
        "Risk assessment metrics",
        "Investment opportunity scores"
      ]
    },
    {
      title: "Growth Projections",
      features: [
        "5-year price forecasts",
        "Emerging hotspots identification",
        "Infrastructure impact analysis",
        "Economic factor correlations",
        "Market timing recommendations"
      ]
    }
  ];

  const marketStats = [
    { value: "12.5%", label: "Annual Price Growth", trend: { positive: true, value: "+2.3% YoY" } },
    { value: "$185K", label: "Average Property Price", trend: { positive: true, value: "+8.7% YoY" } },
    { value: "45 Days", label: "Avg. Days on Market", trend: { positive: true, value: "-12 days" } },
    { value: "6.2%", label: "Average Rental Yield", trend: { positive: true, value: "+0.5%" } }
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
          {/* Background Image */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/90 to-transparent z-10" />
            <div className="absolute inset-0 bg-[url('/mar.webp')] bg-cover bg-center opacity-40" />
          </div>
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
              <BarChart2 className="w-4 h-4 text-[#C9A962]" />
              <span className="text-[#C9A962] text-sm font-medium">Data-Driven Market Intelligence</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              Market Analysis
              <span className="block mt-2 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Services
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-400 mb-10 leading-relaxed"
            >
              Make informed decisions with our comprehensive market analysis services.
              Access deep insights into Zimbabwe's property market trends, valuations,
              and investment opportunities backed by data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
              >
                Request Analysis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/properties"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300"
              >
                <Building2 className="w-5 h-5" />
                View Properties
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Live Market Stats */}
      <section className="relative py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Zimbabwe Property Market Snapshot
            </h2>
            <p className="text-gray-400">Current market indicators as of Q4 2025</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {marketStats.map((stat, index) => (
              <StatCard key={index} {...stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Comprehensive{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Market Insights
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Our market analysis services provide the data and insights you need
              to make confident real estate decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="relative py-24 bg-[#0A1628]/50">
        <div className="absolute inset-0">
          <GridPattern />
          <FloatingOrb className="w-[400px] h-[400px] bg-[#1E3A5F] bottom-20 right-20" delay={3} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Our Analysis{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Reports
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Comprehensive reports tailored to your specific needs,
              delivered with actionable insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reports.map((report, index) => (
              <ReportCard key={index} {...report} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <GridPattern />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                How We Deliver{" "}
                <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                  Insights
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Our systematic approach combines multiple data sources and expert
                analysis to deliver actionable market intelligence.
              </p>
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Data Collection",
                    description: "We gather data from multiple sources including property listings, transactions, and economic indicators."
                  },
                  {
                    step: "02",
                    title: "Analysis & Processing",
                    description: "Our team analyzes trends, identifies patterns, and applies proprietary models to extract insights."
                  },
                  {
                    step: "03",
                    title: "Report Generation",
                    description: "We compile findings into clear, actionable reports tailored to your specific requirements."
                  },
                  {
                    step: "04",
                    title: "Consultation",
                    description: "Our experts walk you through the findings and help you understand the implications."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#C9A962] to-[#B8985A] rounded-xl flex items-center justify-center">
                      <span className="text-[#0A1628] font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/20 to-transparent rounded-2xl blur-3xl" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Request Custom Analysis
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Need specific market insights? Our team can prepare a customized
                  analysis report tailored to your requirements.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    { icon: FileText, text: "Custom report scope" },
                    { icon: Target, text: "Specific location analysis" },
                    { icon: FaRegCircleUser, text: "Target audience insights" },
                    { icon: Globe, text: "Comparative market study" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <item.icon className="w-5 h-5 text-[#C9A962]" />
                      <span className="text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
                >
                  Get Custom Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="relative py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { icon: SiFsecure, text: "Trusted by 150+ Investors" },
              { icon: Clock, text: "15+ Years Market Experience" },
              { icon: TrendingUp, text: "Accurate Price Forecasts" },
              { icon: FileText, text: "Comprehensive Reports" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-[#C9A962]/10 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#C9A962]" />
                </div>
                <span className="text-gray-400">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-[#C9A962]/10 to-transparent">
        <GridPattern />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 border border-[#C9A962]/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#C9A962]" />
              <span className="text-[#C9A962] text-sm font-medium">Data-Driven Real Estate Intelligence</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready for{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Market Insights?
              </span>
            </h2>

            <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
              Contact us today to discuss your market analysis needs.
              Our team is ready to provide the insights you need for confident decision-making.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
              >
                Request Analysis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="mailto:analysis@houseofstone.co.zw"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                analysis@houseofstone.co.zw
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MarketAnalysis;
