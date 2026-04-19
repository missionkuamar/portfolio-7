// pages/AdminDashboard.jsx - Complete Fixed & Ultra Advanced Version
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FaStore } from "react-icons/fa";
import { useApp } from '../App';
import { 
  BarChart3, Users, Package, DollarSign, TrendingUp, Settings, 
  Bell, FileText, ShoppingCart, Tag, Truck, Star, MessageCircle,
  Calendar, Clock, Download, Filter, Search, Plus, Edit, Trash2,
  Eye, ChevronDown, ChevronUp, X, Check, AlertCircle, RefreshCw,
  PieChart, LineChart, Activity, CreditCard, Gift, Award, Shield,
  Mail, Phone, MapPin, Globe, LogOut, Menu, Home, ShoppingBag, 
  Heart, User, HelpCircle, Grid3x3, List, Maximize2, Minimize2,
  Printer, Copy, CheckCircle, XCircle, AlertTriangle, Info
} from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { toast, Toaster } from 'react-hot-toast';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

export default function AdminDashboard() {
  const { theme, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('week');
  const [isLoading, setIsLoading] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample notifications
  const notifications = [
    { id: 1, title: 'New Order Received', message: 'Order #ORD-006 from John Doe', time: '2 min ago', read: false, type: 'order' },
    { id: 2, title: 'Product Out of Stock', message: 'Designer Bag is out of stock', time: '1 hour ago', read: false, type: 'alert' },
    { id: 3, title: 'Customer Review', message: 'New 5-star review on Premium Headphones', time: '3 hours ago', read: true, type: 'review' },
  ];

  // Shop data
  const shopData = {
    name: currentUser?.shopName || 'Mujah Fashion Store',
    owner: currentUser?.name || 'Admin User',
    email: 'admin@mujahstore.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Street, New York, NY 10001',
    established: '2020',
    rating: 4.8,
    totalSales: 12450,
    totalOrders: 342,
    totalProducts: 128,
    totalCustomers: 2847,
    revenue: 48290,
    growth: 23,
    pendingOrders: 23,
    completedOrders: 289,
    cancelledOrders: 30
  };

  // Products data
  const [products, setProducts] = useState([
    { id: 1, name: 'Premium Headphones', price: 299, stock: 45, category: 'Electronics', status: 'Active', sales: 234, image: '🎧', rating: 4.8, reviews: 128, createdAt: '2024-01-10' },
    { id: 2, name: 'Smart Watch Ultra', price: 499, stock: 23, category: 'Electronics', status: 'Active', sales: 156, image: '⌚', rating: 4.9, reviews: 89, createdAt: '2024-01-05' },
    { id: 3, name: 'Designer Backpack', price: 129, stock: 0, category: 'Fashion', status: 'Out of Stock', sales: 89, image: '🎒', rating: 4.7, reviews: 56, createdAt: '2024-01-12' },
    { id: 4, name: 'USB-C Hub Pro', price: 79, stock: 56, category: 'Accessories', status: 'Active', sales: 345, image: '🔌', rating: 4.6, reviews: 234, createdAt: '2024-01-08' },
    { id: 5, name: 'Mechanical Keyboard', price: 189, stock: 12, category: 'Electronics', status: 'Low Stock', sales: 167, image: '⌨️', rating: 4.8, reviews: 98, createdAt: '2024-01-03' },
    { id: 6, name: 'Gaming Mouse X', price: 89, stock: 34, category: 'Electronics', status: 'Active', sales: 278, image: '🖱️', rating: 4.7, reviews: 167, createdAt: '2024-01-15' },
    { id: 7, name: 'Wireless Earbuds', price: 159, stock: 45, category: 'Electronics', status: 'Active', sales: 423, image: '🎧', rating: 4.8, reviews: 245, createdAt: '2024-01-18' },
    { id: 8, name: 'Smart Home Hub', price: 199, stock: 8, category: 'Smart Home', status: 'Low Stock', sales: 98, image: '🏠', rating: 4.5, reviews: 67, createdAt: '2024-01-20' },
  ]);

  // Orders data
  const [orders, setOrders] = useState([
    { id: '#ORD-001', customer: 'John Doe', amount: 299, status: 'Delivered', date: '2024-01-15', payment: 'Card', items: 2, tracking: 'TRK123456' },
    { id: '#ORD-002', customer: 'Jane Smith', amount: 499, status: 'Processing', date: '2024-01-16', payment: 'PayPal', items: 3, tracking: null },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: 129, status: 'Shipped', date: '2024-01-14', payment: 'Card', items: 1, tracking: 'TRK123457' },
    { id: '#ORD-004', customer: 'Sarah Wilson', amount: 89, status: 'Pending', date: '2024-01-17', payment: 'Cash', items: 1, tracking: null },
    { id: '#ORD-005', customer: 'David Lee', amount: 599, status: 'Delivered', date: '2024-01-13', payment: 'Card', items: 4, tracking: 'TRK123458' },
    { id: '#ORD-006', customer: 'Emma Brown', amount: 349, status: 'Processing', date: '2024-01-18', payment: 'PayPal', items: 2, tracking: null },
    { id: '#ORD-007', customer: 'James Wilson', amount: 199, status: 'Shipped', date: '2024-01-12', payment: 'Card', items: 1, tracking: 'TRK123459' },
  ]);

  // Customers data
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8900', orders: 12, spent: 1249, status: 'Active', joinDate: '2023-01-15', lastOrder: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234-567-8901', orders: 8, spent: 899, status: 'Active', joinDate: '2023-02-20', lastOrder: '2024-01-16' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 234-567-8902', orders: 5, spent: 549, status: 'Inactive', joinDate: '2023-03-10', lastOrder: '2023-12-01' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1 234-567-8903', orders: 15, spent: 1899, status: 'Active', joinDate: '2022-12-01', lastOrder: '2024-01-17' },
    { id: 5, name: 'David Lee', email: 'david@example.com', phone: '+1 234-567-8904', orders: 7, spent: 899, status: 'Active', joinDate: '2023-05-15', lastOrder: '2024-01-13' },
  ]);

  // Chart data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Revenue 2024',
      data: [3200, 4100, 4800, 5200, 6100, 7800, 8500, 9200, 10100, 11200, 12400, 13800],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(59, 130, 246)',
      pointBorderColor: '#fff',
      pointHoverRadius: 8,
    }]
  };

  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Sales',
      data: [45, 52, 48, 61, 78, 92, 67],
      backgroundColor: 'rgba(139, 92, 246, 0.8)',
      borderRadius: 8,
      barPercentage: 0.7,
    }]
  };

  const categoryData = {
    labels: ['Electronics', 'Fashion', 'Accessories', 'Smart Home', 'Others'],
    datasets: [{
      data: [45, 25, 15, 10, 5],
      backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'],
      borderWidth: 0,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: theme.textSecondary, font: { size: 11 } } },
      tooltip: { backgroundColor: theme.card, titleColor: theme.text, bodyColor: theme.textSecondary }
    }
  };

  // Filter functions
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const filteredOrders = useMemo(() => {
    let filtered = orders;
    if (orderStatusFilter !== 'all') {
      filtered = filtered.filter(o => o.status.toLowerCase() === orderStatusFilter.toLowerCase());
    }
    if (searchTerm) {
      filtered = filtered.filter(o => 
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [orders, searchTerm, orderStatusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Helper functions
  const getStatusColor = (status) => {
    const colors = {
      'Delivered': 'bg-green-500/20 text-green-600 dark:text-green-400',
      'Processing': 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
      'Shipped': 'bg-purple-500/20 text-purple-600 dark:text-purple-400',
      'Pending': 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
      'Active': 'bg-green-500/20 text-green-600 dark:text-green-400',
      'Inactive': 'bg-gray-500/20 text-gray-600 dark:text-gray-400',
      'Low Stock': 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
      'Out of Stock': 'bg-red-500/20 text-red-600 dark:text-red-400',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
    setShowDeleteConfirm(null);
    toast.success('Product deleted successfully!');
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={20} />, description: 'Dashboard Home' },
    { id: 'products', label: 'Products', icon: <Package size={20} />, description: 'Manage Inventory', badge: products.length },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={20} />, description: 'Track Orders', badge: shopData.pendingOrders },
    { id: 'customers', label: 'Customers', icon: <Users size={20} />, description: 'Customer List', badge: customers.length },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={20} />, description: 'Sales Reports' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, description: 'Store Config' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Toaster position="top-right" />
      
      {/* Overlay for mobile */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative z-50 transition-all duration-300
        ${sidebarOpen ? 'w-72' : 'w-20'} 
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${theme.card} border-r ${theme.border} h-full overflow-y-auto
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-inherit z-10">
          <div className={`flex items-center gap-2 ${!sidebarOpen && 'justify-center w-full'}`}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <FaStore size={16} className="text-white" />
            </div>
            {sidebarOpen && <span className={`text-xl font-bold ${theme.text}`}>Shop Panel</span>}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-1.5 rounded-lg ${theme.cardHover} ${!sidebarOpen && 'hidden'}`}>
            <Minimize2 size={18} />
          </button>
        </div>
        
        {/* Shop Info */}
        <div className="p-4">
          {sidebarOpen && (
            <div className={`${theme.cardHover} rounded-xl p-4 mb-6 text-center border ${theme.border}`}>
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-3 shadow-lg">
                {shopData.owner.charAt(0)}
              </div>
              <h3 className={`font-bold ${theme.text} text-lg`}>{shopData.name}</h3>
              <p className={`text-sm ${theme.textSecondary}`}>{shopData.owner}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <Star size={14} className="text-yellow-500 fill-yellow-500/50" />
                <span className={`text-sm ml-1 ${theme.text}`}>{shopData.rating}</span>
              </div>
            </div>
          )}
          
          {/* Navigation */}
          <nav className="space-y-1">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                  activeTab === item.id 
                    ? `${theme.primary} text-white shadow-md` 
                    : `${theme.textSecondary} hover:${theme.cardHover}`
                }`}
              >
                <div className="relative">
                  {item.icon}
                  {item.badge > 0 && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                {sidebarOpen && (
                  <>
                    <div className="flex-1 text-left">
                      <span className="text-sm font-medium">{item.label}</span>
                      <p className={`text-xs opacity-75 ${activeTab === item.id ? 'text-white' : ''}`}>{item.description}</p>
                    </div>
                    {activeTab === item.id && <Check size={16} />}
                  </>
                )}
              </button>
            ))}
          </nav>
          
          {/* Footer Actions */}
          {sidebarOpen && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
              <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${theme.textSecondary} hover:${theme.cardHover} transition-all`}>
                <HelpCircle size={20} /> <span className="text-sm">Help & Support</span>
              </button>
              <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${theme.textSecondary} hover:${theme.cardHover} transition-all`}>
                <LogOut size={20} /> <span className="text-sm">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-x-hidden">
        {/* Header */}
        <div className={`sticky top-0 z-30 ${theme.card} border-b ${theme.border} px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center gap-3`}>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden p-2 rounded-lg ${theme.cardHover}">
              <Menu size={20} />
            </button>
            <div>
              <h1 className={`text-lg sm:text-xl font-bold ${theme.text}`}>Welcome back, {shopData.owner}!</h1>
              <p className={`text-xs ${theme.textSecondary} hidden sm:block`}>Here's what's happening with your shop today</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className={`p-2 rounded-lg ${theme.cardHover} relative`}>
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-80 ${theme.card} rounded-xl shadow-2xl border ${theme.border} z-50 overflow-hidden`}>
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className={`font-semibold ${theme.text}`}>Notifications</h3>
                    <button className="text-xs text-blue-500">Mark all read</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-white/5 cursor-pointer ${!notif.read ? 'bg-blue-500/5' : ''}`}>
                        <p className={`text-sm font-medium ${theme.text}`}>{notif.title}</p>
                        <p className={`text-xs ${theme.textSecondary} mt-1`}>{notif.message}</p>
                        <p className={`text-xs ${theme.textSecondary} mt-1 opacity-60`}>{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm`}>
              {shopData.owner.charAt(0)}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Revenue', value: `$${shopData.revenue.toLocaleString()}`, icon: <DollarSign size={24} />, change: '+23%', color: 'from-green-500 to-emerald-500', trend: 'up' },
                  { label: 'Total Orders', value: shopData.totalOrders, icon: <ShoppingCart size={24} />, change: '+18%', color: 'from-blue-500 to-cyan-500', trend: 'up' },
                  { label: 'Products', value: shopData.totalProducts, icon: <Package size={24} />, change: '+12', color: 'from-purple-500 to-pink-500', trend: 'up' },
                  { label: 'Customers', value: shopData.totalCustomers.toLocaleString(), icon: <Users size={24} />, change: '+15%', color: 'from-orange-500 to-red-500', trend: 'up' },
                ].map((stat, idx) => (
                  <div key={idx} className={`${theme.card} rounded-xl p-4 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-xs sm:text-sm ${theme.textSecondary} mb-1`}>{stat.label}</p>
                        <p className={`text-xl sm:text-2xl font-bold ${theme.text}`}>{stat.value}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <TrendingUp size={12} className="text-green-500" />
                          <span className="text-xs text-green-500">{stat.change}</span>
                          <span className={`text-xs ${theme.textSecondary}`}>vs last month</span>
                        </div>
                      </div>
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className={`${theme.card} rounded-xl p-3 text-center`}>
                  <p className={`text-xs ${theme.textSecondary}`}>Pending Orders</p>
                  <p className={`text-xl font-bold text-yellow-500`}>{shopData.pendingOrders}</p>
                </div>
                <div className={`${theme.card} rounded-xl p-3 text-center`}>
                  <p className={`text-xs ${theme.textSecondary}`}>Completed</p>
                  <p className={`text-xl font-bold text-green-500`}>{shopData.completedOrders}</p>
                </div>
                <div className={`${theme.card} rounded-xl p-3 text-center`}>
                  <p className={`text-xs ${theme.textSecondary}`}>Cancelled</p>
                  <p className={`text-xl font-bold text-red-500`}>{shopData.cancelledOrders}</p>
                </div>
                <div className={`${theme.card} rounded-xl p-3 text-center`}>
                  <p className={`text-xs ${theme.textSecondary}`}>Avg Order Value</p>
                  <p className={`text-xl font-bold ${theme.text}`}>${Math.round(shopData.revenue / shopData.totalOrders)}</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`${theme.card} rounded-xl p-4 sm:p-5`}>
                  <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                    <h3 className={`font-semibold ${theme.text}`}>Revenue Trend 2024</h3>
                    <select className={`text-xs px-2 py-1 rounded-lg border ${theme.border} ${theme.card}`}>
                      <option>Yearly</option><option>Monthly</option><option>Weekly</option>
                    </select>
                  </div>
                  <div className="h-64"><Line data={revenueData} options={chartOptions} /></div>
                </div>
                <div className={`${theme.card} rounded-xl p-4 sm:p-5`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`font-semibold ${theme.text}`}>Weekly Sales</h3>
                    <Download size={16} className={`${theme.textSecondary} cursor-pointer`} />
                  </div>
                  <div className="h-64"><Bar data={salesData} options={chartOptions} /></div>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className={`${theme.card} rounded-xl overflow-hidden`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-wrap gap-2">
                  <h3 className={`font-semibold ${theme.text}`}>Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className={`text-sm text-blue-500 hover:text-blue-600`}>View All Orders →</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className={`${theme.border} border-b`}>
                      <tr className={`text-left text-xs sm:text-sm ${theme.textSecondary}`}>
                        <th className="p-3 sm:p-4">Order ID</th><th className="p-3 sm:p-4">Customer</th><th className="p-3 sm:p-4">Amount</th><th className="p-3 sm:p-4">Status</th><th className="p-3 sm:p-4">Date</th><th className="p-3 sm:p-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                          <td className={`p-3 sm:p-4 font-mono text-xs sm:text-sm ${theme.text}`}>{order.id}</td>
                          <td className={`p-3 sm:p-4 text-sm ${theme.text}`}>{order.customer}</td>
                          <td className={`p-3 sm:p-4 font-semibold text-sm ${theme.text}`}>${order.amount}</td>
                          <td className="p-3 sm:p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>{order.status}</span></td>
                          <td className={`p-3 sm:p-4 text-xs sm:text-sm ${theme.textSecondary}`}>{order.date}</td>
                          <td className="p-3 sm:p-4"><button className="p-1 rounded hover:bg-white/10"><Eye size={16} /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className={`text-2xl font-bold ${theme.text}`}>Products Management</h2>
                <div className="flex gap-2">
                  <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className={`p-2 rounded-lg ${theme.cardHover}`}>
                    {viewMode === 'grid' ? <List size={18} /> : <Grid3x3 size={18} />}
                  </button>
                  <button onClick={() => setShowAddProduct(true)} className={`${theme.primary} text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm`}>
                    <Plus size={18} /> Add Product
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} size={18} />
                  <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                </div>
                <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} 
                  className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
                  <option value={5}>Show 5</option><option value={10}>Show 10</option><option value={20}>Show 20</option>
                </select>
              </div>
              
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {paginatedProducts.map(product => (
                    <div key={product.id} className={`${theme.card} rounded-xl overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 border ${theme.border}`}>
                      <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-5xl">
                        {product.image}
                        {product.stock <= 5 && product.stock > 0 && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">Low Stock</div>
                        )}
                        {product.stock === 0 && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">Out of Stock</div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className={`font-semibold ${theme.text} mb-1 line-clamp-1`}>{product.name}</h3>
                        <p className={`text-xs ${theme.textSecondary} mb-2`}>{product.category}</p>
                        <div className="flex justify-between items-center mb-3">
                          <span className={`text-xl font-bold text-blue-500`}>${product.price}</span>
                          <div className="flex items-center gap-1">
                            <Star size={12} className="text-yellow-500 fill-yellow-500" />
                            <span className={`text-xs ${theme.textSecondary}`}>{product.rating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs mb-3">
                          <span className={theme.textSecondary}>Stock: {product.stock}</span>
                          <span className={theme.textSecondary}>Sales: {product.sales}</span>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setShowEditProduct(product)} className="flex-1 py-1.5 rounded-lg border border-blue-500 text-blue-500 text-sm hover:bg-blue-500/10 transition-all">Edit</button>
                          <button onClick={() => setShowDeleteConfirm(product.id)} className="flex-1 py-1.5 rounded-lg border border-red-500 text-red-500 text-sm hover:bg-red-500/10 transition-all">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`${theme.card} rounded-xl overflow-hidden`}>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                      <thead className={`${theme.border} border-b`}>
                        <tr className={`text-left text-xs sm:text-sm ${theme.textSecondary}`}>
                          <th className="p-3">Product</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Stock</th><th className="p-3">Sales</th><th className="p-3">Rating</th><th className="p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedProducts.map(product => (
                          <tr key={product.id} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                            <td className="p-3"><div className="flex items-center gap-2"><span className="text-2xl">{product.image}</span><span className={`font-semibold ${theme.text}`}>{product.name}</span></div></td>
                            <td className={`p-3 text-sm ${theme.textSecondary}`}>{product.category}</td>
                            <td className={`p-3 font-semibold ${theme.text}`}>${product.price}</td>
                            <td className={`p-3 text-sm ${product.stock === 0 ? 'text-red-500' : theme.text}`}>{product.stock}</td>
                            <td className={`p-3 text-sm ${theme.textSecondary}`}>{product.sales}</td>
                            <td className="p-3"><div className="flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /><span className={`text-sm ${theme.text}`}>{product.rating}</span></div></td>
                            <td className="p-3"><div className="flex gap-2"><button onClick={() => setShowEditProduct(product)} className="p-1 rounded hover:bg-white/10"><Edit size={16} /></button><button onClick={() => setShowDeleteConfirm(product.id)} className="p-1 rounded hover:bg-white/10"><Trash2 size={16} className="text-red-500" /></button></div></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 flex-wrap">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? 'opacity-50' : theme.cardHover}`}><ChevronLeft size={20} /></button>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5 && currentPage > 3) {
                      pageNum = currentPage - 3 + i;
                      if (pageNum > totalPages) return null;
                    }
                    if (totalPages > 5 && pageNum > 5 && currentPage <= 3) pageNum = i + 1;
                    return pageNum <= totalPages && (
                      <button key={i} onClick={() => setCurrentPage(pageNum)} className={`px-4 py-2 rounded-lg ${currentPage === pageNum ? theme.primary + ' text-white' : theme.cardHover}`}>{pageNum}</button>
                    );
                  })}
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className={`p-2 rounded-lg ${currentPage === totalPages ? 'opacity-50' : theme.cardHover}`}><ChevronRight size={20} /></button>
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className={`text-2xl font-bold ${theme.text}`}>Order Management</h2>
                <div className="flex gap-3 flex-wrap">
                  <select value={orderStatusFilter} onChange={(e) => setOrderStatusFilter(e.target.value)} className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
                    <option value="all">All Status</option><option value="pending">Pending</option><option value="processing">Processing</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option>
                  </select>
                  <button className={`px-3 py-2 rounded-lg ${theme.cardHover} flex items-center gap-2 text-sm`}><Download size={16} /> Export</button>
                </div>
              </div>
              
              <div className={`${theme.card} rounded-xl overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px]">
                    <thead className={`${theme.border} border-b`}>
                      <tr className={`text-left text-xs sm:text-sm ${theme.textSecondary}`}>
                        <th className="p-3 sm:p-4">Order ID</th><th className="p-3 sm:p-4">Customer</th><th className="p-3 sm:p-4">Items</th><th className="p-3 sm:p-4">Amount</th><th className="p-3 sm:p-4">Payment</th><th className="p-3 sm:p-4">Status</th><th className="p-3 sm:p-4">Date</th><th className="p-3 sm:p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map(order => (
                        <tr key={order.id} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                          <td className={`p-3 sm:p-4 font-mono text-xs sm:text-sm ${theme.text}`}>{order.id}</td>
                          <td className={`p-3 sm:p-4 text-sm ${theme.text}`}>{order.customer}</td>
                          <td className={`p-3 sm:p-4 text-sm ${theme.textSecondary}`}>{order.items}</td>
                          <td className={`p-3 sm:p-4 font-semibold text-sm ${theme.text}`}>${order.amount}</td>
                          <td className={`p-3 sm:p-4 text-sm ${theme.textSecondary}`}>{order.payment}</td>
                          <td className="p-3 sm:p-4">
                            <select value={order.status} onChange={(e) => handleUpdateStatus(order.id, e.target.value)} className={`px-2 py-1 rounded-lg text-xs font-semibold ${getStatusColor(order.status)} border-none focus:outline-none`}>
                              <option value="Pending">Pending</option><option value="Processing">Processing</option><option value="Shipped">Shipped</option><option value="Delivered">Delivered</option>
                            </select>
                          </td>
                          <td className={`p-3 sm:p-4 text-xs sm:text-sm ${theme.textSecondary}`}>{order.date}</td>
                          <td className="p-3 sm:p-4"><button className="p-1 rounded hover:bg-white/10"><Eye size={16} /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <h2 className={`text-2xl font-bold ${theme.text}`}>Customer Management</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {customers.map(customer => (
                  <div key={customer.id} className={`${theme.card} rounded-xl p-4 hover:shadow-xl transition-all transform hover:-translate-y-1 border ${theme.border}`}>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">{customer.name.charAt(0)}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold ${theme.text} truncate`}>{customer.name}</h3>
                        <p className={`text-xs ${theme.textSecondary} truncate`}>{customer.email}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className={`text-xs ${theme.textSecondary}`}>Orders: {customer.orders}</span>
                          <span className={`text-xs font-semibold ${theme.text}`}>${customer.spent}</span>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(customer.status)}`}>{customer.status}</span>
                          <span className={`text-xs ${theme.textSecondary}`}>Since {customer.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className={`text-2xl font-bold ${theme.text}`}>Advanced Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`${theme.card} rounded-xl p-5`}>
                  <h3 className={`font-semibold mb-4 ${theme.text}`}>Revenue by Category</h3>
                  <div className="h-64"><Doughnut data={categoryData} options={chartOptions} /></div>
                </div>
                <div className={`${theme.card} rounded-xl p-5`}>
                  <h3 className={`font-semibold mb-4 ${theme.text}`}>Top Performing Products</h3>
                  <div className="space-y-3">
                    {products.slice(0, 5).map(p => (
                      <div key={p.id} className="flex justify-between items-center">
                        <span className={`text-sm ${theme.text}`}>{p.name}</span>
                        <div className="flex items-center gap-2 flex-1 max-w-[200px]">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(p.sales / 500) * 100}%` }}></div>
                          </div>
                          <span className={`text-xs ${theme.textSecondary}`}>${p.sales * p.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className={`text-2xl font-bold ${theme.text}`}>Shop Settings</h2>
              <div className={`${theme.card} rounded-xl p-6 max-w-3xl`}>
                <div className="space-y-5">
                  <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Shop Name</label><input type="text" defaultValue={shopData.name} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} /></div>
                  <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Owner Name</label><input type="text" defaultValue={shopData.owner} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} /></div>
                  <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Email Address</label><input type="email" defaultValue={shopData.email} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} /></div>
                  <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Phone Number</label><input type="tel" defaultValue={shopData.phone} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} /></div>
                  <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Business Address</label><textarea defaultValue={shopData.address} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} rows={3}></textarea></div>
                  <div className="flex justify-end"><button className={`${theme.primary} text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all`}>Save Changes</button></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteConfirm(null)}>
          <div className={`${theme.card} rounded-xl max-w-md w-full p-6`} onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
              <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>Delete Product</h3>
              <p className={`${theme.textSecondary} mb-6`}>Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex gap-3"><button onClick={() => setShowDeleteConfirm(null)} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>Cancel</button><button onClick={() => handleDeleteProduct(showDeleteConfirm)} className={`flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600`}>Delete</button></div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {(showAddProduct || showEditProduct) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => { setShowAddProduct(false); setShowEditProduct(null); }}>
          <div className={`${theme.card} rounded-xl max-w-md w-full p-6`} onClick={(e) => e.stopPropagation()}>
            <h3 className={`text-xl font-bold mb-4 ${theme.text}`}>{showEditProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <div className="space-y-4"><input type="text" placeholder="Product Name" className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /><input type="number" placeholder="Price" className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /><input type="number" placeholder="Stock" className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /><select className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}><option>Electronics</option><option>Fashion</option><option>Accessories</option></select><div className="flex gap-3"><button onClick={() => { setShowAddProduct(false); setShowEditProduct(null); }} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>Cancel</button><button className={`flex-1 px-4 py-2 rounded-lg ${theme.primary} text-white`}>{showEditProduct ? 'Update' : 'Add'} Product</button></div></div>
          </div>
        </div>
      )}
    </div>
  );
}