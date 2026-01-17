// website/src/components/ui/Skeleton.jsx
import { motion } from 'framer-motion';

/**
 * Skeleton Component - Loading placeholder with shimmer effect
 * Updated for Navy/Gold theme
 */
const Skeleton = ({
  variant = 'text',
  width,
  height,
  className = '',
  animation = 'shimmer', // shimmer, pulse, none
  rounded = 'default',
}) => {
  const roundedVariants = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    default: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };

  const variantStyles = {
    text: 'h-4 w-full',
    heading: 'h-8 w-3/4',
    title: 'h-6 w-1/2',
    paragraph: 'h-4 w-full',
    avatar: 'w-12 h-12 rounded-full',
    thumbnail: 'w-20 h-20',
    image: 'w-full aspect-property',
    card: 'w-full h-64',
    button: 'h-10 w-24',
    badge: 'h-6 w-16',
    custom: '',
  };

  const baseStyles = `
    bg-white/10
    ${animation === 'shimmer' ? 'bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] animate-shimmer' : ''}
    ${animation === 'pulse' ? 'animate-pulse' : ''}
    ${variant === 'avatar' ? '' : roundedVariants[rounded]}
  `;

  const style = {
    width: width || undefined,
    height: height || undefined,
  };

  return (
    <div
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${className}
      `}
      style={style}
    />
  );
};

/**
 * Skeleton Text - Multiple lines of text
 */
export const SkeletonText = ({
  lines = 3,
  gap = 'md',
  className = '',
}) => {
  const gaps = {
    sm: 'space-y-2',
    md: 'space-y-3',
    lg: 'space-y-4',
  };

  return (
    <div className={`${gaps[gap]} ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={i === lines - 1 ? 'w-2/3' : 'w-full'}
        />
      ))}
    </div>
  );
};

/**
 * Stats Card Skeleton - Navy/Gold Theme
 */
export const StatsCardSkeleton = ({ className = '' }) => (
  <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ${className}`}>
    <div className="flex items-center justify-between">
      <div className="flex-1 space-y-3">
        <Skeleton variant="text" className="h-4 w-24" rounded="md" />
        <Skeleton variant="heading" className="h-8 w-16" rounded="md" />
        <Skeleton variant="text" className="h-3 w-32" rounded="md" />
      </div>
      <Skeleton variant="custom" className="w-12 h-12" rounded="xl" />
    </div>
  </div>
);

/**
 * Stats Grid Skeleton
 */
export const StatsGridSkeleton = ({ count = 4, className = '' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
      >
        <StatsCardSkeleton />
      </motion.div>
    ))}
  </div>
);

/**
 * Property Card Skeleton - Navy/Gold Theme
 */
export const PropertyCardSkeleton = ({ className = '' }) => (
  <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden ${className}`}>
    {/* Image */}
    <Skeleton variant="custom" className="w-full h-48" rounded="none" />

    {/* Content */}
    <div className="p-4 space-y-3">
      {/* Price */}
      <Skeleton variant="heading" className="h-6 w-28" rounded="md" />

      {/* Details */}
      <div className="flex items-center gap-2">
        <Skeleton variant="badge" className="w-16 h-5" rounded="lg" />
        <Skeleton variant="badge" className="w-16 h-5" rounded="lg" />
        <Skeleton variant="badge" className="w-20 h-5" rounded="lg" />
      </div>

      {/* Location */}
      <Skeleton variant="text" className="w-3/4 h-4" rounded="md" />

      {/* Title */}
      <Skeleton variant="title" className="w-full h-5" rounded="md" />
    </div>
  </div>
);

/**
 * Property Grid Skeleton
 */
