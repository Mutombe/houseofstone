/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Custom screens for better mobile responsiveness
    screens: {
      'xs': '375px',      // Small phones (iPhone SE, etc.)
      'sm': '640px',      // Large phones / small tablets
      'md': '768px',      // Tablets
      'lg': '1024px',     // Laptops
      'xl': '1280px',     // Desktops
      '2xl': '1536px',    // Large desktops
    },
    extend: {
      // Colors - Swiss-style palette
      colors: {
        // Primary - Deep Navy
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
        // Accent - Warm Gold
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
        },
        // Status colors
        status: {
          available: '#10B981',
          pending: '#F59E0B',
          sold: '#EF4444',
          'off-market': '#6B7280',
        },
      },

      // Typography
     fontFamily: {
        serif: ['GravitaHUM', 'Georgia', 'Cambria', 'serif'],
        // You can add Quicksand here as a new utility
        quicksand: ['Quicksand', 'sans-serif'],

        sans: ['Gellix', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Gravesend Sans', 'Inter', 'sans-serif'],
        roboto: ['Geist', 'sans-serif'],
        // Description font - elegant serif for property descriptions
        description: ['Cormorant Garamond', 'Georgia', 'serif'],
        // Price font - bold, condensed numbers
        price: ['Oswald', 'Arial Narrow', 'sans-serif'],
      },

      // Custom font sizes with Swiss-style line heights
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.0', letterSpacing: '-0.025em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-md': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.2' }],
        'heading-xl': ['1.5rem', { lineHeight: '1.3' }],
        'heading-lg': ['1.25rem', { lineHeight: '1.4' }],
        'heading-md': ['1.125rem', { lineHeight: '1.4' }],
      },

      // Spacing - 8px grid
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '68': '17rem',
        '76': '19rem',
        '84': '21rem',
        '88': '22rem',
        '92': '23rem',
        '100': '25rem',
        '108': '27rem',
        '116': '29rem',
        '128': '32rem',
      },

      // Container
      maxWidth: {
        'container': '1440px',
        '8xl': '88rem',
        '9xl': '96rem',
      },

      // Border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // Shadows - subtle depth
      boxShadow: {
        'card': '0 2px 8px -2px rgba(10, 22, 40, 0.08), 0 4px 16px -4px rgba(10, 22, 40, 0.12)',
        'card-hover': '0 8px 24px -4px rgba(10, 22, 40, 0.12), 0 16px 32px -8px rgba(10, 22, 40, 0.16)',
        'nav': '0 1px 3px 0 rgba(10, 22, 40, 0.05), 0 1px 2px -1px rgba(10, 22, 40, 0.05)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(10, 22, 40, 0.05)',
        'glow-gold': '0 0 20px rgba(201, 169, 98, 0.3)',
      },

      // Animation
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // Keyframes for custom animations
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },

      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.4s ease-out',
        'fade-in-down': 'fade-in-down 0.4s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },

      // Backdrop blur
      backdropBlur: {
        xs: '2px',
      },

      // Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // Aspect ratios
      aspectRatio: {
        'property': '4 / 3',
        'hero': '16 / 9',
        'square': '1 / 1',
      },

      // Grid template columns
      gridTemplateColumns: {
        'property-grid': 'repeat(auto-fill, minmax(300px, 1fr))',
      },

      // Background images
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #C9A962 0%, #DCC471 50%, #B8985A 100%)',
        'gradient-navy': 'linear-gradient(180deg, #0A1628 0%, #1F2E44 100%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
