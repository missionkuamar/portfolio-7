// pages/AdminProducts.jsx - Updated with proper pagination
import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../App';
import { Toaster, toast } from 'react-hot-toast';
import { Package } from 'lucide-react';
import ProductsHeader from '../components/admin/products/ProductsHeader';
import ProductsStats from '../components/admin/products/ProductsStats';
import ProductsFilters from '../components/admin/products/ProductsFilters';
import BulkActionsBar from '../components/admin/products/BulkActionsBar';
import ProductCard from '../components/admin/products/ProductCard';
import ProductTableRow from '../components/admin/products/ProductTableRow';
import ProductsPagination from '../components/admin/products/ProductsPagination';
import { ProductFormModal, DeleteConfirmModal } from '../components/admin/products/ProductModal';

export default function AdminProducts() {
  const { theme } = useApp();
  
  // State
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showBulkDelete, setShowBulkDelete] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', originalPrice: '', stock: '', category: 'Electronics',
    description: '', tags: '', status: 'Active', image: '📦', rating: 4.5
  });

  const categories = ['Electronics', 'Fashion', 'Accessories', 'Home', 'Sports', 'Beauty', 'Books', 'Toys'];

  // Generate 50+ sample products for testing pagination
  const generateSampleProducts = () => {
    const products = [];
    const names = [
      'Premium Wireless Headphones', 'Smart Watch Ultra', 'Designer Leather Backpack', 
      'USB-C 8-in-1 Hub', 'Mechanical Gaming Keyboard', 'RGB Gaming Mouse', 
      'True Wireless Earbuds', 'Smart Home Hub', 'Fitness Tracker Band', '4K Action Camera',
      'Laptop Stand', 'Phone Case', 'Charging Cable', 'Power Bank', 'Webcam',
      'Microphone', 'Gaming Chair', 'Desk Lamp', 'Wireless Charger', 'Tablet',
      'Smart Speaker', 'Robot Vacuum', 'Air Purifier', 'Coffee Maker', 'Blender'
    ];
    const categories = ['Electronics', 'Fashion', 'Accessories', 'Home', 'Sports', 'Beauty'];
    const statuses = ['Active', 'Low Stock', 'Out of Stock'];
    
    for (let i = 1; i <= 50; i++) {
      products.push({
        id: i,
        name: `${names[i % names.length]} ${i}`,
        price: Math.floor(Math.random() * 500) + 29,
        originalPrice: Math.floor(Math.random() * 700) + 49,
        stock: Math.floor(Math.random() * 100),
        category: categories[i % categories.length],
        status: statuses[i % statuses.length],
        sales: Math.floor(Math.random() * 500),
        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        reviews: Math.floor(Math.random() * 200),
        image: ['🎧', '⌚', '🎒', '🔌', '⌨️', '🖱️', '🏠', '📷', '💡', '📱'][i % 10],
        tags: ['tag1', 'tag2'],
        createdAt: `2024-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
        sku: `SKU-${String(i).padStart(3, '0')}`
      });
    }
    return products;
  };

  useEffect(() => {
    const saved = localStorage.getItem('admin_products');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(generateSampleProducts());
    }
  }, []);

  useEffect(() => {
    if (products.length) localStorage.setItem('admin_products', JSON.stringify(products));
  }, [products]);

  // Filter logic
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.sku?.includes(searchTerm)
      );
    }
    if (selectedCategory !== 'all') filtered = filtered.filter(p => p.category === selectedCategory);
    if (selectedStatus !== 'all') filtered = filtered.filter(p => p.status === selectedStatus);
    
    filtered.sort((a, b) => {
      const sorts = {
        latest: new Date(b.createdAt) - new Date(a.createdAt),
        oldest: new Date(a.createdAt) - new Date(b.createdAt),
        'price-high': b.price - a.price,
        'price-low': a.price - b.price,
        popular: b.sales - a.sales,
        rating: b.rating - a.rating,
        'stock-low': a.stock - b.stock,
      };
      return sorts[sortBy] || 0;
    });
    return filtered;
  }, [products, searchTerm, selectedCategory, selectedStatus, sortBy]);

  // Pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus, sortBy, itemsPerPage]);

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
    if (!formData.name || !formData.price) return toast.error('Please fill required fields');
    const newProduct = {
      id: Date.now(), ...formData, price: Number(formData.price), 
      originalPrice: Number(formData.originalPrice) || Number(formData.price),
      stock: Number(formData.stock), sales: 0, rating: 4.5, reviews: 0, 
      tags: formData.tags.split(',').map(t => t.trim()),
      createdAt: new Date().toISOString().split('T')[0], 
      sku: `SKU-${String(products.length + 1).padStart(3, '0')}`
    };
    setProducts([newProduct, ...products]);
    setShowAddModal(false);
    resetForm();
    toast.success('Product added!');
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData, price: Number(formData.price), stock: Number(formData.stock) } : p));
    setShowEditModal(false);
    setEditingProduct(null);
    resetForm();
    toast.success('Product updated!');
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setShowDeleteModal(null);
    toast.success('Product deleted!');
  };

  const handleBulkDelete = () => {
    setProducts(products.filter(p => !selectedProducts.includes(p.id)));
    setSelectedProducts([]);
    setShowBulkDelete(false);
    toast.success(`${selectedProducts.length} products deleted!`);
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) setSelectedProducts([]);
    else setSelectedProducts(paginatedProducts.map(p => p.id));
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(filteredProducts, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `products_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Exported!');
  };

  const resetForm = () => setFormData({ 
    name: '', price: '', originalPrice: '', stock: '', category: 'Electronics',
    description: '', tags: '', status: 'Active', image: '📦', rating: 4.5 
  });

  const editProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name, price: product.price, originalPrice: product.originalPrice || product.price,
      stock: product.stock, category: product.category, description: product.description || '',
      tags: product.tags?.join(', ') || '', status: product.status, image: product.image, rating: product.rating
    });
    setShowEditModal(true);
  };

  const getStatusBadge = (status, stock) => {
    if (status === 'Active' && stock <= 10 && stock > 0) return { label: 'Low Stock', color: 'bg-orange-500/20 text-orange-600' };
    if (status === 'Active' && stock === 0) return { label: 'Out of Stock', color: 'bg-red-500/20 text-red-600' };
    if (status === 'Active') return { label: 'In Stock', color: 'bg-green-500/20 text-green-600' };
    return { label: status, color: 'bg-gray-500/20 text-gray-600' };
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSortBy('latest');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <ProductsHeader theme={theme} onExport={handleExport} onAddProduct={() => setShowAddModal(true)} />
      <ProductsStats theme={theme} stats={stats} />
      <ProductsFilters 
        theme={theme} searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}
        sortBy={sortBy} setSortBy={setSortBy} viewMode={viewMode} setViewMode={setViewMode}
        categories={categories} clearFilters={clearFilters}
      />
      <BulkActionsBar theme={theme} selectedCount={selectedProducts.length} onDelete={() => setShowBulkDelete(true)} onCancel={() => setSelectedProducts([])} />
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {paginatedProducts.map(product => (
            <ProductCard 
              key={product.id} theme={theme} product={product}
              onEdit={editProduct} onDelete={(id) => setShowDeleteModal(id)}
              isSelected={selectedProducts.includes(product.id)}
              onSelect={() => {
                if (selectedProducts.includes(product.id)) setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                else setSelectedProducts([...selectedProducts, product.id]);
              }}
              getStatusBadge={getStatusBadge}
            />
          ))}
        </div>
      ) : (
        <div className={`${theme.card} rounded-xl overflow-hidden border ${theme.border}`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className={`${theme.border} border-b`}>
                <tr className={`text-left text-xs sm:text-sm ${theme.textSecondary}`}>
                  <th className="p-3 w-10">
                    <input 
                      type="checkbox" 
                      checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0} 
                      onChange={handleSelectAll} 
                      className="w-4 h-4 rounded" 
                    />
                  </th>
                  <th className="p-3">Product</th><th className="p-3">SKU</th><th className="p-3">Category</th>
                  <th className="p-3">Price</th><th className="p-3">Stock</th><th className="p-3">Sales</th>
                  <th className="p-3">Rating</th><th className="p-3">Status</th><th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map(product => (
                  <ProductTableRow 
                    key={product.id} theme={theme} product={product}
                    onEdit={editProduct} onDelete={(id) => setShowDeleteModal(id)}
                    isSelected={selectedProducts.includes(product.id)}
                    onSelect={() => {
                      if (selectedProducts.includes(product.id)) setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                      else setSelectedProducts([...selectedProducts, product.id]);
                    }}
                    getStatusBadge={getStatusBadge}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Products Pagination - Shows even when no products? No, only when totalPages > 0 */}
      {totalPages > 0 && (
        <ProductsPagination 
          theme={theme} 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          totalItems={totalItems}
        />
      )}
      
      {filteredProducts.length === 0 && (
        <div className={`${theme.card} rounded-xl p-12 text-center`}>
          <Package size={48} className="mx-auto mb-4 opacity-30" />
          <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>No products found</h3>
          <p className={theme.textSecondary}>Try adjusting your search or filters</p>
          <button onClick={clearFilters} className={`mt-4 ${theme.primary} text-white px-6 py-2 rounded-lg`}>Clear filters</button>
        </div>
      )}
      
      <ProductFormModal 
        theme={theme} isOpen={showAddModal || showEditModal} 
        onClose={() => { setShowAddModal(false); setShowEditModal(false); resetForm(); }}
        onSubmit={showAddModal ? handleAddProduct : handleUpdateProduct} 
        formData={formData} setFormData={setFormData} isEdit={showEditModal}
      />
      
      <DeleteConfirmModal 
        theme={theme} isOpen={!!showDeleteModal} onClose={() => setShowDeleteModal(null)}
        onConfirm={() => handleDeleteProduct(showDeleteModal)} title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
      
      <DeleteConfirmModal 
        theme={theme} isOpen={showBulkDelete} onClose={() => setShowBulkDelete(false)}
        onConfirm={handleBulkDelete} title={`Delete ${selectedProducts.length} Products`}
        message="Are you sure you want to delete all selected products? This action cannot be undone." isBulk
      />
    </div>
  );
}