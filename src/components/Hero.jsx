// components/Hero.jsx
import React from 'react';

export default function Hero({ theme }) {
  return (
    <div className={`rounded-2xl overflow-hidden ${theme.gradient} mb-12 shadow-2xl transform transition-all`}>
      <div className="px-6 py-16 sm:py-20 sm:px-12 text-center relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 mb-6">
            <i className="fas fa-rocket text-yellow-400"></i>
            <span className={`text-sm ${theme.text}`}>Launch Your Store Today</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-bold mb-4 ${theme.text}`}>
            Build Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Empire
            </span>
          </h1>
          <p className={`text-lg sm:text-xl mb-8 ${theme.textSecondary} max-w-2xl mx-auto`}>
            The ultimate e-commerce SaaS platform trusted by 10,000+ businesses worldwide.
            Start selling smarter, not harder.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className={`${theme.primary} ${theme.primaryHover} text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg`}>
              Start 14-Day Free Trial
            </button>
            <button className={`border-2 ${theme.border} ${theme.text} px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all`}>
              Watch Demo <i className="fas fa-play ml-2"></i>
            </button>
          </div>
          <div className="mt-8 flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-green-500"></i>
              <span className={theme.textSecondary}>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-green-500"></i>
              <span className={theme.textSecondary}>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}