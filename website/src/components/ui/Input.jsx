import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Input Component - Swiss-style with floating labels
 */
const Input = forwardRef(({
  label,
  type = 'text',
  error,
  success,
  hint,
  icon: Icon,
  className = '',
  containerClassName = '',
  required = false,
  disabled = false,
  value,
  onChange,
  onBlur,
  onFocus,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const hasValue = value !== undefined && value !== '';
  const isFloating = focused || hasValue;
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const handleFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  // Determine border color
  const getBorderColor = () => {
    if (error) return 'border-red-500 focus:border-red-500 focus:ring-red-200';
    if (success) return 'border-green-500 focus:border-green-500 focus:ring-green-200';
    if (focused) return 'border-gold focus:border-gold focus:ring-gold-200';
    return 'border-stone-300 hover:border-stone-400';
  };

  return (
    <div className={`relative ${containerClassName}`}>
      {/* Input wrapper */}
      <div className="relative">
        {/* Left icon */}
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon className={`w-5 h-5 ${focused ? 'text-gold' : 'text-stone-400'} transition-colors`} />
          </div>
        )}

        {/* Input field */}
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          className={`
            peer w-full
            ${Icon ? 'pl-10' : 'pl-4'}
            ${isPassword ? 'pr-12' : 'pr-4'}
            py-3.5 pt-6 pb-2
            bg-white
            border-2 rounded-lg
            text-navy-900 text-base
            placeholder-transparent
            transition-all duration-normal
            focus:outline-none focus:ring-2
            disabled:bg-stone-100 disabled:cursor-not-allowed
            ${getBorderColor()}
            ${className}
          `}
          placeholder={label}
          {...props}
        />

        {/* Floating label */}
        <label
          className={`
            absolute left-0
            ${Icon ? 'ml-10' : 'ml-4'}
            transition-all duration-200 pointer-events-none
            ${isFloating
              ? 'top-2 text-xs font-medium'
              : 'top-1/2 -translate-y-1/2 text-base'
            }
            ${focused ? 'text-gold' : error ? 'text-red-500' : success ? 'text-green-500' : 'text-stone-500'}
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-navy-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}

        {/* Status icons */}
        {!isPassword && (error || success) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {error && <AlertCircle className="w-5 h-5 text-red-500" />}
            {success && !error && <CheckCircle className="w-5 h-5 text-green-500" />}
          </div>
        )}
      </div>

      {/* Helper text */}
      <AnimatePresence mode="wait">
        {(error || hint) && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={`mt-1.5 text-sm ${error ? 'text-red-500' : 'text-stone-500'}`}
          >
            {error || hint}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';

/**
 * Textarea Component
 */
export const Textarea = forwardRef(({
  label,
  error,
  hint,
  className = '',
  containerClassName = '',
  required = false,
  disabled = false,
  rows = 4,
  value,
  onChange,
  onBlur,
  onFocus,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value !== undefined && value !== '';
  const isFloating = focused || hasValue;

  const getBorderColor = () => {
    if (error) return 'border-red-500 focus:border-red-500 focus:ring-red-200';
    if (focused) return 'border-gold focus:border-gold focus:ring-gold-200';
    return 'border-stone-300 hover:border-stone-400';
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <div className="relative">
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          onFocus={(e) => { setFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          disabled={disabled}
          rows={rows}
          className={`
            peer w-full
            px-4 py-3.5 pt-6
            bg-white
            border-2 rounded-lg
            text-navy-900 text-base
            placeholder-transparent
            transition-all duration-normal
            focus:outline-none focus:ring-2
            disabled:bg-stone-100 disabled:cursor-not-allowed
            resize-none
            ${getBorderColor()}
            ${className}
          `}
          placeholder={label}
          {...props}
        />

        <label
          className={`
            absolute left-4
            transition-all duration-200 pointer-events-none
            ${isFloating
              ? 'top-2 text-xs font-medium'
              : 'top-4 text-base'
            }
            ${focused ? 'text-gold' : error ? 'text-red-500' : 'text-stone-500'}
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      </div>

      <AnimatePresence mode="wait">
        {(error || hint) && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={`mt-1.5 text-sm ${error ? 'text-red-500' : 'text-stone-500'}`}
          >
            {error || hint}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

Textarea.displayName = 'Textarea';

/**
 * Select Component
 */
export const Select = forwardRef(({
  label,
  options = [],
  error,
  hint,
  className = '',
  containerClassName = '',
  required = false,
  disabled = false,
  value,
  onChange,
  placeholder = 'Select an option',
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value !== undefined && value !== '';

  const getBorderColor = () => {
    if (error) return 'border-red-500 focus:border-red-500 focus:ring-red-200';
    if (focused) return 'border-gold focus:border-gold focus:ring-gold-200';
    return 'border-stone-300 hover:border-stone-400';
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <div className="relative">
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className={`
            peer w-full appearance-none
            px-4 py-3.5 pt-6 pb-2
            bg-white
            border-2 rounded-lg
            text-navy-900 text-base
            transition-all duration-normal
            focus:outline-none focus:ring-2
            disabled:bg-stone-100 disabled:cursor-not-allowed
            cursor-pointer
            ${!hasValue ? 'text-stone-400' : ''}
            ${getBorderColor()}
            ${className}
          `}
          {...props}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label
          className={`
            absolute left-4 top-2 text-xs font-medium
            pointer-events-none
            ${focused ? 'text-gold' : error ? 'text-red-500' : 'text-stone-500'}
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        {/* Dropdown arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className={`w-5 h-5 ${focused ? 'text-gold' : 'text-stone-400'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {(error || hint) && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={`mt-1.5 text-sm ${error ? 'text-red-500' : 'text-stone-500'}`}
          >
            {error || hint}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

Select.displayName = 'Select';

export { Input };
export default Input;
