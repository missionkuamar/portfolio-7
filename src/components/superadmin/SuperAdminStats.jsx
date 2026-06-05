// components/superadmin/SuperAdminStats.jsx
import React from 'react';
import { DollarSign, Store, Users, TrendingUp, ShoppingCart, Award } from 'lucide-react';

export default function SuperAdminStats({ theme, stats }) {
  const statItems = [
    { label: 'Total Revenue', value: stats.totalRevenue, icon: <DollarSign size={24} />, change: '+34%', color: 'from-green-500 to-emerald-500' },
    { label: 'Active Shops', value: stats.activeShops, icon: <Store size={24} />, change: '+56', color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Users', value: stats.totalUsers, icon: <Users size={24} />, change: '+23%', color: 'from-purple-500 to-pink-500' },
    { label: 'Platform Fee', value: stats.platformFee, icon: <TrendingUp size={24} />, change: '+28%', color: 'from-orange-500 to-red-500' },
    { label: 'Total Orders', value: stats.totalOrders, icon: <ShoppingCart size={24} />, change: '+31%', color: 'from-cyan-500 to-blue-500' },
    { label: 'Avg Rating', value: stats.avgRating, icon: <Award size={24} />, change: '+0.3', color: 'from-yellow-500 to-amber-500' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {statItems.map((stat, idx) => (
        <div key={idx} className={`${theme.card} rounded-xl shadow-xl p-4 hover:shadow-2xl transition-all transform hover:-translate-y-1`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-xs ${theme.textSecondary} mb-1`}>{stat.label}</p>
              <p className={`text-xl font-bold ${theme.text}`}>{stat.value}</p>
              <p className={`text-xs mt-2 text-green-500`}>
                <TrendingUp size={10} className="inline mr-1" />
                {stat.change}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}