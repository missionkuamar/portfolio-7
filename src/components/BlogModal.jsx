// components/BlogModal.jsx - Full Blog Post Modal
import React, { useState } from 'react';
import { X, Calendar, User, Tag, Heart, Eye, MessageCircle, Share2, Link as LinkIcon, Clock, ThumbsUp } from 'lucide-react';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
export default function BlogModal({ post, onClose, theme }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, author: 'John Doe', content: 'Great article! Very informative.', date: '2024-01-16', likes: 5 },
    { id: 2, author: 'Jane Smith', content: 'Thanks for sharing these insights.', date: '2024-01-15', likes: 3 }
  ]);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, { id: comments.length + 1, author: 'You', content: comment, date: new Date().toISOString().split('T')[0], likes: 0 }]);
      setComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className={`${theme.card} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-inherit">
          <h2 className={`text-2xl font-bold ${theme.text}`}>{post.title}</h2>
          <button onClick={onClose} className={`p-2 rounded-lg ${theme.cardHover}`}><X size={24} /></button>
        </div>
        
        <div className="p-6">
          {/* Header Image */}
          <div className="h-64 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-8xl mb-6">📄</div>
          
          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <span className={`flex items-center gap-2 ${theme.textSecondary}`}><Calendar size={16} />{new Date(post.date).toLocaleDateString()}</span>
            <span className={`flex items-center gap-2 ${theme.textSecondary}`}><User size={16} />{post.author}</span>
            <span className={`flex items-center gap-2 ${theme.textSecondary}`}><Clock size={16} />{post.readTime} read</span>
            <span className={`flex items-center gap-2 ${theme.textSecondary}`}><Tag size={16} />{post.category}</span>
          </div>
          
          {/* Content */}
          <div className="prose max-w-none mb-6">
            <p className={`${theme.text} leading-relaxed mb-4`}>{post.excerpt}</p>
            <p className={`${theme.textSecondary} leading-relaxed mb-4`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p className={`${theme.textSecondary} leading-relaxed mb-4`}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h3 className={`text-xl font-semibold ${theme.text} mt-6 mb-3`}>Key Takeaways</h3>
            <ul className={`${theme.textSecondary} space-y-2 list-disc pl-5`}><li>First important point about the topic</li><li>Second crucial insight for readers</li><li>Third valuable takeaway from the article</li></ul>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            {post.tags.map(tag => (<span key={tag} className={`px-3 py-1 rounded-full text-sm ${theme.cardHover} ${theme.textSecondary}`}>#{tag}</span>))}
          </div>
          
          {/* Engagement Buttons */}
          <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-3">
              <button onClick={handleLike} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${liked ? 'bg-red-500 text-white' : theme.cardHover}`}><Heart size={18} fill={liked ? "white" : "none"} /> {likesCount}</button>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme.cardHover}`}><MessageCircle size={18} /> {post.comments + comments.length}</button>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme.cardHover}`}><Share2 size={18} /> Share</button>
            </div>
            <div className="flex gap-2"><button className={`p-2 rounded-lg ${theme.cardHover}`}><Facebook size={18} /></button><button className={`p-2 rounded-lg ${theme.cardHover}`}><Twitter size={18} /></button><button className={`p-2 rounded-lg ${theme.cardHover}`}><Linkedin size={18} /></button></div>
          </div>
          
          {/* Comments Section */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className={`text-xl font-semibold mb-4 ${theme.text}`}>Comments ({comments.length})</h3>
            <div className="flex gap-3 mb-6"><input type="text" placeholder="Write a comment..." value={comment} onChange={(e) => setComment(e.target.value)} className={`flex-1 px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
              <button onClick={handleAddComment} className={`px-4 py-2 rounded-lg ${theme.primary} text-white`}>Post</button>
            </div>
            <div className="space-y-4">{comments.map(c => (<div key={c.id} className={`p-3 rounded-lg ${theme.cardHover}`}><div className="flex justify-between items-start mb-2"><span className={`font-semibold ${theme.text}`}>{c.author}</span><span className={`text-xs ${theme.textSecondary}`}>{c.date}</span></div><p className={`${theme.textSecondary} text-sm`}>{c.content}</p><button className={`flex items-center gap-1 mt-2 text-xs ${theme.textSecondary} hover:${theme.text}`}><ThumbsUp size={12} /> Like ({c.likes})</button></div>))}</div>
          </div>
        </div>
      </div>
    </div>
  );
}