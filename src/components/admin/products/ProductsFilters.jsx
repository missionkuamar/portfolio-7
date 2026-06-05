// components/admin/products/ProductsFilters.jsx
import React from 'react';
import { Search, Filter, Grid3x3, List, X } from 'lucide-react';

export default function ProductsFilters({ 
  theme, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory,
  selectedStatus, setSelectedStatus, sortBy, setSortBy, viewMode, setViewMode,
  categories, clearFilters
}) {
  return (
    <div className={`${theme.card} rounded-xl p-4 mb-6 border ${theme.border}`}>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} size={18} />
          <input 
            type="text" 
            placeholder="Search by name, SKU, or tags..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} 
          />
        </div>
        
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} 
          className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
          <option value="all">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} 
          className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} 
          className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-high">Price: High to Low</option>
          <option value="price-low">Price: Low to High</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Top Rated</option>
          <option value="stock-low">Stock: Low to High</option>
        </select>
        
        <div className="flex gap-1">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? theme.primary + ' text-white' : theme.cardHover}`}>
            <Grid3x3 size={18} />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? theme.primary + ' text-white' : theme.cardHover}`}>
            <List size={18} />
          </button>
        </div>
      </div>
      
      {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all') && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className={`text-xs ${theme.textSecondary}`}>Active filters:</span>
          {searchTerm && (
            <span className={`px-2 py-0.5 rounded-full text-xs ${theme.cardHover} flex items-center gap-1`}>
              {searchTerm} <X size={12} className="cursor-pointer" onClick={() => setSearchTerm('')} />
            </span>
          )}
          {selectedCategory !== 'all' && (
            <span className={`px-2 py-0.5 rounded-full text-xs ${theme.cardHover} flex items-center gap-1`}>
              {selectedCategory} <X size={12} className="cursor-pointer" onClick={() => setSelectedCategory('all')} />
            </span>
          )}
          {selectedStatus !== 'all' && (
            <span className={`px-2 py-0.5 rounded-full text-xs ${theme.cardHover} flex items-center gap-1`}>
              {selectedStatus} <X size={12} className="cursor-pointer" onClick={() => setSelectedStatus('all')} />
            </span>
          )}
          <button onClick={clearFilters} className="text-xs text-blue-500 hover:text-blue-600">Clear all</button>
        </div>
      )}
    </div>
  );
}