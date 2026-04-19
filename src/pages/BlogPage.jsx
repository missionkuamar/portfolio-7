// pages/BlogPage.jsx - Ultra Advanced with Complete Features
import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../App';
import { 
  BookOpen, Calendar, User, ArrowRight, Tag, Search, X,
  Filter, ChevronDown, ChevronUp, Heart, Eye, MessageCircle,
  Share2,Link as LinkIcon,
  Clock, TrendingUp, Award, Sparkles, Mail, Bell,
  ChevronLeft, ChevronRight, Grid, List, ThumbsUp
} from 'lucide-react';
import BlogModal from '../components/BlogModal';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
export default function BlogPage() {
  const { theme } = useApp();
  
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Complete blog posts data (20+ posts for demo)
  const allPosts = useMemo(() => [
    { 
      id: 1, title: '10 Tips to Boost Your E-commerce Sales', 
      excerpt: 'Learn proven strategies to increase your online store revenue and convert more customers...',
      content: 'Full content here...', date: '2024-01-15', author: 'Sarah Johnson', category: 'Marketing',
      readTime: '5 min', tags: ['ecommerce', 'sales', 'marketing'], likes: 234, views: 1250, comments: 45,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', featured: true
    },
    { 
      id: 2, title: 'The Future of SaaS in E-commerce', 
      excerpt: 'Exploring emerging trends and technologies shaping the future of online retail...',
      content: 'Full content here...', date: '2024-01-10', author: 'Michael Chen', category: 'Technology',
      readTime: '7 min', tags: ['saas', 'technology', 'future'], likes: 189, views: 980, comments: 32,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', featured: true
    },
    { 
      id: 3, title: 'Customer Experience Best Practices', 
      excerpt: 'How to create memorable shopping experiences that drive customer loyalty and retention...',
      content: 'Full content here...', date: '2024-01-05', author: 'Emma Wilson', category: 'Customer Service',
      readTime: '6 min', tags: ['customer', 'experience', 'service'], likes: 312, views: 2100, comments: 67,
      image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=400', featured: false
    },
    { 
      id: 4, title: 'SEO Strategies for Online Stores', 
      excerpt: 'Optimize your product pages and rank higher in search results with these proven techniques...',
      content: 'Full content here...', date: '2023-12-28', author: 'David Kim', category: 'SEO',
      readTime: '8 min', tags: ['seo', 'marketing', 'ranking'], likes: 267, views: 1560, comments: 54,
      image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400', featured: false
    },
    { 
      id: 5, title: 'Social Media Marketing Mastery', 
      excerpt: 'Learn how to leverage social platforms to grow your brand and engage with customers...',
      content: 'Full content here...', date: '2023-12-20', author: 'Lisa Wong', category: 'Marketing',
      readTime: '6 min', tags: ['social media', 'marketing', 'engagement'], likes: 198, views: 890, comments: 23,
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400', featured: false
    },
    { 
      id: 6, title: 'AI in E-commerce: The Complete Guide', 
      excerpt: 'How artificial intelligence is transforming the way we shop and sell online...',
      content: 'Full content here...', date: '2023-12-15', author: 'Alex Turner', category: 'Technology',
      readTime: '10 min', tags: ['ai', 'technology', 'automation'], likes: 456, views: 3420, comments: 89,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400', featured: true
    },
    { 
      id: 7, title: 'Email Marketing That Converts', 
      excerpt: 'Build effective email campaigns that drive sales and build customer relationships...',
      content: 'Full content here...', date: '2023-12-10', author: 'Rachel Green', category: 'Marketing',
      readTime: '5 min', tags: ['email', 'marketing', 'conversion'], likes: 167, views: 760, comments: 34,
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400', featured: false
    },
    { 
      id: 8, title: 'Mobile Commerce Trends 2024', 
      excerpt: 'Stay ahead with the latest mobile shopping trends and optimization strategies...',
      content: 'Full content here...', date: '2023-12-05', author: 'Tom Brady', category: 'Trends',
      readTime: '7 min', tags: ['mobile', 'trends', 'shopping'], likes: 234, views: 1230, comments: 45,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400', featured: false
    },
    { 
      id: 9, title: 'Sustainable E-commerce Practices', 
      excerpt: 'How to build an environmentally conscious online store that customers love...',
      content: 'Full content here...', date: '2023-11-28', author: 'Emma Wilson', category: 'Sustainability',
      readTime: '6 min', tags: ['sustainable', 'eco-friendly', 'green'], likes: 345, views: 2100, comments: 78,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400', featured: false
    },
    { 
      id: 10, title: 'Payment Gateway Integration Guide', 
      excerpt: 'Choose and integrate the right payment solution for your online store...',
      content: 'Full content here...', date: '2023-11-20', author: 'Mike Ross', category: 'Technology',
      readTime: '8 min', tags: ['payment', 'integration', 'checkout'], likes: 156, views: 890, comments: 34,
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400', featured: false
    }
  ], []);

  // Extract unique categories and tags
  const categories = useMemo(() => ['all', ...new Set(allPosts.map(p => p.category))], [allPosts]);
  const allTags = useMemo(() => [...new Set(allPosts.flatMap(p => p.tags))], [allPosts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = [...allPosts];

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        p.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(p => selectedTags.some(tag => p.tags.includes(tag)));
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'latest': return new Date(b.date) - new Date(a.date);
        case 'oldest': return new Date(a.date) - new Date(b.date);
        case 'popular': return b.likes - a.likes;
        case 'most-viewed': return b.views - a.views;
        case 'most-comments': return b.comments - a.comments;
        default: return 0;
      }
    });

    return filtered;
  }, [allPosts, searchTerm, selectedCategory, selectedTags, sortBy]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTags, sortBy]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTags([]);
    setSortBy('latest');
    setCurrentPage(1);
  };

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setTimeout(() => setShowNewsletter(false), 2000);
    }
  };

  // Category stats
  const categoryStats = useMemo(() => {
    const stats = {};
    allPosts.forEach(post => {
      stats[post.category] = (stats[post.category] || 0) + 1;
    });
    return stats;
  }, [allPosts]);

  // Pagination component
  const Pagination = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

    return (
      <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
        <button onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          disabled={currentPage === 1} className={`p-2 rounded-lg transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : theme.cardHover}`}>
          <ChevronLeft size={20} />
        </button>
        {startPage > 1 && <><button onClick={() => setCurrentPage(1)} className={`px-4 py-2 rounded-lg ${theme.cardHover}`}>1</button>{startPage > 2 && <span className="px-2">...</span>}</>}
        {pageNumbers.map(n => <button key={n} onClick={() => setCurrentPage(n)} className={`px-4 py-2 rounded-lg transition-all ${currentPage === n ? theme.primary + ' text-white' : theme.cardHover}`}>{n}</button>)}
        {endPage < totalPages && <>{endPage < totalPages - 1 && <span className="px-2">...</span>}<button onClick={() => setCurrentPage(totalPages)} className={`px-4 py-2 rounded-lg ${theme.cardHover}`}>{totalPages}</button></>}
        <button onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          disabled={currentPage === totalPages} className={`p-2 rounded-lg transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : theme.cardHover}`}>
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-3xl sm:text-4xl font-bold ${theme.text}`}>
            <BookOpen className="inline mr-3 mb-1" size={32} />
            Blog & Insights
          </h1>
          <p className={`${theme.textSecondary} mt-1`}>Latest articles, trends, and expert insights</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? theme.primary + ' text-white' : theme.cardHover}`}><Grid size={20} /></button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? theme.primary + ' text-white' : theme.cardHover}`}><List size={20} /></button>
          <button onClick={() => setShowFilters(!showFilters)} className={`p-2 rounded-lg transition-all flex items-center gap-2 ${showFilters ? theme.primary + ' text-white' : theme.cardHover}`}>
            <Filter size={20} /><span className="hidden sm:inline">Filters</span>
          </button>
          <button onClick={() => setShowNewsletter(true)} className={`p-2 rounded-lg transition-all ${theme.cardHover} flex items-center gap-2`}>
            <Mail size={20} /><span className="hidden sm:inline">Subscribe</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} size={20} />
        <input type="text" placeholder="Search articles by title, content, author, or tags..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-12 pr-4 py-3 rounded-xl border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`} />
        {searchTerm && <button onClick={() => setSearchTerm('')} className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme.textSecondary} hover:${theme.text}`}><X size={18} /></button>}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className={`${theme.card} rounded-xl p-5 border ${theme.border} animate-slideDown`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`font-semibold ${theme.text} flex items-center gap-2`}><Filter size={18} />Filter Articles</h3>
            <button onClick={clearAllFilters} className={`text-sm ${theme.textSecondary} hover:${theme.text} flex items-center gap-1`}><X size={14} /> Clear all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}>
                {categories.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
              </select>
            </div>
            <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}>
                <option value="latest">Latest</option><option value="oldest">Oldest</option>
                <option value="popular">Most Popular</option><option value="most-viewed">Most Viewed</option>
                <option value="most-comments">Most Comments</option>
              </select>
            </div>
            <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Tags</label>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 8).map(tag => (
                  <button key={tag} onClick={() => toggleTag(tag)} className={`px-3 py-1 rounded-full text-sm transition-all ${selectedTags.includes(tag) ? theme.primary + ' text-white' : theme.cardHover}`}>#{tag}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Info */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex flex-wrap gap-2">
          <span className={`text-sm ${theme.textSecondary}`}>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredPosts.length)} of {filteredPosts.length} articles</span>
        </div>
        <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
          <option value={6}>Show 6</option><option value={9}>Show 9</option><option value={12}>Show 12</option>
        </select>
      </div>

      {/* Blog Posts Grid/List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-2 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}`}>
          {currentPosts.map(post => viewMode === 'grid' ? (
            <BlogCard key={post.id} post={post} theme={theme} onViewDetails={() => setSelectedPost(post)} />
          ) : (
            <BlogCardList key={post.id} post={post} theme={theme} onViewDetails={() => setSelectedPost(post)} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories Widget */}
          <div className={`${theme.card} rounded-xl p-6 sticky top-24`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme.text} flex items-center gap-2`}><Tag size={18} />Categories</h3>
            <div className="space-y-2">
              {Object.entries(categoryStats).map(([cat, count]) => (
                <div key={cat} onClick={() => setSelectedCategory(cat)} className="flex justify-between items-center cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-all">
                  <span className={theme.textSecondary}>{cat}</span>
                  <span className={`text-xs ${theme.primary} px-2 py-0.5 rounded-full text-white`}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Posts Widget */}
          <div className={`${theme.card} rounded-xl p-6`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme.text} flex items-center gap-2`}><TrendingUp size={18} />Popular Posts</h3>
            <div className="space-y-3">
              {allPosts.filter(p => p.featured).slice(0, 4).map(post => (
                <div key={post.id} onClick={() => setSelectedPost(post)} className="flex gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-all">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-2xl">📄</div>
                  <div className="flex-1"><p className={`text-sm font-semibold ${theme.text} line-clamp-2`}>{post.title}</p>
                    <div className="flex items-center gap-2 mt-1"><Eye size={12} className={theme.textSecondary} /><span className={`text-xs ${theme.textSecondary}`}>{post.views} views</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags Cloud */}
          <div className={`${theme.card} rounded-xl p-6`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme.text} flex items-center gap-2`}><Sparkles size={18} />Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button key={tag} onClick={() => toggleTag(tag)} className={`px-3 py-1 rounded-full text-sm transition-all ${selectedTags.includes(tag) ? theme.primary + ' text-white' : theme.cardHover}`}>#{tag}</button>
              ))}
            </div>
          </div>

          {/* Newsletter Widget */}
          <div className={`${theme.card} rounded-xl p-6 bg-gradient-to-br ${theme.gradient}`}>
            <h3 className={`text-lg font-semibold mb-2 ${theme.text} flex items-center gap-2`}><Bell size={18} />Newsletter</h3>
            <p className={`text-sm ${theme.textSecondary} mb-4`}>Get the latest posts delivered to your inbox.</p>
            <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} mb-3`} />
            <button onClick={handleSubscribe} className={`w-full ${theme.primary} text-white py-2 rounded-lg transition-all`}>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && <Pagination />}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className={`${theme.card} rounded-xl p-12 text-center`}>
          <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
          <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>No articles found</h3>
          <p className={theme.textSecondary}>Try adjusting your filters or search terms</p>
          <button onClick={clearAllFilters} className={`mt-4 ${theme.primary} text-white px-6 py-2 rounded-lg`}>Clear all filters</button>
        </div>
      )}

      {/* Newsletter Modal */}
      {showNewsletter && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowNewsletter(false)}>
          <div className={`${theme.card} rounded-2xl max-w-md w-full p-6 text-center`} onClick={(e) => e.stopPropagation()}>
            {subscribed ? (
              <>
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-4"><Mail size={32} className="text-white" /></div>
                <h3 className={`text-2xl font-bold mb-2 ${theme.text}`}>Subscribed!</h3>
                <p className={theme.textSecondary}>Thank you for subscribing to our newsletter!</p>
              </>
            ) : (
              <>
                <h3 className={`text-2xl font-bold mb-2 ${theme.text}`}>Subscribe to Newsletter</h3>
                <p className={`${theme.textSecondary} mb-4`}>Get the latest articles and insights straight to your inbox.</p>
                <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} mb-3`} />
                <button onClick={handleSubscribe} className={`w-full ${theme.primary} text-white py-2 rounded-lg`}>Subscribe</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Blog Modal */}
      {selectedPost && <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} theme={theme} />}
    </div>
  );
}

// Grid View Blog Card
const BlogCard = ({ post, theme, onViewDetails }) => {
  return (
    <div className={`group ${theme.card} rounded-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer border ${theme.border}`} onClick={onViewDetails}>
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
        <div className="absolute inset-0 flex items-center justify-center text-6xl">📄</div>
        {post.featured && <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full font-bold">Featured</div>}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs mb-3 flex-wrap">
          <span className={`flex items-center gap-1 ${theme.textSecondary}`}><Calendar size={12} />{new Date(post.date).toLocaleDateString()}</span>
          <span className={`flex items-center gap-1 ${theme.textSecondary}`}><User size={12} />{post.author}</span>
          <span className={`px-2 py-0.5 rounded-full ${theme.primary} text-white text-xs`}>{post.category}</span>
        </div>
        <h3 className={`text-xl font-bold mb-2 ${theme.text} group-hover:text-blue-500 transition-colors line-clamp-2`}>{post.title}</h3>
        <p className={`${theme.textSecondary} mb-3 line-clamp-2 text-sm`}>{post.excerpt}</p>
        <div className="flex flex-wrap gap-1 mb-3">{post.tags.slice(0, 2).map(tag => (<span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${theme.cardHover} ${theme.textSecondary}`}>#{tag}</span>))}</div>
        <div className="flex justify-between items-center"><div className="flex items-center gap-3 text-sm"><span className={`flex items-center gap-1 ${theme.textSecondary}`}><Heart size={14} className="text-red-500" />{post.likes}</span><span className={`flex items-center gap-1 ${theme.textSecondary}`}><Eye size={14} />{post.views}</span><span className={`flex items-center gap-1 ${theme.textSecondary}`}><MessageCircle size={14} />{post.comments}</span></div>
          <span className={`text-sm ${theme.textSecondary} flex items-center gap-1`}><Clock size={12} />{post.readTime}</span>
        </div>
      </div>
    </div>
  );
};

