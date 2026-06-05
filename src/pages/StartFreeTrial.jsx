// pages/StartFreeTrial.jsx - Complete Free Trial Page
import React, { useState } from 'react';
import { useApp } from '../App';
import { 
  Rocket, CheckCircle, ArrowRight, User, Mail, Phone, 
  Building, Globe, Lock, Shield, CreditCard, Calendar,
  Sparkles, Gift, Star, Award, Clock, Headphones
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function StartFreeTrial() {
  const { theme, setActivePage } = useApp();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    country: 'US',
    plan: 'professional'
  });

  const plans = [
    { id: 'starter', name: 'Starter', price: '$29', features: ['500 products', 'Basic analytics', 'Email support'] },
    { id: 'professional', name: 'Professional', price: '$99', features: ['5,000 products', 'Advanced analytics', 'Priority support', 'AI features'] },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom', features: ['Unlimited products', 'Custom analytics', 'Dedicated support', 'API access'] }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Trial started successfully! Check your email for details.');
      setStep(2);
      // Send welcome email simulation
      console.log('Trial started for:', formData);
    }, 1500);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (step === 2) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Toaster position="top-right" />
        <div className={`${theme.card} rounded-2xl p-8 text-center`}>
          <div className="w-20 h-20 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-6">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h2 className={`text-3xl font-bold ${theme.text} mb-3`}>Trial Started Successfully!</h2>
          <p className={`${theme.textSecondary} mb-6`}>
            We've sent a confirmation email to <strong>{formData.email}</strong> with your login credentials and next steps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className={`p-4 rounded-xl ${theme.cardHover}`}>
              <Mail size={24} className="mx-auto mb-2 text-blue-500" />
              <p className={`text-sm ${theme.text}`}>Check your email</p>
              <p className={`text-xs ${theme.textSecondary}`}>Login credentials sent</p>
            </div>
            <div className={`p-4 rounded-xl ${theme.cardHover}`}>
              <Clock size={24} className="mx-auto mb-2 text-blue-500" />
              <p className={`text-sm ${theme.text}`}>14-Day Trial</p>
              <p className={`text-xs ${theme.textSecondary}`}>Full access to all features</p>
            </div>
            <div className={`p-4 rounded-xl ${theme.cardHover}`}>
              <Headphones size={24} className="mx-auto mb-2 text-blue-500" />
              <p className={`text-sm ${theme.text}`}>24/7 Support</p>
              <p className={`text-xs ${theme.textSecondary}`}>We're here to help</p>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setActivePage('home')} className={`px-6 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>
              Back to Home
            </button>
            <button onClick={() => setActivePage('login')} className={`${theme.primary} text-white px-6 py-2 rounded-lg`}>
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
          <Rocket size={18} />
          <span className="text-sm font-semibold">Start Your 14-Day Free Trial</span>
        </div>
        <h1 className={`text-4xl sm:text-5xl font-bold ${theme.text} mb-4`}>
          Start Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Free Trial
          </span>
        </h1>
        <p className={`text-lg ${theme.textSecondary} max-w-2xl mx-auto`}>
          No credit card required. Cancel anytime. Get full access to all features.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className={`${theme.card} rounded-2xl p-8`}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Full Name *</label>
              <div className="relative">
                <User size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Email Address *</label>
              <div className="relative">
                <Mail size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Phone Number</label>
              <div className="relative">
                <Phone size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Company Name</label>
              <div className="relative">
                <Building size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Your company name"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Select Plan</label>
              <div className="grid grid-cols-3 gap-2">
                {plans.map(plan => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, plan: plan.id })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      formData.plan === plan.id 
                        ? 'border-blue-500 bg-blue-500/10' 
                        : theme.border
                    }`}
                  >
                    <p className={`font-semibold ${theme.text}`}>{plan.name}</p>
                    <p className={`text-xs ${theme.textSecondary}`}>{plan.price}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${theme.primary} text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50`}
            >
              {isSubmitting ? (
                <>Processing... <RefreshCw size={18} className="animate-spin" /></>
              ) : (
                <>Start Free Trial <ArrowRight size={18} /></>
              )}
            </button>

            <p className={`text-xs text-center ${theme.textSecondary}`}>
              By clicking "Start Free Trial", you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>

        {/* Benefits Section */}
        <div className={`${theme.card} rounded-2xl p-8`}>
          <h3 className={`text-xl font-bold mb-4 ${theme.text}`}>What's included in your trial?</h3>
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className={`font-medium ${theme.text}`}>Full Platform Access</p>
                <p className={`text-sm ${theme.textSecondary}`}>Try all features without any limitations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className={`font-medium ${theme.text}`}>AI-Powered Analytics</p>
                <p className={`text-sm ${theme.textSecondary}`}>Get insights and predictions for your business</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className={`font-medium ${theme.text}`}>Priority Support</p>
                <p className={`text-sm ${theme.textSecondary}`}>24/7 chat and email support during trial</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className={`font-medium ${theme.text}`}>No Credit Card Required</p>
                <p className={`text-sm ${theme.textSecondary}`}>Start risk-free, upgrade only when ready</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl ${theme.cardHover} border ${theme.border}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Gift size={20} className="text-yellow-500" />
              </div>
              <div>
                <p className={`font-semibold ${theme.text}`}>14-Day Free Trial</p>
                <p className={`text-xs ${theme.textSecondary}`}>Cancel anytime, no questions asked</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Lock size={20} className="text-blue-500" />
              </div>
              <div>
                <p className={`font-semibold ${theme.text}`}>Secure & Encrypted</p>
                <p className={`text-xs ${theme.textSecondary}`}>Your data is protected with bank-level security</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { RefreshCw } from 'lucide-react';