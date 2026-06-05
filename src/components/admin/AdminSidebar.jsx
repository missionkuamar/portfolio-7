// components/admin/AdminSidebar.jsx
import React from 'react';
import { FaStore } from "react-icons/fa";
import { BarChart3, Users, Package, DollarSign, TrendingUp, Settings, HelpCircle, LogOut, Check, Star, Minimize2 } from 'lucide-react';

export default function AdminSidebar({ theme, sidebarOpen, setSidebarOpen, activeTab, setActiveTab, menuItems, shopData, mobileSidebarOpen, setMobileSidebarOpen }) {
  return (
    <div className={`
      fixed lg:relative z-50 transition-all duration-300
      ${sidebarOpen ? 'w-72' : 'w-20'} 
      ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      ${theme.card} border-r ${theme.border} h-full overflow-y-auto
    `}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-inherit z-10">
        <div className={`flex items-center gap-2 ${!sidebarOpen && 'justify-center w-full'}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <FaStore size={16} className="text-white" />
          </div>
          {sidebarOpen && <span className={`text-xl font-bold ${theme.text}`}>Shop Panel</span>}
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-1.5 rounded-lg ${theme.cardHover} ${!sidebarOpen && 'hidden'}`}>
          <Minimize2 size={18} />
        </button>
      </div>
      
      <div className="p-4">
        {sidebarOpen && (
          <div className={`${theme.cardHover} rounded-xl p-4 mb-6 text-center border ${theme.border}`}>
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-3 shadow-lg">
              {shopData.owner?.charAt(0) || 'A'}
            </div>
            <h3 className={`font-bold ${theme.text} text-lg`}>{shopData.name}</h3>
            <p className={`text-sm ${theme.textSecondary}`}>{shopData.owner}</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={`${i < Math.floor(shopData.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
              ))}
              <span className={`text-sm ml-1 ${theme.text}`}>{shopData.rating}</span>
            </div>
          </div>
        )}
        
        <nav className="space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileSidebarOpen?.(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                activeTab === item.id ? `${theme.primary} text-white shadow-md` : `${theme.textSecondary} hover:${theme.cardHover}`
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              {sidebarOpen && (
                <>
                  <div className="flex-1 text-left">
                    <span className="text-sm font-medium">{item.label}</span>
                    <p className={`text-xs opacity-75 ${activeTab === item.id ? 'text-white' : ''}`}>{item.description}</p>
                  </div>
                  {activeTab === item.id && <Check size={16} />}
                </>
              )}
            </button>
          ))}
        </nav>
        
        {sidebarOpen && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
            <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${theme.textSecondary} hover:${theme.cardHover} transition-all`}>
              <HelpCircle size={20} /> <span className="text-sm">Help & Support</span>
            </button>
            <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${theme.textSecondary} hover:${theme.cardHover} transition-all`}>
              <LogOut size={20} /> <span className="text-sm">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}