import React, { useState, useEffect } from "react";
import {
  Calculator,
  Home as HomeIcon,
  DollarSign,
  Percent,
  Calendar,
  TrendingUp,
  PieChart,
  ArrowRight,
  Info,
  Smartphone,
  TabletSmartphone,
  Monitor,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Brand colors consistent with your design
const COLORS = {
  primary: "#1e293b", // slate-800
  secondary: "#f59e0b", // yellow-500/gold
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

// Animated counter component
const AnimatedNumber = ({ value, prefix = "", suffix = "", duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
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
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })}
      {suffix}
    </span>
  );
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
  disabled = false,
  ...props
}) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    className={`
      relative px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 transform min-h-[48px] touch-manipulation
      ${
        variant === "primary"
          ? "bg-gradient-to-r from-yellow-600 to-yellow-700 text-slate-900 shadow-lg hover:shadow-yellow-500/25"
          : "bg-slate-800 text-white border-2 border-yellow-600 hover:bg-yellow-400 hover:text-slate-900"
      }
      ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"}
      overflow-hidden
      ${className}
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

// Input field component
const InputField = ({ label, icon: Icon, value, onChange, type = "text", placeholder, prefix, suffix, error, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-slate-700">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      )}
      {prefix && (
        <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full ${Icon || prefix ? 'pl-10 sm:pl-12' : 'pl-3 sm:pl-4'} ${suffix ? 'pr-12' : 'pr-3 sm:pr-4'} py-3 sm:py-4 
          border-2 ${error ? 'border-red-300' : 'border-gray-200'} rounded-xl 
          focus:border-yellow-400 focus:outline-none transition-colors 
          text-slate-800 text-base min-h-[48px] bg-white
        `}
        {...props}
      />
      {suffix && (
        <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
          {suffix}
        </span>
      )}
    </div>
    {error && (
      <p className="text-red-500 text-sm mt-1">{error}</p>
    )}
  </div>
);

