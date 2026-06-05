// components/BlogSection.jsx
import React from 'react';
import { useApp } from '../App';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

export default function BlogSection() {
  const { theme, setActivePage } = useApp();

  const blogPosts = [
    { 
      title: '10 Ways to Increase E-commerce Sales', 
      date: 'Jan 15, 2024', 
      readTime: '5 min', 
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      excerpt: 'Learn proven strategies to boost your online sales and revenue...'
    },
    { 
      title: 'The Future of AI in Retail', 
      date: 'Jan 10, 2024', 
      readTime: '7 min', 
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
      excerpt: 'Discover how AI is revolutionizing the retail industry...'
    },
    { 
      title: 'Customer Experience Best Practices', 
      date: 'Jan 5, 2024', 
      readTime: '6 min', 
      category: 'Customer Service',
      image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=400',
      excerpt: 'Create memorable experiences that drive customer loyalty...'
    },
  ];

  const handleReadMore = (post) => {
    localStorage.setItem('selectedBlogPost', JSON.stringify(post));
    setActivePage('blog-post');
  };

  return (
    <div className="animate-on-scroll" id="blog">
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-2xl font-bold ${theme.text}`}>
          Latest from our blog
        </h2>
        <button 
          onClick={() => setActivePage('blog')} 
          className={`text-blue-500 hover:text-blue-600 flex items-center gap-1 text-sm transition-all`}
        >
          View all posts <ArrowRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPosts.map((post, idx) => (
          <div 
            key={idx} 
            onClick={() => handleReadMore(post)}
            className={`${theme.card} rounded-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer group`}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x200?text=Blog+Post';
                }}
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs mb-3">
                <span className={`px-2 py-1 rounded-full ${theme.primary} text-white`}>{post.category}</span>
                <span className={`flex items-center gap-1 ${theme.textSecondary}`}>
                  <Clock size={12} /> {post.readTime}
                </span>
              </div>
              <h3 className={`font-semibold ${theme.text} mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors`}>
                {post.title}
              </h3>
              <p className={`text-sm ${theme.textSecondary} mb-3 line-clamp-2`}>{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className={`flex items-center gap-1 text-xs ${theme.textSecondary}`}>
                  <Calendar size={12} /> {post.date}
                </span>
                <button className="text-blue-500 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}