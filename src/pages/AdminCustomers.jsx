// pages/AdminCustomers.jsx - Complete Customer Management System
import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../App';
import { 
  Users, Search, Filter, X, ChevronLeft, ChevronRight, 
  Eye, Edit, Trash2, Mail, Phone, MapPin, Calendar, 
  DollarSign, ShoppingCart, Star, Award, TrendingUp,
  Download, Plus, MessageCircle, UserCheck, UserX,
  Clock, Activity, Crown, Gift, Heart, Share2
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function AdminCustomers() {
  const { theme } = useApp();
  
  // State Management
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    status: 'Active',
    tier: 'Regular'
  });

  // Sample customers data
  const initialCustomers = [
    { 
      id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8900',
      address: '123 Main St, New York, NY 10001', city: 'New York', state: 'NY', zipCode: '10001',
      orders: 12, spent: 1249, status: 'Active', tier: 'Gold', joinDate: '2023-01-15', lastOrder: '2024-01-15',
      avatar: 'JD', reviews: 8, wishlist: 5
    },
    { 
      id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234-567-8901',
      address: '456 Oak Ave, Los Angeles, CA 90001', city: 'Los Angeles', state: 'CA', zipCode: '90001',
      orders: 8, spent: 899, status: 'Active', tier: 'Silver', joinDate: '2023-02-20', lastOrder: '2024-01-16',
      avatar: 'JS', reviews: 5, wishlist: 3
    },
    { 
      id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 234-567-8902',
      address: '789 Pine Rd, Chicago, IL 60601', city: 'Chicago', state: 'IL', zipCode: '60601',
      orders: 5, spent: 549, status: 'Inactive', tier: 'Regular', joinDate: '2023-03-10', lastOrder: '2023-12-01',
      avatar: 'MJ', reviews: 2, wishlist: 1
    },
    { 
      id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1 234-567-8903',
      address: '321 Elm St, Houston, TX 77001', city: 'Houston', state: 'TX', zipCode: '77001',
      orders: 15, spent: 1899, status: 'Active', tier: 'Platinum', joinDate: '2022-12-01', lastOrder: '2024-01-17',
      avatar: 'SW', reviews: 12, wishlist: 8
    },
    { 
      id: 5, name: 'David Lee', email: 'david@example.com', phone: '+1 234-567-8904',
      address: '654 Maple Dr, Phoenix, AZ 85001', city: 'Phoenix', state: 'AZ', zipCode: '85001',
      orders: 7, spent: 899, status: 'Active', tier: 'Silver', joinDate: '2023-05-15', lastOrder: '2024-01-13',
      avatar: 'DL', reviews: 4, wishlist: 2
    },
    { 
      id: 6, name: 'Emma Brown', email: 'emma@example.com', phone: '+1 234-567-8905',
      address: '987 Cedar Ln, Philadelphia, PA 19101', city: 'Philadelphia', state: 'PA', zipCode: '19101',
      orders: 10, spent: 1129, status: 'Active', tier: 'Gold', joinDate: '2023-06-20', lastOrder: '2024-01-14',
      avatar: 'EB', reviews: 7, wishlist: 4
    },
    { 
      id: 7, name: 'James Wilson', email: 'james@example.com', phone: '+1 234-567-8906',
      address: '147 Birch Blvd, San Francisco, CA 94101', city: 'San Francisco', state: 'CA', zipCode: '94101',
      orders: 3, spent: 349, status: 'Inactive', tier: 'Regular', joinDate: '2023-08-10', lastOrder: '2023-11-20',
      avatar: 'JW', reviews: 1, wishlist: 0
    },
    { 
      id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', phone: '+1 234-567-8907',
      address: '258 Spruce Way, Seattle, WA 98101', city: 'Seattle', state: 'WA', zipCode: '98101',
      orders: 22, spent: 2899, status: 'Active', tier: 'Platinum', joinDate: '2022-10-05', lastOrder: '2024-01-18',
      avatar: 'LA', reviews: 15, wishlist: 10
    },
    { 
      id: 9, name: 'Robert Taylor', email: 'robert@example.com', phone: '+1 234-567-8908',
      address: '369 Willow Ct, Boston, MA 02101', city: 'Boston', state: 'MA', zipCode: '02101',
      orders: 6, spent: 678, status: 'Active', tier: 'Silver', joinDate: '2023-04-12', lastOrder: '2024-01-10',
      avatar: 'RT', reviews: 3, wishlist: 2
    },
    { 
      id: 10, name: 'Maria Garcia', email: 'maria@example.com', phone: '+1 234-567-8909',
      address: '741 Cherry Ln, Denver, CO 80201', city: 'Denver', state: 'CO', zipCode: '80201',
      orders: 14, spent: 1650, status: 'Active', tier: 'Gold', joinDate: '2023-01-25', lastOrder: '2024-01-12',
      avatar: 'MG', reviews: 9, wishlist: 6
    }
  ];

  // Load customers from localStorage or use initial
  useEffect(() => {
    const savedCustomers = localStorage.getItem('admin_customers');
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    } else {
      setCustomers(initialCustomers);
    }
  }, []);

  // Save customers to localStorage
  useEffect(() => {
    if (customers.length > 0) {
      localStorage.setItem('admin_customers', JSON.stringify(customers));
    }
  }, [customers]);

  // Filtered and sorted customers
  const filteredCustomers = useMemo(() => {
    let filtered = [...customers];
    
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm) ||
        c.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(c => c.status === selectedStatus);
    }
    
    if (selectedTier !== 'all') {
      filtered = filtered.filter(c => c.tier === selectedTier);
    }
    
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'latest': return new Date(b.joinDate) - new Date(a.joinDate);
        case 'oldest': return new Date(a.joinDate) - new Date(b.joinDate);
        case 'spent-high': return b.spent - a.spent;
        case 'spent-low': return a.spent - b.spent;
        case 'orders-high': return b.orders - a.orders;
        case 'orders-low': return a.orders - b.orders;
        default: return 0;
      }
    });
    
    return filtered;
  }, [customers, searchTerm, selectedStatus, selectedTier, sortBy]);

  // Stats
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'Active').length,
    inactive: customers.filter(c => c.status === 'Inactive').length,
    totalSpent: customers.reduce((sum, c) => sum + c.spent, 0),
    avgSpent: Math.round(customers.reduce((sum, c) => sum + c.spent, 0) / customers.length),
    totalOrders: customers.reduce((sum, c) => sum + c.orders, 0),
    gold: customers.filter(c => c.tier === 'Gold').length,
    platinum: customers.filter(c => c.tier === 'Platinum').length,
    silver: customers.filter(c => c.tier === 'Silver').length
  };

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedTier, sortBy]);

  // CRUD Operations
  const handleAddCustomer = () => {
    if (!formData.name || !formData.email) {
      toast.error('Please fill required fields');
      return;
    }
    
    const newCustomer = {
      id: Date.now(),
      ...formData,
      orders: 0,
      spent: 0,
      joinDate: new Date().toISOString().split('T')[0],
      lastOrder: null,
      avatar: formData.name.split(' ').map(n => n[0]).join(''),
      reviews: 0,
      wishlist: 0
    };
    
    setCustomers([newCustomer, ...customers]);
    setShowAddCustomer(false);
    resetForm();
    toast.success('Customer added successfully!');
  };

  const handleUpdateCustomer = () => {
    if (!editingCustomer) return;
    
    const updatedCustomers = customers.map(c => 
      c.id === editingCustomer.id ? { ...c, ...formData } : c
    );
    
    setCustomers(updatedCustomers);
    setShowEditModal(false);
    setEditingCustomer(null);
    resetForm();
    toast.success('Customer updated successfully!');
  };

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
    setShowDeleteModal(null);
    toast.success('Customer deleted successfully!');
  };

  const handleBulkDelete = () => {
    setCustomers(customers.filter(c => !selectedCustomers.includes(c.id)));
    setSelectedCustomers([]);
    toast.success(`${selectedCustomers.length} customers deleted!`);
  };

  const handleExport = () => {
    const data = JSON.stringify(filteredCustomers, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Customers exported!');
  };

  const resetForm = () => {
    setFormData({
      name: '', email: '', phone: '', address: '', city: '', state: '', zipCode: '', status: 'Active', tier: 'Regular'
    });
  };

  const editCustomer = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name, email: customer.email, phone: customer.phone,
      address: customer.address || '', city: customer.city || '', state: customer.state || '',
      zipCode: customer.zipCode || '', status: customer.status, tier: customer.tier
    });
    setShowEditModal(true);
  };

  const getTierBadge = (tier) => {
    const colors = {
      'Platinum': 'bg-purple-500/20 text-purple-600',
      'Gold': 'bg-yellow-500/20 text-yellow-600',
      'Silver': 'bg-gray-400/20 text-gray-600',
      'Regular': 'bg-blue-500/20 text-blue-600'
    };
    return colors[tier] || 'bg-gray-500/20 text-gray-600';
  };

  const getStatusBadge = (status) => {
    return status === 'Active' 
      ? 'bg-green-500/20 text-green-600' 
      : 'bg-red-500/20 text-red-600';
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${theme.text}`}>
              <Users className="inline mr-3 mb-1" size={28} />
              Customer Management
            </h1>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>Manage your customer base and track their activity</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleExport} className={`px-3 py-2 rounded-lg ${theme.cardHover} flex items-center gap-2 text-sm`}>
              <Download size={16} /> Export
            </button>
            <button onClick={() => setShowAddCustomer(true)} className={`${theme.primary} text-white px-4 py-2 rounded-lg flex items-center gap-2`}>
              <Plus size={18} /> Add Customer
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <Users size={20} className="mx-auto mb-1 text-blue-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.total}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Total</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <UserCheck size={20} className="mx-auto mb-1 text-green-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.active}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Active</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <UserX size={20} className="mx-auto mb-1 text-red-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.inactive}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Inactive</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <DollarSign size={20} className="mx-auto mb-1 text-emerald-500" />
          <p className={`text-xl font-bold ${theme.text}`}>${stats.totalSpent.toLocaleString()}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Total Spent</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <TrendingUp size={20} className="mx-auto mb-1 text-cyan-500" />
          <p className={`text-xl font-bold ${theme.text}`}>${stats.avgSpent}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Avg Spent</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <ShoppingCart size={20} className="mx-auto mb-1 text-purple-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.totalOrders}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Total Orders</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <Crown size={20} className="mx-auto mb-1 text-yellow-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.platinum}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Platinum</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <Award size={20} className="mx-auto mb-1 text-orange-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.gold}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Gold</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className={`${theme.card} rounded-xl p-4 mb-6 border ${theme.border}`}>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} size={18} />
            <input type="text" placeholder="Search by name, email, phone, or city..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
          </div>
          
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} 
            className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          
          <select value={selectedTier} onChange={(e) => setSelectedTier(e.target.value)} 
            className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="all">All Tiers</option>
            <option value="Platinum">Platinum</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Regular">Regular</option>
          </select>
          
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} 
            className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="latest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="spent-high">Highest Spent</option>
            <option value="spent-low">Lowest Spent</option>
            <option value="orders-high">Most Orders</option>
            <option value="orders-low">Least Orders</option>
          </select>
        </div>
        
        {(searchTerm || selectedStatus !== 'all' || selectedTier !== 'all') && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className={`text-xs ${theme.textSecondary}`}>Active filters:</span>
            {searchTerm && <span className={`px-2 py-0.5 rounded-full text-xs ${theme.cardHover} flex items-center gap-1`}>{searchTerm} <X size={12} className="cursor-pointer" onClick={() => setSearchTerm('')} /></span>}
            {selectedStatus !== 'all' && <span className={`px-2 py-0.5 rounded-full text-xs ${theme.cardHover} flex items-center gap-1`}>{selectedStatus} <X size={12} className="cursor-pointer" onClick={() => setSelectedStatus('all')} /></span>}
            {selectedTier !== 'all' && <span className={`px-2 py-0.5 rounded-full text-xs ${theme.cardHover} flex items-center gap-1`}>{selectedTier} <X size={12} className="cursor-pointer" onClick={() => setSelectedTier('all')} /></span>}
            <button onClick={() => { setSearchTerm(''); setSelectedStatus('all'); setSelectedTier('all'); setSortBy('latest'); }} className="text-xs text-blue-500 hover:text-blue-600">Clear all</button>
          </div>
        )}
      </div>

      {/* Bulk Actions Bar */}
      {selectedCustomers.length > 0 && (
        <div className={`${theme.primary} text-white rounded-xl p-3 mb-4 flex justify-between items-center flex-wrap gap-2`}>
          <span className="text-sm">{selectedCustomers.length} customers selected</span>
          <div className="flex gap-2">
            <button onClick={handleBulkDelete} className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600">Delete Selected</button>
            <button onClick={() => setSelectedCustomers([])} className="px-3 py-1 rounded-lg bg-white/20 text-white text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {paginatedCustomers.map(customer => (
          <div key={customer.id} className={`${theme.card} rounded-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 border ${theme.border}`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={selectedCustomers.includes(customer.id)} onChange={() => {
                  if (selectedCustomers.includes(customer.id)) setSelectedCustomers(selectedCustomers.filter(id => id !== customer.id));
                  else setSelectedCustomers([...selectedCustomers, customer.id]);
                }} className="w-4 h-4 rounded" />
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold`}>
                  {customer.avatar}
                </div>
              </div>
              <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTierBadge(customer.tier)}`}>
                {customer.tier}
              </div>
            </div>
            <div className="p-4">
              <h3 className={`font-semibold ${theme.text} text-lg`}>{customer.name}</h3>
              <p className={`text-sm ${theme.textSecondary} flex items-center gap-1 mt-1`}>
                <Mail size={14} /> {customer.email}
              </p>
              <p className={`text-sm ${theme.textSecondary} flex items-center gap-1 mt-1`}>
                <Phone size={14} /> {customer.phone}
              </p>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className={`text-xs ${theme.textSecondary}`}>Orders</p>
                  <p className={`text-lg font-bold ${theme.text}`}>{customer.orders}</p>
                </div>
                <div>
                  <p className={`text-xs ${theme.textSecondary}`}>Spent</p>
                  <p className={`text-lg font-bold text-green-500`}>${customer.spent}</p>
                </div>
                <div>
                  <p className={`text-xs ${theme.textSecondary}`}>Joined</p>
                  <p className={`text-sm ${theme.text}`}>{customer.joinDate}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => { setSelectedCustomer(customer); setShowCustomerModal(true); }} className="flex-1 py-1.5 rounded-lg border border-blue-500 text-blue-500 text-sm hover:bg-blue-500/10 transition-all">View</button>
                <button onClick={() => editCustomer(customer)} className="flex-1 py-1.5 rounded-lg border border-purple-500 text-purple-500 text-sm hover:bg-purple-500/10 transition-all">Edit</button>
                <button onClick={() => setShowDeleteModal(customer.id)} className="py-1.5 px-2 rounded-lg border border-red-500 text-red-500 text-sm hover:bg-red-500/10 transition-all"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? 'opacity-50' : theme.cardHover}`}><ChevronLeft size={20} /></button>
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            let pageNum = i + 1;
            if (totalPages > 5 && currentPage > 3) {
              pageNum = currentPage - 3 + i;
              if (pageNum > totalPages) return null;
            }
            return pageNum <= totalPages && (
              <button key={i} onClick={() => setCurrentPage(pageNum)} className={`w-10 h-10 rounded-lg ${currentPage === pageNum ? theme.primary + ' text-white' : theme.cardHover}`}>{pageNum}</button>
            );
          })}
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className={`p-2 rounded-lg ${currentPage === totalPages ? 'opacity-50' : theme.cardHover}`}><ChevronRight size={20} /></button>
          <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className={`ml-2 px-2 py-1 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value={8}>8 / page</option><option value={12}>12 / page</option><option value={24}>24 / page</option>
          </select>
        </div>
      )}

      {/* No Results */}
      {filteredCustomers.length === 0 && (
        <div className={`${theme.card} rounded-xl p-12 text-center`}>
          <Users size={48} className="mx-auto mb-4 opacity-30" />
          <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>No customers found</h3>
          <p className={theme.textSecondary}>Try adjusting your search or filters</p>
          <button onClick={() => { setSearchTerm(''); setSelectedStatus('all'); setSelectedTier('all'); }} className={`mt-4 ${theme.primary} text-white px-6 py-2 rounded-lg`}>Clear filters</button>
        </div>
      )}

      {/* Customer Details Modal */}
      {showCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowCustomerModal(false)}>
          <div className={`${theme.card} rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-inherit">
              <h2 className={`text-xl font-bold ${theme.text}`}>Customer Details</h2>
              <button onClick={() => setShowCustomerModal(false)} className={`p-1 rounded-lg ${theme.cardHover}`}><X size={20} /></button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold`}>
                  {selectedCustomer.avatar}
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${theme.text}`}>{selectedCustomer.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTierBadge(selectedCustomer.tier)}`}>{selectedCustomer.tier}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(selectedCustomer.status)}`}>{selectedCustomer.status}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div><p className={`text-xs ${theme.textSecondary}`}>Email</p><p className={theme.text}>{selectedCustomer.email}</p></div>
                <div><p className={`text-xs ${theme.textSecondary}`}>Phone</p><p className={theme.text}>{selectedCustomer.phone}</p></div>
                <div><p className={`text-xs ${theme.textSecondary}`}>Address</p><p className={theme.text}>{selectedCustomer.address}, {selectedCustomer.city}, {selectedCustomer.state} {selectedCustomer.zipCode}</p></div>
                <div><p className={`text-xs ${theme.textSecondary}`}>Member Since</p><p className={theme.text}>{selectedCustomer.joinDate}</p></div>
                <div><p className={`text-xs ${theme.textSecondary}`}>Last Order</p><p className={theme.text}>{selectedCustomer.lastOrder || 'No orders yet'}</p></div>
                <div><p className={`text-xs ${theme.textSecondary}`}>Reviews</p><p className={theme.text}>{selectedCustomer.reviews} reviews</p></div>
              </div>
              
              <div className={`p-4 rounded-xl ${theme.cardHover} mb-4`}>
                <h3 className={`font-semibold mb-3 ${theme.text}`}>Purchase Statistics</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><p className={`text-2xl font-bold ${theme.text}`}>{selectedCustomer.orders}</p><p className={`text-xs ${theme.textSecondary}`}>Total Orders</p></div>
                  <div><p className={`text-2xl font-bold text-green-500`}>${selectedCustomer.spent}</p><p className={`text-xs ${theme.textSecondary}`}>Total Spent</p></div>
                  <div><p className={`text-2xl font-bold ${theme.text}`}>${Math.round(selectedCustomer.spent / selectedCustomer.orders) || 0}</p><p className={`text-xs ${theme.textSecondary}`}>Avg Order</p></div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => { setShowCustomerModal(false); editCustomer(selectedCustomer); }} className={`flex-1 px-4 py-2 rounded-lg ${theme.primary} text-white`}>Edit Customer</button>
                <button onClick={() => setShowCustomerModal(false)} className={`px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Customer Modal */}
      {(showAddCustomer || showEditModal) && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => { setShowAddCustomer(false); setShowEditModal(false); resetForm(); }}>
          <div className={`${theme.card} rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-inherit">
              <h2 className={`text-xl font-bold ${theme.text}`}>{showEditModal ? 'Edit Customer' : 'Add New Customer'}</h2>
              <button onClick={() => { setShowAddCustomer(false); setShowEditModal(false); resetForm(); }} className={`p-1 rounded-lg ${theme.cardHover}`}><X size={20} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Full Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /></div>
                <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Email *</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /></div>
                <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Phone</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /></div>
                <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Status</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}><option>Active</option><option>Inactive</option></select></div>
                <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Customer Tier</label><select value={formData.tier} onChange={(e) => setFormData({ ...formData, tier: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}><option>Regular</option><option>Silver</option><option>Gold</option><option>Platinum</option></select></div>
                <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>City</label><input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /></div>
                <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>State</label><input type="text" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /></div>
                <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Zip Code</label><input type="text" value={formData.zipCode} onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /></div>
              </div>
              <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Address</label><textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} rows={2}></textarea></div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => { setShowAddCustomer(false); setShowEditModal(false); resetForm(); }} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>Cancel</button>
                <button onClick={showEditModal ? handleUpdateCustomer : handleAddCustomer} className={`flex-1 px-4 py-2 rounded-lg ${theme.primary} text-white`}>{showEditModal ? 'Update Customer' : 'Add Customer'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteModal(null)}>
          <div className={`${theme.card} rounded-xl max-w-md w-full p-6 text-center`} onClick={(e) => e.stopPropagation()}>
            <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
            <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>Delete Customer</h3>
            <p className={`${theme.textSecondary} mb-6`}>Are you sure you want to delete this customer? This action cannot be undone.</p>
            <div className="flex gap-3"><button onClick={() => setShowDeleteModal(null)} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>Cancel</button><button onClick={() => handleDeleteCustomer(showDeleteModal)} className={`flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600`}>Delete</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// Also add missing AlertCircle import at the top if not present
import { AlertCircle } from 'lucide-react';