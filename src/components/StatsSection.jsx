// components/StatsSection.jsx
import React from 'react';
import { useApp } from '../App';
import { Users, TrendingUp, Store, Heart, Globe, Layers } from 'lucide-react';

export default function StatsSection() {
  const { theme } = useApp();
  
  const stats = [
    { label: 'Active Users', value: '10K+', icon: <Users size={24} />, suffix: '+', color: 'blue' },
    { label: 'GMV Processed', value: '$50M', icon: <TrendingUp size={24} />, suffix: '+', color: 'green' },
    { label: 'Active Shops', value: '1K', icon: <Store size={24} />, suffix: '+', color: 'purple' },
    { label: 'Happy Clients', value: '98%', icon: <Heart size={24} />, suffix: '%', color: 'red' },
    { label: 'Countries', value: '50', icon: <Globe size={24} />, suffix: '+', color: 'cyan' },
    { label: 'Apps Integrated', value: '200', icon: <Layers size={24} />, suffix: '+', color: 'orange' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-on-scroll" id="stats">
      {stats.map((stat, idx) => (
        <div key={idx} className={`${theme.card} rounded-2xl p-5 text-center hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer group`}>
          <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
            {stat.icon}
          </div>
          <p className={`text-2xl font-bold ${theme.text}`}>
            {stat.value}{stat.suffix}
          </p>
          <p className={`text-xs ${theme.textSecondary} mt-1`}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}