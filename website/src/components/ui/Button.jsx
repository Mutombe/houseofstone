import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

/**
 * Button Component - Swiss-style design
 * Variants: primary, secondary, ghost, outline, danger
 * Sizes: sm, md, lg
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  onClick,
  ...props
}, ref) => {
  // Base styles
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium transition-all duration-normal
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    rounded-lg
  `;

  // Variant styles
  const variants = {
    primary: `
      bg-gold text-navy-900
      hover:bg-gold-600
      focus:ring-gold-400
      shadow-sm hover:shadow-md
    `,
    secondary: `
      bg-navy-900 text-white
      hover:bg-navy-800
      focus:ring-navy-400
      shadow-sm hover:shadow-md
    `,
    outline: `
      border-2 border-navy-900 text-navy-900
      hover:bg-navy-50
      focus:ring-navy-400
      bg-transparent
    `,
    ghost: `
      text-navy-700
      hover:bg-navy-100
      focus:ring-navy-200
      bg-transparent
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700
      focus:ring-red-400
      shadow-sm hover:shadow-md
    `,
    'outline-gold': `
      border-2 border-gold text-gold
      hover:bg-gold-50
      focus:ring-gold-400
      bg-transparent
    `,
    'ghost-gold': `
      text-gold-600
      hover:bg-gold-50
      focus:ring-gold-200
      bg-transparent
    `,
  };

  // Size styles
  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
    xl: 'px-8 py-4 text-xl gap-3',
  };

  // Icon sizes
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      )}

      {/* Left icon */}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className={iconSizes[size]} />
      )}

      {/* Button text */}
      {children}

      {/* Right icon */}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={iconSizes[size]} />
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

// Icon-only button variant
export const IconButton = forwardRef(({
  icon: Icon,
  variant = 'ghost',
  size = 'md',
  label,
  className = '',
  ...props
}, ref) => {
  const sizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <Button
      ref={ref}
      variant={variant}
      className={`${sizes[size]} ${className}`}
      aria-label={label}
      {...props}
    >
      <Icon className={iconSizes[size]} />
    </Button>
  );
});

IconButton.displayName = 'IconButton';

export { Button };
export default Button;
