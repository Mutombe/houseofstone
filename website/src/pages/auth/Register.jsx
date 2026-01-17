import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { register, clearError } from "../../redux/slices/authSlice";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Home,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

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

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, status, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const returnUrl = location.state?.returnUrl || "/";
      navigate(returnUrl, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  }, [formData.password]);

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.username) {
      errors.username = "Username is required";
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(
        register({
          email: formData.email,
          username: formData.username,
          password: formData.password,
        })
      ).unwrap();
      const returnUrl = location.state?.returnUrl || "/";
      navigate(returnUrl, { replace: true });
    } catch (err) {
      // Error handled by Redux
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: "" });
    }
    if (error) {
      dispatch(clearError());
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-amber-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };

  const benefits = [
    "Save your favorite properties",
    "Get personalized recommendations",
    "Receive price drop alerts",
    "Schedule property viewings",
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0A1628] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Modern home"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/80 to-[#0A1628]/40" />
        </div>

        {/* Decorative Elements */}
        <FloatingOrb className="w-[500px] h-[500px] bg-[#C9A962] -top-40 -left-40" delay={0} />
        <FloatingOrb className="w-[300px] h-[300px] bg-[#1E3A5F] bottom-20 right-20" delay={2} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link
            to="/"
            className="flex items-center gap-3 text-white hover:text-[#C9A962] transition-colors"
          >
            <div className="w-10 h-10 bg-[#C9A962]/10 rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 text-[#C9A962]" />
            </div>
            <span className="text-xl font-semibold">House of Stone</span>
          </Link>

          <div className="max-w-lg">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold text-white mb-6"
            >
              Start Your{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Journey
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg leading-relaxed mb-8"
            >
              Join thousands of homeowners and investors who trust House of
              Stone to find their perfect property.
            </motion.p>

            {/* Benefits list */}
            <motion.ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-white"
                >
                  <div className="w-6 h-6 rounded-full bg-[#C9A962]/20 flex items-center justify-center">
                    <IoCheckmarkDoneCircleOutline className="w-4 h-4 text-[#C9A962]" />
                  </div>
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <span>Free to join</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>No credit card required</span>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#060D16] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md py-8"
        >
          {/* Mobile logo */}
          <Link
            to="/"
            className="lg:hidden flex items-center gap-3 text-white mb-8"
          >
            <div className="w-10 h-10 bg-[#C9A962]/10 rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 text-[#C9A962]" />
            </div>
            <span className="text-xl font-semibold">House of Stone</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                state={{ returnUrl: location.state?.returnUrl }}
                className="text-[#C9A962] hover:text-[#E8D5A3] font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
            >
              {typeof error === "object" ? (
                <ul className="space-y-1">
                  {Object.entries(error).map(([key, value]) => (
                    <li key={key}>
                      {key !== "detail" && <strong>{key}: </strong>}
                      {Array.isArray(value) ? value.join(", ") : value}
                    </li>
                  ))}
                </ul>
              ) : (
                error
              )}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  className={`w-full pl-12 pr-4 py-4 bg-white/5 border ${
                    formErrors.email ? "border-red-500" : "border-white/10"
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors`}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              {formErrors.email && (
                <p className="mt-2 text-sm text-red-400">{formErrors.email}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={handleChange("username")}
                  className={`w-full pl-12 pr-4 py-4 bg-white/5 border ${
                    formErrors.username ? "border-red-500" : "border-white/10"
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors`}
                  placeholder="Choose a username"
                  autoComplete="username"
                />
              </div>
              {formErrors.username && (
                <p className="mt-2 text-sm text-red-400">{formErrors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange("password")}
                  className={`w-full pl-12 pr-12 py-4 bg-white/5 border ${
                    formErrors.password ? "border-red-500" : "border-white/10"
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors`}
                  placeholder="Create a password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p className="mt-2 text-sm text-red-400">{formErrors.password}</p>
              )}

              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          level <= passwordStrength
                            ? getStrengthColor()
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-xs ${
                      passwordStrength <= 2
                        ? "text-red-400"
                        : passwordStrength <= 3
                        ? "text-amber-400"
                        : "text-green-400"
                    }`}
                  >
                    Password strength: {getStrengthText()}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  className={`w-full pl-12 pr-12 py-4 bg-white/5 border ${
                    formErrors.confirmPassword
                      ? "border-red-500"
                      : "border-white/10"
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors`}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="mt-2 text-sm text-red-400">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-[#C9A962] focus:ring-[#C9A962] focus:ring-offset-0"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-[#C9A962] hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-[#C9A962] hover:underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-[#0A1628] border-t-transparent rounded-full"
                  />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#060D16] text-gray-500">
                or sign up with
              </span>
            </div>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#4285F4"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
