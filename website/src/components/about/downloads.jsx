import { motion } from "framer-motion";
import React from "react";
import {
  Download,
  FileText,
  ClipboardList,
  Home,
  Users,
  Shield,
  CheckCircle,
  ArrowRight,
  FileCheck,
  Sparkles,
  Phone,
  Mail,
} from "lucide-react";
import { SiFsecure } from "react-icons/si";
import { FaRegCircleUser } from "react-icons/fa6";

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
            backgroundPosition: "center",
            backgroundSize: "cover",
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
              Essential Forms & Documents
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Download</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCC471] to-yellow-300">
              Forms
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Access all the forms you need for property transactions, management,
            and legal documentation
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <GlowButton
              onClick={() =>
                document
                  .getElementById("forms-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <Download className="w-5 h-5 mr-2" />
              Browse Forms
            </GlowButton>
            <GlowButton
              variant="secondary"
              onClick={() => (window.location.href = "/contact")}
            >
              <Phone className="w-5 h-5 mr-2" />
              Need Help?
            </GlowButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const FormCard = ({
  title,
  description,
  icon: Icon,
  fileName,
  fileSize = "PDF",
  category,
}) => {
  const handleDownload = () => {
    // In a real application, this would trigger the actual file download
    alert(`Downloading ${title}...`);
    const link = document.createElement("a");
    link.href = `/forms/${fileName}`;
    link.download = fileName;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-slate-800 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-[#DCC471]" />
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
            {category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {fileSize}
          </span>

          <motion.button
            onClick={handleDownload}
            className="flex items-center space-x-2 bg-[#DCC471] hover:bg-[#b07e28] text-slate-900 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const FormsSection = () => {
  const forms = [
    {
      title: "Offer & Acceptance Form",
      description:
        "Comprehensive offer and acceptance form for property purchase agreements, including terms and conditions.",
      icon: Users,
      fileName: "OFFER AND ACCEPTANCE FORM 2024 (1).pdf",
      fileSize: "PDF • 2.4MB",
      category: "Sales",
    },
    {
      title: "Tenancy Application Form",
      description:
        "Comprehensive application form for prospective tenants including personal details, employment information, and rental history.",
      icon: ClipboardList,
      fileName: "TENANCY APPLICATION FORM 2025.pdf",
      fileSize: "PDF • 1.8MB",
      category: "Tenants",
    },
    {
      title: "Letting Instruction Documents",
      description:
        "Standard residential and commercial lease agreement template compliant with Zimbabwe property law and regulations.",
      icon: Home,
      fileName: "letting instruction.pdf",
      fileSize: "PDF • 3.2MB",
      category: "Letting",
    },
    {
      title: "Management Confirmation Document",
      description:
        "Document confirming property management agreement and terms between landlord and House of Stone Properties.",
      icon: FileText,
      fileName: "Management confirmation.pdf",
      fileSize: "PDF • 1.5MB",
      category: "Management",
    },

  ];

  const categories = [...new Set(forms.map((form) => form.category))];

  return (
    <section id="forms-section" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Essential Forms & Documents
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Download the forms you need for property transactions, management
            agreements, and legal documentation. All forms are current and
            compliant with Zimbabwe property law.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-slate-800 text-[#DCC471] rounded-full font-semibold text-sm"
            >
              {category}
            </span>
          ))}
        </motion.div>

        {/* Forms grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {forms.map((form, index) => (
            <FormCard key={index} {...form} />
          ))}
        </div>

        {/* Help section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-slate-800 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Need Assistance?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our team is here to help you complete forms correctly and guide you
            through the process. Contact us for personalized assistance with
            your property needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowButton
              onClick={() => (window.location.href = "tel:+263772329569")}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us
            </GlowButton>
            <GlowButton
              variant="secondary"
              onClick={() => (window.location.href = "mailto:info@hsp.co.zw")}
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Support
            </GlowButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Downloads = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FormsSection />

      {/* Contact Footer */}
      <section className="py-16 bg-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-stone-600 mb-8 max-w-xl mx-auto">
              Download the forms you need or contact us for personalized
              assistance with your property requirements.
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-[#DCC471] mr-2" />
                <span className="text-stone-700">
                  +263 772 329 569, +263 719 329 569
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-[#DCC471] mr-2" />
                <a
                  href="mailto:info@hsp.co.zw"
                  className="text-[#DCC471] hover:text-[#DCC471]"
                >
                  info@hsp.co.zw
                </a>
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

export default Downloads;
