// pages/SuperAdminSecurity.jsx
import React, { useState } from 'react';
import { useApp } from '../App';
import { Shield, Lock, Eye, EyeOff, AlertTriangle, CheckCircle, RefreshCw, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SuperAdminSecurity() {
  const { theme } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    ipWhitelisting: false,
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    passwordExpiry: '90'
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => { setIsSaving(false); toast.success('Security settings saved!'); }, 1000);
  };

  return (
    <div className="min-h-screen">
      <div className="mb-6"><h1 className={`text-3xl font-bold ${theme.text}`}><Shield className="inline mr-3 mb-1" size={28} />System Security</h1>
      <p className={`${theme.textSecondary} mt-2`}>Configure platform security settings</p></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${theme.card} rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 ${theme.text} flex items-center gap-2`}><Lock size={18} /> Security Settings</h3>
          <div className="space-y-4">
            {[{ key: 'twoFactorAuth', label: 'Two-Factor Authentication', desc: 'Require 2FA for all admin accounts' },
              { key: 'ipWhitelisting', label: 'IP Whitelisting', desc: 'Restrict access to specific IP addresses' }
            ].map(setting => (<div key={setting.key} className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5"><div><p className={`font-medium ${theme.text}`}>{setting.label}</p><p className={`text-xs ${theme.textSecondary}`}>{setting.desc}</p></div>
            <button onClick={() => setSettings({...settings, [setting.key]: !settings[setting.key]})} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all ${settings[setting.key] ? 'bg-blue-500' : 'bg-gray-400'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all ${settings[setting.key] ? 'translate-x-6' : 'translate-x-1'}`} /></button></div>))}
            <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Session Timeout (minutes)</label><input type="number" value={settings.sessionTimeout} onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /></div>
            <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Max Login Attempts</label><input type="number" value={settings.maxLoginAttempts} onChange={(e) => setSettings({...settings, maxLoginAttempts: e.target.value})} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} /></div>
          </div>
        </div>

        <div className={`${theme.card} rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 ${theme.text}`}>Recent Security Events</h3>
          <div className="space-y-3"><div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10"><AlertTriangle size={16} className="text-red-500" /><div><p className="text-sm font-medium">Failed Login Attempt</p><p className="text-xs opacity-75">IP: 192.168.1.1 • 2 minutes ago</p></div></div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10"><CheckCircle size={16} className="text-green-500" /><div><p className="text-sm font-medium">Security Scan Completed</p><p className="text-xs opacity-75">No threats found • 1 hour ago</p></div></div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10"><AlertTriangle size={16} className="text-yellow-500" /><div><p className="text-sm font-medium">New Admin Login</p><p className="text-xs opacity-75">From New York, USA • 3 hours ago</p></div></div></div>
        </div>
      </div>

      <div className="mt-6 flex justify-end"><button onClick={handleSave} disabled={isSaving} className={`${theme.primary} text-white px-6 py-2 rounded-lg flex items-center gap-2`}>{isSaving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}{isSaving ? 'Saving...' : 'Save Settings'}</button></div>
    </div>
  );
}