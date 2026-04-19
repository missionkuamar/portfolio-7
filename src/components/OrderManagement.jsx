// components/OrderManagement.jsx
import React, { useContext, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const sampleOrders = [
  { id: '#ORD-001', customer: 'John Doe', amount: 299, status: 'Delivered', date: '2024-01-15' },
  { id: '#ORD-002', customer: 'Jane Smith', amount: 149, status: 'Processing', date: '2024-01-16' },
  { id: '#ORD-003', customer: 'Mike Johnson', amount: 89, status: 'Shipped', date: '2024-01-14' },
  { id: '#ORD-004', customer: 'Sarah Wilson', amount: 459, status: 'Pending', date: '2024-01-17' }
];

export default function OrderManagement({ role }) {
  const { theme } = useContext(ThemeContext);
  const [orders] = useState(sampleOrders);
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Shipped': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };
  
  return (
    <div className="mb-12">
      <h2 className={`text-2xl font-bold mb-6 ${theme.text}`}>
        <i className="fas fa-tasks mr-2"></i>
        {role === 'user' ? 'My Recent Orders' : 'Order Management'}
      </h2>
      <div className={`${theme.card} rounded-xl shadow-md overflow-hidden border ${theme.border}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${theme.border} border-b`}>
              <tr className={`text-left ${theme.textSecondary}`}>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                {role === 'admin' && <th className="p-4">Action</th>}
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className={`border-b ${theme.border} hover:bg-opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700`}>
                  <td className={`p-4 font-mono text-sm ${theme.text}`}>{order.id}</td>
                  <td className={`p-4 ${theme.text}`}>{order.customer}</td>
                  <td className={`p-4 font-semibold ${theme.text}`}>${order.amount}</td>
                  <td className={`p-4 ${theme.textSecondary}`}>{order.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  {role === 'admin' && (
                    <td className="p-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}