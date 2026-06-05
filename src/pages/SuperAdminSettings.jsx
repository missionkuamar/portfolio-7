// pages/SuperAdminSettings.jsx
import React, { useState } from 'react';
import { useApp } from '../App';
import { Settings, Globe, Mail, Bell, DollarSign, Percent, Save, RefreshCw, Shield, Database } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SuperAdminSettings() {
  const { theme } = useApp();
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    platformName: 'MujahSaaS',
    platformEmail: 'admin@mujahsaas.com',
    platformCurrency: 'USD',
    platformFee: '2.9',
    transactionFee: '0.30',
    maintenanceMode: false,
    emailNotifications: true
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => { setIsSaving(false); toast.success('Platform settings saved!'); }, 1000);
  };

  return (
    <div className="min-h-screen">
      <div className="mb-6"><h1 className={`text-3xl font-bold ${theme.text}`}><Settings className="inline mr-3 mb-1" size={28} />Global Settings</h1>
      <p className={`${theme.textSecondary} mt-2`}>Configure platform-wide settings</p></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${theme.card} rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 ${theme.text} flex items-center gap-2`}><Globe size={18} /> General Settings</h3>
          <div className="space-y-4"><div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Platform Name</label><input type="text" value={settings.platformName} onChange={(e) => setSettings({...settings, platformName: e.target.value})} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /></div>
          <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Platform Email</label><input type="email" value={settings.platformEmail} onChange={(e) => setSettings({...settings, platformEmail: e.target.value})} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /></div>
          <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Default Currency</label><select value={settings.platformCurrency} onChange={(e) => setSettings({...settings, platformCurrency: e.target.value})} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}><option>USD</option><option>EUR</option><option>GBP</option><option>CAD</option></select></div></div>
        </div>

        <div className={`${theme.card} rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 ${theme.text} flex items-center gap-2`}><DollarSign size={18} /> Fee Settings</h3>
          <div className="space-y-4"><div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Platform Fee (%)</label><input type="number" step="0.1" value={settings.platformFee} onChange={(e) => setSettings({...settings, platformFee: e.target.value})} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /></div>
          <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Transaction Fee ($)</label><input type="number" step="0.01" value={settings.transactionFee} onChange={(e) => setSettings({...settings, transactionFee: e.target.value})} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /></div></div>
        </div>
      </div>

      <div className="mt-6 flex justify-end"><button onClick={handleSave} disabled={isSaving} className={`${theme.primary} text-white px-6 py-2 rounded-lg flex items-center gap-2`}>{isSaving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}{isSaving ? 'Saving...' : 'Save Settings'}</button></div>
    </div>
  );
}