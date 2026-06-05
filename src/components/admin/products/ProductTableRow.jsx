// components/admin/products/ProductTableRow.jsx
import React from 'react';
import { Edit, Trash2, Star } from 'lucide-react';

export default function ProductTableRow({ theme, product, onEdit, onDelete, isSelected, onSelect, getStatusBadge }) {
  const statusBadge = getStatusBadge(product.status, product.stock);

  return (
    <tr className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
      <td className="p-3">
        <input type="checkbox" checked={isSelected} onChange={onSelect} className="w-4 h-4 rounded" />
      </td>
      <td className="p-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{product.image}</span>
          <span className={`font-semibold ${theme.text}`}>{product.name}</span>
        </div>
      </td>
      <td className={`p-3 text-xs font-mono ${theme.textSecondary}`}>{product.sku}</td>
      <td className={`p-3 text-sm ${theme.textSecondary}`}>{product.category}</td>
      <td className={`p-3 font-semibold ${theme.text}`}>${product.price}</td>
      <td className={`p-3 text-sm ${product.stock === 0 ? 'text-red-500' : theme.text}`}>{product.stock}</td>
      <td className={`p-3 text-sm ${theme.textSecondary}`}>{product.sales}</td>
      <td className="p-3">
        <div className="flex items-center gap-1">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          <span className={`text-sm ${theme.text}`}>{product.rating}</span>
        </div>
      </td>
      <td className="p-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
          {statusBadge.label}
        </span>
      </td>
      <td className="p-3">
        <div className="flex gap-2">
          <button onClick={() => onEdit(product)} className="p-1 rounded hover:bg-white/10">
            <Edit size={16} />
          </button>
          <button onClick={() => onDelete(product.id)} className="p-1 rounded hover:bg-white/10">
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
}