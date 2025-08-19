// hooks/usePerformanceOptimization.js
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import axios from 'axios';

// Custom hook for debouncing values
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for throttling function calls
export const useThrottle = (callback, delay) => {
  const throttleRef = useRef();
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback((...args) => {
    if (throttleRef.current) return;
    
    callbackRef.current(...args);
    throttleRef.current = setTimeout(() => {
      throttleRef.current = null;
    }, delay);
  }, [delay]);
};

// Custom hook for intersection observer (lazy loading)
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const isIntersecting = entry.isIntersecting;
      setIsIntersecting(isIntersecting);
      
      if (isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasIntersected, options]);

  return [ref, isIntersecting, hasIntersected];
};


// Custom hook for local storage with performance optimization
export const useOptimizedLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Use requestIdleCallback for non-critical localStorage writes
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        });
      } else {
        setTimeout(() => {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }, 0);
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

// Custom hook for performance monitoring
export const usePerformanceMonitor = (componentName) => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    
    if (process.env.NODE_ENV === 'development') {
      const renderTime = performance.now() - startTime.current;
      
      if (renderTime > 16) { // More than one frame (60fps)
        console.warn(`${componentName} took ${renderTime.toFixed(2)}ms to render`);
      }
      
      if (renderCount.current > 10 && renderCount.current % 10 === 0) {
        console.info(`${componentName} has rendered ${renderCount.current} times`);
      }
    }
    
    startTime.current = performance.now();
  });

  return renderCount.current;
};

// Custom hook for memoized filters
export const useMemoizedFilters = (items, filters, searchTerm, sortBy) => {
  return useMemo(() => {
    if (!Array.isArray(items)) return [];

    const startTime = performance.now();
    
    // Filter logic
    let filtered = items.filter((item) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          item.title?.toLowerCase().includes(searchLower) ||
          item.location?.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }
      let price;

      // Apply other filters
      for (const [key, value] of Object.entries(filters)) {
        if (value === 'all' || value === '' || (Array.isArray(value) && value.length === 0)) {
          continue;
        }

        switch (key) {
          case 'type':
            if (item.property_type !== value) return false;
            break;
          case 'priceRange':
            price = parseFloat(item.price) || 0;
            const [min, max] = value.split('-').map(Number);
            if (price < min || (max && price > max)) return false;
            break;
          case 'bedrooms':
            const beds = parseInt(item.beds) || 0;
            const minBeds = parseInt(value);
            if (beds < minBeds) return false;
            break;
          case 'bathrooms':
            const baths = parseInt(item.baths) || 0;
            const minBaths = parseInt(value);
            if (baths < minBaths) return false;
            break;
          case 'sqftRange':
            const sqft = parseInt(item.sqft) || parseInt(item.area_measurement) || 0;
            const [minSqft, maxSqft] = value.split('-').map(Number);
            if (sqft < minSqft || (maxSqft && sqft > maxSqft)) return false;
            break;
          case 'location':
            if (!item.location?.toLowerCase().includes(value.toLowerCase())) return false;
            break;
        }
      }
      
      return true;
    });

    // Sort logic with optimized functions
    const sortFunctions = {
      'price-low': (a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0),
      'price-high': (a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0),
      'beds': (a, b) => (parseInt(b.beds) || 0) - (parseInt(a.beds) || 0),
      'sqft': (a, b) => (parseInt(b.sqft) || parseInt(b.area_measurement) || 0) - (parseInt(a.sqft) || parseInt(a.area_measurement) || 0),
      'newest': (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0),
    };

    const sortFunction = sortFunctions[sortBy] || sortFunctions.newest;
    filtered.sort(sortFunction);

    // Performance logging in development
    if (process.env.NODE_ENV === 'development') {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (duration > 10) {
        console.warn(`Filter operation took ${duration.toFixed(2)}ms for ${items.length} items`);
      }
    }

    return filtered;
  }, [items, filters, searchTerm, sortBy]);
};

