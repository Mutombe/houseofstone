// src/components/nav/nav.jsx
// Premium Navigation Component - House of Stone Properties
import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
  ChevronRight,
  BarChart,
  Banknote,
  TrendingUp,
  PhoneCall,
  Mail,
  Phone,
  Menu,
  X,
  Home,
  MapPin,
  PlusCircle,
  FileText,
  Download,
  Calculator,
  Building,
  Heart,
} from "lucide-react";
import { GiWorld } from "react-icons/gi";
import { PiUserCircleDashedBold } from "react-icons/pi";
import { TbUserScan } from "react-icons/tb";
import { BiUserCircle } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";
import { BsHouseCheck } from "react-icons/bs";
import { GiHouseKeys } from "react-icons/gi";
import { SiFsecure } from "react-icons/si";
import { MdOutlineDashboard } from "react-icons/md";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { TiThMenuOutline } from "react-icons/ti";



// Redux actions
import { logout, login, register } from "../../redux/slices/authSlice";
import { selectSavedProperties } from "../../redux/slices/localSavesSlice";

// Brand Colors
const COLORS = {
  navy: "#0A1628",
  navyLight: "#1F2E44",
  gold: "#C9A962",
  goldLight: "#D4B978",
  goldDark: "#B8985A",
};

// Floating Orb Background
const FloatingOrb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
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

