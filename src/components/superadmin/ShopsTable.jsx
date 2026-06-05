// components/superadmin/ShopsTable.jsx
import React, { useState } from 'react';
import { Search, Filter, Edit, Trash2, Eye, CheckCircle, XCircle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Settings } from 'lucide-react';
import ShopDetailsModal from './ShopDetailsModal';
import ShopVerificationModal from './ShopVerificationModal';
import { toast } from 'react-hot-toast';

export default function ShopsTable({ theme, shops: initialShops, setShops }) {
  const [shops, setLocalShops] = useState(initialShops);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedShop, setSelectedShop] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Filter shops
  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shop.status === statusFilter;
    const matchesVerification = verificationFilter === 'all' || shop.verificationStatus === verificationFilter;
    return matchesSearch && matchesStatus && matchesVerification;
  });

  // Pagination
  const totalItems = filteredShops.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedShops = filteredShops.slice(startIndex, startIndex + itemsPerPage);

  const handleVerifyShop = (shopId, note) => {
    setLocalShops(shops.map(s => s.id === shopId ? { ...s, verificationStatus: 'Verified', verificationNote: note } : s));
    setShops(shops.map(s => s.id === shopId ? { ...s, verificationStatus: 'Verified', verificationNote: note } : s));
  };

  const handleRejectShop = (shopId, reason) => {
    setLocalShops(shops.map(s => s.id === shopId ? { ...s, verificationStatus: 'Rejected', rejectionReason: reason } : s));
    setShops(shops.map(s => s.id === shopId ? { ...s, verificationStatus: 'Rejected', rejectionReason: reason } : s));
  };

  const handleDeleteShop = (shopId) => {
    setLocalShops(shops.filter(s => s.id !== shopId));
    setShops(shops.filter(s => s.id !== shopId));
    setShowDeleteConfirm(null);
    toast.success('Shop deleted successfully!');
  };

  const handleUpdateShop = (updatedShop) => {
    setLocalShops(shops.map(s => s.id === updatedShop.id ? updatedShop : s));
    setShops(shops.map(s => s.id === updatedShop.id ? updatedShop : s));
    setShowEditModal(false);
    toast.success('Shop updated successfully!');
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-green-500/20 text-green-600',
      'Inactive': 'bg-red-500/20 text-red-600',
      'Pending': 'bg-yellow-500/20 text-yellow-600',
      'Suspended': 'bg-orange-500/20 text-orange-600'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-600';
  };

  const getVerificationBadge = (status) => {
    const colors = {
      'Verified': 'bg-green-500/20 text-green-600',
      'Pending': 'bg-yellow-500/20 text-yellow-600',
      'Rejected': 'bg-red-500/20 text-red-600'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-600';
  };

  return (
    <div className={`${theme.card} rounded-xl shadow-xl overflow-hidden border ${theme.border}`}>
      {/* Header with Filters */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <h3 className={`font-semibold ${theme.text} flex items-center gap-2`}>
            <Store size={18} /> All Shops Management
          </h3>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search size={16} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} />
              <input type="text" placeholder="Search shops..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
                className={`pl-9 pr-3 py-1.5 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm w-48`} />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} 
              className={`px-3 py-1.5 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
              <option value="all">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Pending">Pending</option>
            </select>
            <select value={verificationFilter} onChange={(e) => setVerificationFilter(e.target.value)} 
              className={`px-3 py-1.5 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
              <option value="all">All Verification</option><option value="Verified">Verified</option><option value="Pending">Pending</option><option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className={`${theme.border} border-b`}>
            <tr className={`text-left text-sm ${theme.textSecondary}`}>
              <th className="p-4">Shop Name</th><th className="p-4">Owner</th><th className="p-4">Email</th><th className="p-4">Revenue</th>
              <th className="p-4">Products</th><th className="p-4">Status</th><th className="p-4">Verification</th><th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedShops.map((shop) => (
              <tr key={shop.id} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                <td className={`p-4 font-semibold ${theme.text}`}>{shop.name}</td>
                <td className={`p-4 ${theme.textSecondary}`}>{shop.owner}</td>
                <td className={`p-4 text-sm ${theme.textSecondary}`}>{shop.email}</td>
                <td className={`p-4 font-semibold ${theme.text}`}>{shop.revenue}</td>
                <td className={`p-4 ${theme.textSecondary}`}>{shop.products}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(shop.status)}`}>{shop.status}</span></td>
                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getVerificationBadge(shop.verificationStatus)}`}>{shop.verificationStatus || 'Pending'}</span></td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedShop(shop); setShowDetailsModal(true); }} className={`p-1 rounded ${theme.cardHover}`} title="View Details"><Eye size={16} /></button>
                    <button onClick={() => { setSelectedShop(shop); setShowVerificationModal(true); }} className={`p-1 rounded ${theme.cardHover}`} title="Verify Shop"><CheckCircle size={16} className="text-green-500" /></button>
                    <button onClick={() => setShowDeleteConfirm(shop.id)} className={`p-1 rounded ${theme.cardHover}`} title="Delete Shop"><Trash2 size={16} className="text-red-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className={`text-sm ${theme.textSecondary}`}>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} shops</div>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? 'opacity-50' : theme.cardHover}`}><ChevronsLeft size={18} /></button>
            <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? 'opacity-50' : theme.cardHover}`}><ChevronLeft size={18} /></button>
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) pageNum = currentPage - 3 + i;
              if (pageNum > totalPages) return null;
              return <button key={i} onClick={() => setCurrentPage(pageNum)} className={`w-8 h-8 rounded-lg ${currentPage === pageNum ? theme.primary + ' text-white' : theme.cardHover}`}>{pageNum}</button>;
            })}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className={`p-2 rounded-lg ${currentPage === totalPages ? 'opacity-50' : theme.cardHover}`}><ChevronRight size={18} /></button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className={`p-2 rounded-lg ${currentPage === totalPages ? 'opacity-50' : theme.cardHover}`}><ChevronsRight size={18} /></button>
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
              <option value={10}>10/page</option><option value={25}>25/page</option><option value={50}>50/page</option>
            </select>
          </div>
        </div>
      )}

      {/* Modals */}
      {showDetailsModal && selectedShop && <ShopDetailsModal theme={theme} shop={selectedShop} onClose={() => { setShowDetailsModal(false); setSelectedShop(null); }} onEdit={() => {}} onDelete={() => {}} onVerify={() => {}} />}
      {showVerificationModal && selectedShop && <ShopVerificationModal theme={theme} shop={selectedShop} onClose={() => { setShowVerificationModal(false); setSelectedShop(null); }} onVerify={handleVerifyShop} onReject={handleRejectShop} />}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteConfirm(null)}>
          <div className={`${theme.card} rounded-xl max-w-md w-full p-6 text-center`} onClick={(e) => e.stopPropagation()}>
            <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
            <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>Delete Shop</h3>
            <p className={`${theme.textSecondary} mb-6`}>Are you sure you want to delete this shop? All data will be permanently removed.</p>
            <div className="flex gap-3"><button onClick={() => setShowDeleteConfirm(null)} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover}`}>Cancel</button><button onClick={() => handleDeleteShop(showDeleteConfirm)} className={`flex-1 px-4 py-2 rounded-lg bg-red-500 text-white`}>Delete</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

import { AlertTriangle, Store } from 'lucide-react';