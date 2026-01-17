/**
 * House of Stone Properties - Design System
 * Swiss-style design tokens for consistent, world-class UI
 */

// Color Palette - Swiss-style sophistication
export const colors = {
  // Primary - Deep Navy for trust and professionalism
  navy: {
    50: '#E8EBF0',
    100: '#C5CDD8',
    200: '#9EABBD',
    300: '#7789A2',
    400: '#596F8D',
    500: '#3B5578',
    600: '#334A6A',
    700: '#293C57',
    800: '#1F2E44',
    900: '#0A1628',
    DEFAULT: '#0A1628',
  },

  // Accent - Warm Gold for CTAs and highlights
  gold: {
    50: '#FBF8F0',
    100: '#F5EDD8',
    200: '#EDE0BC',
    300: '#E4D29F',
    400: '#DCC471',
    500: '#C9A962',
    600: '#B8985A',
    700: '#A0844E',
    800: '#876F42',
    900: '#5C4B2D',
    DEFAULT: '#C9A962',
    light: '#DCC471',
    dark: '#B8985A',
  },

  // Neutrals - Cool grays for breathing room
  stone: {
    50: '#FAFAF9',
    100: '#F5F5F4',
    200: '#E7E5E4',
    300: '#D6D3D1',
    400: '#A8A29E',
    500: '#78716C',
    600: '#57534E',
    700: '#44403C',
    800: '#292524',
    900: '#1C1917',
  },

  // Semantic Colors - Status indicators
  semantic: {
    available: {
      bg: '#ECFDF5',
      text: '#065F46',
      border: '#6EE7B7',
    },
    pending: {
      bg: '#FFFBEB',
      text: '#92400E',
      border: '#FCD34D',
    },
    sold: {
      bg: '#FEF2F2',
      text: '#991B1B',
      border: '#FCA5A5',
    },
    offMarket: {
      bg: '#F3F4F6',
      text: '#374151',
      border: '#D1D5DB',
    },
  },

  // Utility colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Typography - Swiss precision
export const typography = {
  fontFamily: {
    // Serif for headlines - refined elegance
    serif: ['GravitaHUM', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
    // Sans for body - clean legibility
    sans: ['Gellix', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
    // Display for special text
    display: ['Gravesend Sans', 'Inter', 'sans-serif'],
  },

  // Type scale with Swiss precision
  fontSize: {
    'display-2xl': ['4.5rem', { lineHeight: '1.0', letterSpacing: '-0.025em', fontWeight: '700' }],
    'display-xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
    'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '600' }],
    'display-md': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
    'display-sm': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.005em', fontWeight: '600' }],
    'heading-xl': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],
    'heading-lg': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
    'heading-md': ['1.125rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '500' }],
    'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
    'body-md': ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
    'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
    'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '400' }],
    'overline': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '500' }],
  },
};

// Spacing - 8px grid system
export const spacing = {
  grid: 8,
  px: '1px',
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px (1 grid unit)
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px (2 grid units)
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px (3 grid units)
  8: '2rem',       // 32px (4 grid units)
  10: '2.5rem',    // 40px (5 grid units)
  12: '3rem',      // 48px (6 grid units)
  16: '4rem',      // 64px (8 grid units)
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
  40: '10rem',     // 160px
  48: '12rem',     // 192px
  56: '14rem',     // 224px
  64: '16rem',     // 256px
};

// Container settings
export const container = {
  maxWidth: '1440px',
  padding: {
    mobile: '1rem',     // 16px
    tablet: '2rem',     // 32px
    desktop: '4rem',    // 64px
  },
  gutter: {
    mobile: '1rem',
    tablet: '1.5rem',
    desktop: '2rem',
  },
};

// Border radius - soft, modern curves
export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  DEFAULT: '0.5rem', // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  full: '9999px',
};

// Shadows - subtle depth
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(10, 22, 40, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(10, 22, 40, 0.1), 0 1px 2px -1px rgba(10, 22, 40, 0.1)',
  md: '0 4px 6px -1px rgba(10, 22, 40, 0.1), 0 2px 4px -2px rgba(10, 22, 40, 0.1)',
  lg: '0 10px 15px -3px rgba(10, 22, 40, 0.1), 0 4px 6px -4px rgba(10, 22, 40, 0.1)',
  xl: '0 20px 25px -5px rgba(10, 22, 40, 0.1), 0 8px 10px -6px rgba(10, 22, 40, 0.1)',
  '2xl': '0 25px 50px -12px rgba(10, 22, 40, 0.25)',
  card: '0 2px 8px -2px rgba(10, 22, 40, 0.08), 0 4px 16px -4px rgba(10, 22, 40, 0.12)',
  cardHover: '0 8px 24px -4px rgba(10, 22, 40, 0.12), 0 16px 32px -8px rgba(10, 22, 40, 0.16)',
  inner: 'inset 0 2px 4px 0 rgba(10, 22, 40, 0.05)',
};

// Animation - Framer Motion variants
export const animations = {
  duration: {
    instant: 0,
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
  },

  easing: {
    default: [0.4, 0, 0.2, 1],      // ease-out
    in: [0.4, 0, 1, 1],              // ease-in
    out: [0, 0, 0.2, 1],             // ease-out
    inOut: [0.4, 0, 0.2, 1],         // ease-in-out
    spring: { type: 'spring', stiffness: 300, damping: 30 },
    springBounce: { type: 'spring', stiffness: 400, damping: 25 },
  },

  // Pre-built motion variants
  variants: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },

    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
    },

    fadeInDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 10 },
    },

    slideInRight: {
      initial: { x: '100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '100%', opacity: 0 },
    },

    slideInLeft: {
      initial: { x: '-100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '-100%', opacity: 0 },
    },

    slideInUp: {
      initial: { y: '100%', opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '100%', opacity: 0 },
    },

    scaleIn: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 },
    },

    cardHover: {
      rest: { y: 0, boxShadow: shadows.card },
      hover: { y: -8, boxShadow: shadows.cardHover },
    },

    staggerContainer: {
      animate: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.05,
        },
      },
    },

    staggerItem: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
  },

  // Transition presets
  transition: {
    default: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    fast: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
    slow: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    spring: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Z-index scale
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
};

// Utility function: classNames merger
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Property status helpers
export const getStatusStyles = (status) => {
  const statusMap = {
    available: colors.semantic.available,
    pending: colors.semantic.pending,
    sold: colors.semantic.sold,
    'off-market': colors.semantic.offMarket,
  };
  return statusMap[status] || statusMap.available;
};

// Format price for display
export const formatPrice = (price, currency = 'USD') => {
  if (!price) return 'Price on Request';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default {
  colors,
  typography,
  spacing,
  container,
  borderRadius,
  shadows,
  animations,
  breakpoints,
  zIndex,
  cn,
  getStatusStyles,
  formatPrice,
};
