// components/Navbar.jsx - Complete Fixed Version with Admin/Super Admin Navigation
import React, { useState } from 'react';
import { useApp } from '../App';
import { 
  Home, Info, Store, Package, BookOpen, User, Heart, 
  ShoppingCart, Star, CreditCard, Settings, HelpCircle, 
  LogOut, BarChart3, Users, FileText, MessageCircle, 
  Calendar, Shield, Menu, X, ChevronDown, Palette,
  LayoutDashboard, TrendingUp, Award, Gift, Truck
} from 'lucide-react';

export default function Navbar() {
  const { 
    theme, currentTheme, setCurrentTheme, themeList,
    activeRole, setActiveRole, isLoggedIn, currentUser,
    cartItems, activePage, setActivePage, handleLogout
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [themesOpen, setThemesOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={18} />, roles: ['visitor', 'user', 'admin', 'superadmin'] },
    { id: 'about', label: 'About', icon: <Info size={18} />, roles: ['visitor', 'user', 'admin', 'superadmin'] },
    { id: 'shop', label: 'Shop Keeper', icon: <Store size={18} />, roles: ['visitor', 'user', 'admin', 'superadmin'] },
    { id: 'products', label: 'Products', icon: <Package size={18} />, roles: ['visitor', 'user', 'admin', 'superadmin'] },
    { id: 'blog', label: 'Blog', icon: <BookOpen size={18} />, roles: ['visitor', 'user', 'admin', 'superadmin'] },
  ];

  // Popular themes for quick access
  const popularThemes = [
    'midnight', 'charcoal', 'sunsetBlaze', 'oceanDeep', 
    'goldLuxury', 'neonCyber', 'pastelDream', 'vaporwave'
  ];

  // Profile Menu Items for regular users
  const profileMenuItems = [
    { icon: <User size={16} />, label: 'My Profile', page: 'profile', badge: null },
    { icon: <Heart size={16} />, label: 'My Orders', page: 'orders', badge: currentUser?.orderCount || 0 },
    { icon: <ShoppingCart size={16} />, label: 'Cart', page: 'cart', badge: cartItems },
    { icon: <Star size={16} />, label: 'Wishlist', page: 'wishlist', badge: '5' },
    { icon: <CreditCard size={16} />, label: 'Payments', page: 'payments', badge: null },
    { icon: <Settings size={16} />, label: 'Settings', page: 'settings', badge: null },
    { icon: <HelpCircle size={16} />, label: 'Help & Support', page: 'support', badge: null },
    { icon: <LogOut size={16} />, label: 'Logout', page: null, badge: null, danger: true, action: handleLogout },
  ];

  // Admin Menu Items for Shop Owners
  const adminMenuItems = [
    { icon: <LayoutDashboard size={16} />, label: 'Admin Dashboard', page: 'admin', badge: null, description: 'Shop Overview' },
    { icon: <Package size={16} />, label: 'Manage Products', page: 'admin-products', badge: '12', description: 'Add/Edit Products' },
    { icon: <ShoppingCart size={16} />, label: 'Manage Orders', page: 'admin-orders', badge: '8', description: 'Track Orders' },
    { icon: <Users size={16} />, label: 'Customers', page: 'admin-customers', badge: null, description: 'Customer List' },
    { icon: <TrendingUp size={16} />, label: 'Analytics', page: 'admin-analytics', badge: null, description: 'Sales Reports' },
    { icon: <Settings size={16} />, label: 'Shop Settings', page: 'admin-settings', badge: null, description: 'Store Config' },
    { icon: <Award size={16} />, label: 'Shop Performance', page: 'admin-performance', badge: '95%', description: 'Rating 4.8' },
    { icon: <LogOut size={16} />, label: 'Logout', page: null, badge: null, danger: true, action: handleLogout },
  ];

  // Super Admin Menu Items
  const superAdminMenuItems = [
    { icon: <LayoutDashboard size={16} />, label: 'Platform Dashboard', page: 'superadmin', badge: null, description: 'Global Overview' },
    { icon: <Users size={16} />, label: 'All Users', page: 'superadmin-users', badge: '1,234', description: 'Manage Users' },
    { icon: <Store size={16} />, label: 'All Shops', page: 'superadmin-shops', badge: '847', description: 'Shop Management' },
    { icon: <BarChart3 size={16} />, label: 'Revenue Analytics', page: 'superadmin-analytics', badge: null, description: 'Global Revenue' },
    { icon: <FileText size={16} />, label: 'Platform Reports', page: 'superadmin-reports', badge: '3', description: 'Monthly Reports' },
    { icon: <Shield size={16} />, label: 'System Security', page: 'superadmin-security', badge: null, description: 'Security Settings' },
    { icon: <Settings size={16} />, label: 'Global Settings', page: 'superadmin-settings', badge: null, description: 'Platform Config' },
    { icon: <Award size={16} />, label: 'Top Shops', page: 'superadmin-topshops', badge: 'Top 10', description: 'Leaderboard' },
    { icon: <LogOut size={16} />, label: 'Logout', page: null, badge: null, danger: true, action: handleLogout },
  ];

  const getMenuItems = () => {
    if (activeRole === 'superadmin') return superAdminMenuItems;
    if (activeRole === 'admin') return adminMenuItems;
    return profileMenuItems;
  };

  const handlePageChange = (page) => {
    console.log('Navigating to page:', page);
    setActivePage(page);
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };

  // Get menu title based on role
  const getMenuTitle = () => {
    if (activeRole === 'superadmin') return 'Super Admin Panel';
    if (activeRole === 'admin') return 'Shop Owner Panel';
    return 'My Account';
  };

  return (
    <nav className={`${theme.card} shadow-xl border-b ${theme.border} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handlePageChange('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Store className="text-white" size={20} />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${theme.text}`}>
                Mujah<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">SaaS</span>
              </h1>
              <p className={`text-xs ${theme.textSecondary}`}>Enterprise Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              (item.roles.includes(activeRole) || (!isLoggedIn && item.roles.includes('visitor'))) && (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    activePage === item.id 
                      ? `${theme.primary} text-white shadow-lg` 
                      : `${theme.textSecondary} hover:${theme.cardHover}`
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              )
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Role Selector Badge */}
            {isLoggedIn && (
              <div className="hidden sm:block">
                <div className={`px-3 py-1 rounded-lg ${theme.card} border ${theme.border} flex items-center gap-2`}>
                  <Shield size={14} className={
                    activeRole === 'superadmin' ? 'text-red-500' : 
                    activeRole === 'admin' ? 'text-purple-500' : 'text-blue-500'
                  } />
                  <span className={`text-sm ${theme.text} capitalize font-medium`}>
                    {activeRole === 'superadmin' ? 'Super Admin' : 
                     activeRole === 'admin' ? 'Shop Owner' : 'Customer'}
                  </span>
                </div>
              </div>
            )}

            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setThemesOpen(!themesOpen)}
                className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm flex items-center gap-2`}
              >
                <Palette size={16} />
                <span className="hidden sm:inline">Theme</span>
                <ChevronDown size={14} />
              </button>
              
              {themesOpen && (
                <div className={`absolute right-0 mt-2 w-72 ${theme.card} rounded-xl shadow-2xl border ${theme.border} z-50 overflow-hidden`}>
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <h3 className={`text-sm font-semibold ${theme.text}`}>Popular Themes</h3>
                  </div>
                  <div className="p-3 grid grid-cols-2 gap-2">
                    {popularThemes.map(t => {
                      const themeData = themeList.find(tl => tl.id === t);
                      return (
                        <button
                          key={t}
                          onClick={() => {
                            setCurrentTheme(t);
                            setThemesOpen(false);
                          }}
                          className={`px-3 py-2 rounded-lg text-left text-sm transition-all ${
                            currentTheme === t 
                              ? `${theme.primary} text-white` 
                              : `${theme.cardHover} ${theme.text}`
                          }`}
                        >
                          {themeData?.name || t}
                        </button>
                      );
                    })}
                  </div>
                  <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                    <select
                      value={currentTheme}
                      onChange={(e) => setCurrentTheme(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm cursor-pointer`}
                    >
                      {themeList.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                    activeRole === 'superadmin' ? 'from-red-500 to-orange-500' :
                    activeRole === 'admin' ? 'from-purple-500 to-pink-500' : 'from-blue-500 to-cyan-500'
                  } flex items-center justify-center text-white font-bold shadow-lg hover:scale-105 transition-transform`}
                >
                  {currentUser?.name?.charAt(0) || currentUser?.role?.charAt(0)?.toUpperCase() || 'U'}
                </button>
                
                {profileMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-80 ${theme.card} rounded-xl shadow-2xl border ${theme.border} z-50 overflow-hidden`}>
                    {/* User Info Header */}
                    <div className={`p-4 border-b ${theme.border} bg-gradient-to-r ${
                      activeRole === 'superadmin' ? 'from-red-500/10 to-orange-500/10' :
                      activeRole === 'admin' ? 'from-purple-500/10 to-pink-500/10' : 'from-blue-500/10 to-cyan-500/10'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${
                          activeRole === 'superadmin' ? 'from-red-500 to-orange-500' :
                          activeRole === 'admin' ? 'from-purple-500 to-pink-500' : 'from-blue-500 to-cyan-500'
                        } flex items-center justify-center text-white font-bold text-lg`}>
                          {currentUser?.name?.charAt(0) || currentUser?.role?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className={`font-semibold ${theme.text}`}>{currentUser?.name || 'User'}</p>
                          <p className={`text-xs ${theme.textSecondary}`}>{currentUser?.email || 'user@example.com'}</p>
                          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs mt-1 ${
                            activeRole === 'superadmin' ? 'bg-red-500/20 text-red-500' :
                            activeRole === 'admin' ? 'bg-purple-500/20 text-purple-500' : 'bg-blue-500/20 text-blue-500'
                          }`}>
                            <Shield size={10} />
                            <span className="capitalize">{activeRole}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-2 max-h-96 overflow-y-auto">
                      <div className="px-3 py-1">
                        <p className={`text-xs font-semibold uppercase tracking-wider ${theme.textSecondary} mb-1`}>
                          {getMenuTitle()}
                        </p>
                      </div>
                      {getMenuItems().map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (item.action) {
                              item.action();
                            } else if (item.page) {
                              handlePageChange(item.page);
                            }
                            setProfileMenuOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left flex items-center gap-3 transition-all group ${
                            item.danger 
                              ? 'text-red-500 hover:bg-red-500/10' 
                              : `${theme.textSecondary} hover:${theme.cardHover}`
                          }`}
                        >
                          <div className={`${item.danger ? 'text-red-500' : theme.textSecondary} group-hover:scale-110 transition-transform`}>
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium">{item.label}</span>
                            {item.description && (
                              <p className={`text-xs ${theme.textSecondary} opacity-75`}>{item.description}</p>
                            )}
                          </div>
                          {item.badge && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              item.danger ? 'bg-red-500/20 text-red-500' : `${theme.primary} text-white`
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <LoginModal />
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
            {navItems.map(item => (
              (item.roles.includes(activeRole) || (!isLoggedIn && item.roles.includes('visitor'))) && (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`w-full px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    activePage === item.id 
                      ? `${theme.primary} text-white` 
                      : `${theme.textSecondary} hover:${theme.cardHover}`
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              )
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Login Modal Component
function LoginModal() {
  const { theme, handleLogin } = useApp();
  const [showLogin, setShowLogin] = useState(false);
  const [selectedRole, setSelectedRole] = useState('user');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const roles = [
    { id: 'user', name: 'Customer', icon: '👤', color: 'blue', description: 'Browse and purchase products' },
    { id: 'admin', name: 'Shop Owner', icon: '🏪', color: 'purple', description: 'Manage your shop and products' },
    { id: 'superadmin', name: 'Super Admin', icon: '👑', color: 'red', description: 'Platform wide control' }
  ];

  const handleSubmit = () => {
    const userData = {
      name: userName || `${selectedRole} User`,
      email: userEmail || `${selectedRole}@example.com`,
      role: selectedRole,
      orderCount: selectedRole === 'user' ? 12 : 0,
      shopName: selectedRole === 'admin' ? 'My Awesome Shop' : undefined
    };
    handleLogin(selectedRole, userData);
    setShowLogin(false);
    setUserName('');
    setUserEmail('');
  };

  return (
    <>
      <button
        onClick={() => setShowLogin(true)}
        className={`${theme.primary} ${theme.primaryHover} text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl`}
      >
        Login / Sign Up
      </button>

      {showLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowLogin(false)}>
          <div className={`${theme.card} rounded-2xl max-w-md w-full p-6 shadow-2xl transform transition-all animate-slideUp`} onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-3">
                <Store size={32} className="text-white" />
              </div>
              <h2 className={`text-2xl font-bold ${theme.text}`}>Welcome to MujahSaaS</h2>
              <p className={`text-sm ${theme.textSecondary} mt-1`}>Select your role to continue</p>
            </div>
            
            <div className="space-y-3 mb-6">
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    selectedRole === role.id 
                      ? `border-${role.color}-500 bg-${role.color}-500/10 shadow-lg` 
                      : `${theme.border} hover:border-${role.color}-500/50`
                  }`}
                >
                  <span className="text-3xl">{role.icon}</span>
                  <div className="flex-1 text-left">
                    <p className={`font-semibold ${theme.text}`}>{role.name}</p>
                    <p className={`text-xs ${theme.textSecondary}`}>{role.description}</p>
                  </div>
                  {selectedRole === role.id && (
                    <div className={`w-5 h-5 rounded-full bg-${role.color}-500 flex items-center justify-center`}>
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Optional Name/Email Inputs */}
            <div className="space-y-3 mb-6">
              <input
                type="text"
                placeholder="Your Name (optional)"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            
            <button
              onClick={handleSubmit}
              className={`w-full ${theme.primary} ${theme.primaryHover} text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2`}
            >
              Continue as {roles.find(r => r.id === selectedRole)?.name}
              <ArrowRight size={18} />
            </button>
            
            <button
              onClick={() => setShowLogin(false)}
              className={`w-full mt-3 py-3 rounded-xl ${theme.textSecondary} hover:bg-white/10 transition-all`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Import missing icons
import {  Check, ArrowRight } from 'lucide-react';