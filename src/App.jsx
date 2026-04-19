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
  
  // Super admin routes
  if (activeRole === 'superadmin') {
    if (activePage === 'superadmin') return <SuperAdminDashboard />;
    if (activePage === 'superadmin-users') return <SuperAdminUsers />;
    if (activePage === 'superadmin-shops') return <SuperAdminShops />;
    if (activePage === 'superadmin-analytics') return <SuperAdminAnalytics />;
    if (activePage === 'superadmin-reports') return <SuperAdminReports />;
    if (activePage === 'superadmin-security') return <SuperAdminSecurity />;
    if (activePage === 'superadmin-settings') return <SuperAdminSettings />;
    if (activePage === 'superadmin-topshops') return <SuperAdminTopShops />;
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