export const PropertyGridSkeleton = ({
  count = 8,
  columns = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  className = '',
}) => (
  <div className={`grid ${columns} gap-6 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.05 }}
      >
        <PropertyCardSkeleton />
      </motion.div>
    ))}
  </div>
);

/**
 * Property Row Skeleton - For list view
 */
export const PropertyRowSkeleton = ({ className = '' }) => (
  <div className={`px-6 py-4 flex justify-between items-center border-b border-white/5 ${className}`}>
    <div className="flex items-center gap-4">
      <Skeleton variant="custom" className="w-16 h-16" rounded="xl" />
      <div className="space-y-2">
        <Skeleton variant="text" className="h-5 w-48" rounded="md" />
        <Skeleton variant="text" className="h-4 w-32" rounded="md" />
      </div>
    </div>
    <div className="flex items-center gap-4">
      <Skeleton variant="text" className="h-6 w-24" rounded="md" />
      <Skeleton variant="badge" className="h-6 w-16" rounded="full" />
      <Skeleton variant="custom" className="w-5 h-5" rounded="md" />
    </div>
  </div>
);

/**
 * Table Row Skeleton
 */
export const TableRowSkeleton = ({ columns = 5, className = '' }) => (
  <tr className={`border-b border-white/5 ${className}`}>
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="px-6 py-4">
        {i === 0 ? (
          <div className="flex items-center gap-3">
            <Skeleton variant="custom" className="w-12 h-12" rounded="lg" />
            <Skeleton variant="text" className="h-4 w-32" rounded="md" />
          </div>
        ) : (
          <Skeleton variant="text" className="h-4 w-20" rounded="md" />
        )}
      </td>
    ))}
  </tr>
);

/**
 * Table Skeleton - Full table with header and rows
 */
export const TableSkeleton = ({ rows = 5, columns = 5, className = '' }) => (
  <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden ${className}`}>
    <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <Skeleton variant="text" className="h-6 w-40" rounded="md" />
      <div className="flex gap-3">
        <Skeleton variant="custom" className="h-10 w-48" rounded="xl" />
        <Skeleton variant="custom" className="h-10 w-32" rounded="xl" />
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-6 py-4 text-left">
                <Skeleton variant="text" className="h-4 w-20" rounded="md" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/**
 * Chart Skeleton
 */
export const ChartSkeleton = ({ height = 'h-64', className = '' }) => (
  <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ${className}`}>
    <div className="flex justify-between items-center mb-6">
      <div className="space-y-2">
        <Skeleton variant="text" className="h-5 w-40" rounded="md" />
        <Skeleton variant="text" className="h-4 w-56" rounded="md" />
      </div>
      <Skeleton variant="custom" className="h-8 w-28" rounded="lg" />
    </div>
    <Skeleton variant="custom" className={`w-full ${height}`} rounded="lg" />
  </div>
);

/**
 * Sidebar Skeleton
 */
export const SidebarSkeleton = ({ className = '' }) => (
  <div className={`w-[280px] bg-[#0A1628] border-r border-white/10 flex flex-col pt-20 ${className}`}>
    <div className="flex-1 px-4 py-6 space-y-2">
      {/* Logo */}
      <div className="px-4 pb-6 mb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Skeleton variant="custom" className="w-10 h-10" rounded="xl" />
          <div className="space-y-1">
            <Skeleton variant="text" className="h-5 w-28" rounded="md" />
            <Skeleton variant="text" className="h-3 w-20" rounded="md" />
          </div>
        </div>
      </div>

      {/* Nav Items */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} variant="custom" className="h-12 w-full" rounded="xl" />
      ))}
    </div>

    {/* User Profile */}
    <div className="p-4 border-t border-white/10">
      <div className="flex items-center gap-3">
        <Skeleton variant="avatar" className="w-10 h-10" />
        <div className="flex-1 space-y-1">
          <Skeleton variant="text" className="h-4 w-24" rounded="md" />
          <Skeleton variant="text" className="h-3 w-32" rounded="md" />
        </div>
      </div>
    </div>
  </div>
);

/**
 * Lead Card Skeleton
 */
export const LeadCardSkeleton = ({ className = '' }) => (
  <div className={`bg-white/5 border border-white/10 rounded-xl p-5 ${className}`}>
    <div className="flex items-start gap-4">
      <Skeleton variant="avatar" className="w-12 h-12" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="h-5 w-32" rounded="md" />
        <Skeleton variant="text" className="h-4 w-48" rounded="md" />
        <Skeleton variant="text" className="h-4 w-36" rounded="md" />
      </div>
      <Skeleton variant="badge" className="h-6 w-20" rounded="full" />
    </div>
  </div>
);

/**
 * Notification Skeleton
 */
export const NotificationSkeleton = ({ className = '' }) => (
  <div className={`px-6 py-4 flex items-start gap-4 border-b border-white/5 ${className}`}>
    <Skeleton variant="custom" className="w-10 h-10 flex-shrink-0" rounded="xl" />
    <div className="flex-1 space-y-2">
      <div className="flex items-center justify-between gap-4">
        <Skeleton variant="text" className="h-4 w-40" rounded="md" />
        <Skeleton variant="text" className="h-3 w-20" rounded="md" />
      </div>
      <Skeleton variant="text" className="h-4 w-full" rounded="md" />
    </div>
  </div>
);

/**
 * Dashboard Page Skeleton - Full page loader
 */
export const DashboardPageSkeleton = ({ className = '' }) => (
  <div className={`flex min-h-screen bg-[#060D16] ${className}`}>
    <SidebarSkeleton />
    <div className="flex-1 overflow-auto pt-16">
      {/* Header */}
      <header className="sticky top-16 z-10 bg-[#060D16]/80 backdrop-blur-xl border-b border-white/10">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton variant="text" className="h-7 w-48" rounded="md" />
            <Skeleton variant="text" className="h-4 w-40" rounded="md" />
          </div>
          <Skeleton variant="custom" className="h-11 w-36" rounded="xl" />
        </div>
      </header>

      <main className="p-6 space-y-6">
        <StatsGridSkeleton count={4} />
        <TableSkeleton rows={5} columns={6} />
      </main>
    </div>
  </div>
);

