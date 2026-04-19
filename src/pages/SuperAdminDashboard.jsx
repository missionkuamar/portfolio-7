// pages/SuperAdminDashboard.jsx - Complete Super Admin Panel
import React from 'react';
import { useApp } from '../App';
import { 
  BarChart3, Users, Store, DollarSign, TrendingUp, 
  Globe, Shield, Settings, Activity, Award, 
  Calendar, FileText, Mail, Bell, Download 
} from 'lucide-react';

export default function SuperAdminDashboard() {
  const { theme } = useApp();

  const stats = [
    { label: 'Total Revenue', value: '$2,847,392', icon: <DollarSign size={24} />, change: '+34%', color: 'from-green-500 to-emerald-500' },
    { label: 'Active Shops', value: '847', icon: <Store size={24} />, change: '+56', color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Users', value: '15,342', icon: <Users size={24} />, change: '+23%', color: 'from-purple-500 to-pink-500' },
    { label: 'Platform Fee', value: '$142,890', icon: <TrendingUp size={24} />, change: '+28%', color: 'from-orange-500 to-red-500' },
  ];

  const recentShops = [
    { name: 'Fashion Hub', owner: 'Alice Cooper', revenue: '$45,230', status: 'Active', products: 234 },
    { name: 'Tech Store', owner: 'Bob Martin', revenue: '$38,120', status: 'Active', products: 156 },
    { name: 'Home Decor', owner: 'Carol Davis', revenue: '$27,890', status: 'Inactive', products: 89 },
    { name: 'Gadget World', owner: 'David Lee', revenue: '$22,450', status: 'Active', products: 178 },
    { name: 'Sports Gear', owner: 'Emma Wilson', revenue: '$18,670', status: 'Pending', products: 67 },
  ];

  const platformMetrics = [
    { metric: 'Monthly Active Users', value: '8,234', change: '+12%' },
    { metric: 'Avg Order Value', value: '$87', change: '+5%' },
    { metric: 'Conversion Rate', value: '3.2%', change: '+0.4%' },
    { metric: 'Customer Lifetime', value: '$1,234', change: '+8%' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-3xl font-bold ${theme.text}`}>
          <Shield className="inline mr-3 mb-1" size={28} />
          Super Admin Dashboard
        </h1>
        <p className={`${theme.textSecondary} mt-2`}>Platform-wide analytics & management console</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${theme.card} rounded-xl shadow-xl p-5 hover:shadow-2xl transition-all`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${theme.textSecondary} mb-1`}>{stat.label}</p>
                <p className={`text-2xl font-bold ${theme.text}`}>{stat.value}</p>
                <p className={`text-xs mt-2 text-green-500`}>
                  <TrendingUp size={12} className="inline mr-1" />
                  {stat.change}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`${theme.card} rounded-xl p-6 border ${theme.border}`}>
          <h3 className={`font-semibold mb-4 ${theme.text} flex items-center gap-2`}>
            <Activity size={18} />
            Platform Performance
          </h3>
          <div className="space-y-4">
            {platformMetrics.map((metric, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className={theme.textSecondary}>{metric.metric}</span>
                <div className="flex items-center gap-3">
                  <span className={`font-semibold ${theme.text}`}>{metric.value}</span>
                  <span className="text-xs text-green-500">{metric.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${theme.card} rounded-xl p-6 border ${theme.border}`}>
          <h3 className={`font-semibold mb-4 ${theme.text} flex items-center gap-2`}>
            <Globe size={18} />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className={`p-3 rounded-lg ${theme.cardHover} text-left transition-all`}>
              <FileText size={20} className="mb-2" />
              <p className="text-sm font-semibold">Generate Report</p>
            </button>
            <button className={`p-3 rounded-lg ${theme.cardHover} text-left transition-all`}>
              <Mail size={20} className="mb-2" />
              <p className="text-sm font-semibold">Email Users</p>
            </button>
            <button className={`p-3 rounded-lg ${theme.cardHover} text-left transition-all`}>
              <Bell size={20} className="mb-2" />
              <p className="text-sm font-semibold">Announcement</p>
            </button>
            <button className={`p-3 rounded-lg ${theme.cardHover} text-left transition-all`}>
              <Download size={20} className="mb-2" />
              <p className="text-sm font-semibold">Export Data</p>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Shops Table */}
      <div className={`${theme.card} rounded-xl shadow-xl overflow-hidden border ${theme.border}`}>
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className={`font-semibold ${theme.text} flex items-center gap-2`}>
            <Store size={18} />
            All Shops Overview
          </h3>
          <button className={`px-3 py-1 rounded-lg ${theme.primary} text-white text-sm`}>
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${theme.border} border-b`}>
              <tr className={`text-left text-sm ${theme.textSecondary}`}>
                <th className="p-4">Shop Name</th>
                <th className="p-4">Owner</th>
                <th className="p-4">Revenue</th>
                <th className="p-4">Products</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
               </tr>
            </thead>
            <tbody>
              {recentShops.map((shop, idx) => (
                <tr key={idx} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                  <td className={`p-4 font-semibold ${theme.text}`}>{shop.name}</td>
                  <td className={`p-4 ${theme.textSecondary}`}>{shop.owner}</td>
                  <td className={`p-4 font-semibold ${theme.text}`}>{shop.revenue}</td>
                  <td className={`p-4 ${theme.textSecondary}`}>{shop.products}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      shop.status === 'Active' ? 'bg-green-500/20 text-green-500' :
                      shop.status === 'Inactive' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {shop.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className={`p-1 rounded ${theme.cardHover}`}>
                      <Settings size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}