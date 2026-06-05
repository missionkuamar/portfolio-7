// pages/SuperAdminAnalytics.jsx
import React, { useState } from 'react';
import { useApp } from '../App';
import { BarChart3, TrendingUp, DollarSign, Users, Store, Download, Calendar } from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

export default function SuperAdminAnalytics() {
  const { theme } = useApp();
  const [dateRange, setDateRange] = useState('year');

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{ label: 'Platform Revenue', data: [24500, 28700, 31200, 34500, 38900, 42300, 46700, 51200, 55600, 60100, 64500, 69800], borderColor: 'rgb(59, 130, 246)', backgroundColor: 'rgba(59, 130, 246, 0.1)', fill: true, tension: 0.4 }]
  };

  const shopGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{ label: 'New Shops', data: [12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48], backgroundColor: 'rgba(139, 92, 246, 0.8)', borderRadius: 8 }]
  };

  const categoryData = {
    labels: ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports'],
    datasets: [{ data: [35, 28, 18, 12, 7], backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'] }]
  };

  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: theme.textSecondary } } } };

  return (
    <div className="min-h-screen">
      <div className="mb-6"><h1 className={`text-3xl font-bold ${theme.text}`}><BarChart3 className="inline mr-3 mb-1" size={28} />Platform Analytics</h1>
      <p className={`${theme.textSecondary} mt-2`}>Global platform performance metrics</p></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className={`${theme.card} rounded-xl p-4`}><div className="flex justify-between"><div><p className={`text-sm ${theme.textSecondary}`}>Total Revenue</p><p className={`text-2xl font-bold ${theme.text}`}>$698,420</p><p className="text-xs text-green-500">↑ +23.5%</p></div><DollarSign size={24} className="text-green-500" /></div></div>
        <div className={`${theme.card} rounded-xl p-4`}><div className="flex justify-between"><div><p className={`text-sm ${theme.textSecondary}`}>Total Shops</p><p className={`text-2xl font-bold ${theme.text}`}>847</p><p className="text-xs text-green-500">↑ +56</p></div><Store size={24} className="text-blue-500" /></div></div>
        <div className={`${theme.card} rounded-xl p-4`}><div className="flex justify-between"><div><p className={`text-sm ${theme.textSecondary}`}>Total Users</p><p className={`text-2xl font-bold ${theme.text}`}>15,342</p><p className="text-xs text-green-500">↑ +23%</p></div><Users size={24} className="text-purple-500" /></div></div>
        <div className={`${theme.card} rounded-xl p-4`}><div className="flex justify-between"><div><p className={`text-sm ${theme.textSecondary}`}>Avg Order Value</p><p className={`text-2xl font-bold ${theme.text}`}>$87</p><p className="text-xs text-green-500">↑ +5.2%</p></div><TrendingUp size={24} className="text-orange-500" /></div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className={`${theme.card} rounded-xl p-5`}><div className="flex justify-between mb-4"><h3 className={`font-semibold ${theme.text}`}>Revenue Trend</h3><select className={`text-xs px-2 py-1 rounded-lg border ${theme.border}`}><option>Yearly</option><option>Monthly</option></select></div><div className="h-80"><Line data={revenueData} options={chartOptions} /></div></div>
        <div className={`${theme.card} rounded-xl p-5`}><h3 className={`font-semibold mb-4 ${theme.text}`}>New Shops Growth</h3><div className="h-80"><Bar data={shopGrowthData} options={chartOptions} /></div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${theme.card} rounded-xl p-5`}><h3 className={`font-semibold mb-4 ${theme.text}`}>Revenue by Category</h3><div className="h-64"><Doughnut data={categoryData} options={chartOptions} /></div></div>
        <div className={`${theme.card} rounded-xl p-5`}><h3 className={`font-semibold mb-4 ${theme.text}`}>Top Performing Shops</h3><div className="space-y-3">{['Fashion Hub - $245K', 'Tech Store - $198K', 'Beauty Bliss - $167K', 'Gadget World - $145K'].map((shop, i) => (<div key={i} className="flex justify-between items-center"><span className={theme.text}>{shop}</span><div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: `${85 - i * 15}%` }}></div></div></div>))}</div></div>
      </div>
    </div>
  );
}