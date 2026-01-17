// src/components/about/about.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Building2,
  Users,
  BookOpen,
  Award,
  Home,
  Phone,
  Mail,
  Sparkles,
  Shield,
  TrendingUp,
  MapPin,
  Heart,
  Eye,
  UserCheck,
  Crown,
  Briefcase,
  Target,
  Star,
  GraduationCap,
  ArrowRight,
  Play,
  Quote,
  ChevronRight,
  Zap,
  Globe,
  CheckCircle,
  Calendar,
  Building,
  Gem,
  HandshakeIcon,
  Scale,
  Lightbulb,
} from "lucide-react";
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
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(#C9A962 1px, transparent 1px), linear-gradient(90deg, #C9A962 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
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

// Value Card Component
const ValueCard = ({ icon: Icon, title, description, index, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full hover:border-[#C9A962]/30 transition-all duration-500 hover:transform hover:-translate-y-2">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${color}`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// Service Item Component
const ServiceItem = ({ title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A962] to-[#B8985A] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        <CheckCircle className="w-5 h-5 text-[#0A1628]" />
      </div>
      <div>
        <h4 className="text-white font-semibold mb-1 group-hover:text-[#C9A962] transition-colors">
          {title}
        </h4>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ name, role, description, image, delay = 0, size = "normal" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const sizeClasses = size === "large"
    ? "md:col-span-2 md:row-span-2"
    : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={`group relative ${sizeClasses}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-[#0A1628] border border-white/10 rounded-3xl overflow-hidden h-full hover:border-[#C9A962]/30 transition-all duration-500">
        {/* Image Section */}
        <div className={`relative overflow-hidden ${size === "large" ? "h-64 md:h-80" : "h-48"}`}>
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a2a3a] to-[#0A1628] flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C9A962] to-[#B8985A] flex items-center justify-center">
                <span className="text-3xl font-bold text-[#0A1628]">
                  {name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#C9A962] transition-colors">
            {name}
          </h3>
          <p className="text-[#C9A962] font-medium text-sm mb-3">{role}</p>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Timeline Item Component
const TimelineItem = ({ year, title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A962] via-[#C9A962]/50 to-transparent" />

      {/* Timeline Dot */}
      <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[5px] rounded-full bg-[#C9A962] ring-4 ring-[#C9A962]/20" />

      {/* Content */}
      <div className="group">
        <span className="inline-block px-3 py-1 bg-[#C9A962]/10 text-[#C9A962] text-sm font-semibold rounded-full mb-3">
          {year}
        </span>
        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#C9A962] transition-colors">
          {title}
        </h4>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// Stat Card Component
const StatCard = ({ value, suffix, label, icon: Icon }) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-[#C9A962]/30 transition-all">
      <Icon className="w-8 h-8 text-[#C9A962] mx-auto mb-3" />
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
        <AnimatedCounter end={value} suffix={suffix} />
      </div>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  </div>
);

const About = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const values = [
    {
      icon: BookOpen,
      title: "Our Purpose",
      description:
        "At HSP, we value God, family and then business. This hierarchy influences everything we do as a company and has created the culture that you see today.",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      icon: Globe,
      title: "Our Vision",
      description:
        "To become a GLOBAL BRAND providing world-class real estate services that meet our clients' needs at all times, and the preferred place of employment for real estate professionals.",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To provide convenience for tenants, prospective landlords, property owners and investors by bringing them together to a place of satisfaction and comfort.",
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    },
    {
      icon: SiFsecure,
      title: "Core Values",
      description:
        "Our business is grounded in adherence to the principles of quality, honesty, transparency, integrity, and legality.",
      color: "bg-gradient-to-br from-[#C9A962] to-[#B8985A]",
    },
  ];

  const services = [
    {
      title: "Property Sales",
      description:
        "Comprehensive listings with extensive marketing and pre-sale enhancement advice.",
    },
    {
      title: "Letting & Management",
      description:
        "Full property management including marketing, tenant selection, and lease agreements.",
    },
    {
      title: "Property Valuations",
      description:
        "Specialist valuations for Commercial, Residential, Industrial and Leisure properties.",
    },
    {
      title: "Project Management",
      description:
        "Expert services from inception to completion including financial studies and supervision.",
    },
    {
      title: "Property Auctions",
      description:
        "Professional auction services for properties requiring immediate sale solutions.",
    },
  ];

  const differentiators = [
    "Strong links with the business community and commitment to industry regulations",
    "A quality team of dedicated real estate professionals",
    "Results driven, consistently outperforming competitors",
    "Focus on team development with ongoing training",
  ];

  const timeline = [
    {
      year: "2017",
      title: "Foundation",
      description:
        "House of Stone Properties was established with a vision to create an elite, professional boutique real estate company.",
    },
    {
      year: "2022",
      title: "Industry Recognition",
      description:
        "Awarded Agency of the Year by Propertybook, recognizing our excellence in real estate services.",
    },
    {
      year: "2023",
      title: "Media Expansion",
      description:
        "Launched Property Unlocked on ZTN Prime DSTV, bringing real estate insights to a wider audience.",
    },
    {
      year: "2025",
      title: "Awards & Growth",
      description:
        "Multiple award nominations including Women in Real Estate, Women in Business, and Women in Construction.",
    },
  ];

  const management = [
    {
      name: "George Maunganidze",
      role: "Head of Finance and HR",
      description:
        "Qualified Chartered Certified Accountant (ACCA) with over ten years of experience serving clients across manufacturing, mining, agri-business, and real estate sectors.",
    },
    {
      name: "Nairgel Masiiwa",
      role: "Head of Sales Department",
      description:
        "Seasoned sales professional with expertise in construction and architecture, consistently driving revenue growth and building high-performing sales teams.",
    },
    {
      name: "Winnifilda Shadaya",
      role: "Head of Rentals",
      description:
        "Over 14 years of experience in Zimbabwean and South African markets, known for exceptional negotiation skills and in-depth market knowledge.",
    },
    {
      name: "James Mudzikiti",
      role: "Head of Marketing",
      description:
        "Over 20 years of operational, tactical and strategic experience across business processes, with vast experience in press and public relations.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#060D16] pb-24 lg:pb-0">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/grp-hsp.jpeg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/80 via-[#0A1628]/60 to-[#060D16]" />
        </motion.div>

        <FloatingOrb className="w-[600px] h-[600px] bg-[#C9A962] -top-40 -right-40" />
        <FloatingOrb className="w-[400px] h-[400px] bg-blue-500 bottom-20 -left-20" delay={2} />
        <GridPattern />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex items-center"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8"
              >
                <Sparkles className="w-4 h-4 text-[#C9A962] mr-2" />
                <span className="text-gray-300 text-sm">
                  Proudly Zimbabwean, Anchored on The Rock of All Ages
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-[0.9]">
                <span className="text-white">About</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] via-[#DCC471] to-[#C9A962]">
                  House of Stone
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                Your Property, Our Priority
                <span className="text-[#C9A962]"> — </span>
                Takavimbika ~ Sithembekile
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all text-sm sm:text-base"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/sale"
                  className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all text-sm sm:text-base"
                >
                  View Properties
                  <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 bg-[#C9A962] rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCard value={8} suffix="+" label="Years Experience" icon={Calendar} />
            <StatCard value={500} suffix="+" label="Properties Sold" icon={Building} />
            <StatCard value={1000} suffix="+" label="Happy Clients" icon={Users} />
            <StatCard value={15} suffix="+" label="Expert Agents" icon={LiaAwardSolid} />
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative py-24 overflow-hidden">
        <FloatingOrb className="w-[500px] h-[500px] bg-[#C9A962] top-0 -right-60" delay={1} />
        <GridPattern />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 bg-[#C9A962]/10 text-[#C9A962] text-sm font-semibold rounded-full mb-6">
                  Our Story
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Building Dreams on a
                  <span className="text-[#C9A962]"> Solid Foundation</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-6 text-gray-400 leading-relaxed"
              >
                <p>
                  At House of Stone Properties, we believe real estate should be clear,
                  straightforward, and conducted with integrity. Our reputation is built
                  on dedication to our clients and mastering the complexities of our local
                  markets.
                </p>
                <p>
                  House of Stone Properties derives its name from the Word of God, Matthew
                  7:24-27 with a touch of inspiration from Dzimba DzeMabwe. Established in
                  2017, our vision was to create an elite, professional boutique real
                  estate company unlike any other.
                </p>
              </motion.div>

              {/* Quote Block */}
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mt-8 p-6 bg-white/5 backdrop-blur-xl border-l-4 border-[#C9A962] rounded-r-2xl"
              >
                <Quote className="absolute -top-3 -left-3 w-8 h-8 text-[#C9A962]" />
                <p className="text-white italic">
                  "Therefore everyone who hears these words of mine and puts them into
                  practice is like a wise man who built his house on the rock."
                </p>
                <cite className="text-[#C9A962] text-sm mt-2 block">— Matthew 7:24</cite>
              </motion.blockquote>
            </div>

            {/* Timeline */}
            <div className="lg:pl-12">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-white mb-8"
              >
                Our Journey
              </motion.h3>
              <div>
                {timeline.map((item, index) => (
                  <TimelineItem key={index} {...item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-24 bg-[#0A1628]">
        <FloatingOrb className="w-[400px] h-[400px] bg-purple-500 -top-20 -left-20" delay={0.5} />
        <GridPattern />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#C9A962]/10 text-[#C9A962] text-sm font-semibold rounded-full mb-6">
              What Drives Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Core <span className="text-[#C9A962]">Values</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide every decision we make and every relationship we build
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24 overflow-hidden">
        <FloatingOrb className="w-[500px] h-[500px] bg-[#C9A962] -bottom-40 -right-40" delay={1.5} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Services List */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-[#C9A962]/10 text-[#C9A962] text-sm font-semibold rounded-full mb-6">
                What We Offer
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Comprehensive <span className="text-[#C9A962]">Services</span>
              </h2>

              <div className="space-y-2">
                {services.map((service, index) => (
                  <ServiceItem key={index} {...service} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Differentiators Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/20 to-transparent rounded-3xl blur-xl" />
                <div className="relative bg-gradient-to-br from-[#0A1628] to-[#1a2a3a] border border-white/10 rounded-3xl p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#C9A962] to-[#B8985A] rounded-2xl flex items-center justify-center">
                      <Gem className="w-7 h-7 text-[#0A1628]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Why Choose HSP?</h3>
                      <p className="text-gray-400">Our Points of Difference</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {differentiators.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#C9A962]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-[#C9A962]" />
                        </div>
                        <p className="text-gray-300 leading-relaxed">{item}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <Link
                      to="/contact"
                      className="group inline-flex items-center text-[#C9A962] font-semibold hover:text-white transition-colors"
                    >
                      Start Your Property Journey
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="relative py-24 bg-[#0A1628]">
        <GridPattern />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#C9A962]/10 text-[#C9A962] text-sm font-semibold rounded-full mb-6">
              Leadership
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Meet Our <span className="text-[#C9A962]">Founder</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#C9A962]/10 to-transparent rounded-3xl blur-2xl" />
            <div className="relative bg-[#060D16] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {/* Image */}
                <div className="relative h-64 sm:h-80 md:h-auto md:min-h-[500px]">
                  <img
                    src="/icon.png"
                    alt="Leonita Mhishi"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-[#1a2a3a] to-[#0A1628] flex items-center justify-center">
                          <div class="w-32 h-32 rounded-full bg-gradient-to-br from-[#C9A962] to-[#B8985A] flex items-center justify-center">
                            <span class="text-4xl font-bold text-[#0A1628]">LM</span>
                          </div>
                        </div>
                      `;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#060D16] hidden md:block" />
                </div>

                {/* Content */}
                <div className="md:col-span-2 p-5 sm:p-8 md:p-12">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A962]" />
                    <span className="text-[#C9A962] font-medium text-sm sm:text-base">CEO & Founder</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    Leonita Mhishi
                  </h3>
                  <p className="text-gray-400 mb-6">Principal Registered Estate Agent</p>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      With over a decade of experience, Leonita has helped countless families
                      find their dream homes with grit and enthusiasm. As the Principal
                      Registered Estate Agent and manager of House of Stone Properties, she
                      specializes in working with buyers, sellers, investors, businesses,
                      developers, and land transactions across both residential and commercial
                      sectors.
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      Known as a clear, innovative leader in the industry, she has spearheaded
                      numerous real estate initiatives, demonstrating exceptional sales volume
                      and efficiency.
                    </p>
                  </div>

                  {/* Qualifications */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <GraduationCap className="w-5 h-5 text-[#C9A962] mr-2" />
                      Qualifications
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Bachelor of Laws (LLB), International Relations and Diplomacy, CIS, IMM,
                      Estate Agents Council Certification
                    </p>
                  </div>

                  {/* Awards */}
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <LiaAwardSolid className="w-5 h-5 text-[#C9A962] mr-2" />
                      Achievements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "2022 Agency of the Year",
                        "ZTN Prime Host",
                        "2023 Director of the Year",
                        "2025 Luxury Real Estate Award",
                      ].map((award, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm"
                        >
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Management Team Section */}
      <section className="relative py-24 overflow-hidden">
        <FloatingOrb className="w-[400px] h-[400px] bg-blue-500 top-20 -right-20" delay={0.5} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#C9A962]/10 text-[#C9A962] text-sm font-semibold rounded-full mb-6">
              Our Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Management <span className="text-[#C9A962]">Team</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experienced professionals dedicated to delivering excellence in every aspect of our
              service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {management.map((member, index) => (
              <TeamMemberCard key={index} {...member} delay={index * 0.1} />
            ))}
          </div>

          {/* View All Agents CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/agents"
              className="group inline-flex items-center px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all"
            >
              <Users className="mr-2 w-5 h-5 text-[#C9A962]" />
              View All Our Agents
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#1a2a3a]">
        <FloatingOrb className="w-[600px] h-[600px] bg-[#C9A962] -bottom-40 left-1/2 -translate-x-1/2" />
        <GridPattern />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[#C9A962] to-[#B8985A] rounded-2xl flex items-center justify-center mx-auto mb-8">
              <HandshakeIcon className="w-10 h-10 text-[#0A1628]" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your
              <br />
              <span className="text-[#C9A962]">Property Journey?</span>
            </h2>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Whether you're buying, selling, or investing, our team is here to guide you every
              step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all"
              >
                <Phone className="mr-2 w-5 h-5" />
                Contact Us Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="mailto:info@hsp.co.zw"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all"
              >
                <Mail className="mr-2 w-5 h-5 text-[#C9A962]" />
                info@hsp.co.zw
              </a>
            </div>

            {/* Contact Info */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400">
              <a
                href="tel:+263772329569"
                className="flex items-center hover:text-[#C9A962] transition-colors"
              >
                <Phone className="w-5 h-5 mr-2 text-[#C9A962]" />
                +263 772 329 569
              </a>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-[#C9A962]" />
                21 Harare Drive, Borrowdale
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
