// components/superadmin/ShopDetailsModal.jsx
import React from 'react';
import { X, User, Mail, Phone, MapPin, Calendar, DollarSign, Package, Star, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function ShopDetailsModal({ theme, shop, onClose, onEdit, onDelete, onVerify }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className={`${theme.card} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-inherit">
          <h2 className={`text-2xl font-bold ${theme.text}`}>Shop Details: {shop.name}</h2>
          <button onClick={onClose} className={`p-1 rounded-lg ${theme.cardHover}`}><X size={24} /></button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Shop Header */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
              {shop.name.charAt(0)}
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${theme.text}`}>{shop.name}</h3>
              <div className="flex gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  shop.verificationStatus === 'Verified' ? 'bg-green-500/20 text-green-600' :
                  shop.verificationStatus === 'Pending' ? 'bg-yellow-500/20 text-yellow-600' : 'bg-red-500/20 text-red-600'
                }`}>
                  {shop.verificationStatus || 'Pending'}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  shop.status === 'Active' ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'
                }`}>
                  {shop.status}
                </span>
              </div>
            </div>
          </div>
          
          {/* Shop Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2"><User size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Owner</p><p className={theme.text}>{shop.owner}</p></div></div>
            <div className="flex items-center gap-2"><Mail size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Email</p><p className={theme.text}>{shop.email}</p></div></div>
            <div className="flex items-center gap-2"><Phone size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Phone</p><p className={theme.text}>{shop.phone}</p></div></div>
            <div className="flex items-center gap-2"><MapPin size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Address</p><p className={theme.text}>{shop.address}</p></div></div>
            <div className="flex items-center gap-2"><Calendar size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Registered</p><p className={theme.text}>{shop.registeredDate}</p></div></div>
            <div className="flex items-center gap-2"><DollarSign size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Revenue</p><p className={theme.text}>{shop.revenue}</p></div></div>
            <div className="flex items-center gap-2"><Package size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Products</p><p className={theme.text}>{shop.products}</p></div></div>
            <div className="flex items-center gap-2"><Star size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Rating</p><p className={theme.text}>{shop.rating || '4.5'} ⭐</p></div></div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button onClick={() => onEdit(shop)} className={`flex-1 px-4 py-2 rounded-lg ${theme.primary} text-white flex items-center justify-center gap-2`}>
              <Edit size={18} /> Edit Shop
            </button>
            <button onClick={() => onVerify(shop)} className={`flex-1 px-4 py-2 rounded-lg bg-green-500 text-white flex items-center justify-center gap-2`}>
              <CheckCircle size={18} /> Verify Shop
            </button>
            <button onClick={() => onDelete(shop.id)} className={`flex-1 px-4 py-2 rounded-lg bg-red-500 text-white flex items-center justify-center gap-2`}>
              <Trash2 size={18} /> Delete Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}