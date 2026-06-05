// App.jsx - Update with Admin Route
import React, { useState, createContext, useContext, useEffect } from 'react';
import { themes, themeList } from './themes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import ProductsPage from './pages/ProductsPage';
import BlogPage from './pages/BlogPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import PaymentsPage from './pages/PaymentsPage';
import SettingsPage from './pages/SettingsPage';
import SupportPage from './pages/SupportPage';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminCustomers from './pages/AdminCustomers';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminSettings from './pages/AdminSettings';
import StartFreeTrial from './pages/StartFreeTrial';
import BlogPostPage from './pages/BlogPostPage';

import SuperAdminUsers from './pages/SuperAdminUsers';
import SuperAdminShops from './pages/SuperAdminShops';
import SuperAdminAnalytics from './pages/SuperAdminAnalytics';
import SuperAdminReports from './pages/SuperAdminReports';
import SuperAdminSecurity from './pages/SuperAdminSecurity';
import SuperAdminSettings from './pages/SuperAdminSettings';
import SuperAdminTopShops from './pages/SuperAdminTopShops';

export const AppContext = createContext();

export const useApp = () => useContext(AppContext);

function App() {
  const [currentTheme, setCurrentTheme] = useState('midnight');
  const [activeRole, setActiveRole] = useState('visitor');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState(0);
  const [activePage, setActivePage] = useState('home');
  
  const theme = themes[currentTheme];

  const handleLogin = (role, userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    setActiveRole(role);
    setActivePage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveRole('visitor');
    setCartItems(0);
    setActivePage('home');
  };

  // App.jsx - Update the renderPage function
const renderPage = () => {

  // Check for blog post route
  if (activePage === 'blog-post') {
    const selectedPost = JSON.parse(localStorage.getItem('selectedBlogPost') || '{}');
    return <BlogPostPage post={selectedPost} />;
  }

    // Check for trial route
  if (activePage === 'trial') {
    return <StartFreeTrial />;
  }
  // Admin routes for shop owners
  if (activeRole === 'admin') {
    if (activePage === 'admin') return <AdminDashboard />;
    if (activePage === 'admin-products') return <AdminProducts />;
    if (activePage === 'admin-orders') return <AdminOrders />;
    if (activePage === 'admin-customers') return <AdminCustomers />;
    if (activePage === 'admin-analytics') return <AdminAnalytics />;
    if (activePage === 'admin-settings') return <AdminSettings />;
    if (activePage === 'admin-performance') return <AdminPerformance />;
  }
  
  // Then in your super admin routes section, add:
if (activeRole === 'superadmin') {
  switch(activePage) {
    case 'superadmin': return <SuperAdminDashboard />;
    case 'superadmin-users': return <SuperAdminUsers />;
    case 'superadmin-shops': return <SuperAdminShops />;
    case 'superadmin-analytics': return <SuperAdminAnalytics />;
    case 'superadmin-reports': return <SuperAdminReports />;
    case 'superadmin-security': return <SuperAdminSecurity />;
    case 'superadmin-settings': return <SuperAdminSettings />;
    case 'superadmin-topshops': return <SuperAdminTopShops />;
    default: return <SuperAdminDashboard />;
  }
}
  
  // Regular pages
  switch(activePage) {
    case 'home': return <HomePage />;
    case 'about': return <AboutPage />;
    case 'shop': return <ShopPage />;
    case 'products': return <ProductsPage />;
    case 'blog': return <BlogPage />;
    case 'profile': return <ProfilePage />;
    case 'orders': return <OrdersPage />;
    case 'cart': return <CartPage />;
    case 'wishlist': return <WishlistPage />;
    case 'payments': return <PaymentsPage />;
    case 'settings': return <SettingsPage />;
    case 'support': return <SupportPage />;
    default: return <HomePage />;
  }
};

  return (
    <AppContext.Provider value={{
      theme, currentTheme, setCurrentTheme,
      activeRole, setActiveRole,
      isLoggedIn, setIsLoggedIn,
      currentUser, setCurrentUser,
      cartItems, setCartItems,
      activePage, setActivePage,
      handleLogin, handleLogout,
      themeList
    }}>
      <div className={`min-h-screen transition-all duration-500 ${theme.bg}`}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;