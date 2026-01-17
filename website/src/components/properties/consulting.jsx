import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  Target,
  TrendingUp,
  Building2,
  BarChart3,
  Users,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Award,
  Shield,
  Briefcase,
  PieChart,
  LineChart,
  Compass,
  BookOpen,
  Phone,
  MessageCircle
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

// Process Step Card Component
const ProcessCard = ({ step, title, description, quote, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    viewport={{ once: true }}
    className="relative"
  >
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-[#C9A962]/30 transition-all duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#C9A962] to-[#B8985A] rounded-xl flex items-center justify-center">
          <span className="text-[#0A1628] font-bold text-lg">{step}</span>
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
      <blockquote className="relative pl-4 border-l-2 border-[#C9A962]/50">
        <p className="text-sm text-gray-500 italic leading-relaxed">{quote}</p>
      </blockquote>
    </div>
  </motion.div>
);

// Expertise Card Component
const ExpertiseCard = ({ icon: Icon, title, items, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#C9A962]/30 transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-[#C9A962]/10 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#C9A962]" />
      </div>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
    </div>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm">
          <CheckCircle className="w-4 h-4 text-[#C9A962] flex-shrink-0 mt-0.5" />
          <span className="text-gray-400">{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const Consulting = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const services = [
    {
      icon: Lightbulb,
      title: "Investment Strategy",
      description: "Expert guidance on real estate investment opportunities and portfolio optimization tailored to your financial goals."
    },
    {
      icon: Target,
      title: "Market Research",
      description: "In-depth analysis of market trends, demographics, and investment potential across Zimbabwe's key property markets."
    },
    {
      icon: TrendingUp,
      title: "Value Enhancement",
      description: "Strategic recommendations for property value maximization through renovations, repositioning, and timing."
    },
    {
      icon: Building2,
      title: "Development Planning",
      description: "Comprehensive feasibility studies and planning for property development projects of any scale."
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Discovery",
      description: "We begin by understanding your unique goals, requirements, and investment timeline to create a tailored approach.",
      quote: "Our clients always come first. Continually striving to meet and exceed client needs and expectations remains our priority."
    },
    {
      step: 2,
      title: "Analysis",
      description: "Our team conducts detailed market research and opportunity analysis to identify the best options for your situation.",
      quote: "We are committed to providing the highest level of service through expert strategy, market insight and skilled negotiations."
    },
    {
      step: 3,
      title: "Implementation",
      description: "We work alongside you to execute the strategy, providing guidance and support through every step of the process.",
      quote: "Your Property, Our Priority - delivering excellence in every transaction."
    }
  ];

  const expertiseAreas = [
    {
      icon: PieChart,
      title: "Portfolio Management",
      items: [
        "Asset allocation strategies",
        "Risk assessment & mitigation",
        "Performance optimization",
        "Exit strategy planning"
      ]
    },
    {
      icon: LineChart,
      title: "Market Intelligence",
      items: [
        "Trend analysis & forecasting",
        "Competitive market studies",
        "Pricing strategy development",
        "Location evaluation"
      ]
    },
    {
      icon: Compass,
      title: "Due Diligence",
      items: [
        "Property inspections",
        "Legal compliance review",
        "Financial analysis",
        "Title verification"
      ]
    },
    {
      icon: BookOpen,
      title: "Transaction Advisory",
      items: [
        "Deal structuring",
        "Negotiation support",
        "Contract review",
        "Closing coordination"
      ]
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
              <Briefcase className="w-4 h-4 text-[#C9A962]" />
              <span className="text-[#C9A962] text-sm font-medium">Strategic Real Estate Consulting</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              Expert Guidance for
              <span className="block mt-2 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Smart Investments
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-400 mb-10 leading-relaxed"
            >
              Make informed real estate decisions with our comprehensive consulting services.
              From market analysis to investment strategy, we provide the insights you need
              to succeed in Zimbabwe's dynamic property market.
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
                Schedule Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+263772123456"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Speak to an Expert
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "$500M+", label: "Transactions Advised" },
              { value: "150+", label: "Clients Served" },
              { value: "15+", label: "Years Experience" },
              { value: "98%", label: "Client Satisfaction" }
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
              Our Consulting{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Providing accurate and sound advice using the highest standards
              of professionalism, excellence, and efficiency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} index={index} />
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Our Consulting{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A systematic approach to understanding and achieving your
              real estate goals with precision and care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <ProcessCard key={index} {...step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <GridPattern />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Areas of{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Deep knowledge across all aspects of real estate investment
              and property transactions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseAreas.map((area, index) => (
              <ExpertiseCard key={index} {...area} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-24 bg-[#0A1628]/50">
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
                Why Choose Our{" "}
                <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                  Consulting Team
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                With decades of combined experience in Zimbabwe's real estate market,
                our consulting team brings unparalleled expertise and a proven track
                record of success.
              </p>
              <div className="space-y-4">
                {[
                  { icon: LiaAwardSolid, text: "Award-winning team with proven track record" },
                  { icon: SiFsecure, text: "Independent advice with your interests first" },
                  { icon: FaRegCircleUser, text: "Extensive network of industry connections" },
                  { icon: BarChart3, text: "Data-driven insights and recommendations" },
                  { icon: MessageCircle, text: "Ongoing support throughout your journey" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-[#C9A962]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#C9A962]" />
                    </div>
                    <span className="text-gray-300">{item.text}</span>
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
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Ready to Get Started?
                  </h3>
                  <p className="text-gray-400">
                    Schedule a free initial consultation to discuss your needs
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#C9A962]" />
                    <span className="text-gray-300">Free 30-minute consultation</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#C9A962]" />
                    <span className="text-gray-300">No obligation to proceed</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#C9A962]" />
                    <span className="text-gray-300">Personalized recommendations</span>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
                >
                  Book Your Consultation
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
              <span className="text-[#C9A962] text-sm font-medium">Strategic Real Estate Advisory</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Optimize Your{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Real Estate Investments?
              </span>
            </h2>

            <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
              Contact us today to schedule a consultation with our experienced team.
              Let us help you navigate Zimbabwe's property market with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
              >
                Contact Us Today
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

export default Consulting;
