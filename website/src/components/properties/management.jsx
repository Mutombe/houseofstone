import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Clock,
  Users,
  BarChart3,
  Wrench,
  Home,
  DollarSign,
  FileCheck,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Calendar,
  Key,
  ClipboardList,
  TrendingUp,
  Building2,
  HeartHandshake
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

// Service Card Component
const ServiceCard = ({ icon: Icon, title, description, index }) => (
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

// Package Card Component
const PackageCard = ({ title, price, features, popular, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    viewport={{ once: true }}
    className={`relative ${popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
  >
    {popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] text-sm font-semibold rounded-full">
        Most Popular
      </div>
    )}
    <div className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 h-full transition-all duration-300 ${
      popular ? 'border-[#C9A962]/50 shadow-lg shadow-[#C9A962]/10' : 'border-white/10 hover:border-[#C9A962]/30'
    }`}>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-bold bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
          {price}
        </span>
        <span className="text-gray-400">/month</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-[#C9A962] flex-shrink-0 mt-0.5" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/contact"
        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
          popular
            ? 'bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] hover:shadow-lg hover:shadow-[#C9A962]/25'
            : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-[#C9A962]/30'
        }`}
      >
        Get Started
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </motion.div>
);

// Feature List Item Component
const FeatureItem = ({ icon: Icon, title, description }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-12 h-12 bg-[#C9A962]/10 rounded-lg flex items-center justify-center">
      <Icon className="w-6 h-6 text-[#C9A962]" />
    </div>
    <div>
      <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const PropertyManagement = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const services = [
    {
      icon: Wrench,
      title: "Maintenance & Repairs",
      description: "24/7 property maintenance coordination and swift repair services to keep your property in prime condition year-round."
    },
    {
      icon: FaRegCircleUser,
      title: "Tenant Management",
      description: "Comprehensive tenant screening, lease management, and relationship handling to ensure quality occupancy."
    },
    {
      icon: DollarSign,
      title: "Rent Collection",
      description: "Efficient rent collection with automated payment systems and professional follow-up on late payments."
    },
    {
      icon: BarChart3,
      title: "Financial Reporting",
      description: "Detailed monthly financial statements and performance analytics with transparent expense tracking."
    },
    {
      icon: FileCheck,
      title: "Legal Compliance",
      description: "Navigate complex regulatory requirements with our expert knowledge of local property laws."
    },
    {
      icon: Home,
      title: "Property Marketing",
      description: "Strategic marketing to minimize vacancy rates and attract high-quality tenants quickly."
    },
    {
      icon: ClipboardList,
      title: "Property Inspections",
      description: "Regular property inspections with detailed reports to protect your investment and maintain standards."
    },
    {
      icon: Key,
      title: "Move-in/Move-out",
      description: "Seamless coordination of tenant transitions including inspections and security deposit handling."
    }
  ];

  const packages = [
    {
      title: "Essential",
      price: "8%",
      features: [
        "Rent collection & deposit",
        "Basic tenant screening",
        "Monthly financial reports",
        "Emergency maintenance coordination",
        "Online owner portal access"
      ],
      popular: false
    },
    {
      title: "Professional",
      price: "10%",
      features: [
        "Everything in Essential",
        "Full tenant screening & placement",
        "Quarterly property inspections",
        "Lease preparation & renewals",
        "Vendor management",
        "Maintenance coordination",
        "Eviction protection"
      ],
      popular: true
    },
    {
      title: "Premium",
      price: "12%",
      features: [
        "Everything in Professional",
        "Priority 24/7 support",
        "Monthly property inspections",
        "Renovation & upgrade consulting",
        "Rental rate optimization",
        "Tax documentation assistance",
        "Dedicated property manager"
      ],
      popular: false
    }
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 border border-[#C9A962]/20 rounded-full mb-6"
              >
                <SiFsecure className="w-4 h-4 text-[#C9A962]" />
                <span className="text-[#C9A962] text-sm font-medium">Professional Property Management</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              >
                Your Property,
                <span className="block mt-2 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                  Our Priority
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-400 mb-10 leading-relaxed"
              >
                Maximize your rental income while we handle the complexities.
                From tenant screening to maintenance, we provide comprehensive
                management solutions that protect and grow your investment.
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
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:+263772123456"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </a>
              </motion.div>
            </div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6">
                <FeatureItem
                  icon={TrendingUp}
                  title="Maximize Returns"
                  description="Our data-driven approach ensures optimal rental pricing and minimal vacancies."
                />
                <FeatureItem
                  icon={SiFsecure}
                  title="Protect Your Investment"
                  description="Comprehensive tenant screening and regular inspections safeguard your property."
                />
                <FeatureItem
                  icon={Clock}
                  title="24/7 Support"
                  description="Round-the-clock emergency response for both you and your tenants."
                />
                <FeatureItem
                  icon={HeartHandshake}
                  title="Peace of Mind"
                  description="Enjoy passive income while we handle all the day-to-day responsibilities."
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "200+", label: "Properties Managed" },
              { value: "95%", label: "Occupancy Rate" },
              { value: "48hrs", label: "Average Tenant Placement" },
              { value: "15+", label: "Years Experience" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
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
                Management Services
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Everything you need to maximize your property investment with
              minimal hassle. We handle the details so you don't have to.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-24 bg-[#0A1628]/50">
        <div className="absolute inset-0">
          <GridPattern />
          <FloatingOrb className="w-[400px] h-[400px] bg-[#1E3A5F] bottom-20 right-20" delay={3} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Transparent{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Simple, competitive pricing with no hidden fees.
              Choose the package that fits your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <PackageCard key={index} {...pkg} index={index} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 mt-8 text-sm"
          >
            * Percentage of monthly rent collected. Setup fees may apply.
            Contact us for a customized quote.
          </motion.p>
        </div>
      </section>

      {/* Why Choose Us Section */}
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
                Why Property Owners{" "}
                <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                  Choose Us
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                With over 15 years of experience in Zimbabwe's property market,
                we understand what it takes to maximize your rental returns
                while minimizing headaches.
              </p>
              <div className="space-y-4">
                {[
                  "Local market expertise and established vendor relationships",
                  "Cutting-edge property management technology",
                  "Transparent communication and real-time reporting",
                  "Dedicated property manager for each portfolio",
                  "Competitive management fees with no hidden costs"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-[#C9A962] flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
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
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C9A962] to-[#B8985A] rounded-xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-[#0A1628]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Get Started Today</h3>
                    <p className="text-gray-400">Free property assessment</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Schedule a free consultation to discuss your property management
                  needs. We'll provide a detailed proposal tailored to your portfolio.
                </p>
                <Link
                  to="/contact"
                  className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
                >
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
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
              <span className="text-[#C9A962] text-sm font-medium">Hassle-Free Property Management</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Maximize Your{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Rental Income?
              </span>
            </h2>

            <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
              Join hundreds of satisfied property owners who trust House of Stone
              to manage their investments. Let us handle the work while you enjoy
              the returns.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+263772123456"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                +263 772 123 456
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PropertyManagement;
