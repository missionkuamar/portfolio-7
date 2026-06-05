// components/admin/products/ProductModal.jsx
import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const imageOptions = ['📦', '🎧', '⌚', '🎒', '🔌', '⌨️', '🖱️', '🏠', '📷', '💡', '📱', '💻', '🖨️', '🎮', '📚', '👕', '👟', '💍'];
const categories = ['Electronics', 'Fashion', 'Accessories', 'Home', 'Sports', 'Beauty', 'Books', 'Toys'];

export function ProductFormModal({ theme, isOpen, onClose, onSubmit, formData, setFormData, isEdit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className={`${theme.card} rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-inherit">
          <h2 className={`text-xl font-bold ${theme.text}`}>{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className={`p-1 rounded-lg ${theme.cardHover}`}><X size={20} /></button>
        </div>
        
        <div className="p-5 space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Product Icon</label>
            <div className="flex flex-wrap gap-2">
              {imageOptions.map(icon => (
                <button 
                  key={icon} 
                  onClick={() => setFormData({ ...formData, image: icon })} 
                  className={`w-12 h-12 rounded-lg text-2xl ${formData.image === icon ? 'ring-2 ring-blue-500 bg-blue-500/10' : theme.cardHover} transition-all`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Product Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}>
                {categories.map(cat => <option key={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Price ($) *</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Original Price ($)</label>
              <input type="number" value={formData.originalPrice} onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })} 
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Stock Quantity</label>
              <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} 
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}>
                <option>Active</option><option>Low Stock</option><option>Out of Stock</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Tags (comma separated)</label>
            <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} 
              className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} rows={3}></textarea>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button onClick={onClose} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>Cancel</button>
            <button onClick={onSubmit} className={`flex-1 px-4 py-2 rounded-lg ${theme.primary} text-white`}>
              {isEdit ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeleteConfirmModal({ theme, isOpen, onClose, onConfirm, title, message, isBulk = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className={`${theme.card} rounded-xl max-w-md w-full p-6 text-center`} onClick={(e) => e.stopPropagation()}>
        <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
        <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>{title}</h3>
        <p className={`${theme.textSecondary} mb-6`}>{message}</p>
        <div className="flex gap-3">
          <button onClick={onClose} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>Cancel</button>
          <button onClick={onConfirm} className={`flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600`}>Delete</button>
        </div>
      </div>
    </div>
  );
}