// utils/performanceUtils.js

// Image optimization utilities
export const imageUtils = {
  // Generate responsive image URLs
  getResponsiveImageUrl: (baseUrl, width, height, quality = 80) => {
    if (!baseUrl) return null;
    
    // This would integrate with your image service (Cloudinary, etc.)
    return `${baseUrl}?w=${width}&h=${height}&q=${quality}&f=auto`;
  },

  // Preload critical images
  preloadImages: (urls) => {
    urls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  },

  // Lazy load image with fallback
  createLazyImage: (src, alt, className = '') => {
    return {
      src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiLz48L3N2Zz4=', // 1x1 placeholder
      'data-src': src,
      alt,
      className: `lazy-image ${className}`,
      loading: 'lazy'
    };
  }
};

// Memory management utilities
export const memoryUtils = {
  // Clean up old cache entries
  cleanCache: (cache, maxAge = 5 * 60 * 1000) => {
    const now = Date.now();
    for (const [key, entry] of cache.entries()) {
      if (now - entry.timestamp > maxAge) {
        cache.delete(key);
      }
    }
  },

  // Monitor memory usage (development only)
  monitorMemory: () => {
    if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
      const memory = performance.memory;
      console.info('Memory Usage:', {
        used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
        total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
        limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
      });
    }
  },

  // Weak reference for large objects
  createWeakCache: () => {
    return new WeakMap();
  }
};

// DOM utilities for performance
export const domUtils = {
  // Batch DOM operations
  batchDOMOperations: (operations) => {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        operations.forEach(operation => operation());
        resolve();
      });
    });
  },

  // Observe element visibility
  observeVisibility: (element, callback, options = {}) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        callback(entry.isIntersecting, entry);
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observer.observe(element);
    return () => observer.unobserve(element);
  },

  // Smooth scroll with performance optimization
  smoothScroll: (target, options = {}) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    
    if (!element) return;

    // Use native smooth scroll if supported
    if ('scrollBehavior' in document.documentElement.style) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        ...options
      });
    } else {
      // Fallback for older browsers
      const start = window.pageYOffset;
      const target = element.offsetTop;
      const distance = target - start;
      const duration = 500;
      let startTime;

      const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function
        const ease = progress * (2 - progress);
        window.scrollTo(0, start + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  }
};

// Redux performance utilities
export const reduxUtils = {
  // Create optimized selector
  createOptimizedSelector: (selector, equalityFn = (a, b) => a === b) => {
    let lastResult;
    let lastArgs;

    return (state) => {
      const currentArgs = selector(state);
      
      if (!lastArgs || !equalityFn(currentArgs, lastArgs)) {
        lastResult = currentArgs;
        lastArgs = currentArgs;
      }
      
      return lastResult;
    };
  },

  // Batch actions for better performance
  batchActions: (actions) => {
    return (dispatch) => {
      actions.forEach(action => dispatch(action));
    };
  },

  // Middleware for performance monitoring
  performanceMiddleware: (store) => (next) => (action) => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now();
      const result = next(action);
      const end = performance.now();
      
      if (end - start > 10) {
        console.warn(`Action ${action.type} took ${(end - start).toFixed(2)}ms`);
      }
      
      return result;
    }
    
    return next(action);
  }
};

// Bundle size optimization utilities
export const bundleUtils = {
  // Dynamic import with loading state
  createDynamicImport: (importFunc) => {
    return {
      component: React.lazy(importFunc),
      preload: importFunc
    };
  },

  // Chunk splitting helper
  getChunkName: (route) => {
    return route.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  }
};

// Performance measurement wrapper
export const withPerformanceLogging = (WrappedComponent, componentName) => {
  return React.memo((props) => {
    const renderCount = usePerformanceMonitor(componentName);
    
    return (
      <WrappedComponent 
        {...props} 
        __renderCount={renderCount}
      />
    );
  });
};
