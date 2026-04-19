// components/ShopSettings.jsx
import React, { useContext, useState } from 'react';
import { ThemeContext } from './ThemeContext';

export default function ShopSettings() {
  const { theme } = useContext(ThemeContext);
  const [settings, setSettings] = useState({
    shopName: 'Mujah Fashion Store',
    email: 'contact@mujahstore.com',
    currency: 'USD',
    taxRate: '10'
  });
  
  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="mb-12">
      <h2 className={`text-2xl font-bold mb-6 ${theme.text}`}>
        <i className="fas fa-sliders-h mr-2"></i>
        Shop Settings
      </h2>
      <div className={`${theme.card} rounded-xl shadow-md p-6 border ${theme.border}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${theme.text} mb-2`}>Shop Name</label>
            <input
              type="text"
              name="shopName"
              value={settings.shopName}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:ring-2 focus:ring-blue-500 outline-none`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${theme.text} mb-2`}>Contact Email</label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:ring-2 focus:ring-blue-500 outline-none`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${theme.text} mb-2`}>Currency</label>
            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:ring-2 focus:ring-blue-500 outline-none`}
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium ${theme.text} mb-2`}>Tax Rate (%)</label>
            <input
              type="text"
              name="taxRate"
              value={settings.taxRate}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:ring-2 focus:ring-blue-500 outline-none`}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}