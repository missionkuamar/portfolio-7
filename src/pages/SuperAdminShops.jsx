// pages/SuperAdminShops.jsx
import React, { useState } from 'react';
import { useApp } from '../App';
import { Toaster, toast } from 'react-hot-toast';
import { 
  Store, Search, Filter, Eye, Edit, Trash2, CheckCircle, XCircle,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  Download, Plus, AlertTriangle, Star, DollarSign, Package, Calendar
} from 'lucide-react';

export default function SuperAdminShops() {
  const { theme } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const [shops, setShops] = useState([
    { id: 1, name: 'Fashion Hub', owner: 'Alice Cooper', email: 'alice@fashionhub.com', phone: '+1 234-567-8900', revenue: '$45,230', products: 234, status: 'Active', verificationStatus: 'Verified', registeredDate: '2023-01-15', rating: 4.8, address: '123 Fashion St, NY' },
    { id: 2, name: 'Tech Store', owner: 'Bob Martin', email: 'bob@techstore.com', phone: '+1 234-567-8901', revenue: '$38,120', products: 156, status: 'Active', verificationStatus: 'Verified', registeredDate: '2023-02-20', rating: 4.9, address: '456 Tech Ave, SF' },
    { id: 3, name: 'Home Decor', owner: 'Carol Davis', email: 'carol@homedecor.com', phone: '+1 234-567-8902', revenue: '$27,890', products: 89, status: 'Inactive', verificationStatus: 'Pending', registeredDate: '2023-03-10', rating: 4.7, address: '789 Home Rd, LA' },
    { id: 4, name: 'Gadget World', owner: 'David Lee', email: 'david@gadgetworld.com', phone: '+1 234-567-8903', revenue: '$22,450', products: 178, status: 'Active', verificationStatus: 'Verified', registeredDate: '2023-04-05', rating: 4.8, address: '321 Gadget Ln, Chicago' },
    { id: 5, name: 'Sports Gear', owner: 'Emma Wilson', email: 'emma@sportsgear.com', phone: '+1 234-567-8904', revenue: '$18,670', products: 67, status: 'Pending', verificationStatus: 'Pending', registeredDate: '2023-05-12', rating: 4.6, address: '654 Sports Dr, Boston' },
  ]);

  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shop.status === statusFilter;
    const matchesVerification = verificationFilter === 'all' || shop.verificationStatus === verificationFilter;
    return matchesSearch && matchesStatus && matchesVerification;
  });

  const totalItems = filteredShops.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedShops = filteredShops.slice(startIndex, startIndex + itemsPerPage);

  const handleDeleteShop = (id) => {
    setShops(shops.filter(s => s.id !== id));
    setShowDeleteConfirm(null);
    toast.success('Shop deleted successfully!');
  };

  const handleExport = () => {
    const data = JSON.stringify(filteredShops, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `shops_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Shops exported!');
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div><h1 className={`text-3xl font-bold ${theme.text}`}><Store className="inline mr-3 mb-1" size={28} />All Shops Management</h1>
          <p className={`${theme.textSecondary} mt-2`}>Manage and verify all shops on the platform</p></div>
          <div className="flex gap-2"><button onClick={handleExport} className={`px-3 py-2 rounded-lg ${theme.cardHover} flex items-center gap-2 text-sm`}><Download size={16} /> Export</button>
          <button className={`px-3 py-2 rounded-lg ${theme.primary} text-white flex items-center gap-2 text-sm`}><Plus size={16} /> Add Shop</button></div>
        </div>
      </div>

      {/* Filters */}
      <div className={`${theme.card} rounded-xl p-4 mb-6 border ${theme.border}`}>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative"><Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} size={18} />
          <input type="text" placeholder="Search by shop name, owner, or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /></div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="all">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Pending">Pending</option>
          </select>
          <select value={verificationFilter} onChange={(e) => setVerificationFilter(e.target.value)} className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="all">All Verification</option><option value="Verified">Verified</option><option value="Pending">Pending</option><option value="Rejected">Rejected</option>
          </select>
          <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value={10}>10 / page</option><option value={25}>25 / page</option><option value={50}>50 / page</option>
          </select>
        </div>
      </div>

      {/* Shops Table */}
      <div className={`${theme.card} rounded-xl shadow-xl overflow-hidden border ${theme.border}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className={`${theme.border} border-b`}>
              <tr className={`text-left text-sm ${theme.textSecondary}`}>
                <th className="p-4">Shop Name</th><th className="p-4">Owner</th><th className="p-4">Revenue</th><th className="p-4">Products</th>
                <th className="p-4">Status</th><th className="p-4">Verification</th><th className="p-4">Registered</th><th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedShops.map((shop) => (
                <tr key={shop.id} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                  <td className={`p-4 font-semibold ${theme.text}`}>{shop.name}</td>
                  <td className={`p-4 ${theme.textSecondary}`}>{shop.owner}</td>
                  <td className={`p-4 font-semibold ${theme.text}`}>{shop.revenue}</td>
                  <td className={`p-4 ${theme.textSecondary}`}>{shop.products}</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${shop.status === 'Active' ? 'bg-green-500/20 text-green-600' : shop.status === 'Inactive' ? 'bg-red-500/20 text-red-600' : 'bg-yellow-500/20 text-yellow-600'}`}>{shop.status}</span></td>
                  <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${shop.verificationStatus === 'Verified' ? 'bg-green-500/20 text-green-600' : shop.verificationStatus === 'Pending' ? 'bg-yellow-500/20 text-yellow-600' : 'bg-red-500/20 text-red-600'}`}>{shop.verificationStatus}</span></td>
                  <td className={`p-4 text-sm ${theme.textSecondary}`}>{shop.registeredDate}</td>
                  <td className="p-4"><div className="flex gap-2"><button className={`p-1 rounded ${theme.cardHover}`} title="View"><Eye size={16} /></button>
                  <button onClick={() => setShowDeleteConfirm(shop.id)} className={`p-1 rounded ${theme.cardHover}`} title="Delete"><Trash2 size={16} className="text-red-500" /></button></div></td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
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
            </div>
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteConfirm(null)}>
          <div className={`${theme.card} rounded-xl max-w-md w-full p-6 text-center`} onClick={(e) => e.stopPropagation()}>
            <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
            <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>Delete Shop</h3>
            <p className={`${theme.textSecondary} mb-6`}>This action cannot be undone. All shop data will be permanently deleted.</p>
            <div className="flex gap-3"><button onClick={() => setShowDeleteConfirm(null)} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover}`}>Cancel</button>
            <button onClick={() => handleDeleteShop(showDeleteConfirm)} className={`flex-1 px-4 py-2 rounded-lg bg-red-500 text-white`}>Delete</button></div>
          </div>
        </div>
      )}
    </div>
  );
}