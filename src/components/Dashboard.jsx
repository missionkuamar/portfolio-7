// components/Dashboard.jsx
import React from 'react';

export default function Dashboard({ theme, role }) {
  const stats = {
    user: [
      { label: 'Orders', value: '24', icon: 'fa-truck', change: '+12%' },
      { label: 'Spent', value: '$2,847', icon: 'fa-dollar-sign', change: '+8%' },
      { label: 'Wishlist', value: '15', icon: 'fa-heart', change: '+3' },
      { label: 'Reviews', value: '42', icon: 'fa-star', change: '+5' }
    ],
    admin: [
      { label: 'Revenue', value: '$48,290', icon: 'fa-chart-line', change: '+23%' },
      { label: 'Orders', value: '342', icon: 'fa-box', change: '+18%' },
      { label: 'Products', value: '128', icon: 'fa-tag', change: '+12' },
      { label: 'Customers', value: '2,847', icon: 'fa-users', change: '+15%' }
    ],
    superadmin: [
      { label: 'Total GMV', value: '$2.4M', icon: 'fa-globe', change: '+34%' },
      { label: 'Active Shops', value: '847', icon: 'fa-store', change: '+56' },
      { label: 'Total Users', value: '15,342', icon: 'fa-user-friends', change: '+23%' },
      { label: 'Platform Fee', value: '$142K', icon: 'fa-chart-pie', change: '+28%' }
    ]
  };

  const currentStats = stats[role];

  return (
    <div className="mt-12">
      <h2 className={`text-2xl font-bold mb-6 ${theme.text}`}>
        <i className="fas fa-chart-pie mr-2"></i>
        {role === 'user' && 'My Dashboard'}
        {role === 'admin' && 'Shop Analytics'}
        {role === 'superadmin' && 'Platform Overview'}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {currentStats.map((stat, idx) => (
          <div key={idx} className={`${theme.card} rounded-xl shadow-xl p-5 border-l-4 border-l-blue-500 hover:shadow-2xl transition-all`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${theme.textSecondary} mb-1`}>{stat.label}</p>
                <p className={`text-2xl font-bold ${theme.text}`}>{stat.value}</p>
                <p className={`text-xs mt-2 text-green-500`}>
                  <i className="fas fa-arrow-up mr-1"></i>{stat.change}
                </p>
              </div>
              <i className={`fas ${stat.icon} text-3xl text-blue-500 opacity-70`}></i>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className={`${theme.card} rounded-xl shadow-xl overflow-hidden border ${theme.border}`}>
        <div className="p-5 border-b border-gray-700">
          <h3 className={`font-semibold ${theme.text}`}>
            <i className="fas fa-clock mr-2"></i>Recent Activity
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${theme.border} border-b`}>
              <tr className={`text-left text-sm ${theme.textSecondary}`}>
                <th className="p-4">Transaction</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
               </tr>
            </thead>
            <tbody>
              {[
                { id: '#ORD-001', amount: 299, status: 'Completed', date: '2024-01-15' },
                { id: '#ORD-002', amount: 499, status: 'Processing', date: '2024-01-16' },
                { id: '#ORD-003', amount: 129, status: 'Completed', date: '2024-01-14' }
              ].map(order => (
                <tr key={order.id} className={`border-b ${theme.border}`}>
                  <td className={`p-4 font-mono text-sm ${theme.text}`}>{order.id}</td>
                  <td className={`p-4 font-semibold ${theme.text}`}>${order.amount}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className={`p-4 text-sm ${theme.textSecondary}`}>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}