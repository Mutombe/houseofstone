import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import {
  User,
  LogIn,
  LogOut,
  Building2,
  Users,
  Handshake,
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
      <div className="mx-auto w-16 h-16 mb-4">
        <img
          src="/logo.png"
          alt="HSP Logo"
          className="rounded-2xl w-full h-full"
        />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {view === "login" ? "Welcome Back!" : "Join HSP"}
      </h2>
      <p className="text-gray-600">
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
        maxWidth="xs"
        fullWidth
        aria-labelledby="auth-dialog-title"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="p-6 space-y-6"
        >
          <div className="text-center">
            <div className="mx-auto w-20 h-16 mb-4">
              <img
                src="/logo.png"
                alt="HSP Logo"
                className="rounded-2xl w-full h-full"
              />
            </div>
            <h2
              id="auth-dialog-title"
              className="text-2xl font-bold text-gray-900 mb-2"
            >
              {view === "login" ? "Welcome Back!" : "Join HSP"}
            </h2>
            <p className="text-gray-600">
              {view === "login"
                ? "Sign in to continue to your account"
                : "Create your free HSP account"}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 p-3 rounded-lg text-red-700 text-sm"
            >
              {view === "register"
                ? getRegistrationError()
                : typeof error === "object"
                ? error.detail || JSON.stringify(error)
                : error}
            </motion.div>
          )}

          <div className="space-y-4">
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
                    <AtSign className="text-gray-400 mr-2" size={18} />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#92400e",
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "#92400e",
                  },
                }}
                aria-label="Email"
                required
              />
            )}

            {view === "register" && <Divider className="my-4" />}

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
                  <User className="text-gray-400 mr-2" size={18} />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#92400e",
                  },
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "#92400e",
                },
              }}
              aria-label="Username"
              required
            />

            <Divider className="my-4" />

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
                  <Lock className="text-gray-400 mr-2" size={18} />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#92400e",
                  },
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "#92400e",
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
              color: "#fffbeb",
              borderColor: "#92400e",
              backgroundColor: "#92400e",
              "&:hover": {
                borderColor: "#92400e",
                backgroundColor: "#78350f",
              },
            }}
            className="bg-amber-700 hover:bg-amber-700 rounded-xl py-3 text-base font-semibold shadow-lg"
          >
            {status === "loading" ? (
              <span className="animate-pulse">Processing...</span>
            ) : view === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>

          <Divider className="my-6">or</Divider>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => setView(view === "login" ? "register" : "login")}
            sx={{
              color: "#92400e",
              borderColor: "#92400e",
              "&:hover": {
                borderColor: "#92400e",
                backgroundColor: "#fffbeb",
              },
            }}
            className="rounded-xl py-2.5 text-gray-700 border-amber-700 text-amber-700"
          >
            {view === "login"
              ? "Create New Account"
              : "Already have an account? Sign In"}
          </Button>
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
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isAdmin = user?.is_superuser;
  const dispatch = useDispatch();

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/properties", label: "Properties", icon: Building2 },
    { path: "/about", label: "About", icon: Users },
    { path: "/consulting", label: "Consulting", icon: Handshake },
    { path: "/market", label: "Market Analysis", icon: TrendingUpDown },
    { path: "/contact", label: "Contact", icon: PhoneCall },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="w-full bg-stone-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm">
            <a
              href="tel:+263772329569"
              className="flex items-center hover:text-stone-300"
              aria-label="Call Us"
            >
              <Phone className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">+263 772 329 569</span>
            </a>
            <a
              href="mailto:info@hsp.co.zw"
              className="flex items-center hover:text-stone-300"
              aria-label="Email Us"
            >
              <Mail className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">info@hsp.co.zw</span>
            </a>
          </div>
          <div className="text-xs hidden md:block">
            <span className="flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Suite 2, First Floor Ballantyne Park Shopping Centre, Harare
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <NavLink to="/" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="House of Stone Properties"
                  className="h-10 w-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "";
                  }}
                />
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? "text-stone-900 border-b-2 border-amber-800"
                        : "text-stone-600 hover:text-amber-800"
                    } flex items-center space-x-1`
                  }
                >
                  <link.icon className="w-4 h-4 mr-1" />
                  <span>{link.label}</span>
                </NavLink>
              ))}

              {/* Auth Buttons */}
              <div className="ml-4 flex items-center">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="transition flex items-center"
                      >
                        <BarChart2 className="mr-1 h-4 w-4" />
                        Admin
                      </Link>
                    )}
                    <span className="text-sm font-medium flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {user?.username || "User"}
                    </span>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleLogout}
                      className="text-amber-800 border-amber-800 hover:bg-amber-50"
                      sx={{
                        color: "#92400e",
                        borderColor: "#92400e",
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
                        color: "#92400e",
                        borderColor: "#92400e",
                        "&:hover": {
                          borderColor: "#92400e",
                          backgroundColor: "#92400e",
                        },
                      }}
                      className="text-amber-800 border-amber-800 hover:bg-amber-50 hover:text-white"
                      startIcon={<LogIn className="w-4 h-4" />}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setAuthModal("register")}
                      sx={{
                        color: "#fffbeb",
                        borderColor: "#92400e",
                        backgroundColor: "#92400e",
                        "&:hover": {
                          borderColor: "#92400e",
                          backgroundColor: "#92400e",
                        },
                      }}
                      className=" hover:bg-amber-900 hover:text-white"
                      startIcon={<User className="w-4 h-4" />}
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center text-stone-600 hover:text-amber-800"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                <span className="mr-2 text-sm font-medium">Menu</span>
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center block px-3 py-2 rounded-md text-base font-medium ${
                        isActive
                          ? "bg-amber-800 text-white"
                          : "text-stone-600 hover:bg-stone-100 hover:text-amber-800"
                      } space-x-2`
                    }
                  >
                    <link.icon className="w-5 h-5 mr-2" />
                    <span>{link.label}</span>
                  </NavLink>
                ))}

                {/* Mobile Auth Buttons */}
                <div className="pt-2">
                  <Divider />
                  <div className="pt-2 pb-1">
                    {isAuthenticated ? (
                      <>
                        <div className="flex items-center justify-between px-3 py-2">
                          <span className="text-sm font-medium flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {user?.username || "User"}
                          </span>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={handleLogout}
                            className=""
                            sx={{
                              color: "#92400e",
                              borderColor: "#92400e",
                            }}
                            startIcon={<LogOut className="w-4 h-4" />}
                          >
                            Logout
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col space-y-2 px-2">
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => {
                            setAuthModal("login");
                            setIsOpen(false);
                          }}
                          sx={{
                            color: "#92400e",
                            borderColor: "#92400e",
                            "&:hover": {
                              borderColor: "#92400e",
                              backgroundColor: "#92400e",
                            },
                          }}
                          className="justify-start"
                          startIcon={<LogIn className="w-5 h-5" />}
                        >
                          Login
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => {
                            setAuthModal("register");
                            setIsOpen(false);
                          }}
                          sx={{
                            color: "#92400e", // amber-800
                            borderColor: "#92400e", // amber-800
                            backgroundColor: "#fffbeb", // amber-50
                            "&:hover": {
                              borderColor: "#78350f", // amber-900
                              backgroundColor: "#fffbeb", // amber-50
                            },
                            textTransform: "none",
                          }}
                          className="bg-amber-800 hover:bg-amber-900 justify-start"
                          startIcon={<User className="w-5 h-5" />}
                        >
                          Register
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AuthModals openType={authModal} onClose={() => setAuthModal(null)} />
      </nav>
    </>
  );
};

export default Navbar;
