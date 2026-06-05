// components/PricingSection.jsx
import React, { useState } from 'react';
import { useApp } from '../App';
import { CheckCircle, Rocket, Crown, Coffee, Star, Zap, Shield, Award } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function PricingSection() {
  const { theme, setActivePage } = useApp();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const pricingPlans = [
    { 
      name: 'Starter', 
      price: '$29', 
      period: '/month', 
      features: ['Up to 500 products', 'Basic analytics', 'Email support', 'SSL certificate', '1 admin user'], 
      popular: false, 
      icon: <Coffee size={24} />,
      recommended: 'Perfect for startups'
    },
    { 
      name: 'Professional', 
      price: '$99', 
      period: '/month', 
      features: ['Up to 5,000 products', 'Advanced analytics', 'Priority support', 'AI recommendations', 'Abandoned cart recovery', '5 admin users', 'Custom domain'], 
      popular: true, 
      icon: <Rocket size={24} />,
      recommended: 'Most popular choice'
    },
    { 
      name: 'Business', 
      price: '$199', 
      period: '/month', 
      features: ['Up to 20,000 products', 'Advanced analytics + API', '24/7 priority support', 'Advanced AI features', 'Multi-currency support', '15 admin users', 'Custom reports'], 
      popular: false, 
      icon: <Zap size={24} />,
      recommended: 'For growing businesses'
    },
    { 
      name: 'Enterprise', 
      price: 'Custom', 
      period: '', 
      features: ['Unlimited products', 'Custom analytics', 'Dedicated support team', 'API access', 'SLA guarantee', 'Custom integrations', 'White-label solution', 'Unlimited admin users'], 
      popular: false, 
      icon: <Crown size={24} />,
      recommended: 'Contact sales'
    },
  ];

  const handleGetStarted = (plan) => {
    setSelectedPlan(plan);
    localStorage.setItem('selectedPlan', JSON.stringify(plan));
    toast.success(`Selected ${plan.name} plan! Redirecting to checkout...`);
    setTimeout(() => setActivePage('trial'), 1500);
  };

  return (
    <div className="animate-on-scroll" id="pricing">
      <div className="text-center mb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme.text}`}>
          Simple,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
            transparent pricing
          </span>
        </h2>
        <p className={`${theme.textSecondary} max-w-2xl mx-auto`}>
          Choose the perfect plan for your business needs. All plans include a 14-day free trial.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan, idx) => (
          <div 
            key={idx} 
            className={`relative ${theme.card} rounded-2xl overflow-hidden transition-all transform hover:-translate-y-2 cursor-pointer ${plan.popular ? 'shadow-2xl border-2 border-yellow-500' : 'shadow-lg border ${theme.border}'}`}
            onClick={() => handleGetStarted(plan)}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 text-xs font-semibold rounded-bl-lg z-10">
                Most Popular
              </div>
            )}
            <div className="p-6 text-center">
              <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${plan.popular ? 'from-yellow-500 to-orange-500' : 'from-blue-500 to-purple-500'} flex items-center justify-center text-white mb-4`}>
                {plan.icon}
              </div>
              <h3 className={`text-2xl font-bold ${theme.text}`}>{plan.name}</h3>
              <p className={`text-xs ${theme.textSecondary} mt-1 mb-3`}>{plan.recommended}</p>
              <div className="mt-4 mb-4">
                <span className={`text-4xl font-bold ${theme.text}`}>{plan.price}</span>
                <span className={theme.textSecondary}>{plan.period}</span>
              </div>
              <ul className="space-y-2 text-left mb-6">
                {plan.features.slice(0, 5).map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={14} className="text-green-500 shrink-0" />
                    <span className={theme.textSecondary}>{feature}</span>
                  </li>
                ))}
                {plan.features.length > 5 && (
                  <li className="text-xs text-blue-500 ml-6">+{plan.features.length - 5} more features</li>
                )}
              </ul>
              <button 
                className={`w-full py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  plan.popular 
                    ? `${theme.primary} text-white shadow-lg` 
                    : `${theme.cardHover} ${theme.text} border ${theme.border}`
                }`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}