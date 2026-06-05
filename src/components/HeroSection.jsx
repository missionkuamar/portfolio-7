// components/HeroSection.jsx
import React from 'react';
import { useApp } from '../App';
import { Sparkles, Play, ArrowRight, Rocket } from 'lucide-react';

export default function HeroSection() {
  const { theme, setActivePage } = useApp();

  return (
    <div className={`relative rounded-3xl overflow-hidden ${theme.gradient} shadow-2xl animate-on-scroll`} id="hero">
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 px-6 py-20 sm:py-28 sm:px-12 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-bounce">
          <Sparkles size={16} className="text-yellow-400" />
          <span className={`text-sm ${theme.text}`}>✨ New: AI-Powered Analytics Engine</span>
        </div>
        
        <h1 className={`text-5xl sm:text-7xl font-bold mb-6 ${theme.text} leading-tight`}>
          Build Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-gradient">
            E-commerce Empire
          </span>
        </h1>
        
        <p className={`text-lg sm:text-xl mb-10 ${theme.textSecondary} max-w-2xl mx-auto`}>
          The ultimate AI-powered SaaS platform for modern businesses. 
          Manage your shop, track orders, and scale your revenue with enterprise-grade solutions.
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <button 
            onClick={() => setActivePage('trial')}
            className={`group ${theme.primary} ${theme.primaryHover} text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 text-lg`}
          >
            Start Free Trial <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => window.open('https://www.youtube.com/watch?v=demo', '_blank')}
            className={`border-2 ${theme.border} ${theme.text} px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center gap-2 text-lg`}
          >
            <Play size={20} /> Watch Demo
          </button>
        </div>
        
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className={theme.textSecondary}>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className={theme.textSecondary}>14-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className={theme.textSecondary}>Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}