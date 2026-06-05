// pages/SuperAdminReports.jsx
import React, { useState } from 'react';
import { useApp } from '../App';
import { FileText, Download, Calendar, Filter, Eye, TrendingUp, DollarSign, Users, Store } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SuperAdminReports() {
  const { theme } = useApp();
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState('month');

  const reports = [
    { id: 1, name: 'Monthly Revenue Report', date: '2024-01-31', type: 'revenue', size: '2.4 MB', status: 'Ready' },
    { id: 2, name: 'User Growth Analysis', date: '2024-01-31', type: 'users', size: '1.8 MB', status: 'Ready' },
    { id: 3, name: 'Shop Performance Report', date: '2024-01-30', type: 'shops', size: '3.1 MB', status: 'Ready' },
    { id: 4, name: 'Platform Analytics Q4', date: '2024-01-25', type: 'analytics', size: '5.2 MB', status: 'Ready' },
  ];

  const handleDownload = (report) => {
    toast.success(`Downloading ${report.name}...`);
  };

  const handleGenerateReport = () => {
    toast.success(`Generating ${reportType} report for ${dateRange}...`);
  };

  return (
    <div className="min-h-screen">
      <div className="mb-6"><h1 className={`text-3xl font-bold ${theme.text}`}><FileText className="inline mr-3 mb-1" size={28} />Platform Reports</h1>
      <p className={`${theme.textSecondary} mt-2`}>Generate and download platform reports</p></div>

      <div className={`${theme.card} rounded-xl p-6 mb-6 border ${theme.border}`}>
        <h3 className={`font-semibold mb-4 ${theme.text}`}>Generate New Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select value={reportType} onChange={(e) => setReportType(e.target.value)} className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}>
            <option value="revenue">Revenue Report</option><option value="users">User Report</option><option value="shops">Shops Report</option><option value="analytics">Analytics Report</option>
          </select>
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}>
            <option value="week">Last 7 Days</option><option value="month">Last 30 Days</option><option value="quarter">Last Quarter</option><option value="year">Last Year</option>
          </select>
          <button onClick={handleGenerateReport} className={`${theme.primary} text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2`}><Download size={18} /> Generate Report</button>
        </div>
      </div>

      <div className={`${theme.card} rounded-xl overflow-hidden border ${theme.border}`}>
        <div className="p-5 border-b border-gray-200 dark:border-gray-700"><h3 className={`font-semibold ${theme.text}`}>Generated Reports</h3></div>
        <div className="overflow-x-auto"><table className="w-full"><thead className={`${theme.border} border-b`}><tr className={`text-left text-sm ${theme.textSecondary}`}><th className="p-4">Report Name</th><th className="p-4">Date</th><th className="p-4">Size</th><th className="p-4">Status</th><th className="p-4">Action</th></tr></thead>
        <tbody>{reports.map((report) => (<tr key={report.id} className={`border-b ${theme.border} hover:bg-white/5`}><td className={`p-4 font-medium ${theme.text}`}>{report.name}</td><td className={`p-4 ${theme.textSecondary}`}>{report.date}</td><td className={`p-4 ${theme.textSecondary}`}>{report.size}</td><td className="p-4"><span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-600">{report.status}</span></td><td className="p-4"><button onClick={() => handleDownload(report)} className={`p-1 rounded ${theme.cardHover}`}><Download size={16} /></button></td></tr>))}</tbody></table></div>
      </div>
    </div>
  );
}