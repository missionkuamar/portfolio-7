// components/admin/products/ProductsPagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function ProductsPagination({ 
  theme, 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage, 
  onItemsPerPageChange,
  totalItems 
}) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1 && totalItems <= itemsPerPage) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      {/* Items info */}
      <div className={`text-sm ${theme.textSecondary}`}>
        Showing <span className="font-medium text-blue-500">{startItem}</span> to{' '}
        <span className="font-medium text-blue-500">{endItem}</span> of{' '}
        <span className="font-medium">{totalItems}</span> products
      </div>
      
      {/* Pagination controls */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* First page button */}
        <button 
          onClick={() => onPageChange(1)} 
          disabled={currentPage === 1} 
          className={`p-2 rounded-lg transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : theme.cardHover}`}
          title="First Page"
        >
          <ChevronsLeft size={18} />
        </button>
        
        {/* Previous button */}
        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1} 
          className={`p-2 rounded-lg transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : theme.cardHover}`}
          title="Previous Page"
        >
          <ChevronLeft size={18} />
        </button>
        
        {/* Page numbers */}
        <div className="flex gap-1">
          {getPageNumbers().map(page => (
            <button 
              key={page} 
              onClick={() => onPageChange(page)} 
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                currentPage === page 
                  ? `${theme.primary} text-white shadow-md` 
                  : `${theme.cardHover} ${theme.text}`
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        
        {/* Next button */}
        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages} 
          className={`p-2 rounded-lg transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : theme.cardHover}`}
          title="Next Page"
        >
          <ChevronRight size={18} />
        </button>
        
        {/* Last page button */}
        <button 
          onClick={() => onPageChange(totalPages)} 
          disabled={currentPage === totalPages} 
          className={`p-2 rounded-lg transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : theme.cardHover}`}
          title="Last Page"
        >
          <ChevronsRight size={18} />
        </button>
        
        {/* Items per page selector */}
        <select 
          value={itemsPerPage} 
          onChange={(e) => {
            onItemsPerPageChange(Number(e.target.value));
            onPageChange(1);
          }} 
          className={`ml-2 px-3 py-1.5 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer`}
        >
          <option value={12}>12 / page</option>
          <option value={24}>24 / page</option>
          <option value={48}>48 / page</option>
          <option value={96}>96 / page</option>
        </select>
      </div>
    </div>
  );
}