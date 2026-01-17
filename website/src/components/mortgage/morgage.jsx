// src/components/mortgage/mortgage.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calculator,
  Home,
  DollarSign,
  Percent,
  Calendar,
  TrendingUp,
  PieChart,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Shield,
  Clock,
  CheckCircle,
  Building,
  Target,
  Zap,
  Phone,
  Mail,
} from "lucide-react";
import { SiFsecure } from "react-icons/si";

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
const AnimatedNumber = ({ value, prefix = "", suffix = "", duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const target = parseFloat(value) || 0;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayValue(target);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}
      {suffix}
    </span>
  );
};

// Input Field Component
const InputField = ({
  label,
  icon: Icon,
  value,
  onChange,
  type = "text",
  placeholder,
  prefix,
  suffix,
  error,
  ...props
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-300">{label}</label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
      )}
      {prefix && (
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#C9A962] font-medium">
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full ${Icon ? "pl-12" : prefix ? "pl-8" : "pl-4"} ${suffix ? "pr-12" : "pr-4"} py-4
          bg-white/5 border ${error ? "border-red-500/50" : "border-white/10"} rounded-xl
          focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 focus:outline-none
          text-white placeholder-gray-500 transition-all
        `}
        {...props}
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          {suffix}
        </span>
      )}
    </div>
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);

// Result Card Component
const ResultCard = ({ title, value, icon: Icon, description, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#C9A962]/30 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#C9A962] to-[#B8985A] rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-[#0A1628]" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-3xl font-bold text-[#C9A962] mb-2">
          <AnimatedNumber value={value} prefix="$" />
        </p>
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </div>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-[#C9A962] to-[#B8985A] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 text-[#0A1628]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C9A962] transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

const MortgageCalculator = () => {
  const [formData, setFormData] = useState({
    homePrice: "",
    downPayment: "",
    loanTerm: "30",
    interestRate: "",
    propertyTax: "",
    homeInsurance: "",
    pmi: "",
  });

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalInterest: 0,
    totalPayment: 0,
    loanAmount: 0,
    principalAndInterest: 0,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errors, setErrors] = useState({});
  const [isCalculated, setIsCalculated] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.homePrice || parseFloat(formData.homePrice) <= 0) {
      newErrors.homePrice = "Please enter a valid home price";
    }

    if (!formData.downPayment || parseFloat(formData.downPayment) < 0) {
      newErrors.downPayment = "Please enter a valid down payment";
    }

    if (!formData.interestRate || parseFloat(formData.interestRate) <= 0) {
      newErrors.interestRate = "Please enter a valid interest rate";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateMortgage = () => {
    if (!validateForm()) return;

    const homePrice = parseFloat(formData.homePrice) || 0;
    const downPayment = parseFloat(formData.downPayment) || 0;
    const loanTerm = parseInt(formData.loanTerm) || 30;
    const interestRate = parseFloat(formData.interestRate) || 0;
    const propertyTax = parseFloat(formData.propertyTax) || 0;
    const homeInsurance = parseFloat(formData.homeInsurance) || 0;
    const pmi = parseFloat(formData.pmi) || 0;

    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment =
        (loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
      monthlyPayment = loanAmount / numberOfPayments;
    }

    const principalAndInterest = monthlyPayment;
    const totalPaymentBase = monthlyPayment * numberOfPayments;
    const totalInterest = totalPaymentBase - loanAmount;

    const totalMonthlyPayment =
      monthlyPayment + propertyTax / 12 + homeInsurance / 12 + pmi;

    setResults({
      monthlyPayment: totalMonthlyPayment,
      totalInterest,
      totalPayment:
        totalPaymentBase +
        propertyTax * loanTerm +
        homeInsurance * loanTerm +
        pmi * numberOfPayments,
      loanAmount,
      principalAndInterest,
    });

    setIsCalculated(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  useEffect(() => {
    if (formData.homePrice && formData.downPayment && formData.interestRate) {
      calculateMortgage();
    }
  }, [formData]);

  const features = [
    {
      icon: Calculator,
      title: "Accurate Calculations",
      description:
        "Get precise monthly payment estimates with our advanced algorithms",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Calculate your mortgage in real-time as you type with immediate feedback",
    },
    {
      icon: SiFsecure,
      title: "Secure & Private",
      description:
        "Your financial information is never stored or shared with anyone",
    },
    {
      icon: PieChart,
      title: "Detailed Breakdown",
      description:
        "See exactly where your money goes with comprehensive payment breakdowns",
    },
  ];

  const breakdownItems = [
    {
      label: "Principal & Interest",
      value: results.principalAndInterest,
      color: "bg-[#C9A962]",
    },
    {
      label: "Property Tax",
      value: (parseFloat(formData.propertyTax) || 0) / 12,
      color: "bg-blue-500",
    },
    {
      label: "Home Insurance",
      value: (parseFloat(formData.homeInsurance) || 0) / 12,
      color: "bg-emerald-500",
    },
    {
      label: "PMI",
      value: parseFloat(formData.pmi) || 0,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#060D16]">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#1a2a3a]" />
        <FloatingOrb className="w-[600px] h-[600px] bg-[#C9A962] -top-40 -right-40" />
        <FloatingOrb className="w-[400px] h-[400px] bg-blue-500 bottom-0 -left-20" delay={2} />
        <GridPattern />

        <div className="relative z-10 pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-6"
              >
                <Calculator className="w-4 h-4 text-[#C9A962] mr-2" />
                <span className="text-gray-300 text-sm">Mortgage Calculator</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                <span className="text-white">Calculate Your</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] via-[#DCC471] to-[#C9A962]">
                  Dream Home
                </span>
                <br />
                <span className="text-white">Payment</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-400 max-w-2xl mx-auto"
              >
                Get instant estimates for your monthly mortgage payments, total
                interest, and more with our comprehensive calculator
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/5 to-transparent rounded-3xl blur-xl" />
              <div className="relative bg-[#0A1628] border border-white/10 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#C9A962] to-[#B8985A] rounded-2xl flex items-center justify-center mr-4">
                    <Calculator className="w-7 h-7 text-[#0A1628]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Mortgage Calculator
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Enter your details below
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <InputField
                    label="Home Price"
                    icon={Home}
                    value={formData.homePrice}
                    onChange={(e) =>
                      handleInputChange("homePrice", e.target.value)
                    }
                    type="number"
                    placeholder="500,000"
                    error={errors.homePrice}
                  />

                  <InputField
                    label="Down Payment"
                    icon={DollarSign}
                    value={formData.downPayment}
                    onChange={(e) =>
                      handleInputChange("downPayment", e.target.value)
                    }
                    type="number"
                    placeholder="100,000"
                    error={errors.downPayment}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-300">
                        Loan Term
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <select
                          value={formData.loanTerm}
                          onChange={(e) =>
                            handleInputChange("loanTerm", e.target.value)
                          }
                          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#C9A962] focus:outline-none appearance-none cursor-pointer"
                        >
                          <option value="15" className="bg-[#0A1628]">
                            15 years
                          </option>
                          <option value="20" className="bg-[#0A1628]">
                            20 years
                          </option>
                          <option value="25" className="bg-[#0A1628]">
                            25 years
                          </option>
                          <option value="30" className="bg-[#0A1628]">
                            30 years
                          </option>
                        </select>
                      </div>
                    </div>

                    <InputField
                      label="Interest Rate"
                      icon={Percent}
                      value={formData.interestRate}
                      onChange={(e) =>
                        handleInputChange("interestRate", e.target.value)
                      }
                      type="number"
                      step="0.01"
                      placeholder="3.5"
                      suffix="%"
                      error={errors.interestRate}
                    />
                  </div>

                  {/* Advanced Options Toggle */}
                  <div className="border-t border-white/10 pt-6">
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center justify-between w-full group"
                    >
                      <span className="text-lg font-semibold text-white group-hover:text-[#C9A962] transition-colors">
                        Additional Costs
                      </span>
                      {showAdvanced ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-[#C9A962] transition-colors" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#C9A962] transition-colors" />
                      )}
                    </button>

                    <AnimatePresence>
                      {showAdvanced && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6 mt-6 overflow-hidden"
                        >
                          <InputField
                            label="Annual Property Tax"
                            icon={Building}
                            value={formData.propertyTax}
                            onChange={(e) =>
                              handleInputChange("propertyTax", e.target.value)
                            }
                            type="number"
                            placeholder="6,000"
                          />

                          <InputField
                            label="Annual Home Insurance"
                            icon={SiFsecure}
                            value={formData.homeInsurance}
                            onChange={(e) =>
                              handleInputChange("homeInsurance", e.target.value)
                            }
                            type="number"
                            placeholder="1,200"
                          />

                          <InputField
                            label="Monthly PMI"
                            icon={DollarSign}
                            value={formData.pmi}
                            onChange={(e) =>
                              handleInputChange("pmi", e.target.value)
                            }
                            type="number"
                            placeholder="200"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    onClick={calculateMortgage}
                    disabled={
                      !formData.homePrice ||
                      !formData.downPayment ||
                      !formData.interestRate
                    }
                    className="w-full py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Calculator className="w-5 h-5" />
                    Calculate Payment
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Main Result Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/10 to-transparent rounded-3xl blur-xl" />
                <div className="relative bg-gradient-to-br from-[#0A1628] to-[#1a2a3a] border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#C9A962] to-[#B8985A] rounded-2xl flex items-center justify-center mr-4">
                      <TrendingUp className="w-7 h-7 text-[#0A1628]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Monthly Payment
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Principal, Interest & Costs
                      </p>
                    </div>
                  </div>

                  <div className="text-center py-6">
                    <p className="text-5xl md:text-6xl font-bold text-[#C9A962] mb-2">
                      <AnimatedNumber
                        value={results.monthlyPayment}
                        prefix="$"
                      />
                    </p>
                    <p className="text-gray-400">per month</p>
                  </div>

                  {/* Payment Breakdown */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-semibold">
                        Payment Breakdown
                      </h4>
                      <PieChart className="w-5 h-5 text-[#C9A962]" />
                    </div>

                    <div className="space-y-3">
                      {breakdownItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${item.color}`}
                            />
                            <span className="text-gray-400 text-sm">
                              {item.label}
                            </span>
                          </div>
                          <span className="text-white font-medium">
                            $
                            {item.value.toLocaleString("en-US", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Results */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ResultCard
                  title="Loan Amount"
                  value={results.loanAmount}
                  icon={DollarSign}
                  description="Amount financed"
                  delay={0.1}
                />
                <ResultCard
                  title="Total Interest"
                  value={results.totalInterest}
                  icon={TrendingUp}
                  description="Over loan term"
                  delay={0.2}
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/sale"
                  className="flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all"
                >
                  <Home className="w-5 h-5" />
                  Find Properties
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-[#C9A962]/30 transition-all"
                >
                  <Phone className="w-5 h-5 text-[#C9A962]" />
                  Get Pre-Approved
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-[#0A1628]">
        <FloatingOrb className="w-[400px] h-[400px] bg-[#C9A962] -bottom-20 -right-20" delay={0.5} />
        <GridPattern />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#C9A962]/10 text-[#C9A962] text-sm font-semibold rounded-full mb-6">
              Why Use Our Calculator
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Smart <span className="text-[#C9A962]">Features</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get accurate mortgage estimates with our advanced calculator built
              for your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#C9A962] to-[#B8985A]">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(#0A1628 1px, transparent 1px), linear-gradient(90deg, #0A1628 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl text-[#0A1628]/80 mb-10 max-w-2xl mx-auto">
              Use our mortgage calculator to get started on your home buying
              journey today
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sale"
                className="group inline-flex items-center justify-center px-8 py-4 bg-[#0A1628] text-white font-semibold rounded-xl hover:bg-[#1a2a3a] transition-all"
              >
                <Home className="mr-2 w-5 h-5" />
                Start Searching
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-[#0A1628] font-semibold rounded-xl hover:bg-gray-100 transition-all"
              >
                <Mail className="mr-2 w-5 h-5" />
                Contact an Agent
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MortgageCalculator;
