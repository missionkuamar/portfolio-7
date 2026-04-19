// pages/ProductsPage.jsx - Ultra Advanced with Complete Features
import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../App';
import { 
  Package, Star, ShoppingCart, Heart, Filter, Search, X, 
  ChevronDown, ChevronUp, SlidersHorizontal, DollarSign, 
  Eye, TrendingUp, Clock, Tag, Zap, Shield, Truck, 
  Gift, Sparkles, Grid, List, ChevronLeft, ChevronRight,
  Info, Share2, Link as LinkIcon
} from 'lucide-react';
import ProductModal from '../components/ProductModal';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
export default function ProductsPage() {
  const { theme, setCartItems, cartItems, addToWishlist, wishlist } = useApp();
  
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);

  // Complete products data (50+ products for demo)
  const allProducts = useMemo(() => [
    { id: 1, name: 'Premium Wireless Headphones', price: 299, originalPrice: 399, rating: 4.8, category: 'Electronics', image: '🎧', inStock: true, tags: ['audio', 'wireless', 'premium'], sales: 1234, views: 5678, featured: true, new: false, discount: 25 },
    { id: 2, name: 'Smart Watch Ultra', price: 499, originalPrice: 599, rating: 4.9, category: 'Electronics', image: '⌚', inStock: true, tags: ['wearable', 'smart', 'fitness'], sales: 892, views: 3456, featured: true, new: true, discount: 17 },
    { id: 3, name: 'Designer Backpack', price: 129, originalPrice: 199, rating: 4.7, category: 'Fashion', image: '🎒', inStock: true, tags: ['bags', 'fashion', 'travel'], sales: 2341, views: 4567, featured: false, new: false, discount: 35 },
    { id: 4, name: 'USB-C Hub Pro', price: 79, originalPrice: 99, rating: 4.6, category: 'Electronics', image: '🔌', inStock: false, tags: ['accessories', 'usb', 'hub'], sales: 3456, views: 7890, featured: false, new: false, discount: 20 },
    { id: 5, name: 'Mechanical Keyboard', price: 189, originalPrice: 249, rating: 4.8, category: 'Electronics', image: '⌨️', inStock: true, tags: ['keyboard', 'gaming', 'mechanical'], sales: 1567, views: 4321, featured: true, new: false, discount: 24 },
    { id: 6, name: 'Gaming Mouse X', price: 89, originalPrice: 129, rating: 4.7, category: 'Electronics', image: '🖱️', inStock: true, tags: ['mouse', 'gaming', 'rgb'], sales: 2789, views: 6543, featured: false, new: true, discount: 31 },
    { id: 7, name: 'Wireless Earbuds Pro', price: 159, originalPrice: 229, rating: 4.8, category: 'Electronics', image: '🎧', inStock: true, tags: ['audio', 'wireless', 'earbuds'], sales: 3452, views: 8765, featured: true, new: false, discount: 30 },
    { id: 8, name: 'Smart Home Hub', price: 199, originalPrice: 279, rating: 4.5, category: 'Smart Home', image: '🏠', inStock: true, tags: ['smart', 'home', 'iot'], sales: 987, views: 3210, featured: false, new: false, discount: 28 },
    { id: 9, name: '4K Action Camera', price: 299, originalPrice: 399, rating: 4.6, category: 'Cameras', image: '📷', inStock: true, tags: ['camera', 'action', '4k'], sales: 654, views: 2345, featured: false, new: true, discount: 25 },
    { id: 10, name: 'Fitness Tracker Band', price: 79, originalPrice: 99, rating: 4.4, category: 'Electronics', image: '⌚', inStock: true, tags: ['fitness', 'wearable', 'tracker'], sales: 1876, views: 5432, featured: false, new: false, discount: 20 },
    { id: 11, name: 'Portable Monitor', price: 249, originalPrice: 349, rating: 4.7, category: 'Electronics', image: '🖥️', inStock: true, tags: ['monitor', 'portable', 'display'], sales: 543, views: 1876, featured: false, new: true, discount: 28 },
    { id: 12, name: 'Wireless Charger Pad', price: 39, originalPrice: 59, rating: 4.5, category: 'Accessories', image: '⚡', inStock: true, tags: ['charger', 'wireless', 'qi'], sales: 3456, views: 7890, featured: false, new: false, discount: 34 },
    { id: 13, name: 'Noise Cancelling Headphones', price: 349, originalPrice: 499, rating: 4.9, category: 'Electronics', image: '🎧', inStock: true, tags: ['audio', 'noise-cancelling', 'premium'], sales: 2345, views: 6789, featured: true, new: false, discount: 30 },
    { id: 14, name: 'Smart Light Bulb Kit', price: 59, originalPrice: 89, rating: 4.6, category: 'Smart Home', image: '💡', inStock: true, tags: ['smart', 'lighting', 'rgb'], sales: 1876, views: 4321, featured: false, new: false, discount: 34 },
    { id: 15, name: 'Tablet Stand Holder', price: 29, originalPrice: 49, rating: 4.3, category: 'Accessories', image: '📱', inStock: true, tags: ['stand', 'tablet', 'holder'], sales: 987, views: 2345, featured: false, new: false, discount: 41 },
    { id: 16, name: 'Gaming Chair', price: 299, originalPrice: 399, rating: 4.7, category: 'Furniture', image: '🪑', inStock: true, tags: ['gaming', 'chair', 'ergonomic'], sales: 765, views: 2987, featured: false, new: false, discount: 25 },
  ], []);

  // Extract unique categories and tags
  const categories = useMemo(() => ['all', ...new Set(allProducts.map(p => p.category))], [allProducts]);
  const allTags = useMemo(() => [...new Set(allProducts.flatMap(p => p.tags))], [allProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(p => selectedTags.some(tag => p.tags.includes(tag)));
    }

    // Price range
    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(p => p.rating >= minRating);
    }

    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter(p => p.inStock);
    }

    // On sale filter
    if (onSaleOnly) {
      filtered = filtered.filter(p => p.discount > 0);
    }

    // Free shipping filter
    if (freeShipping) {
      filtered = filtered.filter(p => p.price > 50);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'popular': return b.sales - a.sales;
        case 'newest': return b.new ? 1 : -1;
        case 'discount': return (b.discount || 0) - (a.discount || 0);
        default: return b.featured ? 1 : -1;
      }
    });

    return filtered;
  }, [allProducts, searchTerm, selectedCategory, selectedTags, priceRange, minRating, sortBy, inStockOnly, onSaleOnly, freeShipping]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTags, priceRange, minRating, sortBy, inStockOnly, onSaleOnly, freeShipping]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTags([]);
    setPriceRange({ min: 0, max: 1000 });
    setMinRating(0);
    setSortBy('featured');
    setInStockOnly(false);
    setOnSaleOnly(false);
    setFreeShipping(false);
    setCurrentPage(1);
  };

  const addToCartHandler = (product) => {
    setCartItems(cartItems + 1);
    // Show success notification
  };

  const addToWishlistHandler = (product) => {
    // Wishlist functionality
  };

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
            <Package className="inline mr-3 mb-1" size={32} />
            Our Products
          </h1>
          <p className={`${theme.textSecondary} mt-1`}>Discover amazing products at best prices</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? theme.primary + ' text-white' : theme.cardHover}`}><Grid size={20} /></button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? theme.primary + ' text-white' : theme.cardHover}`}><List size={20} /></button>
          <button onClick={() => setShowFilters(!showFilters)} className={`p-2 rounded-lg transition-all flex items-center gap-2 ${showFilters ? theme.primary + ' text-white' : theme.cardHover}`}>
            <Filter size={20} /><span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} size={20} />
        <input type="text" placeholder="Search products by name, category, or tags..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-12 pr-4 py-3 rounded-xl border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`} />
        {searchTerm && <button onClick={() => setSearchTerm('')} className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme.textSecondary} hover:${theme.text}`}><X size={18} /></button>}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className={`${theme.card} rounded-xl p-5 border ${theme.border} animate-slideDown`}>
          <div className="flex justify-between items-center mb-4"><h3 className={`font-semibold ${theme.text} flex items-center gap-2`}><SlidersHorizontal size={18} />Advanced Filters</h3>
            <button onClick={clearAllFilters} className={`text-sm ${theme.textSecondary} hover:${theme.text} flex items-center gap-1`}><X size={14} /> Clear all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}>
                {categories.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
              </select>
            </div>
            <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Min Rating</label>
              <div className="flex gap-2">{[0, 3, 4, 4.5].map(r => <button key={r} onClick={() => setMinRating(r)} className={`px-3 py-2 rounded-lg text-sm transition-all ${minRating === r ? theme.primary + ' text-white' : theme.cardHover}`}>{r === 0 ? 'Any' : `${r}+`}</button>)}</div>
            </div>
            <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Price Range</label>
              <div className="flex gap-2 items-center"><input type="number" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })} className={`w-20 px-2 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`} placeholder="Min" />
                <span className={theme.textSecondary}>-</span><input type="number" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })} className={`w-20 px-2 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`} placeholder="Max" />
              </div>
            </div>
            <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}>
                <option value="featured">Featured</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option><option value="popular">Most Popular</option><option value="newest">Newest</option><option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="w-4 h-4 rounded" /><span className={`text-sm ${theme.text}`}>In Stock Only</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={onSaleOnly} onChange={(e) => setOnSaleOnly(e.target.checked)} className="w-4 h-4 rounded" /><span className={`text-sm ${theme.text}`}>On Sale</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={freeShipping} onChange={(e) => setFreeShipping(e.target.checked)} className="w-4 h-4 rounded" /><span className={`text-sm ${theme.text}`}>Free Shipping</span></label>
          </div>
          <div className="mt-4"><button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} className={`text-sm ${theme.text} flex items-center gap-1 mb-2`}>Popular Tags {showAdvancedFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button>
            {showAdvancedFilters && <div className="flex flex-wrap gap-2">{allTags.map(tag => <button key={tag} onClick={() => toggleTag(tag)} className={`px-3 py-1 rounded-full text-sm transition-all ${selectedTags.includes(tag) ? theme.primary + ' text-white' : theme.cardHover}`}>#{tag}</button>)}</div>}
          </div>
        </div>
      )}

      {/* Results Info */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex flex-wrap gap-2">
          <span className={`text-sm ${theme.textSecondary}`}>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products</span>
        </div>
        <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
          <option value={8}>Show 8</option><option value={12}>Show 12</option><option value={16}>Show 16</option><option value={24}>Show 24</option>
        </select>
      </div>

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map(product => <ProductCard key={product.id} product={product} theme={theme} onAddToCart={() => addToCartHandler(product)} onViewDetails={() => setSelectedProduct(product)} onAddToWishlist={() => addToWishlistHandler(product)} />)}
        </div>
      ) : (
        <div className="space-y-4">{currentProducts.map(product => <ProductCardList key={product.id} product={product} theme={theme} onAddToCart={() => addToCartHandler(product)} onViewDetails={() => setSelectedProduct(product)} />)}</div>
      )}

      {/* Pagination */}
      {totalPages > 1 && <Pagination />}

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className={`${theme.card} rounded-xl p-12 text-center`}>
          <Package size={48} className="mx-auto mb-4 opacity-30" />
          <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>No products found</h3>
          <p className={theme.textSecondary}>Try adjusting your filters or search terms</p>
          <button onClick={clearAllFilters} className={`mt-4 ${theme.primary} text-white px-6 py-2 rounded-lg`}>Clear all filters</button>
        </div>
      )}

      {/* Product Modal */}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} theme={theme} onAddToCart={addToCartHandler} />}
    </div>
  );
}

// Grid View Product Card
const ProductCard = ({ product, theme, onAddToCart, onViewDetails, onAddToWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className={`group ${theme.card} rounded-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer border ${theme.border}`}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <div className="text-7xl flex items-center justify-center h-full">{product.image}</div>
        {discount > 0 && <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold">-{discount}%</div>}
        {product.new && <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full font-bold">NEW</div>}
        {isHovered && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3">
            <button onClick={onViewDetails} className="p-2 bg-white rounded-full hover:scale-110 transition-transform"><Eye size={18} className="text-gray-900" /></button>
            <button onClick={onAddToCart} className="p-2 bg-blue-600 rounded-full hover:scale-110 transition-transform"><ShoppingCart size={18} className="text-white" /></button>
            <button onClick={onAddToWishlist} className="p-2 bg-pink-600 rounded-full hover:scale-110 transition-transform"><Heart size={18} className="text-white" /></button>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className={`font-semibold ${theme.text} mb-1 line-clamp-1`}>{product.name}</h3>
        <div className="flex items-center gap-2 mb-2"><div className="flex text-yellow-400">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />)}</div><span className={`text-xs ${theme.textSecondary}`}>({product.rating})</span></div>
        <div className="flex items-center gap-2 mb-3"><span className={`text-2xl font-bold text-blue-500`}>${product.price}</span>{product.originalPrice > product.price && <span className={`text-sm line-through ${theme.textSecondary}`}>${product.originalPrice}</span>}</div>
        <div className="flex flex-wrap gap-1 mb-3">{product.tags.slice(0, 2).map(tag => (<span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${theme.cardHover} ${theme.textSecondary}`}>#{tag}</span>))}</div>
        <button onClick={onAddToCart} disabled={!product.inStock} className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${product.inStock ? `${theme.primary} ${theme.primaryHover} text-white` : 'bg-gray-400 cursor-not-allowed text-gray-700'}`}>
          <ShoppingCart size={16} /> {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

// List View Product Card
const ProductCardList = ({ product, theme, onAddToCart, onViewDetails }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  
  return (
    <div className={`${theme.card} rounded-xl p-4 hover:shadow-xl transition-all border ${theme.border}`}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-40 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center text-5xl">{product.image}
          {discount > 0 && <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded font-bold">-{discount}%</div>}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap justify-between items-start gap-2"><h3 className={`text-xl font-bold ${theme.text}`}>{product.name}</h3>
            <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-lg"><Star size={14} className="text-yellow-500 fill-yellow-500" /><span className={`text-sm font-semibold ${theme.text}`}>{product.rating}</span></div>
          </div>
          <div className="flex flex-wrap gap-3 mt-1 text-sm"><span className={`flex items-center gap-1 ${theme.textSecondary}`}><Tag size={14} />{product.category}</span><span className={`flex items-center gap-1 ${theme.textSecondary}`}><TrendingUp size={14} />{product.sales} sold</span><span className={`flex items-center gap-1 ${theme.textSecondary}`}><Eye size={14} />{product.views} views</span></div>
          <div className="flex flex-wrap gap-1 mt-2">{product.tags.map(tag => (<span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${theme.cardHover} ${theme.textSecondary}`}>#{tag}</span>))}</div>
          <div className="flex justify-between items-center mt-3"><div><span className={`text-2xl font-bold text-blue-500`}>${product.price}</span>{product.originalPrice > product.price && <span className={`text-sm line-through ${theme.textSecondary} ml-2`}>${product.originalPrice}</span>}</div>
            <div className="flex gap-2"><button onClick={onViewDetails} className={`px-4 py-1.5 rounded-lg ${theme.cardHover} ${theme.text} text-sm flex items-center gap-1`}><Eye size={14} /> Details</button>
              <button onClick={onAddToCart} disabled={!product.inStock} className={`px-4 py-1.5 rounded-lg text-sm flex items-center gap-1 ${product.inStock ? `${theme.primary} text-white` : 'bg-gray-400 cursor-not-allowed text-gray-700'}`}><ShoppingCart size={14} /> Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};