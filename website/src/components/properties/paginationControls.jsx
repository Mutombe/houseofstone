import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProperties, updatePageSize } from './../../redux/slices/propertySlice';
import { selectPaginationInfo, selectCurrentFilters } from './../../redux/slices/propertySlice';

const PaginationControls = () => {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPaginationInfo);
  const filters = useSelector(selectCurrentFilters);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      // Prepare API parameters with current filters
      const params = {
        page: newPage,
        page_size: pagination.pageSize,
        ...filters
      };
      
      // Clean up parameters
      Object.keys(params).forEach(key => {
        if (params[key] === undefined || params[key] === null || params[key] === '' || params[key] === 'all') {
          delete params[key];
        }
      });
      
      dispatch(fetchProperties(params));
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value);
    dispatch(updatePageSize(newSize));
    
    // Refetch with new page size
    const params = {
      page: 1, // Reset to first page
      page_size: newSize,
      ...filters
    };
    
    // Clean up parameters
    Object.keys(params).forEach(key => {
      if (params[key] === undefined || params[key] === null || params[key] === '' || params[key] === 'all') {
        delete params[key];
      }
    });
    
    dispatch(fetchProperties(params));
  };

  // Generate page numbers with windowing
  const getPageNumbers = () => {
    if (pagination.totalPages <= 1) return [];
    
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, pagination.page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust if we're at the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (pagination.totalPages <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
      <div className="flex items-center gap-2 text-sm text-stone-600">
        <span>Items per page:</span>
        <select
          value={pagination.pageSize}
          onChange={handlePageSizeChange}
          className="px-2 py-1 rounded border border-stone-300 bg-white"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={!pagination.hasPrevious}
          className={`px-3 py-1 rounded ${
            pagination.hasPrevious
              ? 'bg-stone-900 text-white hover:bg-stone-800'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          Previous
        </motion.button>

        <div className="flex gap-1">
          {getPageNumbers().map((pageNum) => (
            <motion.button
              key={pageNum}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(pageNum)}
              className={`w-8 h-8 rounded-full ${
                pagination.page === pageNum
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {pageNum}
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={!pagination.hasNext}
          className={`px-3 py-1 rounded ${
            pagination.hasNext
              ? 'bg-stone-900 text-white hover:bg-stone-800'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          Next
        </motion.button>
      </div>

      <div className="text-sm text-stone-600">
        {pagination.totalCount > 0 ? (
          <>
            Showing {(pagination.page - 1) * pagination.pageSize + 1} -{' '}
            {Math.min(
              pagination.page * pagination.pageSize,
              pagination.totalCount
            )}{' '}
            of {pagination.totalCount} properties
          </>
        ) : (
          'No properties found'
        )}
      </div>
    </div>
  );
};

export default PaginationControls;