/**
 * Dashboard Stats Skeleton (Legacy support)
 */
export const DashboardStatsSkeleton = ({ count = 4 }) => <StatsGridSkeleton count={count} />;

/**
 * Property Detail Skeleton
 */
export const PropertyDetailSkeleton = ({ className = '' }) => (
  <div className={`max-w-7xl mx-auto px-4 py-8 ${className}`}>
    {/* Gallery */}
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="col-span-4 md:col-span-2 md:row-span-2">
        <Skeleton variant="custom" className="w-full aspect-[4/3]" rounded="xl" />
      </div>
      <Skeleton variant="custom" className="w-full aspect-square hidden md:block" rounded="lg" />
      <Skeleton variant="custom" className="w-full aspect-square hidden md:block" rounded="lg" />
      <Skeleton variant="custom" className="w-full aspect-square hidden md:block" rounded="lg" />
      <Skeleton variant="custom" className="w-full aspect-square hidden md:block" rounded="lg" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main content */}
      <div className="lg:col-span-2 space-y-6">
        <div className="space-y-2">
          <Skeleton variant="heading" className="h-10 w-48" rounded="md" />
          <Skeleton variant="text" className="w-64 h-5" rounded="md" />
        </div>

        <div className="flex gap-4">
          <Skeleton variant="badge" className="w-20 h-8" rounded="lg" />
          <Skeleton variant="badge" className="w-20 h-8" rounded="lg" />
          <Skeleton variant="badge" className="w-24 h-8" rounded="lg" />
        </div>

        <div className="space-y-3">
          <Skeleton variant="title" className="w-32 h-6" rounded="md" />
          <SkeletonText lines={5} />
        </div>

        <div className="space-y-3">
          <Skeleton variant="title" className="w-40 h-6" rounded="md" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} variant="badge" className="h-10" rounded="lg" />
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton variant="avatar" className="w-16 h-16" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="title" className="w-32 h-5" rounded="md" />
              <Skeleton variant="text" className="w-24 h-4" rounded="md" />
            </div>
          </div>
          <Skeleton variant="button" className="w-full h-12" rounded="xl" />
          <Skeleton variant="button" className="w-full h-12 mt-3" rounded="xl" />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <Skeleton variant="title" className="w-28 h-5" rounded="md" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton variant="text" className="w-24 h-4" rounded="md" />
              <Skeleton variant="text" className="w-20 h-4" rounded="md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/**
 * Form Skeleton
 */
export const FormSkeleton = ({ fields = 4, className = '' }) => (
  <div className={`space-y-6 ${className}`}>
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton variant="text" className="w-24 h-4" rounded="md" />
        <Skeleton variant="custom" className="w-full h-12" rounded="xl" />
      </div>
    ))}
    <Skeleton variant="button" className="w-full h-12" rounded="xl" />
  </div>
);

/**
 * Loading Spinner Component
 */
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`border-2 border-[#C9A962] border-t-transparent rounded-full ${sizeClasses[size]} ${className}`}
    />
  );
};

/**
 * Full Page Loader
 */
export const FullPageLoader = ({ message = 'Loading...' }) => (
  <div className="min-h-screen bg-[#060D16] flex items-center justify-center">
    <div className="flex flex-col items-center">
      <LoadingSpinner size="xl" className="mb-4" />
      <p className="text-gray-400">{message}</p>
    </div>
  </div>
);

/**
 * Inline Loader
 */
export const InlineLoader = ({ message = 'Loading' }) => (
  <div className="flex items-center gap-3 p-4">
    <LoadingSpinner size="sm" />
    <span className="text-gray-400 text-sm">{message}...</span>
  </div>
);

/**
 * Content Loader - For loading state within a section
 */
export const ContentLoader = ({ className = '' }) => (
  <div className={`flex items-center justify-center py-12 ${className}`}>
    <div className="flex flex-col items-center">
      <LoadingSpinner size="lg" className="mb-3" />
      <p className="text-gray-400 text-sm">Loading content...</p>
    </div>
  </div>
);

/**
 * Empty State Skeleton - For when data might be loading or empty
 */
export const EmptyStateSkeleton = ({ icon: Icon, className = '' }) => (
  <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
      {Icon && <Icon className="w-8 h-8 text-gray-600" />}
    </div>
    <Skeleton variant="text" className="h-6 w-48 mb-2" rounded="md" />
    <Skeleton variant="text" className="h-4 w-64" rounded="md" />
  </div>
);

export default Skeleton;
