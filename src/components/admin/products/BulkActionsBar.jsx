// components/admin/products/BulkActionsBar.jsx
import React from 'react';

export default function BulkActionsBar({ theme, selectedCount, onDelete, onCancel }) {
  if (selectedCount === 0) return null;

  return (
    <div className={`${theme.primary} text-white rounded-xl p-3 mb-4 flex justify-between items-center`}>
      <span className="text-sm">{selectedCount} products selected</span>
      <div className="flex gap-2">
        <button onClick={onDelete} className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600">
          Delete Selected
        </button>
        <button onClick={onCancel} className="px-3 py-1 rounded-lg bg-white/20 text-white text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}