// Result card component
const ResultCard = ({ title, value, icon: Icon, color = "yellow", description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-transparent hover:border-yellow-400/20 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-3">
      <div className={`w-12 h-12 bg-gradient-to-r from-${color}-600 to-${color}-700 rounded-xl flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-slate-900" />
      </div>
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-2">
      <AnimatedNumber value={value} prefix="$" />
    </p>
    {description && (
      <p className="text-sm text-gray-600">{description}</p>
    )}
  </motion.div>
);

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
  });

  const [showBreakdown, setShowBreakdown] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation
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

  // Calculate mortgage
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
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
      monthlyPayment = loanAmount / numberOfPayments;
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    // Add additional monthly costs
    const totalMonthlyPayment = monthlyPayment + (propertyTax / 12) + (homeInsurance / 12) + pmi;

    setResults({
      monthlyPayment: totalMonthlyPayment,
      totalInterest,
      totalPayment: totalPayment + propertyTax * loanTerm + homeInsurance * loanTerm + pmi * numberOfPayments,
      loanAmount,
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  useEffect(() => {
    if (formData.homePrice && formData.downPayment && formData.interestRate) {
      calculateMortgage();
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 sm:pt-20 sm:pb-16 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement delay={0}>
            <div className="absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-yellow-400/20 rounded-full blur-xl" />
          </FloatingElement>
          <FloatingElement delay={1}>
            <div className="absolute top-40 right-4 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 bg-yellow-500/10 rounded-full blur-2xl" />
          </FloatingElement>
          <FloatingElement delay={2}>
            <div className="absolute bottom-20 left-1/4 w-20 h-20 sm:w-24 sm:h-24 bg-slate-400/10 rounded-full blur-xl" />
          </FloatingElement>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-3 sm:px-4 py-2 bg-yellow-400/20 rounded-full mb-4 sm:mb-6 backdrop-blur-sm border border-yellow-400/30"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2" />
              <span className="text-slate-700 font-medium text-sm sm:text-base">
                Mortgage Calculator
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="text-slate-800">Calculate Your</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-700">
                Dream Home
              </span>
              <br />
              <span className="text-slate-800">Payment</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Get instant estimates for your monthly mortgage payments, total interest, and more with our comprehensive calculator
            </p>
          </motion.div>

          {/* Device showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center items-center space-x-6 mb-8 text-gray-400"
          >
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span className="text-sm hidden sm:inline">Mobile</span>
            </div>
            <div className="flex items-center space-x-2">
              <TabletSmartphone className="w-5 h-5" />
              <span className="text-sm hidden sm:inline">Tablet</span>
            </div>
            <div className="flex items-center space-x-2">
              <Monitor className="w-5 h-5" />
              <span className="text-sm hidden sm:inline">Desktop</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100"
            >
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl flex items-center justify-center mr-4">
                  <Calculator className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                    Mortgage Calculator
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Enter your details below
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <InputField
                  label="Home Price"
                  icon={HomeIcon}
                  value={formData.homePrice}
                  onChange={(e) => handleInputChange('homePrice', e.target.value)}
                  type="number"
                  placeholder="500,000"
                  prefix="$"
                  error={errors.homePrice}
                />

                <InputField
                  label="Down Payment"
                  icon={DollarSign}
                  value={formData.downPayment}
                  onChange={(e) => handleInputChange('downPayment', e.target.value)}
                  type="number"
                  placeholder="100,000"
                  prefix="$"
                  error={errors.downPayment}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Loan Term
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <select
                        value={formData.loanTerm}
                        onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-slate-800 bg-white text-base min-h-[48px]"
                      >
                        <option value="15">15 years</option>
                        <option value="20">20 years</option>
                        <option value="25">25 years</option>
                        <option value="30">30 years</option>
                      </select>
                    </div>
                  </div>

                  <InputField
                    label="Interest Rate"
                    icon={Percent}
                    value={formData.interestRate}
                    onChange={(e) => handleInputChange('interestRate', e.target.value)}
                    type="number"
                    step="0.01"
                    placeholder="3.5"
                    suffix="%"
                    error={errors.interestRate}
                  />
                </div>

                {/* Advanced Options */}
                <motion.div
                  initial={false}
                  className="border-t border-gray-200 pt-6"
                >
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="flex items-center justify-between w-full text-left mb-4 group"
                  >
                    <span className="text-lg font-semibold text-slate-800 group-hover:text-yellow-600 transition-colors">
                      Additional Costs
                    </span>
                    {showBreakdown ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-yellow-600 transition-colors" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-yellow-600 transition-colors" />
                    )}
                  </button>

                  <AnimatePresence>
                    {showBreakdown && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 sm:space-y-6"
                      >
                        <InputField
                          label="Annual Property Tax"
                          icon={HomeIcon}
                          value={formData.propertyTax}
                          onChange={(e) => handleInputChange('propertyTax', e.target.value)}
                          type="number"
                          placeholder="6,000"
                          prefix="$"
                        />

                        <InputField
                          label="Annual Home Insurance"
                          icon={Shield}
                          value={formData.homeInsurance}
                          onChange={(e) => handleInputChange('homeInsurance', e.target.value)}
                          type="number"
                          placeholder="1,200"
                          prefix="$"
                        />

                        <InputField
                          label="Monthly PMI"
                          icon={DollarSign}
                          value={formData.pmi}
                          onChange={(e) => handleInputChange('pmi', e.target.value)}
                          type="number"
                          placeholder="200"
                          prefix="$"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <GlowButton
                  onClick={calculateMortgage}
                  className="w-full"
                  disabled={!formData.homePrice || !formData.downPayment || !formData.interestRate}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Payment
                </GlowButton>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold">Monthly Payment</h3>
                    <p className="text-gray-300 text-sm sm:text-base">Principal, Interest & Additional Costs</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-600 mb-4">
                    <AnimatedNumber value={results.monthlyPayment} prefix="$" />
                  </p>
                  <p className="text-gray-300">per month</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <ResultCard
                  title="Loan Amount"
                  value={results.loanAmount}
                  icon={DollarSign}
                  description="Amount financed"
                />
                
                <ResultCard
                  title="Total Interest"
                  value={results.totalInterest}
                  icon={TrendingUp}
                  description="Over loan term"
                />
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800">Payment Breakdown</h3>
                  <PieChart className="w-6 h-6 text-yellow-600" />
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Principal & Interest", value: results.monthlyPayment - (parseFloat(formData.propertyTax) || 0) / 12 - (parseFloat(formData.homeInsurance) || 0) / 12 - (parseFloat(formData.pmi) || 0) },
                    { label: "Property Tax", value: (parseFloat(formData.propertyTax) || 0) / 12 },
                    { label: "Home Insurance", value: (parseFloat(formData.homeInsurance) || 0) / 12 },
                    { label: "PMI", value: parseFloat(formData.pmi) || 0 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-600 text-sm sm:text-base">{item.label}</span>
                      <span className="font-semibold text-slate-800">
                        ${item.value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <GlowButton className="flex-1">
                  <HomeIcon className="w-5 h-5 mr-2" />
                  Find Properties
                </GlowButton>
                <GlowButton variant="secondary" className="flex-1">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Get Pre-Approved
                </GlowButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Why Use Our <span className="text-yellow-600">Calculator</span>
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-yellow-400 mx-auto mb-4 sm:mb-6" />
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Get accurate mortgage estimates with our advanced calculator
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Calculator,
                title: "Accurate Calculations",
                description: "Get precise monthly payment estimates with our advanced algorithms",
                color: "yellow"
              },
              {
                icon: Smartphone,
                title: "Mobile Optimized",
                description: "Calculate your mortgage on any device with our responsive design",
                color: "yellow"
              },
              {
                icon: Clock,
                title: "Instant Results",
                description: "Get immediate calculations as you type with real-time updates",
                color: "yellow"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your financial information is never stored or shared",
                color: "yellow"
              },
              {
                icon: PieChart,
                title: "Detailed Breakdown",
                description: "See exactly where your money goes with comprehensive breakdowns",
                color: "yellow"
              },
              {
                icon: TrendingUp,
                title: "Market Insights",
                description: "Stay informed with current market rates and trends",
                color: "yellow"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-yellow-400/20"
              >
                <div className={`w-16 h-16 bg-gradient-to-r from-${feature.color}-600 to-${feature.color}-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-slate-900" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 group-hover:text-yellow-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                <div className="mt-6 flex items-center text-yellow-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-yellow-400/10 blur-xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto">
              Use our mortgage calculator to get started on your home buying journey today!
            </p>
          </motion.div>

          <GlowButton
            onClick={() => alert("Redirecting to property listings...")}
            className="w-full max-w-md mx-auto"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Start Searching
          </GlowButton>
        </div>
      </section>
    </div>
  )
}

export default MortgageCalculator;