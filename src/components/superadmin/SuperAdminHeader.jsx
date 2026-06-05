// components/superadmin/SuperAdminHeader.jsx
import React from 'react';
import { Shield, Download, Bell, User } from 'lucide-react';

export default function SuperAdminHeader({ theme, onExport }) {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${theme.text}`}>
            <Shield className="inline mr-3 mb-1" size={28} />
            Super Admin Dashboard
          </h1>
          <p className={`${theme.textSecondary} mt-2`}>Platform-wide analytics & management console</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onExport} className={`px-3 py-2 rounded-lg ${theme.cardHover} flex items-center gap-2 text-sm`}>
            <Download size={16} /> Export Report
          </button>
          <button className={`px-3 py-2 rounded-lg ${theme.cardHover} flex items-center gap-2 text-sm`}>
            <Bell size={16} /> Notifications
          </button>
        </div>
      </div>
    </div>
  );
}