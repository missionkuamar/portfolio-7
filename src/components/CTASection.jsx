// components/CTASection.jsx
import React from 'react';
import { useApp } from '../App';
import { Rocket, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CTASection() {
  const { theme, setActivePage } = useApp();

  const handleStartTrial = () => {
    setActivePage('trial');
  };

  const handleContactSales = () => {
    toast.success('Sales team will contact you shortly!');
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden ${theme.gradient} shadow-2xl animate-on-scroll`} id="cta">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 px-6 py-16 text-center">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme.text}`}>
          Ready to transform your business?
        </h2>
        <p className={`text-lg ${theme.textSecondary} mb-8 max-w-2xl mx-auto`}>
          Join thousands of successful merchants who trust MujahSaaS
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button 
            onClick={handleStartTrial}
            className={`bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2`}
          >
            Start Free Trial <Rocket size={18} />
          </button>
          <button 
            onClick={handleContactSales}
            className={`border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all transform hover:scale-105`}
          >
            Contact Sales
          </button>
        </div>
        <p className={`text-sm ${theme.textSecondary} mt-6`}>No credit card required • Cancel anytime</p>
      </div>
    </div>
  );
}