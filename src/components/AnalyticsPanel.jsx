// components/AnalyticsPanel.jsx
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export default function AnalyticsPanel() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 ${theme.text}`}>
        <i className="fas fa-chart-bar mr-2"></i>
        Platform Analytics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${theme.card} rounded-xl shadow-md p-6 border ${theme.border}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Revenue Overview</h3>
          <div className="h-48 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
            <span className={`text-gray-500 ${theme.textSecondary}`}>📊 Chart Visualization Area</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div><p className="text-2xl font-bold text-green-600">+24%</p><p className="text-xs">This Month</p></div>
            <div><p className="text-2xl font-bold text-blue-600">$284K</p><p className="text-xs">Total Revenue</p></div>
            <div><p className="text-2xl font-bold text-purple-600">1,234</p><p className="text-xs">New Users</p></div>
          </div>
        </div>
        <div className={`${theme.card} rounded-xl shadow-md p-6 border ${theme.border}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Top Performing Shops</h3>
          <div className="space-y-3">
            {['Fashion Hub - $45K', 'Tech Store - $38K', 'Home Decor - $27K', 'Gadget World - $22K'].map((shop, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className={theme.text}>{shop}</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${85 - i * 15}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}