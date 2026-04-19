// pages/OrdersPage.jsx - Purchase History
import React from 'react';
import { useApp } from '../App';
import { Package, Truck, CheckCircle, Clock, Eye } from 'lucide-react';

export default function OrdersPage() {
  const { theme } = useApp();

  const orders = [
    { id: 'ORD-001', date: '2024-01-15', total: 299, status: 'Delivered', items: 3, paymentMethod: 'Credit Card' },
    { id: 'ORD-002', date: '2024-01-10', total: 499, status: 'Shipped', items: 2, paymentMethod: 'PayPal' },
    { id: 'ORD-003', date: '2024-01-05', total: 129, status: 'Processing', items: 1, paymentMethod: 'Debit Card' },
    { id: 'ORD-004', date: '2023-12-28', total: 89, status: 'Delivered', items: 2, paymentMethod: 'Credit Card' },
    { id: 'ORD-005', date: '2023-12-20', total: 599, status: 'Delivered', items: 4, paymentMethod: 'PayPal' },
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle size={18} className="text-green-500" />;
      case 'Shipped': return <Truck size={18} className="text-blue-500" />;
      case 'Processing': return <Clock size={18} className="text-yellow-500" />;
      default: return <Package size={18} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-500/20 text-green-600 dark:text-green-400';
      case 'Shipped': return 'bg-blue-500/20 text-blue-600 dark:text-blue-400';
      case 'Processing': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-3xl font-bold ${theme.text}`}>
          <Package className="inline mr-3 mb-1" size={28} />
          My Orders & Purchase History
        </h1>
        <div className={`px-4 py-2 rounded-lg ${theme.card} ${theme.text}`}>
          Total Orders: {orders.length}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className={`${theme.card} rounded-xl p-4 text-center`}>
          <p className={`text-2xl font-bold ${theme.text}`}>$1,615</p>
          <p className={`text-sm ${theme.textSecondary}`}>Total Spent</p>
        </div>
        <div className={`${theme.card} rounded-xl p-4 text-center`}>
          <p className={`text-2xl font-bold ${theme.text}`}>3</p>
          <p className={`text-sm ${theme.textSecondary}`}>Delivered</p>
        </div>
        <div className={`${theme.card} rounded-xl p-4 text-center`}>
          <p className={`text-2xl font-bold ${theme.text}`}>1</p>
          <p className={`text-sm ${theme.textSecondary}`}>In Transit</p>
        </div>
        <div className={`${theme.card} rounded-xl p-4 text-center`}>
          <p className={`text-2xl font-bold ${theme.text}`}>12</p>
          <p className={`text-sm ${theme.textSecondary}`}>Total Items</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className={`${theme.card} rounded-xl shadow-xl overflow-hidden border ${theme.border}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${theme.border} border-b`}>
              <tr className={`text-left ${theme.textSecondary}`}>
                <th className="p-4">Order ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
               </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                  <td className={`p-4 font-mono text-sm font-semibold ${theme.text}`}>#{order.id}</td>
                  <td className={`p-4 ${theme.textSecondary}`}>{order.date}</td>
                  <td className={`p-4 ${theme.text}`}>{order.items} items</td>
                  <td className={`p-4 font-bold ${theme.text}`}>${order.total}</td>
                  <td className={`p-4 text-sm ${theme.textSecondary}`}>{order.paymentMethod}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className={`p-2 rounded-lg ${theme.cardHover} transition-all`}>
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Purchase History Chart */}
      <div className={`mt-8 ${theme.card} rounded-xl p-6 border ${theme.border}`}>
        <h3 className={`font-semibold mb-4 ${theme.text}`}>Purchase History Overview</h3>
        <div className="h-32 flex items-end gap-2">
          {[65, 45, 78, 32, 89, 54, 67, 43, 76, 54].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all hover:opacity-80"
                style={{ height: `${height}px` }}
              ></div>
              <span className={`text-xs ${theme.textSecondary}`}>Week {i+1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}