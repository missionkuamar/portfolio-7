// components/admin/products/ProductCard.jsx
import React from 'react';
import { Edit, Trash2, Star } from 'lucide-react';

export default function ProductCard({ theme, product, onEdit, onDelete, isSelected, onSelect, getStatusBadge }) {
  const statusBadge = getStatusBadge(product.status, product.stock);

  return (
    <div className={`group ${theme.card} rounded-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 border ${theme.border} relative`}>
      <div className="absolute top-2 left-2 z-10">
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={onSelect} 
          className="w-4 h-4 rounded border-gray-300" 
        />
      </div>
      
      <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-6xl">
        {product.image}
        {statusBadge.label !== 'In Stock' && (
          <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
            {statusBadge.label}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-semibold ${theme.text} line-clamp-1 flex-1`}>{product.name}</h3>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className={`text-xs ${theme.textSecondary}`}>{product.rating}</span>
          </div>
        </div>
        
        <p className={`text-xs ${theme.textSecondary} mb-2`}>{product.category}</p>
        
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className={`text-xl font-bold text-blue-500`}>${product.price}</span>
            {product.originalPrice > product.price && (
              <span className={`text-xs line-through ${theme.textSecondary} ml-2`}>${product.originalPrice}</span>
            )}
          </div>
          <div className={`text-xs ${product.stock === 0 ? 'text-red-500' : theme.text}`}>
            Stock: {product.stock}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags?.slice(0, 2).map(tag => (
            <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${theme.cardHover} ${theme.textSecondary}`}>#{tag}</span>
          ))}
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => onEdit(product)} className="flex-1 py-1.5 rounded-lg border border-blue-500 text-blue-500 text-sm hover:bg-blue-500/10 transition-all">
            Edit
          </button>
          <button onClick={() => onDelete(product.id)} className="flex-1 py-1.5 rounded-lg border border-red-500 text-red-500 text-sm hover:bg-red-500/10 transition-all">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}