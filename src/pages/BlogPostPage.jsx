// pages/BlogPostPage.jsx - Individual Blog Post Page
import React from 'react';
import { useApp } from '../App';
import { 
  Calendar, User, Tag, Clock, Heart, Eye, MessageCircle, 
  Share2, Link as LinkIcon,
  ArrowLeft, ThumbsUp, Bookmark
} from 'lucide-react';
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
export default function BlogPostPage({ post }) {
  const { theme, setActivePage } = useApp();

  const blogPost = post || {
    id: 1,
    title: '10 Ways to Increase E-commerce Sales',
    content: `
      <p>E-commerce is growing rapidly, and staying ahead of the competition requires strategic thinking and implementation of proven techniques. Here are 10 powerful ways to boost your online sales:</p>
      
      <h2>1. Optimize Your Product Pages</h2>
      <p>Your product pages are your virtual storefront. Make sure they have high-quality images, detailed descriptions, customer reviews, and clear calls-to-action. Include videos when possible to showcase products in action.</p>
      
      <h2>2. Implement Abandoned Cart Recovery</h2>
      <p>Cart abandonment is a major challenge for e-commerce stores. Send automated emails to customers who leave items in their cart, offering incentives like discounts or free shipping to complete the purchase.</p>
      
      <h2>3. Leverage Social Proof</h2>
      <p>Display customer reviews, ratings, testimonials, and user-generated content prominently. Social proof builds trust and encourages purchases.</p>
      
      <h2>4. Offer Multiple Payment Options</h2>
      <p>Provide various payment methods including credit cards, PayPal, Apple Pay, Google Pay, and buy now pay later options to accommodate all customers.</p>
      
      <h2>5. Improve Site Speed</h2>
      <p>Slow loading pages kill conversions. Optimize images, use caching, and choose a fast hosting provider to ensure your site loads quickly.</p>
      
      <h2>6. Use Email Marketing</h2>
      <p>Build an email list and send targeted campaigns, product recommendations, and exclusive offers to drive repeat purchases.</p>
      
      <h2>7. Implement Live Chat</h2>
      <p>Real-time customer support can answer questions instantly and prevent abandoned carts. AI chatbots can handle common queries 24/7.</p>
      
      <h2>8. Create Urgency</h2>
      <p>Use countdown timers, limited stock notifications, and flash sales to create urgency and encourage immediate purchases.</p>
      
      <h2>9. Optimize for Mobile</h2>
      <p>With over 50% of e-commerce traffic coming from mobile devices, ensure your store is fully responsive and easy to navigate on smartphones.</p>
      
      <h2>10. Retargeting Ads</h2>
      <p>Use retargeting campaigns to bring back visitors who didn't purchase. Show them relevant products they viewed to remind them of their interest.</p>
      
      <h3>Conclusion</h3>
      <p>Implementing these strategies will help you increase conversions, reduce cart abandonment, and grow your e-commerce business. Start with a few and gradually add more as you see results.</p>
    `,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    date: 'Jan 15, 2024',
    author: 'Sarah Johnson',
    category: 'Marketing',
    readTime: '8 min read',
    likes: 234,
    views: 1245,
    comments: 45,
    tags: ['ecommerce', 'sales', 'marketing', 'tips']
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Back Button */}
      <button
        onClick={() => setActivePage('blog')}
        className={`flex items-center gap-2 mb-6 ${theme.textSecondary} hover:${theme.text} transition-colors`}
      >
        <ArrowLeft size={20} /> Back to Blog
      </button>

      {/* Header Image */}
      <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-6">
        <img src={blogPost.image} alt={blogPost.title} className="w-full h-full object-cover" />
      </div>

      {/* Title */}
      <h1 className={`text-3xl md:text-4xl font-bold ${theme.text} mb-4`}>{blogPost.title}</h1>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <span className={`flex items-center gap-2 ${theme.textSecondary}`}>
          <Calendar size={16} /> {blogPost.date}
        </span>
        <span className={`flex items-center gap-2 ${theme.textSecondary}`}>
          <User size={16} /> {blogPost.author}
        </span>
        <span className={`flex items-center gap-2 ${theme.textSecondary}`}>
          <Tag size={16} /> {blogPost.category}
        </span>
        <span className={`flex items-center gap-2 ${theme.textSecondary}`}>
          <Clock size={16} /> {blogPost.readTime}
        </span>
      </div>

      {/* Content */}
      <div 
        className={`prose max-w-none ${theme.text} ${theme.textSecondary} leading-relaxed space-y-4`}
        dangerouslySetInnerHTML={{ __html: blogPost.content }}
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        {blogPost?.tags?.map(tag => (
          <span key={tag} className={`px-3 py-1 rounded-full text-sm ${theme.cardHover} ${theme.textSecondary}`}>
            #{tag}
          </span>
        ))}
      </div>

      {/* Engagement Section */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-4">
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme.cardHover}`}>
            <Heart size={18} /> {blogPost.likes}
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme.cardHover}`}>
            <MessageCircle size={18} /> {blogPost.comments}
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme.cardHover}`}>
            <Bookmark size={18} /> Save
          </button>
        </div>
        <div className="flex gap-2">
          <button className={`p-2 rounded-lg ${theme.cardHover}`}><FaFacebook  size={18} /></button>
          <button className={`p-2 rounded-lg ${theme.cardHover}`}><FaXTwitter size={18} /></button>
          <button className={`p-2 rounded-lg ${theme.cardHover}`}><FaLinkedin size={18} /></button>
          <button className={`p-2 rounded-lg ${theme.cardHover}`}><LinkIcon size={18} /></button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className={`text-xl font-bold mb-4 ${theme.text}`}>Comments ({blogPost.comments})</h3>
        <div className="flex gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            Y
          </div>
          <textarea
            placeholder="Write a comment..."
            rows={3}
            className={`flex-1 px-4 py-2 rounded-xl border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className={`p-4 rounded-xl ${theme.cardHover}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center text-white text-xs font-bold">
                  JD
                </div>
                <div>
                  <p className={`font-medium ${theme.text}`}>John Doe</p>
                  <p className={`text-xs ${theme.textSecondary}`}>2 days ago</p>
                </div>
                <button className="ml-auto text-xs text-blue-500">Reply</button>
              </div>
              <p className={`text-sm ${theme.textSecondary}`}>Great article! Very informative and helpful for my business.</p>
              <button className="flex items-center gap-1 mt-2 text-xs text-gray-500"><ThumbsUp size={12} /> Like (5)</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}