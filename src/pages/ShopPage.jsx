// pages/ShopPage.jsx - Ultra Advanced with Complete Filtering System
import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../App';
import { 
  Store, Star, MapPin, Search, Filter, X, ChevronDown, 
  ChevronUp, SlidersHorizontal, TrendingUp, DollarSign, 
  Eye, Clock, Award, Crown, Heart, Share2, ExternalLink,
  Check, LayoutGrid, List, ThumbsUp, Users, Package,
  Phone, Mail, Globe,  Calendar, Tag, AlertCircle, ChevronLeft, ChevronRight,
  Sparkles, Zap, Shield, Truck, Gift
} from 'lucide-react';
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ShopModal from '../components/ShopModal';

export default function ShopPage() {
  const { theme } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Complete Shops Data (20+ shops for demo)
  const allShops = useMemo(() => [
    { 
      id: 1, name: 'Fashion Hub', owner: 'Alice Cooper', rating: 4.8, products: 234, 
      location: 'New York', revenue: 45230, views: 12340, tags: ['fashion', 'clothing', 'trendy'], 
      price: 299, category: 'fashion', verified: true, featured: true, 
      description: 'Premium fashion store with latest trends and designer collections',
      email: 'contact@fashionhub.com', phone: '+1 (212) 555-0123', website: 'fashionhub.com',
      social: { instagram: '@fashionhub', twitter: '@fashionhub', facebook: 'fashionhub' },
      established: '2019',
      ratingCount: 234,
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400'
    },
    { 
      id: 2, name: 'Tech Store', owner: 'Bob Martin', rating: 4.9, products: 156, 
      location: 'San Francisco', revenue: 38120, views: 9870, tags: ['electronics', 'gadgets', 'tech'], 
      price: 499, category: 'electronics', verified: true, featured: true,
      description: 'Latest gadgets and electronics at competitive prices',
      email: 'support@techstore.com', phone: '+1 (415) 555-0456', website: 'techstore.com',
      social: { instagram: '@techstore', twitter: '@techstore', facebook: 'techstore' },
      established: '2020',
      ratingCount: 189,
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'
    },
    { 
      id: 3, name: 'Home Decor', owner: 'Carol Davis', rating: 4.7, products: 89, 
      location: 'Los Angeles', revenue: 27890, views: 5430, tags: ['home', 'decor', 'furniture'], 
      price: 129, category: 'home', verified: false, featured: false,
      description: 'Beautiful home decor and furniture for every room',
      email: 'hello@homedecor.com', phone: '+1 (323) 555-0789', website: 'homedecor.com',
      social: { instagram: '@homedecor', twitter: '@homedecor', facebook: 'homedecor' },
      established: '2021',
      ratingCount: 156,
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400'
    },
    { 
      id: 4, name: 'Gadget World', owner: 'David Lee', rating: 4.8, products: 178, 
      location: 'Chicago', revenue: 22450, views: 7650, tags: ['electronics', 'gadgets', 'accessories'], 
      price: 89, category: 'electronics', verified: true, featured: false,
      description: 'Affordable gadgets and tech accessories',
      email: 'info@gadgetworld.com', phone: '+1 (312) 555-0123', website: 'gadgetworld.com',
      social: { instagram: '@gadgetworld', twitter: '@gadgetworld', facebook: 'gadgetworld' },
      established: '2020',
      ratingCount: 267,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400'
    },
    { 
      id: 5, name: 'Sports Gear', owner: 'Emma Wilson', rating: 4.6, products: 123, 
      location: 'Boston', revenue: 18900, views: 4320, tags: ['sports', 'fitness', 'outdoor'], 
      price: 159, category: 'sports', verified: false, featured: false,
      description: 'Premium sports equipment and fitness gear',
      email: 'sales@sportsgear.com', phone: '+1 (617) 555-0456', website: 'sportsgear.com',
      social: { instagram: '@sportsgear', twitter: '@sportsgear', facebook: 'sportsgear' },
      established: '2021',
      ratingCount: 98,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400'
    },
    { 
      id: 6, name: 'Beauty Bliss', owner: 'Sophia Chen', rating: 4.9, products: 234, 
      location: 'Miami', revenue: 34500, views: 8900, tags: ['beauty', 'cosmetics', 'skincare'], 
      price: 79, category: 'beauty', verified: true, featured: true,
      description: 'Luxury beauty products and cosmetics',
      email: 'care@beautybliss.com', phone: '+1 (305) 555-0789', website: 'beautybliss.com',
      social: { instagram: '@beautybliss', twitter: '@beautybliss', facebook: 'beautybliss' },
      established: '2019',
      ratingCount: 345,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400'
    },
    { 
      id: 7, name: 'Book Haven', owner: 'James Brown', rating: 4.8, products: 567, 
      location: 'Seattle', revenue: 28900, views: 6700, tags: ['books', 'education', 'learning'], 
      price: 29, category: 'books', verified: false, featured: false,
      description: 'Massive collection of books and educational materials',
      email: 'info@bookhaven.com', phone: '+1 (206) 555-0123', website: 'bookhaven.com',
      social: { instagram: '@bookhaven', twitter: '@bookhaven', facebook: 'bookhaven' },
      established: '2018',
      ratingCount: 567,
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400'
    },
    { 
      id: 8, name: 'Pet Paradise', owner: 'Lisa Wong', rating: 4.7, products: 189, 
      location: 'Denver', revenue: 15600, views: 3450, tags: ['pets', 'animals', 'supplies'], 
      price: 49, category: 'pets', verified: false, featured: false,
      description: 'Everything for your furry friends',
      email: 'hello@petparadise.com', phone: '+1 (303) 555-0456', website: 'petparadise.com',
      social: { instagram: '@petparadise', twitter: '@petparadise', facebook: 'petparadise' },
      established: '2020',
      ratingCount: 234,
      image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400'
    },
    { 
      id: 9, name: 'Auto Parts Pro', owner: 'Mike Ross', rating: 4.5, products: 345, 
      location: 'Detroit', revenue: 56700, views: 4560, tags: ['automotive', 'parts', 'cars'], 
      price: 199, category: 'automotive', verified: true, featured: false,
      description: 'Quality auto parts and accessories',
      email: 'support@autopartspro.com', phone: '+1 (313) 555-0789', website: 'autopartspro.com',
      social: { instagram: '@autopartspro', twitter: '@autopartspro', facebook: 'autopartspro' },
      established: '2017',
      ratingCount: 456,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400'
    },
    { 
      id: 10, name: 'Toys & Fun', owner: 'Rachel Green', rating: 4.8, products: 278, 
      location: 'Orlando', revenue: 23400, views: 7890, tags: ['toys', 'kids', 'games'], 
      price: 39, category: 'toys', verified: false, featured: true,
      description: 'Fun toys and games for all ages',
      email: 'info@toysandfun.com', phone: '+1 (407) 555-0123', website: 'toysandfun.com',
      social: { instagram: '@toysandfun', twitter: '@toysandfun', facebook: 'toysandfun' },
      established: '2021',
      ratingCount: 345,
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400'
    },
    { 
      id: 11, name: 'Organic Market', owner: 'Tom Brady', rating: 4.9, products: 156, 
      location: 'Portland', revenue: 29800, views: 5670, tags: ['organic', 'food', 'healthy'], 
      price: 89, category: 'food', verified: true, featured: true,
      description: 'Fresh organic produce and healthy foods',
      email: 'hello@organicmarket.com', phone: '+1 (503) 555-0456', website: 'organicmarket.com',
      social: { instagram: '@organicmarket', twitter: '@organicmarket', facebook: 'organicmarket' },
      established: '2019',
      ratingCount: 678,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400'
    },
    { 
      id: 12, name: 'Furniture House', owner: 'Nina Dobrev', rating: 4.6, products: 98, 
      location: 'Dallas', revenue: 67800, views: 4320, tags: ['furniture', 'home', 'decor'], 
      price: 599, category: 'home', verified: false, featured: false,
      description: 'Premium furniture and home accessories',
      email: 'sales@furniturehouse.com', phone: '+1 (214) 555-0789', website: 'furniturehouse.com',
      social: { instagram: '@furniturehouse', twitter: '@furniturehouse', facebook: 'furniturehouse' },
      established: '2018',
      ratingCount: 234,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'
    }
  ], []);

  // Extract unique tags, categories, locations
  const allTags = useMemo(() => [...new Set(allShops.flatMap(s => s.tags))], [allShops]);
  const categories = useMemo(() => ['all', ...new Set(allShops.map(s => s.category))], [allShops]);
  const locations = useMemo(() => ['all', ...new Set(allShops.map(s => s.location))], [allShops]);

  // Filter shops based on all criteria
  const filteredShops = useMemo(() => {
    let filtered = [...allShops];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(shop =>
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        shop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(shop =>
        selectedTags.some(tag => shop.tags.includes(tag))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(shop => shop.category === selectedCategory);
    }

    // Location filter
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(shop => shop.location === selectedLocation);
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(shop => shop.rating >= minRating);
    }

    // Price range filter
    filtered = filtered.filter(shop => 
      shop.price >= priceRange.min && shop.price <= priceRange.max
    );

    // Verified only
    if (verifiedOnly) {
      filtered = filtered.filter(shop => shop.verified);
    }

    // Featured only
    if (featuredOnly) {
      filtered = filtered.filter(shop => shop.featured);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'products': return b.products - a.products;
        case 'name': return a.name.localeCompare(b.name);
        case 'revenue': return b.revenue - a.revenue;
        case 'mostViewed': return b.views - a.views;
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        default: return 0;
      }
    });

    return filtered;
  }, [allShops, searchTerm, selectedTags, selectedCategory, selectedLocation, minRating, priceRange, sortBy, verifiedOnly, featuredOnly]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredShops.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredShops.length / itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTags, selectedCategory, selectedLocation, minRating, priceRange, sortBy, verifiedOnly, featuredOnly]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSelectedCategory('all');
    setSelectedLocation('all');
    setMinRating(0);
    setPriceRange({ min: 0, max: 1000 });
    setSortBy('rating');
    setVerifiedOnly(false);
    setFeaturedOnly(false);
    setCurrentPage(1);
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
        <button
          onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : `${theme.cardHover}`}`}
        >
          <ChevronLeft size={20} />
        </button>
        
        {startPage > 1 && (
          <>
            <button onClick={() => setCurrentPage(1)} className={`px-4 py-2 rounded-lg ${theme.cardHover}`}>1</button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}
        
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-4 py-2 rounded-lg transition-all ${currentPage === number ? theme.primary + ' text-white' : theme.cardHover}`}
          >
            {number}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <button onClick={() => setCurrentPage(totalPages)} className={`px-4 py-2 rounded-lg ${theme.cardHover}`}>{totalPages}</button>
          </>
        )}
        
        <button
          onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : `${theme.cardHover}`}`}
        >
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
            <Store className="inline mr-3 mb-1" size={32} />
            Shop Keepers
          </h1>
          <p className={`${theme.textSecondary} mt-1`}>Discover and connect with verified shop owners</p>
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? theme.primary + ' text-white' : theme.cardHover}`}>
            <LayoutGrid size={20} />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? theme.primary + ' text-white' : theme.cardHover}`}>
            <List size={20} />
          </button>
          <button onClick={() => setShowFilters(!showFilters)} className={`p-2 rounded-lg transition-all flex items-center gap-2 ${showFilters ? theme.primary + ' text-white' : theme.cardHover}`}>
            <Filter size={20} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} size={20} />
        <input
          type="text"
          placeholder="Search by shop name, owner, tags, location, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-12 pr-4 py-3 rounded-xl border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme.textSecondary} hover:${theme.text}`}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className={`${theme.card} rounded-xl p-5 border ${theme.border} animate-slideDown`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`font-semibold ${theme.text} flex items-center gap-2`}>
              <SlidersHorizontal size={18} />
              Advanced Filters
            </h3>
            <button onClick={clearAllFilters} className={`text-sm ${theme.textSecondary} hover:${theme.text} flex items-center gap-1`}>
              <X size={14} /> Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Category Filter */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}>
                {categories.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Location</label>
              <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}>
                {locations.map(loc => <option key={loc} value={loc}>{loc === 'all' ? 'All Locations' : loc}</option>)}
              </select>
            </div>

            {/* Min Rating */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Minimum Rating</label>
              <div className="flex gap-2">
                {[0, 3, 4, 4.5].map(rating => (
                  <button key={rating} onClick={() => setMinRating(rating)} className={`px-3 py-2 rounded-lg text-sm transition-all ${minRating === rating ? theme.primary + ' text-white' : theme.cardHover}`}>
                    {rating === 0 ? 'Any' : `${rating}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Avg Product Price</label>
              <div className="flex gap-2 items-center">
                <input type="number" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })} className={`w-20 px-2 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`} placeholder="Min" />
                <span className={theme.textSecondary}>-</span>
                <input type="number" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })} className={`w-20 px-2 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`} placeholder="Max" />
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="flex flex-wrap gap-4 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="w-4 h-4 rounded" />
              <span className={`text-sm ${theme.text}`}>Verified Only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} className="w-4 h-4 rounded" />
              <span className={`text-sm ${theme.text}`}>Featured Shops</span>
            </label>
          </div>

          {/* Tags Filter */}
          <div className="mt-4">
            <button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} className={`text-sm ${theme.text} flex items-center gap-1 mb-2`}>
              Popular Tags {showAdvancedFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {showAdvancedFilters && (
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button key={tag} onClick={() => toggleTag(tag)} className={`px-3 py-1 rounded-full text-sm transition-all ${selectedTags.includes(tag) ? theme.primary + ' text-white' : theme.cardHover}`}>
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sort Bar */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'rating', label: 'Top Rated', icon: <Star size={14} /> },
            { value: 'mostViewed', label: 'Most Viewed', icon: <Eye size={14} /> },
            { value: 'revenue', label: 'Highest Revenue', icon: <DollarSign size={14} /> },
            { value: 'products', label: 'Most Products', icon: <Package size={14} /> },
            { value: 'price-low', label: 'Price: Low to High', icon: <DollarSign size={14} /> },
            { value: 'price-high', label: 'Price: High to Low', icon: <DollarSign size={14} /> },
            { value: 'name', label: 'Name A-Z', icon: <Store size={14} /> },
          ].map(sort => (
            <button key={sort.value} onClick={() => setSortBy(sort.value)} className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1 ${sortBy === sort.value ? theme.primary + ' text-white' : theme.cardHover}`}>
              {sort.icon} {sort.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className={`px-2 py-1 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value={6}>Show 6</option>
            <option value={9}>Show 9</option>
            <option value={12}>Show 12</option>
          </select>
          <div className={`text-sm ${theme.textSecondary}`}>
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredShops.length)} of {filteredShops.length}
          </div>
        </div>
      </div>

      {/* Shops Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((shop) => (
            <ShopCard key={shop.id} shop={shop} onViewDetails={() => setSelectedShop(shop)} theme={theme} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {currentItems.map((shop) => (
            <ShopCardList key={shop.id} shop={shop} onViewDetails={() => setSelectedShop(shop)} theme={theme} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && <Pagination />}

      {/* No Results */}
      {filteredShops.length === 0 && (
        <div className={`${theme.card} rounded-xl p-12 text-center`}>
          <Store size={48} className="mx-auto mb-4 opacity-30" />
          <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>No shops found</h3>
          <p className={theme.textSecondary}>Try adjusting your filters or search terms</p>
          <button onClick={clearAllFilters} className={`mt-4 ${theme.primary} text-white px-6 py-2 rounded-lg`}>Clear all filters</button>
        </div>
      )}

      {/* Shop Modal */}
      {selectedShop && <ShopModal shop={selectedShop} onClose={() => setSelectedShop(null)} theme={theme} />}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>
    </div>
  );
}

// Grid View Shop Card
const ShopCard = ({ shop, onViewDetails, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className={`group ${theme.card} rounded-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer border ${theme.border}`}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative h-40 overflow-hidden">
        <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        {isHovered && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3">
            <button onClick={onViewDetails} className="p-2 bg-white rounded-full hover:scale-110 transition-transform"><Eye size={18} className="text-gray-900" /></button>
            <button className="p-2 bg-green-600 rounded-full hover:scale-110 transition-transform"><ExternalLink size={18} className="text-white" /></button>
          </div>
        )}
        {shop.verified && <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full flex items-center gap-1"><Check size={12} /> Verified</div>}
        {shop.featured && <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full">Featured</div>}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-xl font-bold ${theme.text} group-hover:text-blue-500 transition-colors`}>{shop.name}</h3>
          <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-lg"><Star size={14} className="text-yellow-500 fill-yellow-500" /><span className={`text-sm font-semibold ${theme.text}`}>{shop.rating}</span></div>
        </div>
        <p className={`text-sm ${theme.textSecondary} mb-2`}>by {shop.owner}</p>
        <div className="flex items-center gap-2 text-sm mb-2"><MapPin size={14} className={theme.textSecondary} /><span className={theme.textSecondary}>{shop.location}</span></div>
        <div className="flex flex-wrap gap-1 mb-3">{shop.tags.slice(0, 3).map(tag => (<span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${theme.cardHover} ${theme.textSecondary}`}>#{tag}</span>))}</div>
        <div className="flex justify-between items-center"><span className="text-2xl font-bold text-blue-500">${shop.price}</span><span className={`text-sm ${theme.textSecondary}`}><Package size={14} className="inline mr-1" />{shop.products} products</span></div>
        <button onClick={onViewDetails} className={`w-full mt-3 ${theme.primary} ${theme.primaryHover} text-white py-2 rounded-lg transition-all flex items-center justify-center gap-2`}>View Details <ExternalLink size={14} /></button>
      </div>
    </div>
  );
};

// List View Shop Card
const ShopCardList = ({ shop, onViewDetails, theme }) => (
  <div className={`${theme.card} rounded-xl p-4 hover:shadow-xl transition-all border ${theme.border}`}>
    <div className="flex flex-col md:flex-row gap-4">
      <img src={shop.image} alt={shop.name} className="w-full md:w-40 h-32 object-cover rounded-lg" />
      <div className="flex-1">
        <div className="flex flex-wrap justify-between items-start gap-2">
          <div><h3 className={`text-xl font-bold ${theme.text}`}>{shop.name}</h3><p className={`text-sm ${theme.textSecondary}`}>by {shop.owner}</p></div>
          <div className="flex items-center gap-2"><div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-lg"><Star size={14} className="text-yellow-500 fill-yellow-500" /><span className={`text-sm font-semibold ${theme.text}`}>{shop.rating}</span></div>{shop.verified && <div className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">✓</div>}</div>
        </div>
        <div className="flex flex-wrap gap-4 mt-2 text-sm"><span className={`flex items-center gap-1 ${theme.textSecondary}`}><MapPin size={14} />{shop.location}</span><span className={`flex items-center gap-1 ${theme.textSecondary}`}><Package size={14} />{shop.products} products</span><span className={`flex items-center gap-1 ${theme.textSecondary}`}><Eye size={14} />{shop.views.toLocaleString()} views</span><span className={`flex items-center gap-1 ${theme.textSecondary}`}><DollarSign size={14} />${shop.revenue.toLocaleString()} revenue</span></div>
        <p className={`text-sm ${theme.textSecondary} mt-2 line-clamp-2`}>{shop.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">{shop.tags.slice(0, 4).map(tag => (<span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${theme.cardHover} ${theme.textSecondary}`}>#{tag}</span>))}</div>
        <div className="flex justify-between items-center mt-3"><span className="text-2xl font-bold text-blue-500">${shop.price}</span><button onClick={onViewDetails} className={`${theme.primary} text-white px-4 py-1.5 rounded-lg text-sm flex items-center gap-1`}>View Details <ExternalLink size={14} /></button></div>
      </div>
    </div>
  </div>
);