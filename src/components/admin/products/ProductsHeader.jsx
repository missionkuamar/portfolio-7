// components/admin/products/ProductsHeader.jsx
import React from 'react';
import { Package, Plus, Download } from 'lucide-react';

export default function ProductsHeader({ theme, onExport, onAddProduct }) {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-bold ${theme.text}`}>
            <Package className="inline mr-3 mb-1" size={28} />
            Product Management
          </h1>
          <p className={`text-sm ${theme.textSecondary} mt-1`}>Manage your inventory, track stock, and update products</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onExport} className={`px-3 py-2 rounded-lg ${theme.cardHover} flex items-center gap-2 text-sm`}>
            <Download size={16} /> Export
          </button>
          <button onClick={onAddProduct} className={`${theme.primary} text-white px-4 py-2 rounded-lg flex items-center gap-2`}>
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>
    </div>
  );
}