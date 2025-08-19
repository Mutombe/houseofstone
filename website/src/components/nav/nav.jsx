import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  LogIn,
  LogOut,
  Building2,
  Users,
  Handshake,
  Briefcase,
  BookOpen,
  ChevronDown,
  BarChart,
  Banknote,
  TrendingUp,
  PhoneCall,
  Mail,
  Phone,
  Menu,
  X,
  Home,
  Bell,
  AlertCircle,
  AtSign,
  Lock,
  ChartNoAxesColumn,
  BarChart2,
  MapPin,
  MapIcon,
  Calendar,
  PlusCircle,
  FileText,
  Download,
  Calculator,
  ArrowRight,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

// Material UI
import {
  Dialog,
  TextField,
  Divider,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

// Redux actions
import { logout, login, register } from "../../redux/slices/authSlice";

/**
 * Auth header component for login/register screens
 */
export function AuthHeader({ view }) {
  return (
    <div className="text-center">
      {/* Blue background container for logo */}
      <div className="mx-auto w-24 h-20 mb-6 bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
        <img
          src="/logo2.webp"
          alt="HSP Logo"
          className="w-16 h-12 object-contain filter brightness-110"
        />
      </div>
      <h2 className="text-3xl font-bold bg-slate-800 bg-clip-text text-transparent mb-3">
        {view === "login" ? "Welcome Back!" : "Join HSP"}
      </h2>
      <p className="text-gray-600 text-lg">
        {view === "login"
          ? "Sign in to continue to your account"
          : "Create your free HSP account"}
      </p>
    </div>
  );
}

/**
 * Authentication modals component for login and registration
 */
export const AuthModals = ({ openType, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [view, setView] = useState(openType);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  // Update view when openType changes
  useEffect(() => {
    setView(openType);
  }, [openType]);

  // Reset form data when modal opens
  useEffect(() => {
    if (openType) {
      setFormData({
        email: "",
        password: "",
        username: "",
      });
    }
  }, [openType]);

  const handleSubmit = () => {
    if (view === "login") {
      dispatch(
        login({ username: formData.username, password: formData.password })
      )
        .unwrap()
        .then(() => {
          setSnackbar({
            open: true,
            message: "You are logged in!",
            severity: "success",
          });
          onClose();
        })
        .catch((err) => {
          console.error("Login Failed:", err);
        });
    } else {
      dispatch(register(formData))
        .unwrap()
        .then((response) => {
          setSnackbar({
            open: true,
            message: "Registration successful. You may Sign-In",
            severity: "success",
          });

          // Save auth data to localStorage only if response exists
          if (response && response.access) {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                access: response.access,
                refresh: response.refresh,
                user: response.user,
              })
            );
          }

          onClose();
        })
        .catch((err) => {
          console.error("Registration Failed:", err);
        });
    }
  };

  const getRegistrationError = () => {
    if (!error) return null;

    // Check for specific error messages
    if (typeof error === "object") {
      if (error.username) return error.username[0];
      if (error.email) return error.email[0];
      if (error.detail) return error.detail;
    }

    // Fallback to generic error message
    return error.toString();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <Dialog
        open={!!openType}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="auth-dialog-title"
        PaperProps={{
          className: "rounded-3xl overflow-hidden shadow-2xl",
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-white via-blue-50 to-blue-100"
        >
          {/* Header with blue background */}
          <div className="bg-slate-800 px-8 py-6 text-white">
            <div className="text-center">
              {/* Prominent logo on blue background */}
              <div className="mx-auto w-20 h-16 mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                <img
                  src="/logo2.webp"
                  alt="HSP Logo"
                  className="w-14 h-10 object-contain filter brightness-110"
                />
              </div>
              <h2 id="auth-dialog-title" className="text-2xl font-bold mb-2">
                {view === "login" ? "Welcome Back!" : "Join HSP"}
              </h2>
              <p className="text-blue-100 text-sm">
                {view === "login"
                  ? "Sign in to continue to your account"
                  : "Create your free HSP account"}
              </p>
            </div>
          </div>

          <div className="px-8 py-6 space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-700 text-sm"
              >
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>
                    {view === "register"
                      ? getRegistrationError()
                      : typeof error === "object"
                      ? error.detail || JSON.stringify(error)
                      : error}
                  </span>
                </div>
              </motion.div>
            )}

            <div className="space-y-5">
              {view === "register" && (
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  onKeyDown={handleKeyDown}
                  InputProps={{
                    startAdornment: (
                      <AtSign className="text-yellow-600 mr-3" size={20} />
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "white",
                      "&.Mui-focused fieldset": {
                        borderColor: "#eab308",
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "#eab308",
                    },
                  }}
                  aria-label="Email"
                  required
                />
              )}

              <TextField
                fullWidth
                label="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                onKeyDown={handleKeyDown}
                InputProps={{
                  startAdornment: (
                    <User className="text-yellow-500 mr-3" size={20} />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "white",
                    "&.Mui-focused fieldset": {
                      borderColor: "#eab308",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "#eab308",
                  },
                }}
                aria-label="Username"
                required
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                onKeyDown={handleKeyDown}
                InputProps={{
                  startAdornment: (
                    <Lock className="text-yellow-500 mr-3" size={20} />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "white",
                    "&.Mui-focused fieldset": {
                      borderColor: "#eab308",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "#eab308",
                  },
                }}
                aria-label="Password"
                required
              />
            </div>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={status === "loading"}
              sx={{
                borderRadius: "12px",
                py: 1.5,
                background: "#1e293b",
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 8px 25px rgba(37, 99, 235, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg,rgb(37, 43, 58) 0%,rgb(32, 35, 45) 100%)",
                  boxShadow: "0 12px 30px rgba(26, 39, 66, 0.4)",
                },
                "&:disabled": {
                  background: "#e5e7eb",
                  color: "#9ca3af",
                },
              }}
            >
              {status === "loading" ? (
                <span className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </span>
              ) : view === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-500">
                  or
                </span>
              </div>
            </div>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => setView(view === "login" ? "register" : "login")}
              sx={{
                borderRadius: "12px",
                py: 1.5,
                color: "#1e293b",
                borderColor: "#1e293b",
                fontSize: "16px",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#1d4ed8",
                  backgroundColor: "#eff6ff",
                },
              }}
            >
              {view === "login"
                ? "Create New Account"
                : "Already have an account? Sign In"}
            </Button>
          </div>
        </motion.div>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={snackbar.severity}
          className="items-center"
          iconMapping={{
            error: <AlertCircle className="w-5 h-5" />,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

/**
 * Main Navbar component
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);
  const isAdmin = user?.is_superuser;
  const dispatch = useDispatch();

  // Enhanced scroll effect with smooth transitions
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced mobile menu handling with smooth body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px"; // Prevent layout shift
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  // Updated navigation links in the exact order requested
  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/rent", label: "Rent", icon: Building2 },
  ];

  const aboutLinks = [
    { path: "/about", label: "About Us", icon: Users },
    { path: "/agents", label: "Agents", icon: Handshake },
    { path: "/contact", label: "Contact Us", icon: PhoneCall },
  ];

  const buyLinks = [
    {
      path: "/sale",
      label: "Residential",
      icon: Home,
      description: "Houses, Townhouses, Clusters, etc",
    },
    {
      path: "/sale",
      label: "Commercial",
      icon: Building2,
      description: "Office buildings, retail spaces",
    },
    {
      path: "/sale",
      label: "Industrial",
      icon: Briefcase,
      description: "Warehouses, factories",
    },
    {
      path: "/sale",
      label: "Development",
      icon: TrendingUp,
      description: "Land and development projects",
    },
  ];

  const sellLinks = [
    {
      path: "/list",
      label: "List Property",
      icon: PlusCircle,
      description: "List your property for sale",
    },
    {
      path: "/valuation",
      label: "Property Valuation",
      icon: Calculator,
      description: "Get your property valued",
    },
    {
      path: "/guide",
      label: "Selling Guide",
      icon: FileText,
      description: "Tips for selling your property",
    },
  ];

  const resourcesLinks = [
    { path: "/developments", label: "Developments", icon: TrendingUp },
    { path: "/downloads", label: "Downloads", icon: Download },
    { path: "/neighborhoods", label: "Neighborhood Guide", icon: MapIcon },
    { path: "/consulting", label: "Consulting", icon: Briefcase },
    { path: "/market", label: "Market Analysis", icon: BarChart },
    { path: "/mortgage", label: "Mortgage", icon: Banknote },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMobileNavClick = () => {
    setIsOpen(false);
    setResourcesOpen(false);
    setBuyOpen(false);
    setSellOpen(false);
  };

  return (
    <>
      {/* Top Info Bar - Enhanced with better mobile responsiveness */}
      <motion.div
        className="w-full bg-slate-800 text-white py-2 sm:py-3 shadow-sm relative z-40"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm">
              <motion.a
                href="tel:+263772329569"
                className="flex items-center hover:text-[#DCC471] transition-all duration-300 group"
                aria-label="Call Us"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-[#DCC471] group-hover:animate-pulse" />
                <span className="hidden sm:inline text-white group-hover:text-[#DCC471] transition-colors">
                  +263 772 329 569
                </span>
                <span className="sm:hidden text-white group-hover:text-[#DCC471] transition-colors">
                  Call
                </span>
              </motion.a>
              <motion.a
                href="mailto:info@hsp.co.zw"
                className="flex items-center hover:text-[#DCC471] transition-all duration-300 group"
                aria-label="Email Us"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-[#DCC471] group-hover:animate-pulse" />
                <span className="hidden sm:inline text-white group-hover:text-[#DCC471] transition-colors">
                  info@hsp.co.zw
                </span>
                <span className="sm:hidden text-white group-hover:text-[#DCC471] transition-colors">
                  Email
                </span>
              </motion.a>
            </div>
            <motion.div
              className="text-xs hidden md:flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <MapPin className="w-3 h-3 mr-1 text-[#DCC471]" />
              <span className="text-white">
                21 Harare Drive Borrowdale, Harare
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation - Enhanced with transparent to slate-800 transition */}
      <motion.nav
        className={`fixed top-[20px] sm:top-[36px] w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-slate-800/95 backdrop-blur-xl shadow-2xl border-b border-slate-700/50"
            : "bg-transparent shadow-none"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo Section - Enhanced with better animations */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink to="/" className="flex items-center group">
                <motion.div
                  className={`p-2 sm:p-3 rounded-xl group-hover:shadow-2xl transition-all duration-300 mr-2 sm:mr-3 ${
                    scrolled
                      ? ""
                      : ""
                  }`}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 },
                  }}
                >
                  <img
                    src="/logo2.webp"
                    alt="House of Stone Properties"
                    className="h-8 sm:h-12 w-auto filter group-hover:brightness-110 transition-all duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "";
                    }}
                  />
                </motion.div>
              </NavLink>
            </motion.div>

            {/* Desktop Navigation - Enhanced with better hover effects in correct order */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {/* Home Link */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.5 }}
              >
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `relative text-sm font-medium transition-all duration-300 flex items-center space-x-2 py-2 px-3 rounded-lg group ${
                      isActive
                        ? scrolled
                          ? "text-[#DCC471] bg-white/10"
                          : "text-slate-800 bg-slate-100"
                        : scrolled
                        ? "text-white hover:text-[#DCC471] hover:bg-white/10"
                        : "text-[#DCC471] hover:text-slate-800 hover:bg-slate-100"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Home
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? scrolled
                                ? "text-[#DCC471]"
                                : "text-slate-800"
                              : scrolled
                              ? "text-white/80 group-hover:text-[#DCC471]"
                              : "text-[#DCC471] group-hover:text-slate-800"
                          }`}
                        />
                      </motion.div>
                      <span>Home</span>
                      {isActive && (
                        <motion.div
                          className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                            scrolled ? "bg-[#DCC471]" : "bg-slate-800"
                          }`}
                          layoutId="activeTab"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>

              {/* Buy Dropdown */}
              <motion.div
                className="relative"
                onMouseEnter={() => setBuyOpen(true)}
                onMouseLeave={() => setBuyOpen(false)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <motion.button
                  className={`flex items-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    buyOpen
                      ? scrolled
                        ? "text-[#DCC471] bg-white/10"
                        : "text-slate-800 bg-slate-100"
                      : scrolled
                      ? "text-white hover:text-[#DCC471] hover:bg-white/10"
                      : "text-[#DCC471] hover:text-slate-800 hover:bg-slate-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </motion.div>
                  <span>Buy</span>
                  <motion.div
                    animate={{ rotate: buyOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {buyOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl z-[60] border border-gray-200/50 overflow-hidden"
                    >
                      <div className="py-2">
                        {buyLinks.map((link, index) => (
                          <motion.div
                            key={`${link.path}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                          >
                            <NavLink
                              to={link.path}
                              className="flex items-center px-4 py-3 text-sm hover:bg-slate-50 transition-all duration-200 group"
                              onClick={() => setBuyOpen(false)}
                            >
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                                className="flex-shrink-0"
                              >
                                <link.icon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-slate-600" />
                              </motion.div>
                              <div className="flex flex-col">
                                <span className="font-medium text-gray-800 group-hover:text-slate-900">
                                  {link.label}
                                </span>
                                <span className="text-xs text-gray-500 group-hover:text-gray-600">
                                  {link.description}
                                </span>
                              </div>
                            </NavLink>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Sell Dropdown */}
              <motion.div
                className="relative"
                onMouseEnter={() => setSellOpen(true)}
                onMouseLeave={() => setSellOpen(false)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.button
                  className={`flex items-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    sellOpen
                      ? scrolled
                        ? "text-[#DCC471] bg-white/10"
                        : "text-slate-800 bg-slate-100"
                      : scrolled
                      ? "text-white hover:text-[#DCC471] hover:bg-white/10"
                      : "text-[#DCC471] hover:text-slate-800 hover:bg-slate-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DollarSign className="w-4 h-4" />
                  </motion.div>
                  <span>Sell</span>
                  <motion.div
                    animate={{ rotate: sellOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {sellOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl z-[60] border border-gray-200/50 overflow-hidden"
                    >
                      <div className="py-2">
                        {sellLinks.map((link, index) => (
                          <motion.div
                            key={`${link.path}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                          >
                            <NavLink
                              to={link.path}
                              className="flex items-center px-4 py-3 text-sm hover:bg-slate-50 transition-all duration-200 group"
                              onClick={() => setSellOpen(false)}
                            >
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                                className="flex-shrink-0"
                              >
                                <link.icon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-slate-600" />
                              </motion.div>
                              <div className="flex flex-col">
                                <span className="font-medium text-gray-800 group-hover:text-slate-900">
                                  {link.label}
                                </span>
                                <span className="text-xs text-gray-500 group-hover:text-gray-600">
                                  {link.description}
                                </span>
                              </div>
                            </NavLink>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Remaining Nav Links (Rent, Show Days, About Us) */}
              {navLinks.slice(1).map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 3) * 0.1, duration: 0.5 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative text-sm font-medium transition-all duration-300 flex items-center space-x-2 py-2 px-3 rounded-lg group ${
                        isActive
                          ? scrolled
                            ? "text-[#DCC471] bg-white/10"
                            : "text-slate-800 bg-slate-100"
                          : scrolled
                          ? "text-white hover:text-[#DCC471] hover:bg-white/10"
                          : "text-[#DCC471] hover:text-slate-800 hover:bg-slate-100"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <link.icon
                            className={`w-4 h-4 transition-colors ${
                              isActive
                                ? scrolled
                                  ? "text-[#DCC471]"
                                  : "text-slate-800"
                                : scrolled
                                ? "text-white/80 group-hover:text-[#DCC471]"
                                : "text-[#DCC471] group-hover:text-slate-800"
                            }`}
                          />
                        </motion.div>
                        <span>{link.label}</span>
                        {isActive && (
                          <motion.div
                            className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                              scrolled ? "bg-[#DCC471]" : "bg-slate-800"
                            }`}
                            layoutId="activeTab"
                            transition={{ type: "spring", duration: 0.5 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                className="relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.button
                  className={`flex items-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    aboutOpen
                      ? scrolled
                        ? "text-[#DCC471] bg-white/10"
                        : "text-slate-800 bg-slate-100"
                      : scrolled
                      ? "text-white hover:text-[#DCC471] hover:bg-white/10"
                      : "text-[#DCC471] hover:text-slate-800 hover:bg-slate-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Users className="w-4 h-4" />
                  </motion.div>
                  <span>About Us</span>
                  <motion.div
                    animate={{ rotate: aboutOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl z-[60] border border-gray-200/50 overflow-hidden"
                    >
                      <div className="py-2">
                        {aboutLinks.map((link, index) => (
                          <motion.div
                            key={`${link.path}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                          >
                            <NavLink
                              to={link.path}
                              className="flex items-center px-4 py-3 text-sm hover:bg-slate-50 transition-all duration-200 group"
                              onClick={() => setAboutOpen(false)}
                            >
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                              >
                                <link.icon className="w-4 h-4 mr-3 text-gray-500 group-hover:text-slate-600" />
                              </motion.div>
                              {link.label}
                            </NavLink>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Desktop Resources Dropdown - Enhanced */}
              <motion.div
                className="relative"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.button
                  className={`flex items-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    resourcesOpen
                      ? scrolled
                        ? "text-[#DCC471] bg-white/10"
                        : "text-slate-800 bg-slate-100"
                      : scrolled
                      ? "text-white hover:text-[#DCC471] hover:bg-white/10"
                      : "text-[#DCC471] hover:text-slate-800 hover:bg-slate-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BookOpen className="w-4 h-4" />
                  </motion.div>
                  <span>Resources</span>
                  <motion.div
                    animate={{ rotate: resourcesOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {resourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl z-[60] border border-gray-200/50 overflow-hidden"
                    >
                      <div className="py-2">
                        {resourcesLinks.map((link, index) => (
                          <motion.div
                            key={link.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                          >
                            <NavLink
                              to={link.path}
                              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-slate-50 hover:text-slate-800 transition-all duration-200 group"
                              onClick={() => setResourcesOpen(false)}
                            >
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                              >
                                <link.icon className="w-4 h-4 mr-3 text-gray-500 group-hover:text-slate-600" />
                              </motion.div>
                              {link.label}
                            </NavLink>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Auth Buttons - Enhanced */}
              <motion.div
                className="ml-6 flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    {isAdmin && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to="/admin"
                          className={`flex items-center text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg ${
                            scrolled
                              ? "text-white hover:text-[#DCC471] hover:bg-white/10"
                              : "text-gray-700 hover:text-slate-800 hover:bg-slate-100"
                          }`}
                        >
                          <BarChart2 className="mr-2 h-4 w-4" />
                          Admin
                        </Link>
                      </motion.div>
                    )}
                    <motion.div
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                        scrolled
                          ? "bg-white/10 backdrop-blur-sm border border-white/20"
                          : "bg-slate-100 border border-slate-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <User
                        className={`w-4 h-4 ${
                          scrolled ? "text-[#DCC471]" : "text-slate-800"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          scrolled ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {user?.username || "User"}
                      </span>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleLogout}
                        sx={{
                          color: scrolled ? "#ffffff" : "#dc2626",
                          borderColor: scrolled ? "#ffffff" : "#dc2626",
                          borderRadius: "8px",
                          textTransform: "none",
                          "&:hover": {
                            borderColor: "#b91c1c",
                            backgroundColor: scrolled
                              ? "rgba(255,255,255,0.1)"
                              : "#fef2f2",
                          },
                        }}
                        startIcon={<LogOut className="w-4 h-4" />}
                      >
                        Logout
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setAuthModal("login")}
                        sx={{
                          color: scrolled ? "#ffffff" : "#DCC471",
                          borderColor: scrolled ? "#ffffff" : "#DCC471",
                          borderRadius: "8px",
                          textTransform: "none",
                          "&:hover": {
                            borderColor: scrolled ? "#DCC471" : "#1d4ed8",
                            backgroundColor: scrolled
                              ? "rgba(255,255,255,0.1)"
                              : "#eff6ff",
                          },
                        }}
                        startIcon={<LogIn className="w-4 h-4" />}
                      >
                        Login
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => setAuthModal("register")}
                        sx={{
                          background: scrolled
                            ? "linear-gradient(135deg, #DCC471 0%, #B8A965 100%)"
                            : "#1e293b",
                          borderRadius: "8px",
                          textTransform: "none",
                          boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                          "&:hover": {
                            background: scrolled
                              ? "linear-gradient(135deg, #B8A965 0%, #A69659 100%)"
                              : "linear-gradient(135deg,rgb(21, 30, 57) 0%,rgb(26, 33, 56) 100%)",
                            boxShadow: "0 6px 16px rgba(37, 99, 235, 0.4)",
                          },
                        }}
                        startIcon={<User className="w-4 h-4" />}
                      >
                        Register
                      </Button>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <div className="lg:hidden flex items-center">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 ${
                  scrolled
                    ? "text-white hover:text-[#DCC471] hover:bg-white/10"
                    : "text-[#DCC471] hover:text-slate-800 hover:bg-slate-100"
                }`}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Epic Full Screen Experience */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 top-[100px] sm:top-[116px] z-[100] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="h-full overflow-y-auto">
                <div className="px-4 sm:px-6 pt-6 pb-8 space-y-2">
                  {/* Home Link */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0, duration: 0.5 }}
                  >
                    <NavLink
                      to="/"
                      onClick={handleMobileNavClick}
                      className={({ isActive }) =>
                        `flex items-center px-4 sm:px-6 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-medium transition-all duration-300 group ${
                          isActive
                            ? "bg-[#DCC471] text-slate-900 shadow-xl transform scale-105"
                            : "text-white hover:bg-white/10 hover:text-[#DCC471] hover:shadow-lg hover:transform hover:scale-105"
                        }`
                      }
                    >
                      <motion.div
                        whileHover={{ scale: 1.3, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Home className="w-6 h-6 mr-4 group-hover:animate-pulse" />
                      </motion.div>
                      <span>Home</span>
                    </NavLink>
                  </motion.div>

                  {/* Mobile Buy Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <motion.button
                      onClick={() => setBuyOpen(!buyOpen)}
                      className={`w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-medium transition-all duration-300 group ${
                        buyOpen
                          ? "bg-[#DCC471] text-slate-900 shadow-xl transform scale-105"
                          : "text-white hover:bg-white/10 hover:text-[#DCC471] hover:shadow-lg hover:transform hover:scale-105"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <motion.div
                          whileHover={{ scale: 1.3, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ShoppingCart className="w-6 h-6 mr-4 group-hover:animate-pulse" />
                        </motion.div>
                        <span>Buy</span>
                      </div>
                      <motion.div
                        animate={{ rotate: buyOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {buyOpen && (
                        <motion.div
                          className="mt-2 ml-4 sm:ml-6 space-y-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {buyLinks.map((link, index) => (
                            <motion.div
                              key={`${link.path}-${index}`}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                            >
                              <NavLink
                                to={link.path}
                                onClick={handleMobileNavClick}
                                className="flex items-start px-4 py-3 rounded-lg text-sm sm:text-base text-white/80 hover:bg-white/10 hover:text-[#DCC471] transition-all duration-300 group"
                              >
                                <motion.div
                                  whileHover={{ scale: 1.2, rotate: 360 }}
                                  transition={{ duration: 0.3 }}
                                  className="flex-shrink-0 mt-0.5"
                                >
                                  <link.icon className="w-5 h-5 mr-3 text-white/60 group-hover:text-[#DCC471]" />
                                </motion.div>
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {link.label}
                                  </span>
                                  <span className="text-xs text-white/60 mt-0.5">
                                    {link.description}
                                  </span>
                                </div>
                              </NavLink>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Mobile Sell Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <motion.button
                      onClick={() => setSellOpen(!sellOpen)}
                      className={`w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-medium transition-all duration-300 group ${
                        sellOpen
                          ? "bg-[#DCC471] text-slate-900 shadow-xl transform scale-105"
                          : "text-white hover:bg-white/10 hover:text-[#DCC471] hover:shadow-lg hover:transform hover:scale-105"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <motion.div
                          whileHover={{ scale: 1.3, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <DollarSign className="w-6 h-6 mr-4 group-hover:animate-pulse" />
                        </motion.div>
                        <span>Sell</span>
                      </div>
                      <motion.div
                        animate={{ rotate: sellOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {sellOpen && (
                        <motion.div
                          className="mt-2 ml-4 sm:ml-6 space-y-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {sellLinks.map((link, index) => (
                            <motion.div
                              key={`${link.path}-${index}`}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                            >
                              <NavLink
                                to={link.path}
                                onClick={handleMobileNavClick}
                                className="flex items-start px-4 py-3 rounded-lg text-sm sm:text-base text-white/80 hover:bg-white/10 hover:text-[#DCC471] transition-all duration-300 group"
                              >
                                <motion.div
                                  whileHover={{ scale: 1.2, rotate: 360 }}
                                  transition={{ duration: 0.3 }}
                                  className="flex-shrink-0 mt-0.5"
                                >
                                  <link.icon className="w-5 h-5 mr-3 text-white/60 group-hover:text-[#DCC471]" />
                                </motion.div>
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {link.label}
                                  </span>
                                  <span className="text-xs text-white/60 mt-0.5">
                                    {link.description}
                                  </span>
                                </div>
                              </NavLink>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Remaining Mobile Navigation Links (Rent, Show Days, About Us) */}
                  {navLinks.slice(1).map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index + 3) * 0.1, duration: 0.5 }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={handleMobileNavClick}
                        className={({ isActive }) =>
                          `flex items-center px-4 sm:px-6 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-medium transition-all duration-300 group ${
                            isActive
                              ? "bg-[#DCC471] text-slate-900 shadow-xl transform scale-105"
                              : "text-white hover:bg-white/10 hover:text-[#DCC471] hover:shadow-lg hover:transform hover:scale-105"
                          }`
                        }
                      >
                        <motion.div
                          whileHover={{ scale: 1.3, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <link.icon className="w-6 h-6 mr-4 group-hover:animate-pulse" />
                        </motion.div>
                        <span>{link.label}</span>
                      </NavLink>
                    </motion.div>
                  ))}

                  {/* Mobile About Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <motion.button
                      onClick={() => setAboutOpen(!aboutOpen)}
                      className={`w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-medium transition-all duration-300 group ${
                        aboutOpen
                          ? "bg-[#DCC471] text-slate-900 shadow-xl transform scale-105"
                          : "text-white hover:bg-white/10 hover:text-[#DCC471] hover:shadow-lg hover:transform hover:scale-105"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <motion.div
                          whileHover={{ scale: 1.3, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Users className="w-6 h-6 mr-4 group-hover:animate-pulse" />
                        </motion.div>
                        <span>About</span>
                      </div>
                      <motion.div
                        animate={{ rotate: aboutOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {aboutOpen && (
                        <motion.div
                          className="mt-2 ml-4 sm:ml-6 space-y-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {aboutLinks.map((link, index) => (
                            <motion.div
                              key={`${link.path}-${index}`}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                            >
                              <NavLink
                                to={link.path}
                                onClick={handleMobileNavClick}
                                className="flex items-center px-4 py-3 rounded-lg text-sm sm:text-base text-white/80 hover:bg-white/10 hover:text-[#DCC471] transition-all duration-300 group"
                              >
                                <motion.div
                                  whileHover={{ scale: 1.2, rotate: 360 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <link.icon className="w-5 h-5 mr-3 text-white/60 group-hover:text-[#DCC471]" />
                                </motion.div>
                                {link.label}
                              </NavLink>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Mobile Resources Section - Enhanced */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <motion.button
                      onClick={() => setResourcesOpen(!resourcesOpen)}
                      className={`w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-medium transition-all duration-300 group ${
                        resourcesOpen
                          ? "bg-[#DCC471] text-slate-900 shadow-xl transform scale-105"
                          : "text-white hover:bg-white/10 hover:text-[#DCC471] hover:shadow-lg hover:transform hover:scale-105"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <motion.div
                          whileHover={{ scale: 1.3, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <BookOpen className="w-6 h-6 mr-4 group-hover:animate-pulse" />
                        </motion.div>
                        <span>Resources</span>
                      </div>
                      <motion.div
                        animate={{ rotate: resourcesOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {resourcesOpen && (
                        <motion.div
                          className="mt-2 ml-4 sm:ml-6 space-y-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {resourcesLinks.map((link, index) => (
                            <motion.div
                              key={link.path}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                            >
                              <NavLink
                                to={link.path}
                                onClick={handleMobileNavClick}
                                className="flex items-center px-4 py-3 rounded-lg text-sm sm:text-base text-white/80 hover:bg-white/10 hover:text-[#DCC471] transition-all duration-300 group"
                              >
                                <motion.div
                                  whileHover={{ scale: 1.2, rotate: 360 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <link.icon className="w-5 h-5 mr-3 text-white/60 group-hover:text-[#DCC471]" />
                                </motion.div>
                                {link.label}
                              </NavLink>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Contact Us Link */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <NavLink
                      to="/contact"
                      onClick={handleMobileNavClick}
                      className={({ isActive }) =>
                        `flex items-center px-4 sm:px-6 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-medium transition-all duration-300 group ${
                          isActive
                            ? "bg-[#DCC471] text-slate-900 shadow-xl transform scale-105"
                            : "text-white hover:bg-white/10 hover:text-[#DCC471] hover:shadow-lg hover:transform hover:scale-105"
                        }`
                      }
                    >
                      <motion.div
                        whileHover={{ scale: 1.3, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <PhoneCall className="w-6 h-6 mr-4 group-hover:animate-pulse" />
                      </motion.div>
                      <span>Contact Us</span>
                    </NavLink>
                  </motion.div>

                  {/* Mobile Auth Section - Enhanced */}
                  <motion.div
                    className="pt-6 mt-6 border-t border-white/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    {isAuthenticated ? (
                      <div className="space-y-4">
                        <motion.div
                          className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center space-x-3">
                            <motion.div
                              className="w-10 h-10 sm:w-12 sm:h-12 bg-[#DCC471] rounded-full flex items-center justify-center"
                              whileHover={{ scale: 1.1, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <User className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
                            </motion.div>
                            <span className="font-medium text-white text-base sm:text-lg">
                              {user?.username || "User"}
                            </span>
                          </div>
                          {isAdmin && (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Link
                                to="/admin"
                                className="flex items-center text-[#DCC471] hover:text-white transition-colors"
                                onClick={handleMobileNavClick}
                              >
                                <BarChart2 className="mr-2 h-5 w-5" />
                                <span className="text-sm">Admin</span>
                              </Link>
                            </motion.div>
                          )}
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => {
                              handleLogout();
                              handleMobileNavClick();
                            }}
                            sx={{
                              color: "#ffffff",
                              borderColor: "#ffffff",
                              borderRadius: "12px",
                              py: 2,
                              fontSize: "1rem",
                              textTransform: "none",
                              "&:hover": {
                                borderColor: "#dc2626",
                                backgroundColor: "rgba(220, 38, 38, 0.1)",
                                color: "#dc2626",
                              },
                            }}
                            startIcon={<LogOut className="w-5 h-5" />}
                          >
                            Logout
                          </Button>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-4">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => {
                              setAuthModal("login");
                              handleMobileNavClick();
                            }}
                            sx={{
                              color: "#ffffff",
                              borderColor: "#ffffff",
                              borderRadius: "12px",
                              py: 2,
                              fontSize: "1rem",
                              textTransform: "none",
                              "&:hover": {
                                borderColor: "#DCC471",
                                backgroundColor: "rgba(220, 196, 113, 0.1)",
                                color: "#DCC471",
                              },
                            }}
                            startIcon={<LogIn className="w-5 h-5" />}
                          >
                            Login
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                              setAuthModal("register");
                              handleMobileNavClick();
                            }}
                            sx={{
                              background:
                                "linear-gradient(135deg, #DCC471 0%, #B8A965 100%)",
                              borderRadius: "12px",
                              py: 2,
                              fontSize: "1rem",
                              textTransform: "none",
                              boxShadow: "0 4px 12px rgba(220, 196, 113, 0.3)",
                              "&:hover": {
                                background:
                                  "linear-gradient(135deg, #B8A965 0%, #A69659 100%)",
                                boxShadow:
                                  "0 6px 16px rgba(220, 196, 113, 0.4)",
                              },
                            }}
                            startIcon={<User className="w-5 h-5" />}
                          >
                            Register
                          </Button>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AuthModals openType={authModal} onClose={() => setAuthModal(null)} />
      </motion.nav>
    </>
  );
};

export default Navbar;
