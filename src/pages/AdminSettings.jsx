// pages/AdminSettings.jsx - Complete Settings Page
import React, { useState } from 'react';
import { useApp } from '../App';
import { 
  Settings, Store, User, Mail, Phone, MapPin, Globe, 
  CreditCard, Shield, Bell, Lock, Palette, Save, RefreshCw,
  Truck, Package, DollarSign, Percent, Clock, Calendar,
 
  Upload, Image, Check, X, AlertCircle
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function AdminSettings() {
  const { theme, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // Shop Settings
  const [shopSettings, setShopSettings] = useState({
    shopName: currentUser?.shopName || 'Mujah Fashion Store',
    shopEmail: 'shop@mujahfashion.com',
    shopPhone: '+1 (555) 123-4567',
    shopAddress: '123 Business Street, New York, NY 10001',
    shopDescription: 'Premium fashion and accessories store',
    currency: 'USD',
    timezone: 'America/New_York',
    taxRate: '10',
    shippingCost: '5.99',
    freeShippingThreshold: '50'
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

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: true,
    cashOnDelivery: true,
    stripeKey: 'pk_test_xxxxxxxxxxxxx',
    paypalClientId: 'xxxxxxxxxxxxx'
  });

  const menuItems = [
    { id: 'general', label: 'General', icon: <Store size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={18} /> },
    { id: 'shipping', label: 'Shipping', icon: <Truck size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('shop_settings', JSON.stringify(shopSettings));
      localStorage.setItem('notification_settings', JSON.stringify(notificationSettings));
      localStorage.setItem('payment_settings', JSON.stringify(paymentSettings));
      setIsSaving(false);
      toast.success('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-2xl sm:text-3xl font-bold ${theme.text}`}>
          <Settings className="inline mr-3 mb-1" size={28} />
          Shop Settings
        </h1>
        <p className={`text-sm ${theme.textSecondary} mt-1`}>Manage your store configuration and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Menu */}
        <div className={`lg:w-64 ${theme.card} rounded-xl p-4 h-fit sticky top-24`}>
          <nav className="space-y-1">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  activeTab === item.id 
                    ? `${theme.primary} text-white shadow-md` 
                    : `${theme.textSecondary} hover:${theme.cardHover}`
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className={`${theme.card} rounded-xl p-6`}>
              <h2 className={`text-xl font-bold mb-4 ${theme.text}`}>General Settings</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Shop Name</label>
                    <input type="text" value={shopSettings.shopName} onChange={(e) => setShopSettings({...shopSettings, shopName: e.target.value})} 
                      className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Shop Email</label>
                    <input type="email" value={shopSettings.shopEmail} onChange={(e) => setShopSettings({...shopSettings, shopEmail: e.target.value})} 
                      className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Phone Number</label>
                    <input type="tel" value={shopSettings.shopPhone} onChange={(e) => setShopSettings({...shopSettings, shopPhone: e.target.value})} 
                      className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
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
                  <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Shop Description</label>
                  <textarea value={shopSettings.shopDescription} onChange={(e) => setShopSettings({...shopSettings, shopDescription: e.target.value})} 
                    className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} rows={3}></textarea>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Business Address</label>
                  <textarea value={shopSettings.shopAddress} onChange={(e) => setShopSettings({...shopSettings, shopAddress: e.target.value})} 
                    className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} rows={2}></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className={`${theme.card} rounded-xl p-6`}>
              <h2 className={`text-xl font-bold mb-4 ${theme.text}`}>Notification Preferences</h2>
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

          {/* Payment Settings */}
          {activeTab === 'payments' && (
            <div className={`${theme.card} rounded-xl p-6`}>
              <h2 className={`text-xl font-bold mb-4 ${theme.text}`}>Payment Gateways</h2>
              <div className="space-y-6">
                {[
                  { key: 'stripeEnabled', label: 'Stripe', icon: '💳', desc: 'Accept credit card payments' },
                  { key: 'paypalEnabled', label: 'PayPal', icon: '💰', desc: 'Accept PayPal payments' },
                  { key: 'cashOnDelivery', label: 'Cash on Delivery', icon: '💵', desc: 'Allow cash on delivery option' }
                ].map(gateway => (
                  <div key={gateway.key} className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{gateway.icon}</span>
                      <div>
                        <p className={`font-medium ${theme.text}`}>{gateway.label}</p>
                        <p className={`text-xs ${theme.textSecondary}`}>{gateway.desc}</p>
                      </div>
                    </div>
                    <button onClick={() => setPaymentSettings({...paymentSettings, [gateway.key]: !paymentSettings[gateway.key]})} 
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all ${paymentSettings[gateway.key] ? 'bg-blue-500' : 'bg-gray-400'}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all ${paymentSettings[gateway.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
                
                {paymentSettings.stripeEnabled && (
                  <div className="mt-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Stripe Secret Key</label>
                    <input type="password" value={paymentSettings.stripeKey} onChange={(e) => setPaymentSettings({...paymentSettings, stripeKey: e.target.value})} 
                      className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
                  </div>
                )}
                
                {paymentSettings.paypalEnabled && (
                  <div className="mt-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <label className={`block text-sm font-medium mb-2 ${theme.text}`}>PayPal Client ID</label>
                    <input type="password" value={paymentSettings.paypalClientId} onChange={(e) => setPaymentSettings({...paymentSettings, paypalClientId: e.target.value})} 
                      className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Shipping Settings */}
          {activeTab === 'shipping' && (
            <div className={`${theme.card} rounded-xl p-6`}>
              <h2 className={`text-xl font-bold mb-4 ${theme.text}`}>Shipping Settings</h2>
              <div className="space-y-4">
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
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className={`text-sm ${theme.textSecondary}`}>
                    <AlertCircle size={16} className="inline mr-2 text-blue-500" />
                    Free shipping will be automatically applied for orders over ${shopSettings.freeShippingThreshold}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className={`${theme.card} rounded-xl p-6`}>
              <h2 className={`text-xl font-bold mb-4 ${theme.text}`}>Security Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Current Password</label>
                  <input type="password" placeholder="Enter current password" className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme.text}`}>New Password</label>
                  <input type="password" placeholder="Enter new password" className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5">
                  <Shield size={20} className="text-green-500" />
                  <div>
                    <p className={`font-medium ${theme.text}`}>Two-Factor Authentication</p>
                    <p className={`text-xs ${theme.textSecondary}`}>Add an extra layer of security to your account</p>
                  </div>
                  <button className="ml-auto px-4 py-1 rounded-lg bg-blue-500 text-white text-sm">Enable</button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className={`${theme.card} rounded-xl p-6`}>
              <h2 className={`text-xl font-bold mb-4 ${theme.text}`}>Store Appearance</h2>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Store Logo</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                    <p className={`text-sm ${theme.textSecondary}`}>Click or drag to upload logo</p>
                    <button className="mt-2 px-4 py-1 rounded-lg bg-blue-500 text-white text-sm">Upload Image</button>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Store Banner</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <Image size={32} className="mx-auto mb-2 text-gray-400" />
                    <p className={`text-sm ${theme.textSecondary}`}>Recommended size: 1200 x 400px</p>
                    <button className="mt-2 px-4 py-1 rounded-lg bg-blue-500 text-white text-sm">Upload Banner</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <button onClick={handleSave} disabled={isSaving} 
              className={`${theme.primary} text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50`}>
              {isSaving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
              {isSaving ? 'Saving...' : 'Save All Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}