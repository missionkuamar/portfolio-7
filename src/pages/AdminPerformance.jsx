// pages/AdminPerformance.jsx - Complete Shop Performance Dashboard
import React, { useState } from 'react';
import { useApp } from '../App';
import { 
  TrendingUp, DollarSign, ShoppingCart, Users, Package, 
  Star, Award, Crown, Target, Rocket, Zap, Clock,
  Calendar, Download, Filter, ChevronDown, ChevronUp,
  BarChart3, LineChart, PieChart, Activity, Smartphone,
  Monitor, Watch, Headphones, Gift, Heart, Share2,
  Eye, ThumbsUp, MessageCircle, Repeat, Truck, Shield
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

export default function AdminPerformance() {
  const { theme } = useApp();
  const [dateRange, setDateRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('sales');

  // Generate dynamic data based on date range
  const getData = () => {
    switch(dateRange) {
      case 'week':
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          sales: [12500, 14800, 16200, 18900, 21000, 19800, 17600],
          orders: [145, 168, 182, 210, 234, 218, 198],
          visitors: [2800, 3100, 3400, 3800, 4200, 4500, 3900]
        };
      case 'month':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          sales: [45200, 48900, 52300, 58700],
          orders: [520, 560, 610, 680],
          visitors: [12000, 13500, 14800, 16200]
        };
      case 'quarter':
        return {
          labels: ['Jan', 'Feb', 'Mar'],
          sales: [45200, 48900, 52300],
          orders: [520, 560, 610],
          visitors: [12000, 13500, 14800]
        };
      default:
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          sales: [32000, 41000, 48000, 52000, 61000, 78000, 85000, 92000, 101000, 112000, 124000, 138000],
          orders: [345, 412, 468, 532, 618, 789, 867, 945, 1023, 1156, 1289, 1423],
          visitors: [8234, 9156, 10234, 11567, 12987, 14567, 16234, 17890, 19567, 21345, 23123, 25456]
        };
    }
  };

  const data = getData();

  // Chart configurations
  const salesChartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Sales ($)',
        data: data.sales,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverRadius: 8,
      },
      {
        label: 'Target',
        data: data.sales.map(v => v * 1.1),
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
      }
    ]
  };

  const ordersChartData = {
    labels: data.labels,
    datasets: [{
      label: 'Orders',
      data: data.orders,
      backgroundColor: 'rgba(139, 92, 246, 0.8)',
      borderRadius: 8,
    }]
  };

  const categoryData = {
    labels: ['Electronics', 'Fashion', 'Accessories', 'Home & Living', 'Sports'],
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

  // KPI Cards Data
  const kpis = [
    { label: 'Total Revenue', value: '$138,420', target: '$125,000', achievement: '111%', icon: <DollarSign size={24} />, trend: '+15.3%', color: 'from-green-500 to-emerald-500' },
    { label: 'Total Orders', value: '1,245', target: '1,100', achievement: '113%', icon: <ShoppingCart size={24} />, trend: '+18.2%', color: 'from-blue-500 to-cyan-500' },
    { label: 'Conversion Rate', value: '3.8%', target: '3.5%', achievement: '109%', icon: <Target size={24} />, trend: '+0.3%', color: 'from-purple-500 to-pink-500' },
    { label: 'Customer Satisfaction', value: '4.8/5', target: '4.5', achievement: '107%', icon: <Star size={24} />, trend: '+0.2', color: 'from-yellow-500 to-orange-500' },
    { label: 'Avg Order Value', value: '$111', target: '$105', achievement: '106%', icon: <TrendingUp size={24} />, trend: '+5.7%', color: 'from-teal-500 to-cyan-500' },
    { label: 'Return Rate', value: '2.1%', target: '3.0%', achievement: '130%', icon: <Repeat size={24} />, trend: '-0.5%', color: 'from-red-500 to-rose-500' },
  ];

  // Top Products
  const topProducts = [
    { name: 'Premium Headphones', sales: 342, revenue: 102258, growth: '+23%', rating: 4.8, stock: 45, status: 'Excellent' },
    { name: 'Smart Watch Ultra', sales: 289, revenue: 144211, growth: '+18%', rating: 4.9, stock: 23, status: 'Excellent' },
    { name: 'Wireless Earbuds', sales: 267, revenue: 42453, growth: '+31%', rating: 4.7, stock: 45, status: 'Excellent' },
    { name: 'Gaming Mouse', sales: 234, revenue: 20826, growth: '+15%', rating: 4.6, stock: 34, status: 'Good' },
    { name: 'Mechanical Keyboard', sales: 198, revenue: 37422, growth: '+27%', rating: 4.8, stock: 12, status: 'Low Stock' },
  ];

  // Daily Performance
  const dailyPerformance = [
    { day: 'Monday', sales: 18450, orders: 198, conversion: 3.2, visitors: 6187 },
    { day: 'Tuesday', sales: 19200, orders: 205, conversion: 3.4, visitors: 6029 },
    { day: 'Wednesday', sales: 20100, orders: 218, conversion: 3.6, visitors: 6056 },
    { day: 'Thursday', sales: 21200, orders: 228, conversion: 3.8, visitors: 6000 },
    { day: 'Friday', sales: 23500, orders: 245, conversion: 4.1, visitors: 5976 },
    { day: 'Saturday', sales: 18900, orders: 198, conversion: 3.3, visitors: 6000 },
    { day: 'Sunday', sales: 17800, orders: 185, conversion: 3.0, visitors: 6167 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Excellent': return 'bg-green-500/20 text-green-600';
      case 'Good': return 'bg-blue-500/20 text-blue-600';
      case 'Low Stock': return 'bg-orange-500/20 text-orange-600';
      default: return 'bg-gray-500/20 text-gray-600';
    }
  };

  const handleExportReport = () => {
    toast.success('Performance report exported successfully!');
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${theme.text}`}>
              <Activity className="inline mr-3 mb-1" size={28} />
              Shop Performance
            </h1>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>Track your store's performance metrics and KPIs</p>
          </div>
          <div className="flex gap-2">
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} 
              className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button onClick={handleExportReport} className={`px-3 py-2 rounded-lg ${theme.cardHover} flex items-center gap-2 text-sm`}>
              <Download size={16} /> Export Report
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className={`${theme.card} rounded-xl p-4 hover:shadow-xl transition-all`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-xs ${theme.textSecondary}`}>{kpi.label}</p>
                <p className={`text-xl font-bold ${theme.text}`}>{kpi.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className={`text-xs ${kpi.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{kpi.trend}</span>
                  <span className={`text-xs ${theme.textSecondary}`}>vs target</span>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center text-white`}>
                {kpi.icon}
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-xs">
                <span className={theme.textSecondary}>Target: {kpi.target}</span>
                <span className="text-green-500">{kpi.achievement}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: kpi.achievement }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales vs Target Chart */}
        <div className={`${theme.card} rounded-xl p-5`}>
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h3 className={`font-semibold ${theme.text}`}>Sales vs Target</h3>
            <div className="flex gap-2">
              <button onClick={() => setSelectedMetric('sales')} className={`px-3 py-1 rounded-lg text-sm ${selectedMetric === 'sales' ? theme.primary + ' text-white' : theme.cardHover}`}>
                Sales
              </button>
              <button onClick={() => setSelectedMetric('orders')} className={`px-3 py-1 rounded-lg text-sm ${selectedMetric === 'orders' ? theme.primary + ' text-white' : theme.cardHover}`}>
                Orders
              </button>
            </div>
          </div>
          <div className="h-80">
            <Line data={selectedMetric === 'sales' ? salesChartData : ordersChartData} options={chartOptions} />
          </div>
        </div>

        {/* Category Revenue Distribution */}
        <div className={`${theme.card} rounded-xl p-5`}>
          <h3 className={`font-semibold mb-4 ${theme.text}`}>Revenue by Category</h3>
          <div className="h-80">
            <Doughnut data={categoryData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Daily Performance Table */}
      <div className={`${theme.card} rounded-xl overflow-hidden mb-6`}>
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className={`font-semibold ${theme.text}`}>Daily Performance Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${theme.border} border-b`}>
              <tr className={`text-left text-sm ${theme.textSecondary}`}>
                <th className="p-4">Day</th>
                <th className="p-4">Sales</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Conversion Rate</th>
                <th className="p-4">Visitors</th>
               </tr>
            </thead>
            <tbody>
              {dailyPerformance.map((day, idx) => (
                <tr key={idx} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                  <td className={`p-4 font-medium ${theme.text}`}>{day.day}</td>
                  <td className={`p-4 font-semibold text-green-500`}>${day.sales.toLocaleString()}</td>
                  <td className={`p-4 ${theme.textSecondary}`}>{day.orders}</td>
                  <td className={`p-4 ${theme.textSecondary}`}>{day.conversion}%</td>
                  <td className={`p-4 ${theme.textSecondary}`}>{day.visitors.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
           </table>
        </div>
      </div>

      {/* Top Products Table */}
      <div className={`${theme.card} rounded-xl overflow-hidden mb-6`}>
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className={`font-semibold ${theme.text}`}>Top Performing Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${theme.border} border-b`}>
              <tr className={`text-left text-sm ${theme.textSecondary}`}>
                <th className="p-4">Product</th>
                <th className="p-4">Units Sold</th>
                <th className="p-4">Revenue</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Growth</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
               </tr>
            </thead>
            <tbody>
              {topProducts.map((product, idx) => (
                <tr key={idx} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                  <td className={`p-4 font-medium ${theme.text}`}>{product.name}</td>
                  <td className={`p-4 ${theme.textSecondary}`}>{product.sales}</td>
                  <td className={`p-4 font-semibold ${theme.text}`}>${product.revenue.toLocaleString()}</td>
                  <td className="p-4"><div className="flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500" /><span>{product.rating}</span></div></td>
                  <td className="p-4"><span className="text-green-500">{product.growth}</span></td>
                  <td className={`p-4 ${product.stock < 20 ? 'text-orange-500' : theme.text}`}>{product.stock}</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>{product.status}</span></td>
                </tr>
              ))}
            </tbody>
           </table>
        </div>
      </div>

      {/* Performance Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`${theme.card} rounded-xl p-4 hover:shadow-xl transition-all`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Rocket size={20} className="text-green-500" />
            </div>
            <h3 className={`font-semibold ${theme.text}`}>Best Performing Day</h3>
          </div>
          <p className={`text-2xl font-bold ${theme.text}`}>Friday</p>
          <p className={`text-sm ${theme.textSecondary}`}>$23,500 sales • 245 orders</p>
        </div>
        
        <div className={`${theme.card} rounded-xl p-4 hover:shadow-xl transition-all`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Crown size={20} className="text-purple-500" />
            </div>
            <h3 className={`font-semibold ${theme.text}`}>Top Product</h3>
          </div>
          <p className={`text-2xl font-bold ${theme.text}`}>Smart Watch Ultra</p>
          <p className={`text-sm ${theme.textSecondary}`}>289 units sold • $144,211 revenue</p>
        </div>
        
        <div className={`${theme.card} rounded-xl p-4 hover:shadow-xl transition-all`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Target size={20} className="text-yellow-500" />
            </div>
            <h3 className={`font-semibold ${theme.text}`}>Conversion Rate</h3>
          </div>
          <p className={`text-2xl font-bold ${theme.text}`}>3.8%</p>
          <p className={`text-sm ${theme.textSecondary}`}>Above target by 0.3%</p>
        </div>
        
        <div className={`${theme.card} rounded-xl p-4 hover:shadow-xl transition-all`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Award size={20} className="text-blue-500" />
            </div>
            <h3 className={`font-semibold ${theme.text}`}>Customer Rating</h3>
          </div>
          <p className={`text-2xl font-bold ${theme.text}`}>4.8/5</p>
          <p className={`text-sm ${theme.textSecondary}`}>Based on 1,245 reviews</p>
        </div>
      </div>
    </div>
  );
}