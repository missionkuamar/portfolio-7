// pages/SuperAdminDashboard.jsx - Main Component
import React, { useState } from 'react';
import { useApp } from '../App';
import { Toaster } from 'react-hot-toast';
import SuperAdminHeader from '../components/superadmin/SuperAdminHeader';
import SuperAdminStats from '../components/superadmin/SuperAdminStats';
import ShopsTable from '../components/superadmin/ShopsTable';
import { Activity, Globe, FileText, Mail, Bell, Download } from 'lucide-react';

export default function SuperAdminDashboard() {
  const { theme } = useApp();
  const [shops, setShops] = useState([
    { id: 1, name: 'Fashion Hub', owner: 'Alice Cooper', email: 'alice@fashionhub.com', phone: '+1 234-567-8900', address: '123 Fashion St, NY', revenue: '$45,230', products: 234, status: 'Active', verificationStatus: 'Verified', registeredDate: '2023-01-15', rating: 4.8 },
    { id: 2, name: 'Tech Store', owner: 'Bob Martin', email: 'bob@techstore.com', phone: '+1 234-567-8901', address: '456 Tech Ave, SF', revenue: '$38,120', products: 156, status: 'Active', verificationStatus: 'Verified', registeredDate: '2023-02-20', rating: 4.9 },
    { id: 3, name: 'Home Decor', owner: 'Carol Davis', email: 'carol@homedecor.com', phone: '+1 234-567-8902', address: '789 Home Rd, LA', revenue: '$27,890', products: 89, status: 'Inactive', verificationStatus: 'Pending', registeredDate: '2023-03-10', rating: 4.7 },
    { id: 4, name: 'Gadget World', owner: 'David Lee', email: 'david@gadgetworld.com', phone: '+1 234-567-8903', address: '321 Gadget Ln, Chicago', revenue: '$22,450', products: 178, status: 'Active', verificationStatus: 'Verified', registeredDate: '2023-04-05', rating: 4.8 },
    { id: 5, name: 'Sports Gear', owner: 'Emma Wilson', email: 'emma@sportsgear.com', phone: '+1 234-567-8904', address: '654 Sports Dr, Boston', revenue: '$18,670', products: 67, status: 'Pending', verificationStatus: 'Pending', registeredDate: '2023-05-12', rating: 4.6 },
    { id: 6, name: 'Beauty Bliss', owner: 'Sophia Chen', email: 'sophia@beautybliss.com', phone: '+1 234-567-8905', address: '987 Beauty Blvd, Miami', revenue: '$34,200', products: 234, status: 'Active', verificationStatus: 'Verified', registeredDate: '2023-01-28', rating: 4.9 },
    { id: 7, name: 'Auto Parts Pro', owner: 'Mike Ross', email: 'mike@autoparts.com', phone: '+1 234-567-8906', address: '147 Auto St, Detroit', revenue: '$56,780', products: 345, status: 'Active', verificationStatus: 'Verified', registeredDate: '2022-12-01', rating: 4.7 },
  ]);

  const stats = {
    totalRevenue: '$2,847,392',
    activeShops: shops.filter(s => s.status === 'Active').length,
    totalUsers: '15,342',
    platformFee: '$142,890',
    totalOrders: '45,231',
    avgRating: '4.7'
  };

  const handleExportReport = () => {
    const data = JSON.stringify(shops, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `shops_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Report exported!');
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <SuperAdminHeader theme={theme} onExport={handleExportReport} />
      <SuperAdminStats theme={theme} stats={stats} />
      
      {/* Platform Metrics & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`${theme.card} rounded-xl p-6 border ${theme.border}`}>
          <h3 className={`font-semibold mb-4 ${theme.text} flex items-center gap-2`}><Activity size={18} /> Platform Performance</h3>
          <div className="space-y-4">
            {[
              { metric: 'Monthly Active Users', value: '8,234', change: '+12%' },
              { metric: 'Avg Order Value', value: '$87', change: '+5%' },
              { metric: 'Conversion Rate', value: '3.2%', change: '+0.4%' },
              { metric: 'Customer Lifetime', value: '$1,234', change: '+8%' },
            ].map((metric, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className={theme.textSecondary}>{metric.metric}</span>
                <div className="flex items-center gap-3"><span className={`font-semibold ${theme.text}`}>{metric.value}</span><span className="text-xs text-green-500">{metric.change}</span></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`${theme.card} rounded-xl p-6 border ${theme.border}`}>
          <h3 className={`font-semibold mb-4 ${theme.text} flex items-center gap-2`}><Globe size={18} /> Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className={`p-3 rounded-lg ${theme.cardHover} text-left transition-all`}><FileText size={20} className="mb-2" /><p className="text-sm font-semibold">Generate Report</p></button>
            <button className={`p-3 rounded-lg ${theme.cardHover} text-left transition-all`}><Mail size={20} className="mb-2" /><p className="text-sm font-semibold">Email Users</p></button>
            <button className={`p-3 rounded-lg ${theme.cardHover} text-left transition-all`}><Bell size={20} className="mb-2" /><p className="text-sm font-semibold">Announcement</p></button>
            <button className={`p-3 rounded-lg ${theme.cardHover} text-left transition-all`}><Download size={20} className="mb-2" /><p className="text-sm font-semibold">Export Data</p></button>
          </div>
        </div>
      </div>
      
      {/* Shops Table */}
      <ShopsTable theme={theme} shops={shops} setShops={setShops} />
    </div>
  );
}

import { toast } from 'react-hot-toast';