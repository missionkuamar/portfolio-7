// pages/AdminOrders.jsx - Complete Order Management System
import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../App';
import { 
  ShoppingCart, Search, Filter, X, ChevronLeft, ChevronRight, 
  Eye, Truck, CheckCircle, Clock, AlertCircle, Package, 
  DollarSign, User, Calendar, CreditCard, MapPin, Phone,
  Mail, Download, Printer, RefreshCw, Edit, Trash2,
  TrendingUp, Award, Gift, MessageCircle, Star,
  ChevronDown, ChevronUp, Grid3x3, List, Plus
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function AdminOrders() {
  const { theme } = useApp();
  
  // State Management
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showUpdateStatus, setShowUpdateStatus] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showBulkUpdate, setShowBulkUpdate] = useState(false);
  const [showAddOrder, setShowAddOrder] = useState(false);

  // Sample orders data
  const initialOrders = [
    { 
      id: '#ORD-001', customer: { name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8900', address: '123 Main St, New York, NY 10001' },
      amount: 299, items: [{ name: 'Premium Headphones', quantity: 1, price: 299 }], status: 'Delivered', 
      date: '2024-01-15', payment: 'Card', paymentStatus: 'Paid', tracking: 'TRK123456', notes: 'Leave at door'
    },
    { 
      id: '#ORD-002', customer: { name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234-567-8901', address: '456 Oak Ave, Los Angeles, CA 90001' },
      amount: 499, items: [{ name: 'Smart Watch', quantity: 1, price: 499 }], status: 'Processing', 
      date: '2024-01-16', payment: 'PayPal', paymentStatus: 'Pending', tracking: null, notes: ''
    },
    { 
      id: '#ORD-003', customer: { name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 234-567-8902', address: '789 Pine Rd, Chicago, IL 60601' },
      amount: 129, items: [{ name: 'Designer Bag', quantity: 1, price: 129 }], status: 'Shipped', 
      date: '2024-01-14', payment: 'Card', paymentStatus: 'Paid', tracking: 'TRK123457', notes: ''
    },
    { 
      id: '#ORD-004', customer: { name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1 234-567-8903', address: '321 Elm St, Houston, TX 77001' },
      amount: 89, items: [{ name: 'USB-C Hub', quantity: 1, price: 89 }], status: 'Pending', 
      date: '2024-01-17', payment: 'Cash', paymentStatus: 'Pending', tracking: null, notes: 'Call before delivery'
    },
    { 
      id: '#ORD-005', customer: { name: 'David Lee', email: 'david@example.com', phone: '+1 234-567-8904', address: '654 Maple Dr, Phoenix, AZ 85001' },
      amount: 599, items: [{ name: 'Mechanical Keyboard', quantity: 1, price: 189 }, { name: 'Gaming Mouse', quantity: 2, price: 89 }], status: 'Delivered', 
      date: '2024-01-13', payment: 'Card', paymentStatus: 'Paid', tracking: 'TRK123458', notes: ''
    },
    { 
      id: '#ORD-006', customer: { name: 'Emma Brown', email: 'emma@example.com', phone: '+1 234-567-8905', address: '987 Cedar Ln, Philadelphia, PA 19101' },
      amount: 349, items: [{ name: 'Wireless Earbuds', quantity: 1, price: 159 }, { name: 'Phone Case', quantity: 2, price: 95 }], status: 'Processing', 
      date: '2024-01-18', payment: 'PayPal', paymentStatus: 'Paid', tracking: null, notes: ''
    },
    { 
      id: '#ORD-007', customer: { name: 'James Wilson', email: 'james@example.com', phone: '+1 234-567-8906', address: '147 Birch Blvd, San Francisco, CA 94101' },
      amount: 199, items: [{ name: 'Smart Home Hub', quantity: 1, price: 199 }], status: 'Shipped', 
      date: '2024-01-12', payment: 'Card', paymentStatus: 'Paid', tracking: 'TRK123459', notes: ''
    },
    { 
      id: '#ORD-008', customer: { name: 'Lisa Anderson', email: 'lisa@example.com', phone: '+1 234-567-8907', address: '258 Spruce Way, Seattle, WA 98101' },
      amount: 89, items: [{ name: 'Fitness Tracker', quantity: 1, price: 79 }], status: 'Pending', 
      date: '2024-01-19', payment: 'Card', paymentStatus: 'Pending', tracking: null, notes: ''
    },
    { 
      id: '#ORD-009', customer: { name: 'Robert Taylor', email: 'robert@example.com', phone: '+1 234-567-8908', address: '369 Willow Ct, Boston, MA 02101' },
      amount: 478, items: [{ name: 'Premium Headphones', quantity: 1, price: 299 }, { name: 'USB-C Hub', quantity: 2, price: 89 }], status: 'Delivered', 
      date: '2024-01-11', payment: 'PayPal', paymentStatus: 'Paid', tracking: 'TRK123460', notes: ''
    },
    { 
      id: '#ORD-010', customer: { name: 'Maria Garcia', email: 'maria@example.com', phone: '+1 234-567-8909', address: '741 Cherry Ln, Denver, CO 80201' },
      amount: 129, items: [{ name: 'Designer Bag', quantity: 1, price: 129 }], status: 'Cancelled', 
      date: '2024-01-10', payment: 'Card', paymentStatus: 'Refunded', tracking: null, notes: 'Customer requested cancellation'
    }
  ];

  // Load orders from localStorage or use initial
  useEffect(() => {
    const savedOrders = localStorage.getItem('admin_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders(initialOrders);
    }
  }, []);

  // Save orders to localStorage
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('admin_orders', JSON.stringify(orders));
    }
  }, [orders]);

  // Filtered and sorted orders
  const filteredOrders = useMemo(() => {
    let filtered = [...orders];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(o => 
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.phone.includes(searchTerm)
      );
    }
    
    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(o => o.status === selectedStatus);
    }
    
    // Payment filter
    if (selectedPayment !== 'all') {
      filtered = filtered.filter(o => o.payment === selectedPayment);
    }
    
    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      filtered = filtered.filter(o => {
        const orderDate = new Date(o.date);
        if (dateRange === 'today') return orderDate >= today;
        if (dateRange === 'week') return orderDate >= weekAgo;
        if (dateRange === 'month') return orderDate >= monthAgo;
        return true;
      });
    }
    
    // Sorting
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'latest': return new Date(b.date) - new Date(a.date);
        case 'oldest': return new Date(a.date) - new Date(b.date);
        case 'amount-high': return b.amount - a.amount;
        case 'amount-low': return a.amount - b.amount;
        default: return 0;
      }
    });
    
    return filtered;
  }, [orders, searchTerm, selectedStatus, selectedPayment, dateRange, sortBy]);

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    processing: orders.filter(o => o.status === 'Processing').length,
    shipped: orders.filter(o => o.status === 'Shipped').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    cancelled: orders.filter(o => o.status === 'Cancelled').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.amount, 0),
    avgOrderValue: Math.round(orders.reduce((sum, o) => sum + o.amount, 0) / orders.length)
  };

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedPayment, dateRange, sortBy]);

  // Update order status
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    setShowUpdateStatus(null);
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  // Delete order
  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter(o => o.id !== orderId));
    setShowDeleteModal(null);
    toast.success(`Order ${orderId} deleted successfully`);
  };

  // Bulk update status
  const handleBulkUpdate = (newStatus) => {
    setOrders(orders.map(o => 
      selectedOrders.includes(o.id) ? { ...o, status: newStatus } : o
    ));
    setSelectedOrders([]);
    setShowBulkUpdate(false);
    toast.success(`${selectedOrders.length} orders updated to ${newStatus}`);
  };

  // Bulk delete
  const handleBulkDelete = () => {
    setOrders(orders.filter(o => !selectedOrders.includes(o.id)));
    setSelectedOrders([]);
    toast.success(`${selectedOrders.length} orders deleted`);
  };

  // Add new order
  const handleAddOrder = (newOrder) => {
    const order = {
      id: `#ORD-${String(orders.length + 1).padStart(3, '0')}`,
      ...newOrder,
      date: new Date().toISOString().split('T')[0],
      tracking: null,
      notes: ''
    };
    setOrders([order, ...orders]);
    setShowAddOrder(false);
    toast.success('Order added successfully');
  };

  // Export orders
  const handleExport = () => {
    const data = JSON.stringify(filteredOrders, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Orders exported!');
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle size={16} className="text-green-500" />;
      case 'Shipped': return <Truck size={16} className="text-purple-500" />;
      case 'Processing': return <Clock size={16} className="text-blue-500" />;
      case 'Pending': return <AlertCircle size={16} className="text-yellow-500" />;
      case 'Cancelled': return <X size={16} className="text-red-500" />;
      default: return <Package size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Delivered': 'bg-green-500/20 text-green-600',
      'Shipped': 'bg-purple-500/20 text-purple-600',
      'Processing': 'bg-blue-500/20 text-blue-600',
      'Pending': 'bg-yellow-500/20 text-yellow-600',
      'Cancelled': 'bg-red-500/20 text-red-600'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-600';
  };

  const getPaymentStatusColor = (status) => {
    return status === 'Paid' ? 'bg-green-500/20 text-green-600' : 'bg-yellow-500/20 text-yellow-600';
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${theme.text}`}>
              <ShoppingCart className="inline mr-3 mb-1" size={28} />
              Order Management
            </h1>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>Track, manage, and process customer orders</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleExport} className={`px-3 py-2 rounded-lg ${theme.cardHover} flex items-center gap-2 text-sm`}>
              <Download size={16} /> Export
            </button>
            <button onClick={() => setShowAddOrder(true)} className={`${theme.primary} text-white px-4 py-2 rounded-lg flex items-center gap-2`}>
              <Plus size={18} /> Add Order
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-6">
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <ShoppingCart size={20} className="mx-auto mb-1 text-blue-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.total}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Total</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <AlertCircle size={20} className="mx-auto mb-1 text-yellow-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.pending}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Pending</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <Clock size={20} className="mx-auto mb-1 text-blue-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.processing}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Processing</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <Truck size={20} className="mx-auto mb-1 text-purple-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.shipped}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Shipped</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <CheckCircle size={20} className="mx-auto mb-1 text-green-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.delivered}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Delivered</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <DollarSign size={20} className="mx-auto mb-1 text-emerald-500" />
          <p className={`text-xl font-bold ${theme.text}`}>${stats.totalRevenue.toLocaleString()}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Revenue</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <TrendingUp size={20} className="mx-auto mb-1 text-cyan-500" />
          <p className={`text-xl font-bold ${theme.text}`}>${stats.avgOrderValue}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Avg Order</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className={`${theme.card} rounded-xl p-4 mb-6 border ${theme.border}`}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} size={18} />
            <input type="text" placeholder="Search by order ID, customer name, email, or phone..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
          </div>
          
          {/* Status Filter */}
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} 
            className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          
          {/* Payment Filter */}
          <select value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)} 
            className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="all">All Payments</option>
            <option value="Card">Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash">Cash</option>
          </select>
          
          {/* Date Range */}
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} 
            className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
          
          {/* Sort By */}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} 
            className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="amount-high">Amount: High to Low</option>
            <option value="amount-low">Amount: Low to High</option>
          </select>
          
          {/* View Toggle */}
          <div className="flex gap-1">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? theme.primary + ' text-white' : theme.cardHover}`}><Grid3x3 size={18} /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? theme.primary + ' text-white' : theme.cardHover}`}><List size={18} /></button>
          </div>
        </div>
        
        {/* Active Filters */}
        {(searchTerm || selectedStatus !== 'all' || selectedPayment !== 'all' || dateRange !== 'all') && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className={`text-xs ${theme.textSecondary}`}>Active filters:</span>
            {searchTerm && <span className={`px-2 py-0.5 rounded-full text-xs ${theme.cardHover} flex items-center gap-1`}>{searchTerm} <X size={12} className="cursor-pointer" onClick={() => setSearchTerm('')} /></span>}
            {selectedStatus !== 'all' && <span className={`px-2 py-0.5 rounded-full text-xs ${theme.cardHover} flex items-center gap-1`}>{selectedStatus} <X size={12} className="cursor-pointer" onClick={() => setSelectedStatus('all')} /></span>}
            {selectedPayment !== 'all' && <span className={`px-2 py-0.5 rounded-full text-xs ${theme.cardHover} flex items-center gap-1`}>{selectedPayment} <X size={12} className="cursor-pointer" onClick={() => setSelectedPayment('all')} /></span>}
            {dateRange !== 'all' && <span className={`px-2 py-0.5 rounded-full text-xs ${theme.cardHover} flex items-center gap-1`}>{dateRange === 'today' ? 'Today' : dateRange === 'week' ? 'Last 7 Days' : 'Last 30 Days'} <X size={12} className="cursor-pointer" onClick={() => setDateRange('all')} /></span>}
            <button onClick={() => { setSearchTerm(''); setSelectedStatus('all'); setSelectedPayment('all'); setDateRange('all'); setSortBy('latest'); }} className="text-xs text-blue-500 hover:text-blue-600">Clear all</button>
          </div>
        )}
      </div>

      {/* Bulk Actions Bar */}
      {selectedOrders.length > 0 && (
        <div className={`${theme.primary} text-white rounded-xl p-3 mb-4 flex justify-between items-center flex-wrap gap-2`}>
          <span className="text-sm">{selectedOrders.length} orders selected</span>
          <div className="flex gap-2 flex-wrap">
            <select onChange={(e) => handleBulkUpdate(e.target.value)} defaultValue="" className="px-2 py-1 rounded-lg bg-white/20 text-white text-sm">
              <option value="" disabled>Update Status</option>
              <option value="Pending">Pending</option><option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option><option value="Delivered">Delivered</option><option value="Cancelled">Cancelled</option>
            </select>
            <button onClick={() => setShowBulkUpdate(true)} className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600">Delete Selected</button>
            <button onClick={() => setSelectedOrders([])} className="px-3 py-1 rounded-lg bg-white/20 text-white text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Orders Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedOrders.map(order => (
            <div key={order.id} className={`${theme.card} rounded-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 border ${theme.border}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={selectedOrders.includes(order.id)} onChange={() => {
                    if (selectedOrders.includes(order.id)) setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                    else setSelectedOrders([...selectedOrders, order.id]);
                  }} className="w-4 h-4 rounded" />
                  <span className={`font-mono text-sm font-bold ${theme.text}`}>{order.id}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)} {order.status}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <User size={16} className={theme.textSecondary} />
                  <div>
                    <p className={`text-sm font-medium ${theme.text}`}>{order.customer.name}</p>
                    <p className={`text-xs ${theme.textSecondary}`}>{order.customer.email}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} className="text-green-500" />
                    <span className={`text-xl font-bold ${theme.text}`}>${order.amount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className={theme.textSecondary} />
                    <span className={`text-xs ${theme.textSecondary}`}>{order.date}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-1">
                    <CreditCard size={14} className={theme.textSecondary} />
                    <span className={`text-xs ${theme.textSecondary}`}>{order.payment}</span>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-xs ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setSelectedOrder(order); setShowOrderModal(true); }} className="flex-1 py-1.5 rounded-lg border border-blue-500 text-blue-500 text-sm hover:bg-blue-500/10 transition-all">View Details</button>
                  <select onChange={(e) => handleUpdateStatus(order.id, e.target.value)} value={order.status} className={`px-2 py-1.5 rounded-lg text-sm border ${theme.border} ${theme.card} ${theme.text}`}>
                    <option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`${theme.card} rounded-xl overflow-hidden border ${theme.border}`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className={`${theme.border} border-b`}>
                <tr className={`text-left text-xs sm:text-sm ${theme.textSecondary}`}>
                  <th className="p-3 w-10"><input type="checkbox" checked={selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0} onChange={() => {
                    if (selectedOrders.length === paginatedOrders.length) setSelectedOrders([]);
                    else setSelectedOrders(paginatedOrders.map(o => o.id));
                  }} className="w-4 h-4 rounded" /></th>
                  <th className="p-3">Order ID</th><th className="p-3">Customer</th><th className="p-3">Date</th><th className="p-3">Items</th><th className="p-3">Amount</th><th className="p-3">Payment</th><th className="p-3">Status</th><th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map(order => (
                  <tr key={order.id} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                    <td className="p-3"><input type="checkbox" checked={selectedOrders.includes(order.id)} onChange={() => {
                      if (selectedOrders.includes(order.id)) setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                      else setSelectedOrders([...selectedOrders, order.id]);
                    }} className="w-4 h-4 rounded" /></td>
                    <td className={`p-3 font-mono text-sm font-semibold ${theme.text}`}>{order.id}</td>
                    <td className="p-3"><div><p className={`text-sm font-medium ${theme.text}`}>{order.customer.name}</p><p className={`text-xs ${theme.textSecondary}`}>{order.customer.email}</p></div></td>
                    <td className={`p-3 text-sm ${theme.textSecondary}`}>{order.date}</td>
                    <td className={`p-3 text-sm ${theme.textSecondary}`}>{order.items.length} items</td>
                    <td className={`p-3 font-semibold ${theme.text}`}>${order.amount}</td>
                    <td className="p-3"><div><p className={`text-sm ${theme.text}`}>{order.payment}</p><span className={`text-xs ${getPaymentStatusColor(order.paymentStatus)}`}>{order.paymentStatus}</span></div></td>
                    <td className="p-3">
                      <select value={order.status} onChange={(e) => handleUpdateStatus(order.id, e.target.value)} className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(order.status)} border-none focus:outline-none`}>
                        <option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3"><div className="flex gap-2"><button onClick={() => { setSelectedOrder(order); setShowOrderModal(true); }} className="p-1 rounded hover:bg-white/10"><Eye size={16} /></button><button onClick={() => setShowDeleteModal(order.id)} className="p-1 rounded hover:bg-white/10"><Trash2 size={16} className="text-red-500" /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
            <option value={10}>10 / page</option><option value={25}>25 / page</option><option value={50}>50 / page</option>
          </select>
        </div>
      )}

      {/* No Results */}
      {filteredOrders.length === 0 && (
        <div className={`${theme.card} rounded-xl p-12 text-center`}>
          <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
          <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>No orders found</h3>
          <p className={theme.textSecondary}>Try adjusting your search or filters</p>
          <button onClick={() => { setSearchTerm(''); setSelectedStatus('all'); setSelectedPayment('all'); setDateRange('all'); }} className={`mt-4 ${theme.primary} text-white px-6 py-2 rounded-lg`}>Clear filters</button>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowOrderModal(false)}>
          <div className={`${theme.card} rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-inherit">
              <h2 className={`text-xl font-bold ${theme.text}`}>Order Details - {selectedOrder.id}</h2>
              <button onClick={() => setShowOrderModal(false)} className={`p-1 rounded-lg ${theme.cardHover}`}><X size={20} /></button>
            </div>
            <div className="p-5 space-y-5">
              {/* Customer Info */}
              <div className={`p-4 rounded-xl ${theme.cardHover}`}>
                <h3 className={`font-semibold mb-3 ${theme.text} flex items-center gap-2`}><User size={18} /> Customer Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><p className={`text-xs ${theme.textSecondary}`}>Name</p><p className={theme.text}>{selectedOrder.customer.name}</p></div>
                  <div><p className={`text-xs ${theme.textSecondary}`}>Email</p><p className={theme.text}>{selectedOrder.customer.email}</p></div>
                  <div><p className={`text-xs ${theme.textSecondary}`}>Phone</p><p className={theme.text}>{selectedOrder.customer.phone}</p></div>
                  <div><p className={`text-xs ${theme.textSecondary}`}>Address</p><p className={theme.text}>{selectedOrder.customer.address}</p></div>
                </div>
              </div>
              
              {/* Order Info */}
              <div className={`p-4 rounded-xl ${theme.cardHover}`}>
                <h3 className={`font-semibold mb-3 ${theme.text} flex items-center gap-2`}><Package size={18} /> Order Information</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div><p className={`text-xs ${theme.textSecondary}`}>Order Date</p><p className={theme.text}>{selectedOrder.date}</p></div>
                  <div><p className={`text-xs ${theme.textSecondary}`}>Payment Method</p><p className={theme.text}>{selectedOrder.payment}</p></div>
                  <div><p className={`text-xs ${theme.textSecondary}`}>Payment Status</p><span className={`px-2 py-0.5 rounded-full text-xs inline-block ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>{selectedOrder.paymentStatus}</span></div>
                  <div><p className={`text-xs ${theme.textSecondary}`}>Tracking</p><p className={theme.text}>{selectedOrder.tracking || 'Not available'}</p></div>
                </div>
              </div>
              
              {/* Items */}
              <div className={`p-4 rounded-xl ${theme.cardHover}`}>
                <h3 className={`font-semibold mb-3 ${theme.text}`}>Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                      <div><p className={theme.text}>{item.name}</p><p className={`text-xs ${theme.textSecondary}`}>Qty: {item.quantity}</p></div>
                      <p className={`font-semibold ${theme.text}`}>${item.price * item.quantity}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 font-bold">
                    <span className={theme.text}>Total</span>
                    <span className={`text-xl font-bold text-blue-500`}>${selectedOrder.amount}</span>
                  </div>
                </div>
              </div>
              
              {/* Notes */}
              {selectedOrder.notes && (
                <div className={`p-4 rounded-xl ${theme.cardHover}`}>
                  <h3 className={`font-semibold mb-2 ${theme.text}`}>Order Notes</h3>
                  <p className={theme.textSecondary}>{selectedOrder.notes}</p>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex gap-3">
                <select onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)} value={selectedOrder.status} className={`flex-1 px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}>
                  <option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option>
                </select>
                <button onClick={() => setShowOrderModal(false)} className={`px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>Close</button>
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
            <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>Delete Order</h3>
            <p className={`${theme.textSecondary} mb-6`}>Are you sure you want to delete this order? This action cannot be undone.</p>
            <div className="flex gap-3"><button onClick={() => setShowDeleteModal(null)} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>Cancel</button><button onClick={() => handleDeleteOrder(showDeleteModal)} className={`flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600`}>Delete</button></div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation */}
      {showBulkUpdate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowBulkUpdate(false)}>
          <div className={`${theme.card} rounded-xl max-w-md w-full p-6 text-center`} onClick={(e) => e.stopPropagation()}>
            <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
            <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>Delete {selectedOrders.length} Orders</h3>
            <p className={`${theme.textSecondary} mb-6`}>Are you sure you want to delete all selected orders? This action cannot be undone.</p>
            <div className="flex gap-3"><button onClick={() => setShowBulkUpdate(false)} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>Cancel</button><button onClick={handleBulkDelete} className={`flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600`}>Delete All</button></div>
          </div>
        </div>
      )}
    </div>
  );
}