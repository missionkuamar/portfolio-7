// pages/SuperAdminTopShops.jsx
import React, { useState } from 'react';
import { useApp } from '../App';
import { Award, Star, TrendingUp, DollarSign, Package, Users, Calendar, Medal, Crown } from 'lucide-react';

export default function SuperAdminTopShops() {
  const { theme } = useApp();

  const topShops = [
    { rank: 1, name: 'Fashion Hub', revenue: '$245,890', orders: 1234, rating: 4.9, growth: '+34%', products: 345, icon: '👑' },
    { rank: 2, name: 'Tech Store', revenue: '$198,450', orders: 987, rating: 4.8, growth: '+28%', products: 278, icon: '🥈' },
    { rank: 3, name: 'Beauty Bliss', revenue: '$167,230', orders: 876, rating: 4.9, growth: '+42%', products: 234, icon: '🥉' },
    { rank: 4, name: 'Gadget World', revenue: '$145,670', orders: 765, rating: 4.7, growth: '+23%', products: 189, icon: '⭐' },
    { rank: 5, name: 'Sports Gear', revenue: '$123,450', orders: 654, rating: 4.8, growth: '+31%', products: 156, icon: '⭐' },
  ];

  return (
    <div className="min-h-screen">
      <div className="mb-6"><h1 className={`text-3xl font-bold ${theme.text}`}><Award className="inline mr-3 mb-1" size={28} />Top Performing Shops</h1>
      <p className={`${theme.textSecondary} mt-2`}>Highest revenue generating shops on the platform</p></div>

      <div className="grid grid-cols-1 gap-4">
        {topShops.map((shop) => (
          <div key={shop.rank} className={`${theme.card} rounded-xl p-5 hover:shadow-xl transition-all transform hover:-translate-y-1 border ${theme.border}`}>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-4xl">{shop.icon}</div>
              <div className="flex-1"><div className="flex items-center gap-2"><h3 className={`text-xl font-bold ${theme.text}`}>{shop.name}</h3><div className="flex items-center gap-1"><Star size={16} className="text-yellow-500 fill-yellow-500" /><span className={theme.text}>{shop.rating}</span></div></div>
              <div className="flex gap-4 mt-2 text-sm flex-wrap"><span className={`flex items-center gap-1 ${theme.textSecondary}`}><DollarSign size={14} />{shop.revenue}</span><span className={`flex items-center gap-1 ${theme.textSecondary}`}><Package size={14} />{shop.products} products</span><span className={`flex items-center gap-1 ${theme.textSecondary}`}><TrendingUp size={14} />{shop.growth} growth</span></div></div>
              <div className="text-right"><div className={`px-3 py-1 rounded-full text-sm font-bold ${shop.rank === 1 ? 'bg-yellow-500/20 text-yellow-600' : shop.rank === 2 ? 'bg-gray-400/20 text-gray-600' : shop.rank === 3 ? 'bg-orange-500/20 text-orange-600' : 'bg-blue-500/20 text-blue-600'}`}>#{shop.rank} Rank</div>
              <p className={`text-xs ${theme.textSecondary} mt-1`}>{shop.orders} orders</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}