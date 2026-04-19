// pages/AdminProducts.jsx - Complete Product Management System
import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../App';
import { 
  Package, Plus, Edit, Trash2, Search, Filter, X, ChevronLeft, 
  ChevronRight, Eye, Star, Tag, DollarSign, ShoppingCart, 
  AlertCircle, CheckCircle, Upload, Image, Save, RefreshCw,
  Grid3x3, List, Download, Printer, Copy, TrendingUp, Clock,
  AlertTriangle, Info, Shield, Truck, Gift, Heart, Share2
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function AdminProducts() {
  const { theme } = useApp();
  
  // State Management
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showBulkDelete, setShowBulkDelete] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState(['Electronics', 'Fashion', 'Accessories', 'Home', 'Sports', 'Beauty', 'Books', 'Toys']);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    stock: '',
    category: 'Electronics',
    description: '',
    tags: '',
    status: 'Active',
    image: '📦',
    rating: 4.5
  });

  // Sample initial products
  const initialProducts = [
    { id: 1, name: 'Premium Wireless Headphones', price: 299, originalPrice: 399, stock: 45, category: 'Electronics', status: 'Active', sales: 234, rating: 4.8, reviews: 128, image: '🎧', tags: ['audio', 'wireless'], createdAt: '2024-01-10', sku: 'SKU-001' },
    { id: 2, name: 'Smart Watch Ultra', price: 499, originalPrice: 599, stock: 23, category: 'Electronics', status: 'Active', sales: 156, rating: 4.9, reviews: 89, image: '⌚', tags: ['wearable', 'smart'], createdAt: '2024-01-05', sku: 'SKU-002' },
    { id: 3, name: 'Designer Leather Backpack', price: 129, originalPrice: 199, stock: 0, category: 'Fashion', status: 'Out of Stock', sales: 89, rating: 4.7, reviews: 56, image: '🎒', tags: ['bags', 'leather'], createdAt: '2024-01-12', sku: 'SKU-003' },
    { id: 4, name: 'USB-C 8-in-1 Hub', price: 79, originalPrice: 99, stock: 56, category: 'Accessories', status: 'Active', sales: 345, rating: 4.6, reviews: 234, image: '🔌', tags: ['usb', 'hub'], createdAt: '2024-01-08', sku: 'SKU-004' },
    { id: 5, name: 'Mechanical Gaming Keyboard', price: 189, originalPrice: 249, stock: 12, category: 'Electronics', status: 'Low Stock', sales: 167, rating: 4.8, reviews: 98, image: '⌨️', tags: ['keyboard', 'gaming'], createdAt: '2024-01-03', sku: 'SKU-005' },
    { id: 6, name: 'RGB Gaming Mouse', price: 89, originalPrice: 129, stock: 34, category: 'Electronics', status: 'Active', sales: 278, rating: 4.7, reviews: 167, image: '🖱️', tags: ['mouse', 'gaming'], createdAt: '2024-01-15', sku: 'SKU-006' },
    { id: 7, name: 'True Wireless Earbuds', price: 159, originalPrice: 229, stock: 45, category: 'Electronics', status: 'Active', sales: 423, rating: 4.8, reviews: 245, image: '🎧', tags: ['audio', 'earbuds'], createdAt: '2024-01-18', sku: 'SKU-007' },
    { id: 8, name: 'Smart Home Hub', price: 199, originalPrice: 279, stock: 8, category: 'Home', status: 'Low Stock', sales: 98, rating: 4.5, reviews: 67, image: '🏠', tags: ['smart', 'home'], createdAt: '2024-01-20', sku: 'SKU-008' },
    { id: 9, name: 'Fitness Tracker Band', price: 79, originalPrice: 99, stock: 67, category: 'Sports', status: 'Active', sales: 234, rating: 4.4, reviews: 123, image: '⌚', tags: ['fitness', 'tracker'], createdAt: '2024-01-22', sku: 'SKU-009' },
    { id: 10, name: '4K Action Camera', price: 299, originalPrice: 399, stock: 15, category: 'Electronics', status: 'Active', sales: 87, rating: 4.6, reviews: 45, image: '📷', tags: ['camera', 'action'], createdAt: '2024-01-25', sku: 'SKU-010' },
  ];

  // Load products from localStorage or use initial
  useEffect(() => {
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
    }
  }, []);

  // Save products to localStorage
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('admin_products', JSON.stringify(products));
    }
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }
    
    // Sorting
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'latest': return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
        case 'price-high': return b.price - a.price;
        case 'price-low': return a.price - b.price;
        case 'popular': return b.sales - a.sales;
        case 'rating': return b.rating - a.rating;
        case 'stock-low': return a.stock - b.stock;
        default: return 0;
      }
    });
    
    return filtered;
  }, [products, searchTerm, selectedCategory, selectedStatus, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus, sortBy]);

  // Stats
  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'Active').length,
    lowStock: products.filter(p => p.status === 'Low Stock' || (p.stock <= 10 && p.stock > 0)).length,
    outOfStock: products.filter(p => p.status === 'Out of Stock' || p.stock === 0).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
    totalSales: products.reduce((sum, p) => sum + p.sales, 0)
  };

  // CRUD Operations
  const handleAddProduct = () => {
    if (!formData.name || !formData.price) {
      toast.error('Please fill required fields');
      return;
    }
    
    const newProduct = {
      id: Date.now(),
      ...formData,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice) || Number(formData.price),
      stock: Number(formData.stock),
      sales: 0,
      rating: 4.5,
      reviews: 0,
      tags: formData.tags.split(',').map(t => t.trim()),
      createdAt: new Date().toISOString().split('T')[0],
      sku: `SKU-${String(products.length + 1).padStart(3, '0')}`
    };
    
    setProducts([newProduct, ...products]);
    setShowAddModal(false);
    resetForm();
    toast.success('Product added successfully!');
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    
    const updatedProducts = products.map(p => 
      p.id === editingProduct.id 
        ? { ...p, ...formData, price: Number(formData.price), stock: Number(formData.stock) }
        : p
    );
    
    setProducts(updatedProducts);
    setShowEditModal(false);
    setEditingProduct(null);
    resetForm();
    toast.success('Product updated successfully!');
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setShowDeleteModal(null);
    toast.success('Product deleted successfully!');
  };

  const handleBulkDelete = () => {
    setProducts(products.filter(p => !selectedProducts.includes(p.id)));
    setSelectedProducts([]);
    setShowBulkDelete(false);
    toast.success(`${selectedProducts.length} products deleted!`);
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map(p => p.id));
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(filteredProducts, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Products exported!');
  };

  const resetForm = () => {
    setFormData({
      name: '', price: '', originalPrice: '', stock: '', category: 'Electronics',
      description: '', tags: '', status: 'Active', image: '📦', rating: 4.5
    });
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      stock: product.stock,
      category: product.category,
      description: product.description || '',
      tags: product.tags?.join(', ') || '',
      status: product.status,
      image: product.image,
      rating: product.rating
    });
    setShowEditModal(true);
  };

  const getStatusBadge = (status, stock) => {
    if (status === 'Active' && stock <= 10 && stock > 0) return { label: 'Low Stock', color: 'bg-orange-500/20 text-orange-600' };
    if (status === 'Active' && stock === 0) return { label: 'Out of Stock', color: 'bg-red-500/20 text-red-600' };
    if (status === 'Active') return { label: 'In Stock', color: 'bg-green-500/20 text-green-600' };
    return { label: status, color: 'bg-gray-500/20 text-gray-600' };
  };

  // Image options
  const imageOptions = ['📦', '🎧', '⌚', '🎒', '🔌', '⌨️', '🖱️', '🏠', '📷', '💡', '📱', '💻', '🖨️', '🎮', '📚', '👕', '👟', '💍'];

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${theme.text}`}>
              <Package className="inline mr-3 mb-1" size={28} />
              Product Management
            </h1>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>Manage your inventory, track stock, and update products</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleExport} className={`px-3 py-2 rounded-lg ${theme.cardHover} flex items-center gap-2 text-sm`}>
              <Download size={16} /> Export
            </button>
            <button onClick={() => setShowAddModal(true)} className={`${theme.primary} text-white px-4 py-2 rounded-lg flex items-center gap-2`}>
              <Plus size={18} /> Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <Package size={20} className="mx-auto mb-1 text-blue-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.total}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Total Products</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <CheckCircle size={20} className="mx-auto mb-1 text-green-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.active}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Active</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <AlertCircle size={20} className="mx-auto mb-1 text-orange-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.lowStock}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Low Stock</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <X size={20} className="mx-auto mb-1 text-red-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.outOfStock}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Out of Stock</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <DollarSign size={20} className="mx-auto mb-1 text-purple-500" />
          <p className={`text-xl font-bold ${theme.text}`}>${stats.totalValue.toLocaleString()}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Inventory Value</p>
        </div>
        <div className={`${theme.card} rounded-xl p-3 text-center`}>
          <ShoppingCart size={20} className="mx-auto mb-1 text-cyan-500" />
          <p className={`text-xl font-bold ${theme.text}`}>{stats.totalSales.toLocaleString()}</p>
          <p className={`text-xs ${theme.textSecondary}`}>Total Sales</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className={`${theme.card} rounded-xl p-4 mb-6 border ${theme.border}`}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} size={18} />
            <input type="text" placeholder="Search by name, SKU, or tags..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
          </div>
          
          {/* Category Filter */}
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} 
            className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="all">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          
          {/* Status Filter */}
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} 
            className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          
          {/* Sort By */}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} 
            className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="stock-low">Stock: Low to High</option>
          </select>
          
          {/* View Toggle */}
          <div className="flex gap-1">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? theme.primary + ' text-white' : theme.cardHover}`}><Grid3x3 size={18} /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? theme.primary + ' text-white' : theme.cardHover}`}><List size={18} /></button>
          </div>
        </div>
        
        {/* Active Filters */}
        {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all') && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className={`text-xs ${theme.textSecondary}`}>Active filters:</span>
            {searchTerm && <span className={`px-2 py-0.5 rounded-full text-xs ${theme.cardHover} flex items-center gap-1`}>{searchTerm} <X size={12} className="cursor-pointer" onClick={() => setSearchTerm('')} /></span>}
            {selectedCategory !== 'all' && <span className={`px-2 py-0.5 rounded-full text-xs ${theme.cardHover} flex items-center gap-1`}>{selectedCategory} <X size={12} className="cursor-pointer" onClick={() => setSelectedCategory('all')} /></span>}
            {selectedStatus !== 'all' && <span className={`px-2 py-0.5 rounded-full text-xs ${theme.cardHover} flex items-center gap-1`}>{selectedStatus} <X size={12} className="cursor-pointer" onClick={() => setSelectedStatus('all')} /></span>}
            <button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedStatus('all'); setSortBy('latest'); }} className="text-xs text-blue-500 hover:text-blue-600">Clear all</button>
          </div>
        )}
      </div>

      {/* Bulk Actions Bar */}
      {selectedProducts.length > 0 && (
        <div className={`${theme.primary} text-white rounded-xl p-3 mb-4 flex justify-between items-center`}>
          <span className="text-sm">{selectedProducts.length} products selected</span>
          <div className="flex gap-2">
            <button onClick={() => setShowBulkDelete(true)} className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600">Delete Selected</button>
            <button onClick={() => setSelectedProducts([])} className="px-3 py-1 rounded-lg bg-white/20 text-white text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {paginatedProducts.map(product => {
            const statusBadge = getStatusBadge(product.status, product.stock);
            return (
              <div key={product.id} className={`group ${theme.card} rounded-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 border ${theme.border} relative`}>
                {/* Selection Checkbox */}
                <div className="absolute top-2 left-2 z-10">
                  <input type="checkbox" checked={selectedProducts.includes(product.id)} onChange={() => {
                    if (selectedProducts.includes(product.id)) setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                    else setSelectedProducts([...selectedProducts, product.id]);
                  }} className="w-4 h-4 rounded border-gray-300" />
                </div>
                
                {/* Image */}
                <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-6xl">
                  {product.image}
                  {statusBadge.label !== 'In Stock' && (
                    <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                      {statusBadge.label}
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold ${theme.text} line-clamp-1 flex-1`}>{product.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      <span className={`text-xs ${theme.textSecondary}`}>{product.rating}</span>
                    </div>
                  </div>
                  
                  <p className={`text-xs ${theme.textSecondary} mb-2`}>{product.category}</p>
                  
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className={`text-xl font-bold text-blue-500`}>${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className={`text-xs line-through ${theme.textSecondary} ml-2`}>${product.originalPrice}</span>
                      )}
                    </div>
                    <div className={`text-xs ${product.stock === 0 ? 'text-red-500' : theme.text}`}>
                      Stock: {product.stock}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${theme.cardHover} ${theme.textSecondary}`}>#{tag}</span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <button onClick={() => editProduct(product)} className="flex-1 py-1.5 rounded-lg border border-blue-500 text-blue-500 text-sm hover:bg-blue-500/10 transition-all">Edit</button>
                    <button onClick={() => setShowDeleteModal(product.id)} className="flex-1 py-1.5 rounded-lg border border-red-500 text-red-500 text-sm hover:bg-red-500/10 transition-all">Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={`${theme.card} rounded-xl overflow-hidden border ${theme.border}`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className={`${theme.border} border-b`}>
                <tr className={`text-left text-xs sm:text-sm ${theme.textSecondary}`}>
                  <th className="p-3 w-10"><input type="checkbox" checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0} onChange={handleSelectAll} className="w-4 h-4 rounded" /></th>
                  <th className="p-3">Product</th><th className="p-3">SKU</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Stock</th><th className="p-3">Sales</th><th className="p-3">Rating</th><th className="p-3">Status</th><th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map(product => {
                  const statusBadge = getStatusBadge(product.status, product.stock);
                  return (
                    <tr key={product.id} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                      <td className="p-3"><input type="checkbox" checked={selectedProducts.includes(product.id)} onChange={() => {
                        if (selectedProducts.includes(product.id)) setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                        else setSelectedProducts([...selectedProducts, product.id]);
                      }} className="w-4 h-4 rounded" /></td>
                      <td className="p-3"><div className="flex items-center gap-2"><span className="text-2xl">{product.image}</span><span className={`font-semibold ${theme.text}`}>{product.name}</span></div></td>
                      <td className={`p-3 text-xs font-mono ${theme.textSecondary}`}>{product.sku}</td>
                      <td className={`p-3 text-sm ${theme.textSecondary}`}>{product.category}</td>
                      <td className={`p-3 font-semibold ${theme.text}`}>${product.price}</td>
                      <td className={`p-3 text-sm ${product.stock === 0 ? 'text-red-500' : theme.text}`}>{product.stock}</td>
                      <td className={`p-3 text-sm ${theme.textSecondary}`}>{product.sales}</td>
                      <td className="p-3"><div className="flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /><span className={`text-sm ${theme.text}`}>{product.rating}</span></div></td>
                      <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>{statusBadge.label}</span></td>
                      <td className="p-3"><div className="flex gap-2"><button onClick={() => editProduct(product)} className="p-1 rounded hover:bg-white/10"><Edit size={16} /></button><button onClick={() => setShowDeleteModal(product.id)} className="p-1 rounded hover:bg-white/10"><Trash2 size={16} className="text-red-500" /></button></div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? 'opacity-50' : theme.cardHover}`}><ChevronLeft size={20} /></button>
          <div className="flex gap-1">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 3 + i;
                if (pageNum > totalPages) return null;
              }
              return pageNum <= totalPages && (
                <button key={i} onClick={() => setCurrentPage(pageNum)} className={`w-10 h-10 rounded-lg ${currentPage === pageNum ? theme.primary + ' text-white' : theme.cardHover}`}>{pageNum}</button>
              );
            })}
          </div>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className={`p-2 rounded-lg ${currentPage === totalPages ? 'opacity-50' : theme.cardHover}`}><ChevronRight size={20} /></button>
          <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className={`ml-2 px-2 py-1 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
            <option value={12}>12 / page</option><option value={24}>24 / page</option><option value={48}>48 / page</option>
          </select>
        </div>
      )}

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className={`${theme.card} rounded-xl p-12 text-center`}>
          <Package size={48} className="mx-auto mb-4 opacity-30" />
          <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>No products found</h3>
          <p className={theme.textSecondary}>Try adjusting your search or filters</p>
          <button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedStatus('all'); }} className={`mt-4 ${theme.primary} text-white px-6 py-2 rounded-lg`}>Clear filters</button>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => { setShowAddModal(false); setShowEditModal(false); resetForm(); }}>
          <div className={`${theme.card} rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-inherit">
              <h2 className={`text-xl font-bold ${theme.text}`}>{showEditModal ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => { setShowAddModal(false); setShowEditModal(false); resetForm(); }} className={`p-1 rounded-lg ${theme.cardHover}`}><X size={20} /></button>
            </div>
            
            <div className="p-5 space-y-4">
              {/* Image Selector */}
              <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Product Icon</label>
                <div className="flex flex-wrap gap-2">
                  {imageOptions.map(icon => (
                    <button key={icon} onClick={() => setFormData({ ...formData, image: icon })} className={`w-12 h-12 rounded-lg text-2xl ${formData.image === icon ? 'ring-2 ring-blue-500 bg-blue-500/10' : theme.cardHover} transition-all`}>{icon}</button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Product Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} placeholder="Enter product name" /></div>
                <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Category</label><select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}>{categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
                <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Price ($) *</label><input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} placeholder="0.00" /></div>
                <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Original Price ($)</label><input type="number" value={formData.originalPrice} onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} placeholder="0.00" /></div>
                <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Stock Quantity</label><input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} placeholder="0" /></div>
                <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Status</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}><option>Active</option><option>Low Stock</option><option>Out of Stock</option></select></div>
              </div>
              
              <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Tags (comma separated)</label><input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} placeholder="e.g., electronics, wireless, premium" /></div>
              <div><label className={`block text-sm font-medium mb-2 ${theme.text}`}>Description</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} rows={3} placeholder="Product description..."></textarea></div>
              
              <div className="flex gap-3 pt-4">
                <button onClick={() => { setShowAddModal(false); setShowEditModal(false); resetForm(); }} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>Cancel</button>
                <button onClick={showEditModal ? handleUpdateProduct : handleAddProduct} className={`flex-1 px-4 py-2 rounded-lg ${theme.primary} text-white`}>{showEditModal ? 'Update Product' : 'Add Product'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteModal(null)}>
          <div className={`${theme.card} rounded-xl max-w-md w-full p-6 text-center`} onClick={(e) => e.stopPropagation()}>
            <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
            <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>Delete Product</h3>
            <p className={`${theme.textSecondary} mb-6`}>Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex gap-3"><button onClick={() => setShowDeleteModal(null)} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>Cancel</button><button onClick={() => handleDeleteProduct(showDeleteModal)} className={`flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600`}>Delete</button></div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation */}
      {showBulkDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowBulkDelete(false)}>
          <div className={`${theme.card} rounded-xl max-w-md w-full p-6 text-center`} onClick={(e) => e.stopPropagation()}>
            <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
            <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>Delete {selectedProducts.length} Products</h3>
            <p className={`${theme.textSecondary} mb-6`}>Are you sure you want to delete all selected products? This action cannot be undone.</p>
            <div className="flex gap-3"><button onClick={() => setShowBulkDelete(false)} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>Cancel</button><button onClick={handleBulkDelete} className={`flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600`}>Delete All</button></div>
          </div>
        </div>
      )}
    </div>
  );
}