// Magnetic Button Component
const MagneticButton = ({ children, className, onClick, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.3;
    const y = (clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Animated Logo
const AnimatedLogo = ({ scrolled }) => (
  <Link to="/" className="relative group flex-shrink-0">
    <motion.div
      className="relative z-10"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <img
        src="/logo.png"
        alt="House of Stone Properties"
        className="h-8 sm:h-10 lg:h-12 w-auto transition-all duration-500"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/logo2.webp";
        }}
      />
    </motion.div>

    {/* Glow effect on hover */}
    <motion.div
      className="absolute inset-0 bg-[#C9A962]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      initial={false}
    />
  </Link>
);

// Premium Navigation Link
const NavItem = ({ to, label, icon: Icon, scrolled, isActive, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className="relative group"
  >
    {({ isActive: active }) => (
      <motion.div
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
          active
            ? scrolled
              ? "text-[#C9A962]"
              : "text-[#C9A962]"
            : scrolled
            ? "text-white/80 hover:text-white"
            : "text-white/90 hover:text-white"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {Icon && (
          <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
            active ? "text-[#C9A962]" : ""
          }`} />
        )}
        <span>{label}</span>

        {/* Active indicator 
        {active && (
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C9A962] rounded-full"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}*/}
      </motion.div>
    )}
  </NavLink>
);

// Dropdown Menu Component
const DropdownMenu = ({ label, icon: Icon, items, scrolled, isOpen, onToggle }) => {
  const dropdownRef = useRef(null);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => onToggle(true)}
      onMouseLeave={() => onToggle(false)}
    >
      <motion.button
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
          isOpen
            ? scrolled
              ? "text-[#C9A962] bg-white/5"
              : "text-white bg-white/10"
            : scrolled
            ? "text-white/80 hover:text-white"
            : "text-white/90 hover:text-white"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span>{label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-72 z-50"
          >
            {/* Glassmorphism dropdown */}
            <div className="bg-[#0A1628]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/20 overflow-hidden">
              {/* Gold accent line */}
              <div className="h-0.5 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent" />

              <div className="p-2">
                {items.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A962]/20 transition-colors">
                        <item.icon className="w-5 h-5 text-[#C9A962]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm group-hover:text-[#C9A962] transition-colors">
                          {item.label}
                        </p>
                        {item.description && (
                          <p className="text-white/50 text-xs mt-0.5 line-clamp-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#C9A962] transition-colors opacity-0 group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile Menu Overlay
const MobileMenu = ({ isOpen, onClose, navItems, dropdowns, isAuthenticated, user, onLogout, onLogin, onRegister }) => {
  const [expandedDropdown, setExpandedDropdown] = useState(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-gradient-to-b from-[#0A1628] to-[#0F1E32] z-50 overflow-hidden"
          >
            {/* Decorative elements */}
            <FloatingOrb className="w-48 sm:w-64 h-48 sm:h-64 bg-[#C9A962] -top-24 sm:-top-32 -right-24 sm:-right-32" />
            <FloatingOrb className="w-32 sm:w-48 h-32 sm:h-48 bg-[#C9A962] bottom-20 -left-16 sm:-left-24" delay={2} />

            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
                <Link to="/" onClick={onClose}>
                  <img
                    src="/logo.png"
                    alt="HSP"
                    className="h-8 sm:h-10"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/logo2.webp";
                    }}
                  />
                </Link>
                <motion.button
                  onClick={onClose}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 active:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-4 sm:py-6 px-3 sm:px-4">
                <nav className="space-y-1.5 sm:space-y-2">
                  {/* Main Nav Items */}
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 ${
                            isActive
                              ? "bg-[#C9A962] text-[#0A1628]"
                              : "text-white hover:bg-white/5 active:bg-white/10"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base">{item.label}</span>
                      </NavLink>
                    </motion.div>
                  ))}

                  {/* Dropdowns */}
                  {dropdowns.map((dropdown, index) => (
                    <motion.div
                      key={dropdown.label}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navItems.length + index) * 0.05 }}
                    >
                      <button
                        onClick={() =>
                          setExpandedDropdown(
                            expandedDropdown === dropdown.label ? null : dropdown.label
                          )
                        }
                        className={`w-full flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 ${
                          expandedDropdown === dropdown.label
                            ? "bg-white/10 text-[#C9A962]"
                            : "text-white hover:bg-white/5 active:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <dropdown.icon className="w-5 h-5 flex-shrink-0" />
                          <span className="font-medium text-sm sm:text-base">{dropdown.label}</span>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedDropdown === dropdown.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {expandedDropdown === dropdown.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 sm:ml-6 mt-1.5 sm:mt-2 space-y-1 border-l-2 border-[#C9A962]/30 pl-3 sm:pl-4">
                              {dropdown.items.map((item) => (
                                <Link
                                  key={item.path}
                                  to={item.path}
                                  onClick={onClose}
                                  className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all"
                                >
                                  <item.icon className="w-4 h-4 text-[#C9A962] flex-shrink-0" />
                                  <span className="text-xs sm:text-sm">{item.label}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Auth Section */}
              <div className="p-4 sm:p-6 border-t border-white/10 pb-safe">
                {isAuthenticated ? (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-lg sm:rounded-xl">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C9A962] flex items-center justify-center flex-shrink-0">
                        <TbUserScan className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A1628]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-medium text-sm sm:text-base truncate">{user?.username || "User"}</p>
                        <p className="text-white/50 text-xs sm:text-sm">Welcome back!</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onLogout();
                        onClose();
                      }}
                      className="w-full flex items-center justify-center gap-2 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 active:bg-red-500/20 transition-colors text-sm sm:text-base"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button
                      onClick={() => {
                        onLogin();
                        onClose();
                      }}
                      className="flex items-center justify-center gap-2 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/20 text-white hover:bg-white/5 active:bg-white/10 transition-colors text-sm sm:text-base"
                    >
                      <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Sign In</span>
                    </button>
                    <button
                      onClick={() => {
                        onRegister();
                        onClose();
                      }}
                      className="flex items-center justify-center gap-2 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#C9A962] text-[#0A1628] font-medium hover:bg-[#B8985A] active:bg-[#A88949] transition-colors text-sm sm:text-base"
                    >
                      <User className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Register</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Auth Modal Component
const AuthModal = ({ type, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const [view, setView] = useState(type);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    setView(type);
  }, [type]);

  useEffect(() => {
    if (isOpen) {
      setFormData({ email: "", password: "", username: "" });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (view === "login") {
      dispatch(login({ username: formData.username, password: formData.password }))
        .unwrap()
        .then(() => onClose())
        .catch((err) => console.error("Login failed:", err));
    } else {
      dispatch(register(formData))
        .unwrap()
        .then(() => onClose())
        .catch((err) => console.error("Registration failed:", err));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md bg-gradient-to-b from-[#0A1628] to-[#0F1E32] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              {/* Header */}
              <div className="relative p-8 text-center">
                {/* Decorative orb */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#C9A962]/20 rounded-full blur-3xl" />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="relative w-16 h-16 mx-auto mb-4 bg-[#C9A962] rounded-2xl flex items-center justify-center"
                >
                  {view === "login" ? (
                    <LogIn className="w-8 h-8 text-[#0A1628]" />
                  ) : (
                    <User className="w-8 h-8 text-[#0A1628]" />
                  )}
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  {view === "login" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-white/60">
                  {view === "login"
                    ? "Sign in to access your account"
                    : "Join House of Stone Properties"}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                  >
                    {typeof error === "object" ? error.detail || JSON.stringify(error) : error}
                  </motion.div>
                )}

                {view === "register" && (
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#C9A962] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                )}

                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                  <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#C9A962] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="relative">
                  <SiFsecure className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#C9A962] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-[#C9A962] text-[#0A1628] rounded-xl font-semibold hover:bg-[#B8985A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === "loading" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-[#0A1628] border-t-transparent rounded-full"
                      />
                      <span>Processing...</span>
                    </>
                  ) : view === "login" ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </motion.button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-[#0F1E32] text-white/40 text-sm">or</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setView(view === "login" ? "register" : "login")}
                  className="w-full py-4 border border-white/10 rounded-xl text-white hover:bg-white/5 transition-colors"
                >
                  {view === "login" ? "Create New Account" : "Already have an account? Sign In"}
                </button>
              </form>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Main Navigation Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModal, setAuthModal] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const savedProperties = useSelector(selectSavedProperties);
  const savedCount = savedProperties?.length || 0;
  const isAdmin = user?.is_superuser;
  const dispatch = useDispatch();
  const location = useLocation();

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Listen for auth modal events from MobileBottomNav
  useEffect(() => {
    const handleOpenAuthModal = (event) => {
      const modalType = event.detail;
      if (modalType === 'login' || modalType === 'register') {
        setAuthModal(modalType);
      }
    };

    window.addEventListener('openAuthModal', handleOpenAuthModal);
    return () => {
      window.removeEventListener('openAuthModal', handleOpenAuthModal);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Navigation structure
  const mainNavItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/rent", label: "Rent", icon: GiHouseKeys },
  ];

  const buyItems = [
    { path: "/sale", label: "Residential", icon: Home, description: "Houses, Townhouses, Clusters" },
    { path: "/commercial", label: "Commercial", icon: Building2, description: "Office spaces, Retail" },
    { path: "/industrial", label: "Industrial", icon: Building, description: "Warehouses, Factories" },
    { path: "/development", label: "Development", icon: TrendingUp, description: "Land & Projects" },
  ];

  const sellItems = [
    { path: "/list", label: "List Property", icon: PlusCircle, description: "List your property" },
    { path: "/valuation", label: "Valuation", icon: Calculator, description: "Get property valued" },
    { path: "/guide", label: "Selling Guide", icon: FileText, description: "Tips & resources" },
  ];

  const aboutItems = [
    { path: "/about", label: "About Us", icon: LiaPeopleCarrySolid },
    { path: "/agents", label: "Our Agents", icon: Handshake },
    { path: "/contact", label: "Contact", icon: PhoneCall },
  ];

  const resourceItems = [
    { path: "/developments", label: "Developments", icon: TrendingUp },
    { path: "/neighborhoods", label: "Neighborhoods", icon: GiWorld },
    { path: "/mortgage", label: "Mortgage", icon: Banknote },
    { path: "/downloads", label: "Downloads", icon: Download },
  ];

  const dropdowns = [
    { label: "Buy", icon: BsHouseCheck, items: buyItems },
    { label: "Sell", icon: GiTakeMyMoney, items: sellItems },
    { label: "About", icon: LiaPeopleCarrySolid, items: aboutItems },
    { label: "Resources", icon: BookOpen, items: resourceItems },
  ];

  return (
    <>
      {/* Top Bar - Hidden on mobile, shown on tablet and up */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        className="hidden sm:block fixed top-0 left-0 right-0 z-50 bg-[#0A1628] text-white py-2 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-3 sm:gap-6">
              <a
                href="tel:+263772329569"
                className="flex items-center gap-1.5 sm:gap-2 text-white/70 hover:text-[#C9A962] transition-colors"
              >
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C9A962]" />
                <span className="hidden md:inline">+263 772 329 569</span>
                <span className="md:hidden">Call Us</span>
              </a>
              <a
                href="mailto:info@hsp.co.zw"
                className="flex items-center gap-1.5 sm:gap-2 text-white/70 hover:text-[#C9A962] transition-colors"
              >
                <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C9A962]" />
                <span className="hidden md:inline">info@hsp.co.zw</span>
                <span className="md:hidden">Email</span>
              </a>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-white/70">
              <MapPin className="w-3.5 h-3.5 text-[#C9A962]" />
              <span>21 Harare Drive, Borrowdale, Harare</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className={`fixed top-0 sm:top-9 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A1628]/90 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <AnimatedLogo scrolled={scrolled} />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Main nav items */}
              {mainNavItems.map((item) => (
                <NavItem
                  key={item.path}
                  to={item.path}
                  label={item.label}
                  icon={item.icon}
                  scrolled={scrolled}
                />
              ))}

              {/* Dropdowns */}
              {dropdowns.map((dropdown) => (
                <DropdownMenu
                  key={dropdown.label}
                  label={dropdown.label}
                  icon={dropdown.icon}
                  items={dropdown.items}
                  scrolled={scrolled}
                  isOpen={activeDropdown === dropdown.label}
                  onToggle={(open) => setActiveDropdown(open ? dropdown.label : null)}
                />
              ))}
            </nav>

            {/* Saved Properties - Desktop */}
            <Link
              to="/saved"
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors relative"
            >
              <Heart className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#C9A962] text-[#0A1628] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount > 9 ? '9+' : savedCount}
                </span>
              )}
            </Link>

            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C9A962]/10 text-[#C9A962] hover:bg-[#C9A962]/20 transition-colors"
                    >
                      <MdOutlineDashboard className="w-4 h-4" />
                      <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                  )}

                  <MagneticButton
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </MagneticButton>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <MagneticButton
                    onClick={() => setAuthModal("login")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                      scrolled
                        ? "border-white/20 text-white hover:bg-white/5"
                        : "border-white/30 text-white hover:bg-white/10"
                    }`}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </MagneticButton>

                  <MagneticButton
                    onClick={() => setAuthModal("register")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C9A962] text-[#0A1628] font-medium hover:bg-[#B8985A] transition-colors text-sm"
                  >
                    <PiUserCircleDashedBold className="w-4 h-4" />
                    <span>Register</span>
                  </MagneticButton>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/10 text-white active:bg-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TiThMenuOutline className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={mainNavItems}
        dropdowns={dropdowns}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        onLogin={() => setAuthModal("login")}
        onRegister={() => setAuthModal("register")}
      />

      {/* Auth Modal */}
      <AuthModal
        type={authModal}
        isOpen={!!authModal}
        onClose={() => setAuthModal(null)}
      />
    </>
  );
};

export default Navbar;
