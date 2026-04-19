// pages/AboutPage.jsx - Ultra Advanced Premium Design
import { FaXTwitter } from "react-icons/fa6";
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../App';
import { FaLinkedin } from "react-icons/fa";

import { 
  Target, Eye, Heart, Globe, Award, Users, TrendingUp, Shield, 
  Sparkles, Rocket, Coffee, Code, Zap, Star, Briefcase, 
  Calendar, MapPin, Mail, Phone, 
  Quote, ChevronLeft, ChevronRight, Play, Pause, Crown,
  Gem, Leaf, Lightbulb, Handshake, Smile, ThumbsUp
} from 'lucide-react';
import { FaFacebook } from "react-icons/fa";
export default function AboutPage() {
  const { theme } = useApp();
  const [activeTab, setActiveTab] = useState('mission');
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [animatedNumbers, setAnimatedNumbers] = useState({ years: 0, customers: 0, countries: 0, uptime: 0 });
  const statsRef = useRef(null);

  // Team members data
  const teamMembers = [
    { name: 'Mujahid Rahim', role: 'CEO & Founder', bio: 'Former e-commerce executive with 15+ years of experience', image: 'MR', social: { linkedin: '#', twitter: '#', email: '#' } },
    { name: 'Sarah Johnson', role: 'CTO', bio: 'Tech visionary leading innovation and AI development', image: 'SJ', social: { linkedin: '#', twitter: '#', email: '#' } },
    { name: 'Michael Chen', role: 'Head of Product', bio: 'Product strategist focused on user experience', image: 'MC', social: { linkedin: '#', twitter: '#', email: '#' } },
    { name: 'Emma Wilson', role: 'Customer Success', bio: 'Dedicated to ensuring client satisfaction', image: 'EW', social: { linkedin: '#', twitter: '#', email: '#' } },
    { name: 'David Kim', role: 'Lead Developer', bio: 'Full-stack expert and performance optimizer', image: 'DK', social: { linkedin: '#', twitter: '#', email: '#' } },
    { name: 'Lisa Wang', role: 'Marketing Director', bio: 'Growth strategist and brand storyteller', image: 'LW', social: { linkedin: '#', twitter: '#', email: '#' } },
  ];

  // Company timeline
  const timeline = [
    { year: '2020', title: 'Company Founded', desc: 'Started with a vision to revolutionize e-commerce', icon: <Rocket size={20} />, color: 'blue' },
    { year: '2021', title: 'First 1000 Customers', desc: 'Launched MVP and gained initial traction', icon: <Users size={20} />, color: 'green' },
    { year: '2022', title: 'Series A Funding', desc: 'Raised $10M to accelerate growth', icon: <TrendingUp size={20} />, color: 'purple' },
    { year: '2023', title: 'Global Expansion', desc: 'Expanded to 50+ countries worldwide', icon: <Globe size={20} />, color: 'orange' },
    { year: '2024', title: 'AI Platform Launch', desc: 'Launched cutting-edge AI analytics', icon: <Sparkles size={20} />, color: 'pink' },
  ];

  // Company values with detailed descriptions
  const values = [
    { icon: <Target size={28} />, title: 'Our Mission', desc: 'Empower businesses with cutting-edge e-commerce solutions that drive growth and innovation', gradient: 'from-blue-500 to-cyan-500', color: 'blue' },
    { icon: <Eye size={28} />, title: 'Our Vision', desc: 'Become the world\'s leading e-commerce SaaS platform, enabling millions of entrepreneurs', gradient: 'from-purple-500 to-pink-500', color: 'purple' },
    { icon: <Heart size={28} />, title: 'Core Values', desc: 'Innovation, Excellence, Customer-first approach, and Integrity in everything we do', gradient: 'from-red-500 to-rose-500', color: 'red' },
    { icon: <Globe size={28} />, title: 'Global Impact', desc: 'Serving customers in 50+ countries, bridging gaps in global commerce', gradient: 'from-emerald-500 to-teal-500', color: 'green' },
    { icon: <Handshake size={28} />, title: 'Partnerships', desc: 'Building lasting relationships with clients and partners worldwide', gradient: 'from-yellow-500 to-orange-500', color: 'yellow' },
    { icon: <Lightbulb size={28} />, title: 'Innovation', desc: 'Constantly pushing boundaries with cutting-edge technology', gradient: 'from-indigo-500 to-blue-500', color: 'indigo' },
  ];

  // Animated counter effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const targets = { years: 4, customers: 10000, countries: 50, uptime: 99.9 };
            const duration = 2000;
            const stepTime = 20;
            const steps = duration / stepTime;
            
            let currentStep = 0;
            const interval = setInterval(() => {
              currentStep++;
              setAnimatedNumbers({
                years: Math.min(targets.years, Math.floor((currentStep / steps) * targets.years)),
                customers: Math.min(targets.customers, Math.floor((currentStep / steps) * targets.customers)),
                countries: Math.min(targets.countries, Math.floor((currentStep / steps) * targets.countries)),
                uptime: Math.min(targets.uptime, (currentStep / steps) * targets.uptime),
              });
              if (currentStep >= steps) clearInterval(interval);
            }, stepTime);
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-play team carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentTeamIndex((prev) => (prev + 1) % Math.ceil(teamMembers.length / 2));
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const valuesContent = {
    mission: {
      title: 'Our Mission',
      content: 'To democratize e-commerce technology and provide businesses of all sizes with enterprise-grade tools that were previously only available to large corporations. We believe in empowering entrepreneurs and helping them succeed in the digital economy.',
      icon: <Target size={48} />,
    },
    vision: {
      title: 'Our Vision',
      content: 'To create a world where anyone can start, manage, and scale an online business with ease. We envision a future where technology removes barriers and creates opportunities for millions of entrepreneurs globally.',
      icon: <Eye size={48} />,
    },
    story: {
      title: 'Our Story',
      content: 'Founded in 2020 by a team of e-commerce veterans and tech innovators, MujahSaaS started as a small project to solve the pain points of online selling. Today, we\'re proud to serve over 10,000 businesses worldwide and process millions in GMV annually.',
      icon: <BookOpen size={48} />,
    },
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <div className={`relative rounded-3xl overflow-hidden ${theme.gradient} shadow-2xl`}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 px-6 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles size={16} className="text-yellow-400" />
            <span className={`text-sm ${theme.text}`}>✨ 4+ Years of Excellence</span>
          </div>
          
          <h1 className={`text-5xl sm:text-6xl font-bold mb-6 ${theme.text}`}>
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
              MujahSaaS
            </span>
          </h1>
          
          <p className={`text-lg sm:text-xl ${theme.textSecondary} max-w-3xl mx-auto`}>
            We're on a mission to revolutionize e-commerce by providing cutting-edge technology 
            that empowers businesses to grow, scale, and succeed in the digital economy.
          </p>
        </div>
      </div>

      {/* Tab Section */}
      <div className="animate-on-scroll">
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {['mission', 'vision', 'story'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all capitalize flex items-center gap-2 ${
                activeTab === tab 
                  ? `${theme.primary} text-white shadow-lg` 
                  : `${theme.card} ${theme.text} hover:${theme.cardHover}`
              }`}
            >
              {tab === 'mission' && <Target size={18} />}
              {tab === 'vision' && <Eye size={18} />}
              {tab === 'story' && <BookOpen size={18} />}
              {tab}
            </button>
          ))}
        </div>
        
        <div className={`${theme.card} rounded-2xl p-8 text-center shadow-xl`}>
          <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${theme.accent} flex items-center justify-center text-white mb-6`}>
            {valuesContent[activeTab].icon}
          </div>
          <h2 className={`text-2xl font-bold mb-4 ${theme.text}`}>{valuesContent[activeTab].title}</h2>
          <p className={`text-lg ${theme.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
            {valuesContent[activeTab].content}
          </p>
        </div>
      </div>

      {/* Stats Section with Animation */}
      <div ref={statsRef} className="animate-on-scroll">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme.text}`}>
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Impact in Numbers
            </span>
          </h2>
          <p className={`${theme.textSecondary} max-w-2xl mx-auto`}>
            The numbers that define our journey and commitment to excellence
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className={`${theme.card} rounded-2xl p-6 text-center hover:shadow-2xl transition-all transform hover:-translate-y-1`}>
            <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-4">
              <Calendar size={28} />
            </div>
            <p className={`text-3xl font-bold ${theme.text}`}>{animatedNumbers.years}+</p>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>Years of Excellence</p>
          </div>
          
          <div className={`${theme.card} rounded-2xl p-6 text-center hover:shadow-2xl transition-all transform hover:-translate-y-1`}>
            <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-4">
              <Users size={28} />
            </div>
            <p className={`text-3xl font-bold ${theme.text}`}>{animatedNumbers.customers.toLocaleString()}+</p>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>Happy Customers</p>
          </div>
          
          <div className={`${theme.card} rounded-2xl p-6 text-center hover:shadow-2xl transition-all transform hover:-translate-y-1`}>
            <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white mb-4">
              <Globe size={28} />
            </div>
            <p className={`text-3xl font-bold ${theme.text}`}>{animatedNumbers.countries}+</p>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>Countries Served</p>
          </div>
          
          <div className={`${theme.card} rounded-2xl p-6 text-center hover:shadow-2xl transition-all transform hover:-translate-y-1`}>
            <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white mb-4">
              <Shield size={28} />
            </div>
            <p className={`text-3xl font-bold ${theme.text}`}>{animatedNumbers.uptime}%</p>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>Uptime Guarantee</p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="animate-on-scroll">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme.text}`}>
            What{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
              Drives Us
            </span>
          </h2>
          <p className={`${theme.textSecondary} max-w-2xl mx-auto`}>
            Our core values that guide everything we do
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, idx) => (
            <div key={idx} className={`group ${theme.card} rounded-2xl p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer border ${theme.border} relative overflow-hidden`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${value.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {value.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>{value.title}</h3>
              <p className={`${theme.textSecondary} leading-relaxed`}>{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="animate-on-scroll">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme.text}`}>
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Journey
            </span>
          </h2>
          <p className={`${theme.textSecondary} max-w-2xl mx-auto`}>
            Key milestones in our company's history
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>
          
          <div className="space-y-8">
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6`}>
                <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12'}`}>
                  <div className={`${theme.card} rounded-2xl p-6 hover:shadow-2xl transition-all transform hover:-translate-x-1`}>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 text-white text-sm mb-3`}>
                      {item.icon}
                      <span>{item.year}</span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>{item.title}</h3>
                    <p className={theme.textSecondary}>{item.desc}</p>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 flex items-center justify-center text-white shadow-lg`}>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section with Carousel */}
      <div className="animate-on-scroll">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme.text}`}>
            Meet the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              Team
            </span>
          </h2>
          <p className={`${theme.textSecondary} max-w-2xl mx-auto`}>
            The passionate people behind MujahSaaS
          </p>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.slice(currentTeamIndex * 2, currentTeamIndex * 2 + 2).map((member, idx) => (
              <div key={idx} className={`group ${theme.card} rounded-2xl p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2`}>
                <div className="flex items-start gap-4">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${theme.accent} flex items-center justify-center text-white text-2xl font-bold shrink-0`}>
                    {member.image}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${theme.text}`}>{member.name}</h3>
                    <p className={`text-sm ${theme.primary} mb-2`}>{member.role}</p>
                    <p className={`text-sm ${theme.textSecondary} mb-3`}>{member.bio}</p>
                    <div className="flex gap-2">
                      <button className={`p-2 rounded-lg ${theme.cardHover} transition-all`}>
                        <FaLinkedin  size={16} />
                      </button>
                      <button className={`p-2 rounded-lg ${theme.cardHover} transition-all`}>
                        <FaXTwitter size={16} />
                      </button>
                      <button className={`p-2 rounded-lg ${theme.cardHover} transition-all`}>
                        <Mail size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => {
                setCurrentTeamIndex((prev) => Math.max(0, prev - 1));
                setIsAutoPlaying(false);
              }}
              className={`p-2 rounded-full ${theme.card} hover:${theme.cardHover} transition-all`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`p-2 rounded-full ${theme.primary} text-white transition-all`}
            >
              {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={() => {
                setCurrentTeamIndex((prev) => Math.min(Math.ceil(teamMembers.length / 2) - 1, prev + 1));
                setIsAutoPlaying(false);
              }}
              className={`p-2 rounded-full ${theme.card} hover:${theme.cardHover} transition-all`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Highlight */}
      <div className={`relative rounded-2xl overflow-hidden ${theme.gradient} shadow-2xl animate-on-scroll`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 px-6 py-16 text-center">
          <Quote size={48} className="mx-auto text-white/30 mb-6" />
          <p className={`text-xl sm:text-2xl ${theme.text} max-w-3xl mx-auto mb-6 italic`}>
            "MujahSaaS has been instrumental in our growth. Their platform is robust, 
            their team is supportive, and their vision is inspiring."
          </p>
          <div className="flex justify-center items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div className="text-left">
              <p className={`font-semibold ${theme.text}`}>John Doe</p>
              <p className={`text-sm ${theme.textSecondary}`}>CEO, TechStart Inc.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="animate-on-scroll">
        <div className={`${theme.card} rounded-2xl p-12 text-center shadow-xl border ${theme.border}`}>
          <h2 className={`text-3xl font-bold mb-4 ${theme.text}`}>
            Join Our Growing Family
          </h2>
          <p className={`${theme.textSecondary} max-w-2xl mx-auto mb-8`}>
            Be part of the e-commerce revolution. Start your journey with MujahSaaS today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className={`${theme.primary} ${theme.primaryHover} text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center gap-2`}>
              Start Free Trial <Rocket size={18} />
            </button>
            <button className={`border-2 ${theme.border} ${theme.text} px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center gap-2`}>
              Contact Us <Mail size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Import missing icon
import { BookOpen } from 'lucide-react';