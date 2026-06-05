// pages/SuperAdminUsers.jsx - Complete User Management
import React, { useState } from 'react';
import { useApp } from '../App';
import { Toaster, toast } from 'react-hot-toast';
import { 
  Users, Search, Filter, Edit, Trash2, Eye, Shield, 
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  UserPlus, Download, Mail, Ban, CheckCircle, XCircle,
  Store, ShoppingCart, Star, AlertTriangle
} from 'lucide-react';
import UserDetailsModal from '../components/superadmin/UserDetailsModal';

export default function SuperAdminUsers() {
  const { theme } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Sample users data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8900', role: 'customer', status: 'Active', joinedDate: '2023-01-15', location: 'New York', totalOrders: 24, totalSpent: 1249, reviews: 12, avatar: 'JD' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234-567-8901', role: 'customer', status: 'Active', joinedDate: '2023-02-20', location: 'Los Angeles', totalOrders: 18, totalSpent: 899, reviews: 8, avatar: 'JS' },
    { id: 3, name: 'Alice Cooper', email: 'alice@fashionhub.com', phone: '+1 234-567-8902', role: 'admin', status: 'Active', joinedDate: '2023-01-15', location: 'New York', shopName: 'Fashion Hub', shopRevenue: '$45,230', avatar: 'AC' },
    { id: 4, name: 'Bob Martin', email: 'bob@techstore.com', phone: '+1 234-567-8903', role: 'admin', status: 'Active', joinedDate: '2023-02-20', location: 'San Francisco', shopName: 'Tech Store', shopRevenue: '$38,120', avatar: 'BM' },
    { id: 5, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 234-567-8904', role: 'customer', status: 'Inactive', joinedDate: '2023-03-10', location: 'Chicago', totalOrders: 5, totalSpent: 549, reviews: 3, avatar: 'MJ' },
    { id: 6, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1 234-567-8905', role: 'customer', status: 'Active', joinedDate: '2022-12-01', location: 'Houston', totalOrders: 32, totalSpent: 1899, reviews: 15, avatar: 'SW' },
    { id: 7, name: 'David Lee', email: 'david@gadgetworld.com', phone: '+1 234-567-8906', role: 'admin', status: 'Active', joinedDate: '2023-04-05', location: 'Chicago', shopName: 'Gadget World', shopRevenue: '$22,450', avatar: 'DL' },
    { id: 8, name: 'Emma Wilson', email: 'emma@sportsgear.com', phone: '+1 234-567-8907', role: 'admin', status: 'Pending', joinedDate: '2023-05-12', location: 'Boston', shopName: 'Sports Gear', shopRevenue: '$18,670', avatar: 'EW' },
    { id: 9, name: 'Sophia Chen', email: 'sophia@beautybliss.com', phone: '+1 234-567-8908', role: 'admin', status: 'Active', joinedDate: '2023-01-28', location: 'Miami', shopName: 'Beauty Bliss', shopRevenue: '$34,200', avatar: 'SC' },
    { id: 10, name: 'Michael Brown', email: 'michael@example.com', phone: '+1 234-567-8909', role: 'customer', status: 'Active', joinedDate: '2023-06-15', location: 'Seattle', totalOrders: 12, totalSpent: 678, reviews: 6, avatar: 'MB' },
    { id: 11, name: 'Lisa Anderson', email: 'lisa@example.com', phone: '+1 234-567-8910', role: 'customer', status: 'Active', joinedDate: '2023-07-20', location: 'Denver', totalOrders: 8, totalSpent: 456, reviews: 4, avatar: 'LA' },
    { id: 12, name: 'James Wilson', email: 'james@example.com', phone: '+1 234-567-8911', role: 'customer', status: 'Inactive', joinedDate: '2023-08-10', location: 'Portland', totalOrders: 3, totalSpent: 234, reviews: 1, avatar: 'JW' },
  ]);

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // User statistics
  const stats = {
    total: users.length,
    customers: users.filter(u => u.role === 'customer').length,
    shopOwners: users.filter(u => u.role === 'admin').length,
    active: users.filter(u => u.status === 'Active').length,
    inactive: users.filter(u => u.status === 'Inactive').length,
    pending: users.filter(u => u.status === 'Pending').length
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
    setShowDeleteConfirm(null);
    toast.success('User deleted successfully!');
  };

  const handleSuspendUser = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'Inactive' } : u));
    toast.success('User suspended successfully!');
    setShowDetailsModal(false);
  };

  const handleActivateUser = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'Active' } : u));
    toast.success('User activated successfully!');
    setShowDetailsModal(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setShowEditModal(false);
    toast.success('User updated successfully!');
  };

  const handleExportUsers = () => {
    const data = JSON.stringify(filteredUsers, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `users_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Users exported successfully!');
  };

  const getRoleBadge = (role) => {
    const colors = {
      'admin': 'bg-purple-500/20 text-purple-600',
      'superadmin': 'bg-red-500/20 text-red-600',
      'customer': 'bg-blue-500/20 text-blue-600'
    };
    return colors[role] || 'bg-gray-500/20 text-gray-600';
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-green-500/20 text-green-600',
      'Inactive': 'bg-red-500/20 text-red-600',
      'Pending': 'bg-yellow-500/20 text-yellow-600'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-600';
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${theme.text}`}>
              <Users className="inline mr-3 mb-1" size={28} />
              User Management
            </h1>
            <p className={`${theme.textSecondary} mt-2`}>Manage all users across the platform</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleExportUsers} className={`px-3 py-2 rounded-lg ${theme.cardHover} flex items-center gap-2 text-sm`}>
              <Download size={16} /> Export Users
            </button>
            <button className={`px-3 py-2 rounded-lg ${theme.primary} text-white flex items-center gap-2 text-sm`}>
              <UserPlus size={16} /> Add User
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <Users size={20} className="mx-auto mb-1 text-blue-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.total}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Total Users</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <ShoppingCart size={20} className="mx-auto mb-1 text-green-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.customers}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Customers</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <Store size={20} className="mx-auto mb-1 text-purple-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.shopOwners}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Shop Owners</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <CheckCircle size={20} className="mx-auto mb-1 text-green-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.active}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Active</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <Ban size={20} className="mx-auto mb-1 text-red-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.inactive}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Inactive</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <AlertTriangle size={20} className="mx-auto mb-1 text-yellow-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.pending}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Pending</p>
        </div>
      </div>

      {/* Filters */}
      <div className={`${theme.card} rounded-xl p-4 mb-6 border ${theme.border}`}>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} size={18} />
            <input type="text" placeholder="Search by name, email, or phone..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
          </div>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="all">All Roles</option><option value="customer">Customers</option><option value="admin">Shop Owners</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="all">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Pending">Pending</option>
          </select>
          <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value={10}>10 / page</option><option value={25}>25 / page</option><option value={50}>50 / page</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className={`${theme.card} rounded-xl shadow-xl overflow-hidden border ${theme.border}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className={`${theme.border} border-b`}>
              <tr className={`text-left text-sm ${theme.textSecondary}`}>
                <th className="p-4">User</th><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4">Status</th><th className="p-4">Joined</th><th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className={`font-semibold ${theme.text}`}>{user.name}</p>
                        <p className={`text-xs ${theme.textSecondary}`}>{user.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`p-4 text-sm ${theme.textSecondary}`}>{user.email}</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleBadge(user.role)}`}>{user.role === 'admin' ? 'Shop Owner' : user.role === 'superadmin' ? 'Super Admin' : 'Customer'}</span></td>
                  <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(user.status)}`}>{user.status}</span></td>
                  <td className={`p-4 text-sm ${theme.textSecondary}`}>{user.joinedDate}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => { setSelectedUser(user); setShowDetailsModal(true); }} className={`p-1 rounded ${theme.cardHover}`} title="View Details"><Eye size={16} /></button>
                      <button onClick={() => setShowDeleteConfirm(user.id)} className={`p-1 rounded ${theme.cardHover}`} title="Delete User"><Trash2 size={16} className="text-red-500" /></button>
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
            <div className={`text-sm ${theme.textSecondary}`}>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} users</div>
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

      {/* User Details Modal */}
      {showDetailsModal && selectedUser && (
        <UserDetailsModal 
          theme={theme} 
          user={selectedUser} 
          onClose={() => { setShowDetailsModal(false); setSelectedUser(null); }}
          onEdit={() => {}}
          onDelete={() => {}}
          onSuspend={handleSuspendUser}
          onActivate={handleActivateUser}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteConfirm(null)}>
          <div className={`${theme.card} rounded-xl max-w-md w-full p-6 text-center`} onClick={(e) => e.stopPropagation()}>
            <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
            <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>Delete User</h3>
            <p className={`${theme.textSecondary} mb-6`}>Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(null)} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>Cancel</button>
              <button onClick={() => handleDeleteUser(showDeleteConfirm)} className={`flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600`}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}