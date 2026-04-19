// components/DashboardStats.jsx
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export default function DashboardStats({ role }) {
  const { theme } = useContext(ThemeContext);
  
  const stats = {
    user: [
      { label: 'Orders Placed', value: '12', icon: 'fa-truck', color: 'blue' },
      { label: 'Total Spent', value: '$847', icon: 'fa-dollar-sign', color: 'green' },
      { label: 'Wishlist', value: '8', icon: 'fa-heart', color: 'red' },
      { label: 'Reviews', value: '23', icon: 'fa-star', color: 'yellow' }
    ],
    admin: [
      { label: 'Total Sales', value: '$12,450', icon: 'fa-chart-line', color: 'purple' },
      { label: 'Orders', value: '156', icon: 'fa-box', color: 'blue' },
      { label: 'Products', value: '48', icon: 'fa-tag', color: 'green' },
      { label: 'Customers', value: '892', icon: 'fa-users', color: 'orange' }
    ],
    superadmin: [
      { label: 'Total Revenue', value: '$284,500', icon: 'fa-globe', color: 'indigo' },
      { label: 'Active Shops', value: '247', icon: 'fa-store', color: 'emerald' },
      { label: 'Total Users', value: '15,342', icon: 'fa-user-friends', color: 'cyan' },
      { label: 'Platform Growth', value: '+34%', icon: 'fa-chart-line', color: 'rose' }
    ]
  };
  
  const currentStats = stats[role] || stats.user;
  
  return (
    <div className="mb-12">
      <h2 className={`text-2xl font-bold mb-6 ${theme.text}`}>
        <i className="fas fa-chart-pie mr-2"></i>
        {role === 'user' && 'My Dashboard'}
        {role === 'admin' && 'Shop Overview'}
        {role === 'superadmin' && 'Platform Analytics'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {currentStats.map((stat, idx) => (
          <div key={idx} className={`${theme.card} rounded-xl shadow-md p-5 border-l-4 border-${stat.color}-500 hover:shadow-lg transition`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${theme.textSecondary} mb-1`}>{stat.label}</p>
                <p className={`text-2xl font-bold ${theme.text}`}>{stat.value}</p>
              </div>
              <i className={`fas ${stat.icon} text-3xl text-${stat.color}-500 opacity-70`}></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}