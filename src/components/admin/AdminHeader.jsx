// components/admin/AdminHeader.jsx
import React, { useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';

export default function AdminHeader({ theme, shopData, notificationCount, setMobileSidebarOpen }) {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const notifications = [
    { id: 1, title: 'New Order Received', message: 'Order #ORD-006 from John Doe', time: '2 min ago', read: false },
    { id: 2, title: 'Product Out of Stock', message: 'Designer Bag is out of stock', time: '1 hour ago', read: false },
    { id: 3, title: 'Customer Review', message: 'New 5-star review on Premium Headphones', time: '3 hours ago', read: true },
  ];

  return (
    <div className={`sticky top-0 z-30 ${theme.card} border-b ${theme.border} px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center gap-3`}>
      <div className="flex items-center gap-3">
        <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden p-2 rounded-lg ${theme.cardHover}">
          <Menu size={20} />
        </button>
        <div>
          <h1 className={`text-lg sm:text-xl font-bold ${theme.text}`}>Welcome back, {shopData.owner}!</h1>
          <p className={`text-xs ${theme.textSecondary} hidden sm:block`}>Here's what's happening with your shop today</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className={`p-2 rounded-lg ${theme.cardHover} relative`}>
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-80 ${theme.card} rounded-xl shadow-2xl border ${theme.border} z-50 overflow-hidden`}>
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className={`font-semibold ${theme.text}`}>Notifications</h3>
                <button className="text-xs text-blue-500">Mark all read</button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notif => (
                  <div key={notif.id} className={`p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-white/5 cursor-pointer ${!notif.read ? 'bg-blue-500/5' : ''}`}>
                    <p className={`text-sm font-medium ${theme.text}`}>{notif.title}</p>
                    <p className={`text-xs ${theme.textSecondary} mt-1`}>{notif.message}</p>
                    <p className={`text-xs ${theme.textSecondary} mt-1 opacity-60`}>{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm`}>
          {shopData.owner?.charAt(0) || 'A'}
        </div>
      </div>
    </div>
  );
}