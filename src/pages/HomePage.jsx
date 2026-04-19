// pages/HomePage.jsx - Ultra Advanced Premium Design
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../App';
import { 
  Rocket, TrendingUp, Shield, Zap, Award, Users, Star, ChevronRight, 
  Store, Globe, Code, Cloud, Cpu, Database, BarChart3, Phone,
  Play, Sparkles, ArrowRight, CheckCircle, Crown, Gem, Target,
  Layers, Smartphone, RefreshCw, Clock, Headphones, Lock,
  Gift, Coffee, Heart, Mail, MapPin, Quote, Briefcase
} from 'lucide-react';

export default function HomePage() {
  const { theme } = useApp();
  const [counter, setCounter] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);

  // Animated counter
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prev => prev < 100 ? prev + 1 : 100);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current.disconnect();
  }, []);

  const features = [
    { icon: <Rocket size={32} />, title: 'Fast Performance', desc: 'Lightning fast loading times with 99.9% uptime SLA', gradient: 'from-blue-500 to-cyan-500', color: 'blue' },
    { icon: <Shield size={32} />, title: 'Bank-Level Security', desc: 'Enterprise grade encryption & PCI compliance', gradient: 'from-emerald-500 to-teal-500', color: 'emerald' },
    { icon: <Zap size={32} />, title: 'AI-Powered Analytics', desc: 'Real-time insights with predictive forecasting', gradient: 'from-yellow-500 to-orange-500', color: 'yellow' },
    { icon: <Award size={32} />, title: '24/7 Premium Support', desc: 'Dedicated account manager & priority support', gradient: 'from-purple-500 to-pink-500', color: 'purple' },
    { icon: <Globe size={32} />, title: 'Global Infrastructure', desc: 'CDN powered worldwide delivery', gradient: 'from-indigo-500 to-blue-500', color: 'indigo' },
    { icon: <Cpu size={32} />, title: 'AI Recommendations', desc: 'Smart product suggestions engine', gradient: 'from-red-500 to-rose-500', color: 'red' },
  ];

  const stats = [
    { label: 'Active Users', value: '10K+', icon: <Users size={24} />, suffix: '+', color: 'blue' },
    { label: 'GMV Processed', value: '$50M', icon: <TrendingUp size={24} />, suffix: '+', color: 'green' },
    { label: 'Active Shops', value: '1K', icon: <Store size={24} />, suffix: '+', color: 'purple' },
    { label: 'Happy Clients', value: '98%', icon: <Heart size={24} />, suffix: '%', color: 'red' },
    { label: 'Countries', value: '50', icon: <Globe size={24} />, suffix: '+', color: 'cyan' },
    { label: 'Apps Integrated', value: '200', icon: <Layers size={24} />, suffix: '+', color: 'orange' },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'CEO, FashionHub', quote: 'MujahSaaS transformed our business. Sales increased by 200% in just 3 months!', rating: 5, avatar: 'SJ' },
    { name: 'Michael Chen', role: 'Founder, TechStore', quote: 'The analytics and AI features are game-changing. Best investment we made.', rating: 5, avatar: 'MC' },
    { name: 'Emma Wilson', role: 'Director, HomeDecor', quote: 'Incredible platform with outstanding support. Highly recommended!', rating: 5, avatar: 'EW' },
    { name: 'David Kim', role: 'CTO, GadgetWorld', quote: 'Scalable, secure, and feature-rich. Perfect for growing businesses.', rating: 5, avatar: 'DK' },
  ];

  const pricingPlans = [
    { name: 'Starter', price: '$29', period: '/month', features: ['Up to 500 products', 'Basic analytics', 'Email support', 'SSL certificate'], popular: false, icon: <Coffee size={24} /> },
    { name: 'Professional', price: '$99', period: '/month', features: ['Up to 5,000 products', 'Advanced analytics', 'Priority support', 'AI recommendations', 'Abandoned cart recovery'], popular: true, icon: <Rocket size={24} /> },
    { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited products', 'Custom analytics', 'Dedicated support', 'API access', 'SLA guarantee', 'Custom integrations'], popular: false, icon: <Crown size={24} /> },
  ];

  const partners = [
    'Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Salesforce', 'HubSpot', 'Stripe', 'PayPal'
  ];

  const blogPosts = [
    { title: '10 Ways to Increase E-commerce Sales', date: 'Jan 15, 2024', readTime: '5 min', category: 'Marketing' },
    { title: 'The Future of AI in Retail', date: 'Jan 10, 2024', readTime: '7 min', category: 'Technology' },
    { title: 'Customer Experience Best Practices', date: 'Jan 5, 2024', readTime: '6 min', category: 'Customer Service' },
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section with Animated Background */}
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
            <button className={`group ${theme.primary} ${theme.primaryHover} text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 text-lg`}>
              Start Free Trial <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className={`border-2 ${theme.border} ${theme.text} px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center gap-2 text-lg`}>
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

      {/* Trusted By Section */}
      <div className="text-center animate-on-scroll" id="trusted">
        <p className={`text-sm uppercase tracking-wider ${theme.textSecondary} mb-6`}>Trusted by 10,000+ businesses worldwide</p>
        <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
          {partners.map((partner, idx) => (
            <div key={idx} className={`text-lg font-semibold ${theme.textSecondary} hover:opacity-100 transition-all`}>
              {partner}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section with Animation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-on-scroll" id="stats">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${theme.card} rounded-2xl p-5 text-center hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer group`}>
            <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <p className={`text-2xl font-bold ${theme.text}`}>
              {stat.value}{stat.suffix}
            </p>
            <p className={`text-xs ${theme.textSecondary} mt-1`}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Features Section with Grid */}
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
            <div key={idx} className={`group ${theme.card} rounded-2xl p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer border ${theme.border} relative overflow-hidden`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>{feature.title}</h3>
              <p className={`${theme.textSecondary} leading-relaxed`}>{feature.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-sm text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="animate-on-scroll" id="pricing">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme.text}`}>
            Simple,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
              transparent pricing
            </span>
          </h2>
          <p className={`${theme.textSecondary} max-w-2xl mx-auto`}>
            Choose the perfect plan for your business needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <div key={idx} className={`relative ${theme.card} rounded-2xl overflow-hidden transition-all transform hover:-translate-y-2 ${plan.popular ? 'shadow-2xl border-2 border-yellow-500' : 'shadow-lg'}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 text-xs font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white mb-4`}>
                  {plan.icon}
                </div>
                <h3 className={`text-2xl font-bold ${theme.text}`}>{plan.name}</h3>
                <div className="mt-4 mb-4">
                  <span className={`text-4xl font-bold ${theme.text}`}>{plan.price}</span>
                  <span className={theme.textSecondary}>{plan.period}</span>
                </div>
                <ul className="space-y-3 text-left mb-6">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-green-500 shrink-0" />
                      <span className={theme.textSecondary}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular ? theme.primary + ' text-white' : theme.cardHover + ' ' + theme.text} border ${theme.border}`}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="animate-on-scroll" id="testimonials">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme.text}`}>
            Loved by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
              thousands of customers
            </span>
          </h2>
          <p className={`${theme.textSecondary} max-w-2xl mx-auto`}>
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className={`${theme.card} rounded-2xl p-6 hover:shadow-2xl transition-all`}>
                <Quote size={32} className="text-blue-500 opacity-30 mb-4" />
                <p className={`${theme.text} text-lg mb-4 italic`}>"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className={`font-semibold ${theme.text}`}>{testimonial.name}</p>
                    <p className={`text-sm ${theme.textSecondary}`}>{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
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
            <button className={`bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2`}>
              Start Free Trial <Rocket size={18} />
            </button>
            <button className={`border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all`}>
              Contact Sales
            </button>
          </div>
          <p className={`text-sm ${theme.textSecondary} mt-6`}>No credit card required • Cancel anytime</p>
        </div>
      </div>

      {/* Blog Section */}
      <div className="animate-on-scroll" id="blog">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-2xl font-bold ${theme.text}`}>
            Latest from our blog
          </h2>
          <button className={`text-blue-500 hover:text-blue-600 flex items-center gap-1 text-sm`}>
            View all posts <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, idx) => (
            <div key={idx} className={`${theme.card} rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group`}>
              <div className={`h-40 ${theme.gradient} flex items-center justify-center`}>
                <Briefcase size={48} className="text-white/50" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs mb-3">
                  <span className={`px-2 py-1 rounded-full ${theme.primary} text-white`}>{post.category}</span>
                  <span className={theme.textSecondary}>{post.readTime}</span>
                </div>
                <h3 className={`font-semibold ${theme.text} mb-2 group-hover:text-blue-500 transition-colors`}>{post.title}</h3>
                <p className={`text-sm ${theme.textSecondary}`}>{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}