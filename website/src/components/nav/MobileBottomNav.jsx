// website/src/components/nav/MobileBottomNav.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, Heart, User, Building2, Menu, X, Phone, Info } from 'lucide-react';
import { useSelector } from 'react-redux';

const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { savedProperties } = useSelector((state) => state.localSaves);
  const savedCount = savedProperties?.length || 0;
  const [showMore, setShowMore] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check screen size for extra-small phones
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 360);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Check if user is admin or agent
  const isAdmin = user?.is_staff || user?.is_superuser;
  const isAgent = user?.is_agent;

  const mainNavItems = [
    {
      path: '/',
      icon: Home,
      label: 'Home',
    },
    {
      path: '/properties',
      icon: Search,
      label: 'Search',
    },
    {
      path: '/saved',
      icon: Heart,
      label: 'Saved',
      badge: savedCount,
    },
    {
      path: isAuthenticated
        ? (isAdmin ? '/admin' : isAgent ? '/agent-dashboard' : '/saved')
        : null,
      icon: User,
      label: isAuthenticated ? 'Account' : 'Login',
      onClick: !isAuthenticated ? () => setShowMore(true) : undefined,
    },
  ];

  const moreMenuItems = [
    { path: '/about', icon: Info, label: 'About Us' },
    { path: '/contact', icon: Phone, label: 'Contact' },
    { path: '/rent', icon: Building2, label: 'Rentals' },
    { path: '/commercial', icon: Building2, label: 'Commercial' },
  ];

  const isActive = (path) => {
    if (!path) return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (item, e) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
  };

  return (
    <>
      {/* More Menu Overlay */}
      <AnimatePresence>
        {showMore && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setShowMore(false)}
            />
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-[76px] xs:bottom-[80px] left-2 right-2 xs:left-3 xs:right-3 sm:left-4 sm:right-4 bg-[#0A1628] border border-white/10 rounded-xl xs:rounded-2xl z-50 overflow-hidden lg:hidden max-h-[60vh] overflow-y-auto"
            >
              <div className="p-2 xs:p-3">
                <div className="grid grid-cols-2 gap-1.5 xs:gap-2">
                  {moreMenuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setShowMore(false)}
                        className={`flex items-center gap-2 xs:gap-3 p-3 xs:p-4 rounded-lg xs:rounded-xl transition-all active:scale-95 ${
                          active
                            ? 'bg-[#C9A962]/20 text-[#C9A962]'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white active:bg-white/15'
                        }`}
                      >
                        <Icon className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
                        <span className="text-xs xs:text-sm font-medium truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>

                {!isAuthenticated && (
                  <div className="mt-2 p-2 border-t border-white/10">
                    <p className="text-[10px] xs:text-xs text-gray-500 text-center mb-2 xs:mb-3">Sign in to access your account</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setShowMore(false);
                          window.dispatchEvent(new CustomEvent('openAuthModal', { detail: 'login' }));
                        }}
                        className="flex-1 py-2.5 xs:py-3 bg-[#C9A962] text-[#0A1628] rounded-lg xs:rounded-xl font-semibold text-xs xs:text-sm active:bg-[#B8985A]"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          setShowMore(false);
                          window.dispatchEvent(new CustomEvent('openAuthModal', { detail: 'register' }));
                        }}
                        className="flex-1 py-2.5 xs:py-3 bg-white/10 text-white rounded-lg xs:rounded-xl font-semibold text-xs xs:text-sm active:bg-white/20"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        {/* Floating pill container */}
        <div className="mx-2 xs:mx-3 mb-2 xs:mb-3">
          <div className="bg-[#0A1628]/95 backdrop-blur-xl border border-white/10 rounded-xl xs:rounded-2xl shadow-lg shadow-black/30">
            <div className="flex items-center justify-around h-14 xs:h-16 px-1 xs:px-2 relative">
              {mainNavItems.map((item, index) => {
                const active = isActive(item.path);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path || index}
                    to={item.path || '#'}
                    onClick={(e) => handleNavClick(item, e)}
                    className="flex-1 h-full flex items-center justify-center relative min-w-0"
                  >
                    <motion.div
                      className="relative flex flex-col items-center"
                      whileTap={{ scale: 0.9 }}
                    >
                      {/* Active background glow */}
                      {active && (
                        <motion.div
                          layoutId="activeGlow"
                          className="absolute -inset-2 xs:-inset-3 bg-[#C9A962]/20 rounded-xl xs:rounded-2xl"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}

                      {/* Icon container with pop-up effect for active state */}
                      <motion.div
                        animate={{
                          y: active ? -3 : 0,
                          scale: active ? 1.1 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="relative z-10"
                      >
                        <div
                          className={`relative p-1.5 xs:p-2 rounded-lg xs:rounded-xl transition-colors ${
                            active ? 'bg-[#C9A962] text-[#0A1628]' : 'text-gray-400'
                          }`}
                        >
                          <Icon className={`w-[18px] h-[18px] xs:w-5 xs:h-5 ${active ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />

                          {/* Badge */}
                          {item.badge > 0 && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`absolute -top-1 -right-1 min-w-[14px] xs:min-w-[18px] h-[14px] xs:h-[18px] text-[8px] xs:text-[10px] font-bold rounded-full flex items-center justify-center ${
                                active
                                  ? 'bg-[#0A1628] text-[#C9A962]'
                                  : 'bg-[#C9A962] text-[#0A1628]'
                              }`}
                            >
                              {item.badge > 9 ? '9+' : item.badge}
                            </motion.span>
                          )}
                        </div>
                      </motion.div>

                      {/* Label */}
                      <motion.span
                        animate={{
                          opacity: active ? 1 : 0.6,
                          y: active ? 1 : 0,
                        }}
                        className={`text-[9px] xs:text-[10px] mt-0.5 xs:mt-1 font-semibold truncate max-w-full ${
                          active ? 'text-[#C9A962]' : 'text-gray-500'
                        }`}
                      >
                        {isSmallScreen && item.label.length > 5 ? item.label.slice(0, 5) : item.label}
                      </motion.span>

                      {/* Active dot indicator */}
                      {active && (
                        <motion.div
                          layoutId="activeDot"
                          className="absolute -bottom-0.5 xs:-bottom-1 w-1 h-1 bg-[#C9A962] rounded-full"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Safe area spacer for iOS - using env() for proper support */}
        <div className="h-[env(safe-area-inset-bottom,0px)] bg-[#0A1628]/50" />
      </nav>
    </>
  );
};

export default MobileBottomNav;
