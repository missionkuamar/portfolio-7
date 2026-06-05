// pages/AdminDashboard.jsx - Simplified using components
import React, { useState } from 'react';
import { useApp } from '../App';
import { Toaster } from 'react-hot-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import OverviewTab from '../components/admin/OverviewTab';
import ProductsTab from '../components/admin/ProductsTab';
import OrdersTab from '../components/admin/OrdersTab';
import CustomersTab from '../components/admin/CustomersTab';
import AnalyticsTab from '../components/admin/AnalyticsTab';
import SettingsTab from '../components/admin/SettingsTab';

export default function AdminDashboard() {
  const { theme, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([
    { id: '#ORD-001', customer: 'John Doe', amount: 299, status: 'Delivered', date: '2024-01-15', payment: 'Card', items: 2 },
    { id: '#ORD-002', customer: 'Jane Smith', amount: 499, status: 'Processing', date: '2024-01-16', payment: 'PayPal', items: 3 },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: 129, status: 'Shipped', date: '2024-01-14', payment: 'Card', items: 1 },
    { id: '#ORD-004', customer: 'Sarah Wilson', amount: 89, status: 'Pending', date: '2024-01-17', payment: 'PayPal', items: 1 },
    { id: '#ORD-005', customer: 'David Lee', amount: 599, status: 'Delivered', date: '2024-01-13', payment: 'Card', items: 4 },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Premium Headphones', price: 299, stock: 45, category: 'Electronics', status: 'Active', sales: 234, image: '🎧', rating: 4.8 },
    { id: 2, name: 'Smart Watch Ultra', price: 499, stock: 23, category: 'Electronics', status: 'Active', sales: 156, image: '⌚', rating: 4.9 },
    { id: 3, name: 'Designer Backpack', price: 129, stock: 0, category: 'Fashion', status: 'Out of Stock', sales: 89, image: '🎒', rating: 4.7 },
  ]);

  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8900', orders: 12, spent: 1249, status: 'Active', joinDate: '2023-01-15', lastOrder: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234-567-8901', orders: 8, spent: 899, status: 'Active', joinDate: '2023-02-20', lastOrder: '2024-01-16' },
  ];

  const shopData = {
    name: currentUser?.shopName || 'Mujah Fashion Store',
    owner: currentUser?.name || 'Admin User',
    revenue: 48290,
    totalOrders: 342,
    totalProducts: 128,
    totalCustomers: 2847,
    rating: 4.8,
    pendingOrders: 23,
    completedOrders: 289,
    cancelledOrders: 30
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={20} />, description: 'Dashboard Home', badge: 0 },
    { id: 'products', label: 'Products', icon: <Package size={20} />, description: 'Manage Inventory', badge: products.length },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={20} />, description: 'Track Orders', badge: shopData.pendingOrders },
    { id: 'customers', label: 'Customers', icon: <Users size={20} />, description: 'Customer List', badge: customers.length },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={20} />, description: 'Sales Reports', badge: 0 },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, description: 'Store Config', badge: 0 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Toaster position="top-right" />
      
      <AdminSidebar theme={theme} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} 
        activeTab={activeTab} setActiveTab={setActiveTab} menuItems={menuItems} 
        shopData={shopData} mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} />
      
      <div className="flex-1 min-w-0 overflow-x-hidden">
        <AdminHeader theme={theme} shopData={shopData} notificationCount={3} setMobileSidebarOpen={setMobileSidebarOpen} />
        
        <div className="p-4 sm:p-6">
          {activeTab === 'overview' && <OverviewTab theme={theme} shopData={shopData} orders={orders} setOrders={setOrders} setActiveTab={setActiveTab} />}
          {activeTab === 'products' && <ProductsTab theme={theme} products={products} setProducts={setProducts} />}
          {activeTab === 'orders' && <OrdersTab theme={theme} orders={orders} setOrders={setOrders} />}
          {activeTab === 'customers' && <CustomersTab theme={theme} customers={customers} />}
          {activeTab === 'analytics' && <AnalyticsTab theme={theme} />}
          {activeTab === 'settings' && <SettingsTab theme={theme} shopData={shopData} />}
        </div>
      </div>
    </div>
  );
}

// Import missing icons
import { BarChart3, Package, ShoppingCart, Users, TrendingUp, Settings } from 'lucide-react';