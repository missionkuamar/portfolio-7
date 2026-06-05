// components/admin/OrdersTab.jsx
import React, { useState, useMemo } from 'react';
import { Search, Download, Eye, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function OrdersTab({ theme, orders: initialOrders, setOrders }) {
  const [orders, setLocalOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const filteredOrders = useMemo(() => {
    let filtered = orders;
    if (orderStatusFilter !== 'all') filtered = filtered.filter(o => o.status.toLowerCase() === orderStatusFilter.toLowerCase());
    if (searchTerm) filtered = filtered.filter(o => o.id.toLowerCase().includes(searchTerm.toLowerCase()) || o.customer.toLowerCase().includes(searchTerm.toLowerCase()));
    return filtered;
  }, [orders, searchTerm, orderStatusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleUpdateStatus = (orderId, newStatus) => {
    setLocalOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const handleBulkDelete = () => {
    const toDelete = orders.filter(o => selectedOrders.includes(o.id));
    if (toDelete.length === 0) { toast.error('No orders selected'); return; }
    setLocalOrders(orders.filter(o => !selectedOrders.includes(o.id)));
    setOrders(orders.filter(o => !selectedOrders.includes(o.id)));
    setSelectedOrders([]);
    toast.success(`${toDelete.length} orders deleted`);
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === paginatedOrders.length) setSelectedOrders([]);
    else setSelectedOrders(paginatedOrders.map(o => o.id));
  };

  const statusColors = {
    'Delivered': 'bg-green-500/20 text-green-600',
    'Processing': 'bg-blue-500/20 text-blue-600',
    'Shipped': 'bg-purple-500/20 text-purple-600',
    'Pending': 'bg-yellow-500/20 text-yellow-600',
    'Cancelled': 'bg-red-500/20 text-red-600'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className={`text-2xl font-bold ${theme.text}`}>Order Management</h2>
        <div className="flex gap-3 flex-wrap">
          <select value={orderStatusFilter} onChange={(e) => setOrderStatusFilter(e.target.value)} className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option><option value="processing">Processing</option>
            <option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option>
          </select>
          {selectedOrders.length > 0 && (
            <button onClick={handleBulkDelete} className="px-3 py-2 rounded-lg bg-red-500 text-white text-sm flex items-center gap-2">
              <Trash2 size={16} /> Delete ({selectedOrders.length})
            </button>
          )}
          <button className={`px-3 py-2 rounded-lg ${theme.cardHover} flex items-center gap-2 text-sm`}><Download size={16} /> Export</button>
        </div>
      </div>
      
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} size={18} />
          <input type="text" placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
        </div>
        <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
          <option value={10}>10 / page</option><option value={25}>25 / page</option><option value={50}>50 / page</option>
        </select>
      </div>
      
      <div className={`${theme.card} rounded-xl overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className={`${theme.border} border-b`}>
              <tr className={`text-left text-xs sm:text-sm ${theme.textSecondary}`}>
                <th className="p-3"><input type="checkbox" checked={selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0} onChange={handleSelectAll} className="w-4 h-4 rounded" /></th>
                <th className="p-3">Order ID</th><th className="p-3">Customer</th><th className="p-3">Items</th><th className="p-3">Amount</th><th className="p-3">Payment</th><th className="p-3">Status</th><th className="p-3">Date</th><th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map(order => (
                <tr key={order.id} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                  <td className="p-3"><input type="checkbox" checked={selectedOrders.includes(order.id)} onChange={() => {
                    if (selectedOrders.includes(order.id)) setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                    else setSelectedOrders([...selectedOrders, order.id]);
                  }} className="w-4 h-4 rounded" /></td>
                  <td className={`p-3 font-mono text-sm ${theme.text}`}>{order.id}</td>
                  <td className={`p-3 text-sm ${theme.text}`}>{order.customer}</td>
                  <td className={`p-3 text-sm ${theme.textSecondary}`}>{order.items}</td>
                  <td className={`p-3 font-semibold ${theme.text}`}>${order.amount}</td>
                  <td className={`p-3 text-sm ${theme.textSecondary}`}>{order.payment}</td>
                  <td className="p-3">
                    <select value={order.status} onChange={(e) => handleUpdateStatus(order.id, e.target.value)} className={`px-2 py-1 rounded-lg text-xs font-semibold ${statusColors[order.status]} border-none focus:outline-none`}>
                      <option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option>
                    </select>
                  </td>
                  <td className={`p-3 text-sm ${theme.textSecondary}`}>{order.date}</td>
                  <td className="p-3"><button className="p-1 rounded hover:bg-white/10"><Eye size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? 'opacity-50' : theme.cardHover}`}><ChevronLeft size={20} /></button>
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            let pageNum = i + 1;
            if (totalPages > 5 && currentPage > 3) pageNum = currentPage - 3 + i;
            if (pageNum > totalPages) return null;
            return <button key={i} onClick={() => setCurrentPage(pageNum)} className={`px-4 py-2 rounded-lg ${currentPage === pageNum ? theme.primary + ' text-white' : theme.cardHover}`}>{pageNum}</button>;
          })}
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className={`p-2 rounded-lg ${currentPage === totalPages ? 'opacity-50' : theme.cardHover}`}><ChevronRight size={20} /></button>
        </div>
      )}
    </div>
  );
}