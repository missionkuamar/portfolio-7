// components/admin/OverviewTab.jsx
import React, { useState } from 'react';
import { DollarSign, ShoppingCart, Package, Users, Trash2, TrendingUp, Download, Eye, LineChart as LineChartIcon } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import { toast } from 'react-hot-toast';

export default function OverviewTab({ theme, shopData, orders, setOrders, setActiveTab }) {
  const [dateRange, setDateRange] = useState('year');
  const [chartType, setChartType] = useState('revenue');

  // Generate dynamic chart data based on date range
  const getChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const quarterly = ['Q1', 'Q2', 'Q3', 'Q4'];
    const halfYearly = ['H1', 'H2'];
    
    let labels;
    let data;
    
    switch(dateRange) {
      case 'week':
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        data = [45, 52, 48, 61, 78, 92, 67];
        break;
      case 'month':
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        data = [3200, 4100, 4800, 5200];
        break;
      case '3month':
        labels = ['Jan', 'Feb', 'Mar'];
        data = [3200, 4100, 4800];
        break;
      case '6month':
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        data = [3200, 4100, 4800, 5200, 6100, 7800];
        break;
      case '9month':
        labels = months.slice(0, 9);
        data = [3200, 4100, 4800, 5200, 6100, 7800, 8500, 9200, 10100];
        break;
      default:
        labels = months;
        data = [3200, 4100, 4800, 5200, 6100, 7800, 8500, 9200, 10100, 11200, 12400, 13800];
    }
    
    return { labels, data };
  };

  const { labels, data } = getChartData();
  
  const revenueChartData = {
    labels,
    datasets: [{
      label: chartType === 'revenue' ? 'Revenue ($)' : 'Orders',
      data: chartType === 'revenue' ? data : data.map(d => Math.round(d / 100)),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
    }]
  };

  const weeklySalesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Sales',
      data: [45, 52, 48, 61, 78, 92, 67],
      backgroundColor: 'rgba(139, 92, 246, 0.8)',
      borderRadius: 8,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { color: theme.textSecondary } } }
  };

  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter(o => o.id !== orderId));
    toast.success(`Order ${orderId} deleted successfully`);
  };

  const handleBulkDeleteDelivered = () => {
    const deliveredOrders = orders.filter(o => o.status === 'Delivered');
    if (deliveredOrders.length === 0) {
      toast.error('No delivered orders to delete');
      return;
    }
    setOrders(orders.filter(o => o.status !== 'Delivered'));
    toast.success(`${deliveredOrders.length} delivered orders deleted`);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `$${shopData.revenue.toLocaleString()}`, icon: <DollarSign size={24} />, change: '+23%', color: 'from-green-500 to-emerald-500' },
          { label: 'Total Orders', value: shopData.totalOrders, icon: <ShoppingCart size={24} />, change: '+18%', color: 'from-blue-500 to-cyan-500' },
          { label: 'Products', value: shopData.totalProducts, icon: <Package size={24} />, change: '+12', color: 'from-purple-500 to-pink-500' },
          { label: 'Customers', value: shopData.totalCustomers.toLocaleString(), icon: <Users size={24} />, change: '+15%', color: 'from-orange-500 to-red-500' },
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
            <h3 className={`font-semibold ${theme.text}`}>Revenue/Orders Trend</h3>
            <div className="flex gap-2">
              <select value={chartType} onChange={(e) => setChartType(e.target.value)} className={`text-xs px-2 py-1 rounded-lg border ${theme.border} ${theme.card}`}>
                <option value="revenue">Revenue</option>
                <option value="orders">Orders</option>
              </select>
              <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className={`text-xs px-2 py-1 rounded-lg border ${theme.border} ${theme.card}`}>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
                <option value="3month">3 Months</option>
                <option value="6month">6 Months</option>
                <option value="9month">9 Months</option>
                <option value="year">Yearly</option>
              </select>
            </div>
          </div>
          <div className="h-64"><Line data={revenueChartData} options={chartOptions} /></div>
        </div>
        <div className={`${theme.card} rounded-xl p-4 sm:p-5`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`font-semibold ${theme.text}`}>Weekly Sales</h3>
            <Download size={16} className={`${theme.textSecondary} cursor-pointer`} />
          </div>
          <div className="h-64"><Bar data={weeklySalesData} options={chartOptions} /></div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className={`${theme.card} rounded-xl overflow-hidden`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-wrap gap-2">
          <h3 className={`font-semibold ${theme.text}`}>Recent Orders</h3>
          <div className="flex gap-2">
            <button onClick={handleBulkDeleteDelivered} className={`text-sm px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600`}>
              Delete Delivered Orders
            </button>
            <button onClick={() => setActiveTab('orders')} className={`text-sm text-blue-500 hover:text-blue-600`}>View All Orders →</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className={`${theme.border} border-b`}>
              <tr className={`text-left text-xs sm:text-sm ${theme.textSecondary}`}>
                <th className="p-3 sm:p-4">Order ID</th><th className="p-3 sm:p-4">Customer</th><th className="p-3 sm:p-4">Amount</th><th className="p-3 sm:p-4">Status</th><th className="p-3 sm:p-4">Date</th><th className="p-3 sm:p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => {
                const statusColors = {
                  'Delivered': 'bg-green-500/20 text-green-600',
                  'Processing': 'bg-blue-500/20 text-blue-600',
                  'Shipped': 'bg-purple-500/20 text-purple-600',
                  'Pending': 'bg-yellow-500/20 text-yellow-600',
                };
                return (
                  <tr key={order.id} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                    <td className={`p-3 sm:p-4 font-mono text-xs sm:text-sm ${theme.text}`}>{order.id}</td>
                    <td className={`p-3 sm:p-4 text-sm ${theme.text}`}>{order.customer}</td>
                    <td className={`p-3 sm:p-4 font-semibold text-sm ${theme.text}`}>${order.amount}</td>
                    <td className="p-3 sm:p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-gray-500/20'}`}>{order.status}</span></td>
                    <td className={`p-3 sm:p-4 text-xs sm:text-sm ${theme.textSecondary}`}>{order.date}</td>
                    <td className="p-3 sm:p-4">
                      <button onClick={() => handleDeleteOrder(order.id)} className="p-1 rounded hover:bg-red-500/10 text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}