import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowLeft,
  Home,
  CheckCircle,
  Send,
  HelpCircle,
} from "lucide-react";
import api from "../../utils/api";

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

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      await api.post("auth/reset-password/", { email });
      setSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Failed to send reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060D16] p-4">
        <FloatingOrb className="w-[400px] h-[400px] bg-[#C9A962] -top-40 -right-40" delay={0} />
        <FloatingOrb className="w-[300px] h-[300px] bg-[#1E3A5F] bottom-20 left-20" delay={2} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Check Your Email
          </h2>
          <p className="text-gray-400 mb-8">
            We've sent a password reset link to{" "}
            <span className="text-[#C9A962] font-medium">{email}</span>. Please
            check your inbox and follow the instructions.
          </p>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSubmitted(false)}
              className="w-full py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
            >
              Send Again
            </motion.button>

            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Sign In
              </motion.button>
            </Link>
          </div>

          <p className="mt-8 text-gray-500 text-sm">
            Didn't receive the email? Check your spam folder or{" "}
            <button
              onClick={() => setSubmitted(false)}
              className="text-[#C9A962] hover:underline font-medium"
            >
              try again
            </button>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0A1628] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Home"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0A1628]/90 to-[#0A1628]/70" />
        </div>

        {/* Decorative Elements */}
        <FloatingOrb className="w-[500px] h-[500px] bg-[#C9A962] top-1/4 -right-40" delay={0} />
        <FloatingOrb className="w-[300px] h-[300px] bg-[#1E3A5F] -bottom-20 left-20" delay={2} />

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
              Reset Your{" "}
              <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                Password
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg leading-relaxed"
            >
              No worries, it happens to the best of us. We'll send you a link to
              reset your password.
            </motion.p>
          </div>

          <div />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#060D16]">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
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

          {/* Back link */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#C9A962] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Forgot Password?
            </h2>
            <p className="text-gray-400">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Enter the email associated with your account
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-[#0A1628] border-t-transparent rounded-full"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Reset Link
                </>
              )}
            </motion.button>
          </form>

          {/* Help box */}
          <div className="mt-8 p-5 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#C9A962]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-5 h-5 text-[#C9A962]" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">Need Help?</h3>
                <p className="text-gray-400 text-sm">
                  If you're having trouble accessing your account, please{" "}
                  <Link
                    to="/contact"
                    className="text-[#C9A962] hover:underline font-medium"
                  >
                    contact our support team
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
