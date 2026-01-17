import { forwardRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Card Component - Swiss-style with subtle shadows
 */
const Card = forwardRef(({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  onClick,
  ...props
}, ref) => {
  const variants = {
    default: 'bg-white border border-stone-200',
    elevated: 'bg-white shadow-card',
    outlined: 'bg-transparent border-2 border-stone-200',
    ghost: 'bg-stone-50',
    navy: 'bg-navy-900 text-white',
    gold: 'bg-gold-50 border border-gold-200',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseStyles = `
    rounded-xl
    transition-all duration-normal
    ${variants[variant]}
    ${paddings[padding]}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  if (hover) {
    return (
      <motion.div
        ref={ref}
        onClick={onClick}
        className={baseStyles}
        initial={{ y: 0, boxShadow: '0 2px 8px -2px rgba(10, 22, 40, 0.08)' }}
        whileHover={{
          y: -8,
          boxShadow: '0 8px 24px -4px rgba(10, 22, 40, 0.12), 0 16px 32px -8px rgba(10, 22, 40, 0.16)'
        }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} onClick={onClick} className={baseStyles} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

/**
 * Card Header
 */
export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card Title
 */
export const CardTitle = ({ children, as: Component = 'h3', className = '', ...props }) => (
  <Component
    className={`text-heading-lg font-semibold text-navy-900 ${className}`}
    {...props}
  >
    {children}
  </Component>
);

/**
 * Card Description
 */
export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-stone-600 text-body-sm mt-1 ${className}`} {...props}>
    {children}
  </p>
);

/**
 * Card Content
 */
export const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

/**
 * Card Footer
 */
export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-4 pt-4 border-t border-stone-200 ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Property Card - Specialized for property listings
 */
export const PropertyCard = forwardRef(({
  property,
  onSave,
  onShare,
  onClick,
  isSaved = false,
  className = '',
  ...props
}, ref) => {
  const {
    title,
    price,
    location,
    beds,
    baths,
    sqft,
    status = 'available',
    images = [],
    property_type,
  } = property;

  const primaryImage = images[0]?.image || '/placeholder-property.jpg';

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    pending: 'bg-amber-100 text-amber-800',
    sold: 'bg-red-100 text-red-800',
    'off-market': 'bg-stone-100 text-stone-800',
  };

  const formatPrice = (price) => {
    if (!price) return 'Price on Request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      ref={ref}
      className={`
        group bg-white rounded-xl overflow-hidden
        border border-stone-200
        transition-all duration-normal
        cursor-pointer
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8, boxShadow: '0 8px 24px -4px rgba(10, 22, 40, 0.12)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      {...props}
    >
      {/* Image container */}
      <div className="relative aspect-property overflow-hidden">
        <img
          src={primaryImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105"
          loading="lazy"
        />

        {/* Status badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
        </div>

        {/* Save button */}
        <button
          onClick={(e) => { e.stopPropagation(); onSave?.(); }}
          className={`
            absolute top-3 right-3 p-2 rounded-full
            backdrop-blur-sm transition-all duration-fast
            ${isSaved
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-stone-600 hover:bg-white hover:text-red-500'
            }
          `}
        >
          <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Property type */}
        {property_type && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-navy-900/80 text-white text-xs font-medium backdrop-blur-sm">
            {property_type.charAt(0).toUpperCase() + property_type.slice(1)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <p className="text-heading-lg font-bold text-navy-900 mb-1">
          {formatPrice(price)}
        </p>

        {/* Property details */}
        <div className="flex items-center gap-3 text-stone-600 text-body-sm mb-2">
          {beds && (
            <span className="flex items-center gap-1">
              <span className="font-medium">{beds}</span> bed{beds > 1 ? 's' : ''}
            </span>
          )}
          {baths && (
            <>
              <span className="text-stone-300">|</span>
              <span className="flex items-center gap-1">
                <span className="font-medium">{baths}</span> bath{baths > 1 ? 's' : ''}
              </span>
            </>
          )}
          {sqft && (
            <>
              <span className="text-stone-300">|</span>
              <span className="flex items-center gap-1">
                <span className="font-medium">{sqft.toLocaleString()}</span> sqft
              </span>
            </>
          )}
        </div>

        {/* Location */}
        <p className="text-stone-600 text-body-sm truncate">
          {location}
        </p>

        {/* Title */}
        <h3 className="text-navy-900 font-medium mt-2 line-clamp-1">
          {title}
        </h3>
      </div>
    </motion.div>
  );
});

PropertyCard.displayName = 'PropertyCard';

/**
 * Stat Card - For dashboard statistics
 */
export const StatCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  className = '',
  ...props
}) => {
  const changeColors = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-stone-600 bg-stone-50',
  };

  return (
    <Card variant="elevated" padding="md" className={className} {...props}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-stone-500 text-body-sm font-medium">{title}</p>
          <p className="text-display-sm font-bold text-navy-900 mt-1">{value}</p>
          {change !== undefined && (
            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-2 ${changeColors[changeType]}`}>
              {changeType === 'positive' && (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              {changeType === 'negative' && (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              {change}%
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-gold-50 rounded-lg">
            <Icon className="w-6 h-6 text-gold-600" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default Card;
