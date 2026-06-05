// components/superadmin/UserDetailsModal.jsx
import React from 'react';
import { X, User, Mail, Phone, MapPin, Calendar, DollarSign, ShoppingCart, Star, Edit, Trash2, Shield, CheckCircle, XCircle } from 'lucide-react';

export default function UserDetailsModal({ theme, user, onClose, onEdit, onDelete, onSuspend, onActivate }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className={`${theme.card} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-inherit">
          <h2 className={`text-2xl font-bold ${theme.text}`}>User Details: {user.name}</h2>
          <button onClick={onClose} className={`p-1 rounded-lg ${theme.cardHover}`}><X size={24} /></button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* User Header */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${theme.text}`}>{user.name}</h3>
              <div className="flex gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.role === 'admin' ? 'bg-purple-500/20 text-purple-600' :
                  user.role === 'superadmin' ? 'bg-red-500/20 text-red-600' : 'bg-blue-500/20 text-blue-600'
                }`}>
                  {user.role === 'admin' ? 'Shop Owner' : user.role === 'superadmin' ? 'Super Admin' : 'Customer'}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.status === 'Active' ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'
                }`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>
          
          {/* User Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2"><User size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Full Name</p><p className={theme.text}>{user.name}</p></div></div>
            <div className="flex items-center gap-2"><Mail size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Email</p><p className={theme.text}>{user.email}</p></div></div>
            <div className="flex items-center gap-2"><Phone size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Phone</p><p className={theme.text}>{user.phone}</p></div></div>
            <div className="flex items-center gap-2"><MapPin size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Location</p><p className={theme.text}>{user.location || 'Not specified'}</p></div></div>
            <div className="flex items-center gap-2"><Calendar size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Joined</p><p className={theme.text}>{user.joinedDate}</p></div></div>
            <div className="flex items-center gap-2"><Shield size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Role</p><p className={theme.text}>{user.role === 'admin' ? 'Shop Owner' : user.role === 'superadmin' ? 'Super Admin' : 'Customer'}</p></div></div>
            {user.role === 'admin' && (
              <>
                <div className="flex items-center gap-2"><Store size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Shop Name</p><p className={theme.text}>{user.shopName || 'N/A'}</p></div></div>
                <div className="flex items-center gap-2"><DollarSign size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Shop Revenue</p><p className={theme.text}>{user.shopRevenue || 'N/A'}</p></div></div>
              </>
            )}
            {user.role === 'customer' && (
              <>
                <div className="flex items-center gap-2"><ShoppingCart size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Total Orders</p><p className={theme.text}>{user.totalOrders || 0}</p></div></div>
                <div className="flex items-center gap-2"><DollarSign size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Total Spent</p><p className={theme.text}>${user.totalSpent || 0}</p></div></div>
                <div className="flex items-center gap-2"><Star size={16} className={theme.textSecondary} /><div><p className={`text-xs ${theme.textSecondary}`}>Reviews Given</p><p className={theme.text}>{user.reviews || 0}</p></div></div>
              </>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button onClick={() => onEdit(user)} className={`flex-1 px-4 py-2 rounded-lg ${theme.primary} text-white flex items-center justify-center gap-2`}>
              <Edit size={18} /> Edit User
            </button>
            {user.status === 'Active' ? (
              <button onClick={() => onSuspend(user.id)} className={`flex-1 px-4 py-2 rounded-lg bg-orange-500 text-white flex items-center justify-center gap-2`}>
                <XCircle size={18} /> Suspend User
              </button>
            ) : (
              <button onClick={() => onActivate(user.id)} className={`flex-1 px-4 py-2 rounded-lg bg-green-500 text-white flex items-center justify-center gap-2`}>
                <CheckCircle size={18} /> Activate User
              </button>
            )}
            <button onClick={() => onDelete(user.id)} className={`flex-1 px-4 py-2 rounded-lg bg-red-500 text-white flex items-center justify-center gap-2`}>
              <Trash2 size={18} /> Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}