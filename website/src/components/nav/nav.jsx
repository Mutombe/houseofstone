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
  TrendingUpDown,
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
  const isAdmin = user?.is_superuser;
  const dispatch = useDispatch();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside and handle body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: Users },
    { path: "/agents", label: "Agents", icon: Handshake },
    { path: "/sale", label: "Sale", icon: Building2 },
    { path: "/rent", label: "Rent", icon: Building2 },
    { path: "/contact", label: "Contact", icon: PhoneCall },
  ];

  const resourcesLinks = [
    { path: "/consulting", label: "Consulting", icon: Briefcase },
    { path: "/market", label: "Market Analysis", icon: BarChart },
    { path: "/neighborhoods", label: "Neighborhood Guide", icon: MapIcon },
    { path: "/mortgage", label: "Mortgage", icon: Banknote },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMobileNavClick = () => {
    setIsOpen(false);
    setResourcesOpen(false);
  };

  return (
    <>
      {/* Top Info Bar with blue gradient background */}
      <div className="w-full bg-slate-800 text-white py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm">
              <a
                href="tel:+263772329569"
                className="flex items-center hover:text-blue-200 transition-colors duration-200"
                aria-label="Call Us"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">+263 772 329 569</span>
                <span className="sm:hidden">Call</span>
              </a>
              <a
                href="mailto:info@hsp.co.zw"
                className="flex items-center hover:text-blue-200 transition-colors duration-200"
                aria-label="Email Us"
              >
                <Mail className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">info@hsp.co.zw</span>
                <span className="sm:hidden">Email</span>
              </a>
            </div>
            <div className="text-xs hidden lg:flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              <span>
                21 Harare Drive Borrowdale, Harare
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-lg"
            : "bg-transparent shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section - More Prominent */}
            <div className="flex items-center">
              <NavLink to="/" className="flex items-center group">
                {/* Blue background container for logo */}
                <div className="p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 mr-3">
                  <img
                    src="/logo2.webp"
                    alt="House of Stone Properties"
                    className="h-12 w-auto filter"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "";
                    }}
                  />
                </div>
                {/* Company name with gradient text */}
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-slate-800"
                        : "text-gray-700 hover:text-yellow-500"
                    } flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-yellow-50 group`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <link.icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? "text-slate-800"
                            : "text-gray-500 group-hover:text-yellow-500"
                        }`}
                      />
                      <span>{link.label}</span>
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-slate-800 rounded-full"
                          layoutId="activeTab"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}

              {/* Desktop Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <button
                  className={`flex items-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    resourcesOpen 
                      ? "text-slate-800 bg-yellow-50" 
                      : "text-gray-700 hover:text-yellow-500 hover:bg-yellow-50"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Resources</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? 'transform rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {resourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-[60] border border-gray-100"
                    >
                      <div className="py-2">
                        {resourcesLinks.map((link) => (
                          <NavLink
                            key={link.path}
                            to={link.path}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            onClick={() => setResourcesOpen(false)}
                          >
                            <link.icon className="w-4 h-4 mr-3 text-gray-500" />
                            {link.label}
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Auth Buttons */}
              <div className="ml-6 flex items-center space-x-4">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-slate-800 transition-colors"
                      >
                        <BarChart2 className="mr-2 h-4 w-4" />
                        Admin
                      </Link>
                    )}
                    <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                      <User className="w-4 h-4 text-slate-800" />
                      <span className="text-sm font-medium text-slate-900">
                        {user?.username || "User"}
                      </span>
                    </div>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleLogout}
                      sx={{
                        color: "#dc2626",
                        borderColor: "#dc2626",
                        borderRadius: "8px",
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "#b91c1c",
                          backgroundColor: "#1e293b",
                        },
                      }}
                      startIcon={<LogOut className="w-4 h-4" />}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setAuthModal("login")}
                      sx={{
                        color: "#1e293b",
                        borderColor: "#1e293b",
                        borderRadius: "8px",
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "#1d4ed8",
                          backgroundColor: "#eff6ff",
                        },
                      }}
                      startIcon={<LogIn className="w-4 h-4" />}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setAuthModal("register")}
                      sx={{
                        background: "#1e293b",
                        borderRadius: "8px",
                        textTransform: "none",
                        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg,rgb(21, 30, 57) 0%,rgb(26, 33, 56) 100%)",
                          boxShadow: "0 6px 16px rgba(37, 99, 235, 0.4)",
                        },
                      }}
                      startIcon={<User className="w-4 h-4" />}
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => {
                  console.log('Mobile menu button clicked', !isOpen); // Debug log
                  setIsOpen(!isOpen);
                }}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Full Screen */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 top-[116px] z-[100] bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-2xl">
            <div className="h-full overflow-y-auto">
              <div className="px-6 pt-6 pb-8 space-y-3">
                {/* Main Navigation Links */}
                {navLinks.map((link, index) => (
                  <div key={link.path}>
                    <NavLink
                      to={link.path}
                      onClick={handleMobileNavClick}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-4 rounded-xl text-lg font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-slate-500 text-white shadow-lg"
                            : "text-gray-700 hover:bg-white hover:text-yellow-600 hover:shadow-md"
                        }`
                      }
                    >
                      <link.icon className="w-6 h-6 mr-4" />
                      <span>{link.label}</span>
                    </NavLink>
                  </div>
                ))}

                {/* Mobile Resources Section */}
                <div>
                  <button
                    onClick={() => setResourcesOpen(!resourcesOpen)}
                    className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-lg font-medium transition-all duration-200 ${
                      resourcesOpen 
                        ? "bg-slate-500 text-white shadow-lg" 
                        : "text-gray-700 hover:bg-white hover:text-yellow-600 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center">
                      <BookOpen className="w-6 h-6 mr-4" />
                      <span>Resources</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${resourcesOpen ? 'transform rotate-180' : ''}`} />
                  </button>

                  {resourcesOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      {resourcesLinks.map((link) => (
                        <div key={link.path}>
                          <NavLink
                            to={link.path}
                            onClick={handleMobileNavClick}
                            className="flex items-center px-4 py-3 rounded-lg text-base text-gray-600 hover:bg-white hover:text-blue-600 transition-colors"
                          >
                            <link.icon className="w-5 h-5 mr-3 text-gray-500" />
                            {link.label}
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Auth Section */}
                <div className="pt-6 mt-6 border-t border-blue-200">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between px-4 py-4 bg-white rounded-xl shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-medium text-gray-900 text-lg">
                            {user?.username || "User"}
                          </span>
                        </div>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center text-slate-600 hover:text-slate-700"
                            onClick={handleMobileNavClick}
                          >
                            <BarChart2 className="mr-2 h-5 w-5" />
                            <span>Admin</span>
                          </Link>
                        )}
                      </div>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => {
                          handleLogout();
                          handleMobileNavClick();
                        }}
                        sx={{
                          color: "#dc2626",
                          borderColor: "#1e293b",
                          borderRadius: "12px",
                          py: 2,
                          fontSize: "1rem",
                          textTransform: "none",
                          "&:hover": {
                            borderColor: "#b91c1c",
                            backgroundColor: "#fef2f2",
                          },
                        }}
                        startIcon={<LogOut className="w-5 h-5" />}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-4">
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => {
                          setAuthModal("login");
                          handleMobileNavClick();
                        }}
                        sx={{
                          color: "#1e293b",
                          borderColor: "#1e293b",
                          borderRadius: "12px",
                          py: 2,
                          fontSize: "1rem",
                          textTransform: "none",
                          "&:hover": {
                            borderColor: "#1d4ed8",
                            backgroundColor: "#eff6ff",
                          },
                        }}
                        startIcon={<LogIn className="w-5 h-5" />}
                      >
                        Login
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => {
                          setAuthModal("register");
                          handleMobileNavClick();
                        }}
                        sx={{
                          background: "#1e293b",
                          borderRadius: "12px",
                          py: 2,
                          fontSize: "1rem",
                          textTransform: "none",
                          boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                            boxShadow: "0 6px 16px rgba(37, 99, 235, 0.4)",
                          },
                        }}
                        startIcon={<User className="w-5 h-5" />}
                      >
                        Register
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <AuthModals openType={authModal} onClose={() => setAuthModal(null)} />
      </nav>
    </>
  );
};

export default Navbar;