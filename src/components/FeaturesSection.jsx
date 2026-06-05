// components/FeaturesSection.jsx
import React, { useState } from 'react';
import { useApp } from '../App';
import { Rocket, Shield, Zap, Award, Globe, Cpu, ArrowRight, X } from 'lucide-react';

export default function FeaturesSection() {
  const { theme } = useApp();
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    { 
      icon: <Rocket size={32} />, 
      title: 'Fast Performance', 
      desc: 'Lightning fast loading times with 99.9% uptime SLA',
      fullDesc: 'Our platform is optimized for speed with CDN delivery, lazy loading, and optimized database queries. Pages load in under 1 second globally.',
      gradient: 'from-blue-500 to-cyan-500', 
      color: 'blue' 
    },
    { 
      icon: <Shield size={32} />, 
      title: 'Bank-Level Security', 
      desc: 'Enterprise grade encryption & PCI compliance',
      fullDesc: 'We use 256-bit SSL encryption, regular security audits, and comply with PCI DSS standards to keep your data safe.',
      gradient: 'from-emerald-500 to-teal-500', 
      color: 'emerald' 
    },
    { 
      icon: <Zap size={32} />, 
      title: 'AI-Powered Analytics', 
      desc: 'Real-time insights with predictive forecasting',
      fullDesc: 'Our AI engine analyzes customer behavior, predicts trends, and provides actionable insights to grow your business.',
      gradient: 'from-yellow-500 to-orange-500', 
      color: 'yellow' 
    },
    { 
      icon: <Award size={32} />, 
      title: '24/7 Premium Support', 
      desc: 'Dedicated account manager & priority support',
      fullDesc: 'Get help anytime with our 24/7 support team. Premium plans include dedicated account managers.',
      gradient: 'from-purple-500 to-pink-500', 
      color: 'purple' 
    },
    { 
      icon: <Globe size={32} />, 
      title: 'Global Infrastructure', 
      desc: 'CDN powered worldwide delivery',
      fullDesc: 'Our global CDN ensures fast loading times for customers anywhere in the world.',
      gradient: 'from-indigo-500 to-blue-500', 
      color: 'indigo' 
    },
    { 
      icon: <Cpu size={32} />, 
      title: 'AI Recommendations', 
      desc: 'Smart product suggestions engine',
      fullDesc: 'Personalized product recommendations based on customer behavior and purchase history.',
      gradient: 'from-red-500 to-rose-500', 
      color: 'red' 
    },
  ];

  return (
    <>
      <div className="animate-on-scroll" id="features">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme.text}`}>
            Everything you need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              scale your business
            </span>
          </h2>
          <p className={`${theme.textSecondary} max-w-2xl mx-auto`}>
            Powerful features designed to help you grow faster and smarter
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedFeature(feature)}
              className={`group ${theme.card} rounded-2xl p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer border ${theme.border} relative overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>{feature.title}</h3>
              <p className={`${theme.textSecondary} leading-relaxed`}>{feature.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-sm text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to learn more <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setSelectedFeature(null)}>
          <div className={`${theme.card} rounded-2xl max-w-md w-full p-6`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedFeature.gradient} flex items-center justify-center text-white`}>
                {selectedFeature.icon}
              </div>
              <button onClick={() => setSelectedFeature(null)} className={`p-1 rounded-lg ${theme.cardHover}`}>
                <X size={20} />
              </button>
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${theme.text}`}>{selectedFeature.title}</h3>
            <p className={`${theme.textSecondary} mb-6 leading-relaxed`}>{selectedFeature.fullDesc}</p>
            <button 
              onClick={() => setSelectedFeature(null)}
              className={`w-full ${theme.primary} text-white py-2 rounded-lg font-semibold`}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}