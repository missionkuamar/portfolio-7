// components/admin/AnalyticsTab.jsx
import React, { useState } from 'react';
import { Download, TrendingUp, DollarSign, ShoppingCart, Users, Package, Calendar, Filter } from 'lucide-react';
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
import { toast } from 'react-hot-toast';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

export default function AnalyticsTab({ theme }) {
  const [dateRange, setDateRange] = useState('year');
  const [chartType, setChartType] = useState('revenue');

  // Generate dynamic chart data based on date range
  const getChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const quarterly = ['Q1', 'Q2', 'Q3', 'Q4'];
    
    let labels, revenueData, orderData;
    
    switch(dateRange) {
      case 'week':
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        revenueData = [3200, 4100, 4800, 5200, 6100, 7800, 8500];
        orderData = [45, 52, 48, 61, 78, 92, 87];
        break;
      case 'month':
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        revenueData = [12500, 14800, 16200, 18900];
        orderData = [145, 168, 182, 210];
        break;
      case 'quarter':
        labels = quarterly;
        revenueData = [38900, 45200, 49800];
        orderData = [435, 498, 542];
        break;
      case '6month':
        labels = months.slice(0, 6);
        revenueData = [3200, 4100, 4800, 5200, 6100, 7800];
        orderData = [45, 52, 48, 61, 78, 92];
        break;
      default:
        labels = months;
        revenueData = [3200, 4100, 4800, 5200, 6100, 7800, 8500, 9200, 10100, 11200, 12400, 13800];
        orderData = [45, 52, 48, 61, 78, 92, 87, 95, 102, 115, 128, 142];
    }
    
    return { labels, revenueData, orderData };
  };

  const { labels, revenueData, orderData } = getChartData();

  // Revenue Chart Data
  const revenueChartData = {
    labels,
    datasets: [{
      label: chartType === 'revenue' ? 'Revenue ($)' : 'Orders',
      data: chartType === 'revenue' ? revenueData : orderData,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(59, 130, 246)',
      pointBorderColor: '#fff',
      pointHoverRadius: 8,
    }]
  };

  // Category Data for Doughnut Chart
  const categoryData = {
    labels: ['Electronics', 'Fashion', 'Accessories', 'Home & Living', 'Sports'],
    datasets: [{
      data: [45, 25, 15, 10, 5],
      backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'],
      borderWidth: 0,
    }]
  };

  // Monthly Sales Data for Bar Chart
  const monthlySalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Monthly Sales',
      data: [3200, 4100, 4800, 5200, 6100, 7800, 8500, 9200, 10100, 11200, 12400, 13800],
      backgroundColor: 'rgba(139, 92, 246, 0.8)',
      borderRadius: 8,
    }]
  };

  // Top Products Data
  const topProducts = [
    { name: 'Premium Headphones', sales: 342, revenue: 102258, growth: '+23%' },
    { name: 'Smart Watch Ultra', sales: 289, revenue: 144211, growth: '+18%' },
    { name: 'Wireless Earbuds', sales: 267, revenue: 42453, growth: '+31%' },
    { name: 'Gaming Mouse', sales: 234, revenue: 20826, growth: '+15%' },
    { name: 'Mechanical Keyboard', sales: 198, revenue: 37422, growth: '+27%' },
  ];

  // Key Metrics
  const keyMetrics = [
    { label: 'Total Revenue', value: '$138,420', change: '+15.3%', icon: <DollarSign size={20} />, trend: 'up' },
    { label: 'Total Orders', value: '1,245', change: '+18.2%', icon: <ShoppingCart size={20} />, trend: 'up' },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.4%', icon: <TrendingUp size={20} />, trend: 'up' },
    { label: 'Customer LTV', value: '$342', change: '+8.7%', icon: <Users size={20} />, trend: 'up' },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: theme.textSecondary, font: { size: 11 } } },
      tooltip: { backgroundColor: theme.card, titleColor: theme.text, bodyColor: theme.textSecondary }
    }
  };

  const handleExportReport = () => {
    toast.success('Report exported successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${theme.text}`}>Advanced Analytics</h2>
          <p className={`text-sm ${theme.textSecondary} mt-1`}>Track your business performance and growth metrics</p>
        </div>
        <div className="flex gap-2">
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} 
            className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
            <option value="6month">Last 6 Months</option>
            <option value="year">Last Year</option>
          </select>
          <button onClick={handleExportReport} className={`px-3 py-2 rounded-lg ${theme.cardHover} flex items-center gap-2 text-sm`}>
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, idx) => (
          <div key={idx} className={`${theme.card} rounded-xl p-4 hover:shadow-xl transition-all`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-xs ${theme.textSecondary}`}>{metric.label}</p>
                <p className={`text-xl font-bold ${theme.text}`}>{metric.value}</p>
                <p className={`text-xs ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'} mt-1`}>{metric.change}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white`}>
                {metric.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue/Orders Trend Chart */}
        <div className={`${theme.card} rounded-xl p-5`}>
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h3 className={`font-semibold ${theme.text}`}>Revenue & Orders Trend</h3>
            <div className="flex gap-2">
              <button onClick={() => setChartType('revenue')} className={`px-3 py-1 rounded-lg text-xs ${chartType === 'revenue' ? theme.primary + ' text-white' : theme.cardHover}`}>Revenue</button>
              <button onClick={() => setChartType('orders')} className={`px-3 py-1 rounded-lg text-xs ${chartType === 'orders' ? theme.primary + ' text-white' : theme.cardHover}`}>Orders</button>
            </div>
          </div>
          <div className="h-80">
            <Line data={revenueChartData} options={chartOptions} />
          </div>
        </div>

        {/* Revenue by Category */}
        <div className={`${theme.card} rounded-xl p-5`}>
          <h3 className={`font-semibold mb-4 ${theme.text}`}>Revenue by Category</h3>
          <div className="h-80">
            <Doughnut data={categoryData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Monthly Sales Bar Chart */}
      <div className={`${theme.card} rounded-xl p-5`}>
        <h3 className={`font-semibold mb-4 ${theme.text}`}>Monthly Sales Overview</h3>
        <div className="h-80">
          <Bar data={monthlySalesData} options={chartOptions} />
        </div>
      </div>

      {/* Top Products Table */}
      <div className={`${theme.card} rounded-xl overflow-hidden`}>
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className={`font-semibold ${theme.text}`}>Top Performing Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${theme.border} border-b`}>
              <tr className={`text-left text-sm ${theme.textSecondary}`}>
                <th className="p-4">Product Name</th>
                <th className="p-4">Units Sold</th>
                <th className="p-4">Revenue</th>
                <th className="p-4">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, idx) => (
                <tr key={idx} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                  <td className={`p-4 font-medium ${theme.text}`}>{product.name}</td>
                  <td className={`p-4 ${theme.textSecondary}`}>{product.sales.toLocaleString()}</td>
                  <td className={`p-4 font-semibold ${theme.text}`}>${product.revenue.toLocaleString()}</td>
                  <td className="p-4"><span className="text-green-500">{product.growth}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${theme.card} rounded-xl p-5`}>
          <h3 className={`font-semibold mb-4 ${theme.text}`}>Sales Insights</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={theme.textSecondary}>Best Selling Category</span>
              <span className={`font-semibold ${theme.text}`}>Electronics</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={theme.textSecondary}>Peak Sales Hour</span>
              <span className={`font-semibold ${theme.text}`}>7 PM - 9 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={theme.textSecondary}>Average Order Value</span>
              <span className={`font-semibold ${theme.text}`}>$111</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={theme.textSecondary}>Customer Retention Rate</span>
              <span className={`font-semibold ${theme.text}`}>68%</span>
            </div>
          </div>
        </div>
        <div className={`${theme.card} rounded-xl p-5`}>
          <h3 className={`font-semibold mb-4 ${theme.text}`}>Customer Insights</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={theme.textSecondary}>New Customers (This Month)</span>
              <span className={`font-semibold ${theme.text}`}>234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={theme.textSecondary}>Returning Customers</span>
              <span className={`font-semibold ${theme.text}`}>1,245</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={theme.textSecondary}>Customer Satisfaction</span>
              <span className={`font-semibold ${theme.text}`}>4.8/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={theme.textSecondary}>Avg Response Time</span>
              <span className={`font-semibold ${theme.text}`}>2.5 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}