// List View Blog Card
const BlogCardList = ({ post, theme, onViewDetails }) => {
  return (
    <div className={`group ${theme.card} rounded-xl p-4 hover:shadow-xl transition-all border ${theme.border} cursor-pointer`} onClick={onViewDetails}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-48 h-32 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-5xl flex-shrink-0">📄</div>
        <div className="flex-1">
          <div className="flex flex-wrap justify-between items-start gap-2"><h3 className={`text-xl font-bold ${theme.text} group-hover:text-blue-500 transition-colors`}>{post.title}</h3>
            <div className="flex items-center gap-1"><span className={`text-sm ${theme.textSecondary}`}>{post.category}</span></div>
          </div>
          <div className="flex flex-wrap gap-3 mt-1 text-sm"><span className={`flex items-center gap-1 ${theme.textSecondary}`}><Calendar size={12} />{new Date(post.date).toLocaleDateString()}</span><span className={`flex items-center gap-1 ${theme.textSecondary}`}><User size={12} />{post.author}</span><span className={`flex items-center gap-1 ${theme.textSecondary}`}><Clock size={12} />{post.readTime}</span></div>
          <p className={`${theme.textSecondary} mt-2 line-clamp-2 text-sm`}>{post.excerpt}</p>
          <div className="flex flex-wrap gap-1 mt-2">{post.tags.slice(0, 3).map(tag => (<span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${theme.cardHover} ${theme.textSecondary}`}>#{tag}</span>))}</div>
          <div className="flex items-center gap-4 mt-2"><span className={`flex items-center gap-1 text-sm ${theme.textSecondary}`}><Heart size={14} className="text-red-500" />{post.likes}</span><span className={`flex items-center gap-1 text-sm ${theme.textSecondary}`}><Eye size={14} />{post.views}</span><span className={`flex items-center gap-1 text-sm ${theme.textSecondary}`}><MessageCircle size={14} />{post.comments}</span></div>
        </div>
      </div>
    </div>
  );
};