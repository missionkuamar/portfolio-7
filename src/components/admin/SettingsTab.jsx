// components/admin/SettingsTab.jsx
import React, { useState } from 'react';
import { Save, RefreshCw, Settings , Eye, EyeOff, Shield, Bell, Mail, Lock, Globe, CreditCard, Truck, Package, Percent, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SettingsTab({ theme, shopData }) {
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('general');
  
  // Shop Settings
  const [shopSettings, setShopSettings] = useState({
    shopName: shopData?.name || 'Mujah Fashion Store',
    ownerName: shopData?.owner || 'Admin User',
    email: 'admin@mujahstore.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Street, New York, NY 10001',
    currency: 'USD',
    timezone: 'America/New_York',
    taxRate: '10',
    shippingCost: '5.99',
    freeShippingThreshold: '50'
  });

  // Password Settings
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    orderEmails: true,
    customerEmails: true,
    lowStockAlerts: true,
    weeklyReports: true,
    marketingEmails: false,
    smsNotifications: true
  });

  const subTabs = [
    { id: 'general', label: 'General Settings', icon: <Settings size={16} /> },
    { id: 'password', label: 'Security', icon: <Shield size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'shipping', label: 'Shipping', icon: <Truck size={16} /> },
    { id: 'payment', label: 'Payments', icon: <CreditCard size={16} /> }
  ];

  const handleSaveGeneral = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('shop_settings', JSON.stringify(shopSettings));
      setIsSaving(false);
      toast.success('Settings saved successfully!');
    }, 1000);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters!');
      return;
    }
    toast.success('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-bold ${theme.text}`}>Shop Settings</h2>
        <p className={`text-sm ${theme.textSecondary} mt-1`}>Manage your store configuration and preferences</p>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
        {subTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeSubTab === tab.id 
                ? `${theme.primary} text-white shadow-md` 
                : `${theme.textSecondary} hover:${theme.cardHover}`
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeSubTab === 'general' && (
        <div className={`${theme.card} rounded-xl p-6`}>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Shop Name</label>
                <input type="text" value={shopSettings.shopName} onChange={(e) => setShopSettings({...shopSettings, shopName: e.target.value})} 
                  className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Owner Name</label>
                <input type="text" value={shopSettings.ownerName} onChange={(e) => setShopSettings({...shopSettings, ownerName: e.target.value})} 
                  className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Email Address</label>
                <input type="email" value={shopSettings.email} onChange={(e) => setShopSettings({...shopSettings, email: e.target.value})} 
                  className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Phone Number</label>
                <input type="tel" value={shopSettings.phone} onChange={(e) => setShopSettings({...shopSettings, phone: e.target.value})} 
                  className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Currency</label>
                <select value={shopSettings.currency} onChange={(e) => setShopSettings({...shopSettings, currency: e.target.value})} 
                  className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Time Zone</label>
                <select value={shopSettings.timezone} onChange={(e) => setShopSettings({...shopSettings, timezone: e.target.value})} 
                  className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Tax Rate (%)</label>
                <input type="number" value={shopSettings.taxRate} onChange={(e) => setShopSettings({...shopSettings, taxRate: e.target.value})} 
                  className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Business Address</label>
              <textarea value={shopSettings.address} onChange={(e) => setShopSettings({...shopSettings, address: e.target.value})} 
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} rows={3}></textarea>
            </div>
            <div className="flex justify-end">
              <button onClick={handleSaveGeneral} disabled={isSaving} 
                className={`${theme.primary} text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50`}>
                {isSaving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password/Security Settings */}
      {activeSubTab === 'password' && (
        <div className={`${theme.card} rounded-xl p-6`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text} flex items-center gap-2`}>
            <Lock size={18} /> Change Password
          </h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Current Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} 
                  className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} pr-10`} />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>New Password</label>
              <input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} 
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Confirm New Password</label>
              <input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} 
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
            </div>
            <button onClick={handleChangePassword} className={`${theme.primary} text-white px-6 py-2 rounded-lg`}>
              Update Password
            </button>
          </div>

          {/* Two Factor Authentication */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Shield size={20} className="text-blue-500" />
                </div>
                <div>
                  <p className={`font-medium ${theme.text}`}>Two-Factor Authentication</p>
                  <p className={`text-xs ${theme.textSecondary}`}>Add an extra layer of security to your account</p>
                </div>
              </div>
              <button className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600">Enable 2FA</button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings */}
      {activeSubTab === 'notifications' && (
        <div className={`${theme.card} rounded-xl p-6`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { key: 'orderEmails', label: 'Order Confirmation Emails', desc: 'Send email when customer places an order' },
              { key: 'customerEmails', label: 'Customer Welcome Emails', desc: 'Send welcome email to new customers' },
              { key: 'lowStockAlerts', label: 'Low Stock Alerts', desc: 'Get notified when products are low in stock' },
              { key: 'weeklyReports', label: 'Weekly Performance Reports', desc: 'Receive weekly analytics reports' },
              { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive marketing tips and updates' },
              { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Get SMS alerts for important events' }
            ].map(setting => (
              <div key={setting.key} className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5">
                <div>
                  <p className={`font-medium ${theme.text}`}>{setting.label}</p>
                  <p className={`text-xs ${theme.textSecondary}`}>{setting.desc}</p>
                </div>
                <button onClick={() => setNotificationSettings({...notificationSettings, [setting.key]: !notificationSettings[setting.key]})} 
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all ${notificationSettings[setting.key] ? 'bg-blue-500' : 'bg-gray-400'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all ${notificationSettings[setting.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shipping Settings */}
      {activeSubTab === 'shipping' && (
        <div className={`${theme.card} rounded-xl p-6`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Shipping Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Standard Shipping Cost ($)</label>
              <input type="number" value={shopSettings.shippingCost} onChange={(e) => setShopSettings({...shopSettings, shippingCost: e.target.value})} 
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Free Shipping Threshold ($)</label>
              <input type="number" value={shopSettings.freeShippingThreshold} onChange={(e) => setShopSettings({...shopSettings, freeShippingThreshold: e.target.value})} 
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className={`text-sm ${theme.textSecondary}`}>
              <AlertCircle size={16} className="inline mr-2 text-blue-500" />
              Free shipping will be automatically applied for orders over ${shopSettings.freeShippingThreshold}
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={handleSaveGeneral} className={`${theme.primary} text-white px-6 py-2 rounded-lg`}>Save Shipping Settings</button>
          </div>
        </div>
      )}

      {/* Payment Settings */}
      {activeSubTab === 'payment' && (
        <div className={`${theme.card} rounded-xl p-6`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Payment Gateways</h3>
          <div className="space-y-4">
            {[
              { key: 'stripe', label: 'Stripe', icon: '💳', desc: 'Accept credit card payments' },
              { key: 'paypal', label: 'PayPal', icon: '💰', desc: 'Accept PayPal payments' },
              { key: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Allow cash on delivery option' }
            ].map(gateway => (
              <div key={gateway.key} className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{gateway.icon}</span>
                  <div>
                    <p className={`font-medium ${theme.text}`}>{gateway.label}</p>
                    <p className={`text-xs ${theme.textSecondary}`}>{gateway.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${theme.textSecondary}`}>Enabled</span>
                  <div className="w-10 h-5 rounded-full bg-green-500 relative">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Stripe Secret Key</label>
            <input type="password" placeholder="sk_live_xxxxxxxxxxxxx" className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
            <label className={`block text-sm font-medium mt-4 mb-2 ${theme.text}`}>PayPal Client ID</label>
            <input type="password" placeholder="xxxxxxxxxxxxx" className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
          </div>
        </div>
      )}
    </div>
  );
}