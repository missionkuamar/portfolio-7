// components/TestimonialsSection.jsx
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { Quote, Star, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export default function TestimonialsSection() {
  const { theme } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState({});

  const testimonials = [
    { name: 'Sarah Johnson', role: 'CEO, FashionHub', quote: 'MujahSaaS transformed our business. Sales increased by 200% in just 3 months!', rating: 5, avatar: 'SJ', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Michael Chen', role: 'Founder, TechStore', quote: 'The analytics and AI features are game-changing. Best investment we made.', rating: 5, avatar: 'MC', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { name: 'Emma Wilson', role: 'Director, HomeDecor', quote: 'Incredible platform with outstanding support. Highly recommended!', rating: 5, avatar: 'EW', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { name: 'David Kim', role: 'CTO, GadgetWorld', quote: 'Scalable, secure, and feature-rich. Perfect for growing businesses.', rating: 5, avatar: 'DK', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
  ];

  const handleLike = (index) => {
    setLiked(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(testimonials.length / 2)) % Math.ceil(testimonials.length / 2));
  };

  const visibleTestimonials = testimonials.slice(currentIndex * 2, currentIndex * 2 + 2);

  return (
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
          {visibleTestimonials.map((testimonial, idx) => (
            <div 
              key={idx} 
              className={`${theme.card} rounded-2xl p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer group`}
            >
              <Quote size={32} className="text-blue-500 opacity-30 mb-4" />
              <p className={`${theme.text} text-lg mb-4 italic`}>"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${testimonial.avatar}&background=random`;
                  }}
                />
                <div>
                  <p className={`font-semibold ${theme.text}`}>{testimonial.name}</p>
                  <p className={`text-sm ${theme.textSecondary}`}>{testimonial.role}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <button 
                    onClick={() => handleLike(idx)}
                    className={`p-1 rounded-full transition-all ${liked[idx] ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                  >
                    <Heart size={16} fill={liked[idx] ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {testimonials.length > 2 && (
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={prevSlide}
              className={`p-2 rounded-full ${theme.cardHover} transition-all hover:scale-110`}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className={`p-2 rounded-full ${theme.cardHover} transition-all hover:scale-110`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}