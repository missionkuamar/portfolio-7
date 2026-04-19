// pages/AdminAnalytics.jsx - Complete Analytics Dashboard
import React, { useState, useMemo } from 'react';
import { useApp } from '../App';
import { 
  TrendingUp, DollarSign, ShoppingCart, Users, Package, 
  Calendar, Download, Filter, ChevronDown, ChevronUp,
  BarChart3, LineChart, PieChart, Activity, Award,
  Target, Rocket, Zap, Crown, Gift, Star, Eye, Clock,
  RefreshCcw
} from 'lucide-react';
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

export default function AdminAnalytics() {
  const { theme } = useApp();
  const [dateRange, setDateRange] = useState('year');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Sample analytics data
  const analyticsData = {
    revenue: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      current: [3200, 4100, 4800, 5200, 6100, 7800, 8500, 9200, 10100, 11200, 12400, 13800],
      previous: [2800, 3500, 4200, 4800, 5500, 6800, 7500, 8200, 8900, 9800, 10800, 12000]
    },
    orders: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      current: [45, 52, 48, 61, 78, 92, 87, 95, 102, 115, 128, 142],
      previous: [38, 44, 42, 52, 65, 78, 74, 82, 88, 98, 108, 120]
    },
    customers: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      current: [12, 18, 15, 22, 28, 35, 32, 38, 42, 48, 55, 62],
      previous: [8, 12, 10, 15, 20, 25, 24, 28, 32, 36, 42, 48]
    }
  };

  const revenueData = {
    labels: analyticsData.revenue.labels,
    datasets: [
      {
        label: 'Current Year',
        data: analyticsData.revenue.current,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Previous Year',
        data: analyticsData.revenue.previous,
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const ordersData = {
    labels: analyticsData.orders.labels,
    datasets: [{
      label: 'Orders',
      data: analyticsData.orders.current,
      backgroundColor: 'rgba(139, 92, 246, 0.8)',
      borderRadius: 8,
    }]
  };

  const categoryData = {
    labels: ['Electronics', 'Fashion', 'Accessories', 'Home', 'Sports'],
    datasets: [{
      data: [45, 25, 15, 10, 5],
      backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'],
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: theme.textSecondary } },
      tooltip: { backgroundColor: theme.card, titleColor: theme.text, bodyColor: theme.textSecondary }
    }
  };

  const stats = [
    { label: 'Total Revenue', value: '$138,420', change: '+15.3%', icon: <DollarSign size={24} />, trend: 'up', color: 'from-green-500 to-emerald-500' },
    { label: 'Total Orders', value: '1,245', change: '+18.2%', icon: <ShoppingCart size={24} />, trend: 'up', color: 'from-blue-500 to-cyan-500' },
    { label: 'Average Order', value: '$111', change: '+2.5%', icon: <TrendingUp size={24} />, trend: 'up', color: 'from-purple-500 to-pink-500' },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.4%', icon: <Target size={24} />, trend: 'up', color: 'from-orange-500 to-red-500' },
    { label: 'Customer LTV', value: '$342', change: '+8.7%', icon: <Users size={24} />, trend: 'up', color: 'from-teal-500 to-cyan-500' },
    { label: 'Returning Rate', value: '42%', change: '+5.1%', icon: <RefreshCcw size={24} />, trend: 'up', color: 'from-indigo-500 to-blue-500' },
  ];

  const topProducts = [
    { name: 'Premium Headphones', sales: 342, revenue: 102258, growth: '+23%' },
    { name: 'Smart Watch Ultra', sales: 289, revenue: 144211, growth: '+18%' },
    { name: 'Wireless Earbuds', sales: 267, revenue: 42453, growth: '+31%' },
    { name: 'Gaming Mouse', sales: 234, revenue: 20826, growth: '+15%' },
    { name: 'Mechanical Keyboard', sales: 198, revenue: 37422, growth: '+27%' },
  ];

  const recentMetrics = [
    { metric: 'Page Views', value: '45,231', change: '+12.5%', icon: <Eye size={16} /> },
    { metric: 'Bounce Rate', value: '32.1%', change: '-3.2%', icon: <Activity size={16} /> },
    { metric: 'Session Duration', value: '4m 32s', change: '+45s', icon: <Clock size={16} /> },
    { metric: 'Cart Abandonment', value: '18.4%', change: '-2.1%', icon: <ShoppingCart size={16} /> },
  ];

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${theme.text}`}>
              <BarChart3 className="inline mr-3 mb-1" size={28} />
              Advanced Analytics
            </h1>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>Track your business performance and growth metrics</p>
          </div>
          <div className="flex gap-2">
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} 
              className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button className={`px-3 py-2 rounded-lg ${theme.cardHover} flex items-center gap-2 text-sm`}>
              <Download size={16} /> Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${theme.card} rounded-xl p-4 hover:shadow-xl transition-all`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-xs ${theme.textSecondary}`}>{stat.label}</p>
                <p className={`text-xl font-bold ${theme.text}`}>{stat.value}</p>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'} mt-1`}>
                  {stat.change} vs last period
                </p>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Trend */}
        <div className={`${theme.card} rounded-xl p-5`}>
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h3 className={`font-semibold ${theme.text}`}>Revenue Trend</h3>
            <div className="flex gap-2">
              <button onClick={() => setSelectedMetric('revenue')} className={`px-3 py-1 rounded-lg text-sm ${selectedMetric === 'revenue' ? theme.primary + ' text-white' : theme.cardHover}`}>Revenue</button>
              <button onClick={() => setSelectedMetric('orders')} className={`px-3 py-1 rounded-lg text-sm ${selectedMetric === 'orders' ? theme.primary + ' text-white' : theme.cardHover}`}>Orders</button>
            </div>
          </div>
          <div className="h-80">
            <Line data={selectedMetric === 'revenue' ? revenueData : ordersData} options={chartOptions} />
          </div>
        </div>

        {/* Category Distribution */}
        <div className={`${theme.card} rounded-xl p-5`}>
          <h3 className={`font-semibold mb-4 ${theme.text}`}>Revenue by Category</h3>
          <div className="h-80">
            <Doughnut data={categoryData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className={`${theme.card} rounded-xl overflow-hidden mb-6`}>
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className={`font-semibold ${theme.text}`}>Top Performing Products</h3>
          <button className={`text-sm text-blue-500`}>View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${theme.border} border-b`}>
              <tr className={`text-left text-sm ${theme.textSecondary}`}>
                <th className="p-4">Product</th>
                <th className="p-4">Units Sold</th>
                <th className="p-4">Revenue</th>
                <th className="p-4">Growth</th>
               </tr>
            </thead>
            <tbody>
              {topProducts.map((product, idx) => (
                <tr key={idx} className={`border-b ${theme.border} hover:bg-white/5`}>
                  <td className={`p-4 font-medium ${theme.text}`}>{product.name}</td>
                  <td className={`p-4 ${theme.textSecondary}`}>{product.sales}</td>
                  <td className={`p-4 font-semibold ${theme.text}`}>${product.revenue.toLocaleString()}</td>
                  <td className="p-4"><span className="text-green-500">{product.growth}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentMetrics.map((metric, idx) => (
          <div key={idx} className={`${theme.card} rounded-xl p-4`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${theme.cardHover} flex items-center justify-center`}>
                {metric.icon}
              </div>
              <div>
                <p className={`text-xs ${theme.textSecondary}`}>{metric.metric}</p>
                <p className={`text-lg font-bold ${theme.text}`}>{metric.value}</p>
                <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{metric.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}