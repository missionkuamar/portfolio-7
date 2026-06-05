// pages/HomePage.jsx - Simplified Main Component
import React from 'react';
import HeroSection from '../components/HeroSection';
import TrustedBySection from '../components/TrustedBySection';
import StatsSection from '../components/StatsSection';
import FeaturesSection from '../components/FeaturesSection';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import BlogSection from '../components/BlogSection';

export default function HomePage() {
  return (
    <div className="space-y-24 pb-16">
      <HeroSection />
      <TrustedBySection />
      <StatsSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <BlogSection />
    </div>
  );
}