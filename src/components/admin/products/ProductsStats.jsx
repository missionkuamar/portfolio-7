// components/admin/products/ProductsStats.jsx
import React from 'react';
import { Package, CheckCircle, AlertCircle, X, DollarSign, ShoppingCart } from 'lucide-react';

export default function ProductsStats({ theme, stats }) {
  const statItems = [
    { label: 'Total Products', value: stats.total, icon: <Package size={20} />, color: 'text-blue-500' },
    { label: 'Active', value: stats.active, icon: <CheckCircle size={20} />, color: 'text-green-500' },
    { label: 'Low Stock', value: stats.lowStock, icon: <AlertCircle size={20} />, color: 'text-orange-500' },
    { label: 'Out of Stock', value: stats.outOfStock, icon: <X size={20} />, color: 'text-red-500' },
    { label: 'Inventory Value', value: `$${stats.totalValue.toLocaleString()}`, icon: <DollarSign size={20} />, color: 'text-purple-500' },
    { label: 'Total Sales', value: stats.totalSales.toLocaleString(), icon: <ShoppingCart size={20} />, color: 'text-cyan-500' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {statItems.map((stat, idx) => (
        <div key={idx} className={`${theme.card} rounded-xl p-3 text-center`}>
          <div className={`mx-auto mb-1 ${stat.color}`}>{stat.icon}</div>
          <p className={`text-xl font-bold ${theme.text}`}>{stat.value}</p>
          <p className={`text-xs ${theme.textSecondary}`}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}