// pages/ProfilePage.jsx
import React from 'react';
import { useApp } from '../App';
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit2 } from 'lucide-react';

export default function ProfilePage() {
  const { theme, currentUser } = useApp();

  const userProfile = {
    name: currentUser?.name || 'John Doe',
    email: currentUser?.email || 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Business Street, Tech City, TC 12345',
    joined: 'January 2024',
    role: currentUser?.role || 'User',
    avatar: 'JD'
  };

  return (
    <div>
      <h1 className={`text-3xl font-bold mb-6 ${theme.text}`}>
        <User className="inline mr-3 mb-1" size={28} />
        My Profile
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className={`${theme.card} rounded-xl shadow-xl p-6 text-center border ${theme.border}`}>
          <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${theme.accent} flex items-center justify-center text-white text-3xl font-bold mb-4`}>
            {userProfile.avatar}
          </div>
          <h2 className={`text-xl font-bold ${theme.text}`}>{userProfile.name}</h2>
          <p className={`text-sm ${theme.textSecondary} mb-4`}>{userProfile.role}</p>
          <div className={`flex justify-center gap-2 pt-4 border-t ${theme.border}`}>
            <button className={`px-4 py-2 rounded-lg ${theme.primary} text-white text-sm flex items-center gap-2`}>
              <Edit2 size={14} /> Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className={`lg:col-span-2 ${theme.card} rounded-xl shadow-xl p-6 border ${theme.border}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Personal Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <Mail size={18} className={theme.textSecondary} />
              <div>
                <p className={`text-xs ${theme.textSecondary}`}>Email Address</p>
                <p className={theme.text}>{userProfile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <Phone size={18} className={theme.textSecondary} />
              <div>
                <p className={`text-xs ${theme.textSecondary}`}>Phone Number</p>
                <p className={theme.text}>{userProfile.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <MapPin size={18} className={theme.textSecondary} />
              <div>
                <p className={`text-xs ${theme.textSecondary}`}>Address</p>
                <p className={theme.text}>{userProfile.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <Calendar size={18} className={theme.textSecondary} />
              <div>
                <p className={`text-xs ${theme.textSecondary}`}>Member Since</p>
                <p className={theme.text}>{userProfile.joined}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <Shield size={18} className={theme.textSecondary} />
              <div>
                <p className={`text-xs ${theme.textSecondary}`}>Account Type</p>
                <p className={`font-semibold ${theme.text}`}>{userProfile.role.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}