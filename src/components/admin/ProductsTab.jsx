// components/admin/ProductsTab.jsx
import React, { useState, useMemo } from 'react';
import { Search, Plus, Edit, Trash2, List, Grid3x3, ChevronLeft, ChevronRight, Star, X, Upload, Image } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProductsTab({ theme, products: initialProducts, setProducts }) {
  const [products, setLocalProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', stock: '', category: 'Electronics', image: null, imagePreview: null, gallery: []
  });
  const [galleryImages, setGalleryImages] = useState([]);

  const categories = ['Electronics', 'Fashion', 'Accessories', 'Smart Home', 'Sports', 'Beauty'];

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: file, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryImages(prev => [...prev, reader.result]);
        setFormData({ ...formData, gallery: [...formData.gallery, reader.result] });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.price) {
      toast.error('Please fill required fields');
      return;
    }
    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: formData.category,
      image: formData.imagePreview || '📦',
      gallery: formData.gallery,
      rating: 4.5,
      sales: 0,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setLocalProducts([newProduct, ...products]);
    setProducts([newProduct, ...products]);
    setShowAddModal(false);
    setFormData({ name: '', price: '', stock: '', category: 'Electronics', image: null, imagePreview: null, gallery: [] });
    setGalleryImages([]);
    toast.success('Product added successfully!');
  };

  const handleDeleteProduct = (id) => {
    setLocalProducts(products.filter(p => p.id !== id));
    setProducts(products.filter(p => p.id !== id));
    setShowDeleteConfirm(null);
    toast.success('Product deleted successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className={`text-2xl font-bold ${theme.text}`}>Products Management</h2>
        <div className="flex gap-2">
          <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className={`p-2 rounded-lg ${theme.cardHover}`}>
            {viewMode === 'grid' ? <List size={18} /> : <Grid3x3 size={18} />}
          </button>
          <button onClick={() => setShowAddModal(true)} className={`${theme.primary} text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm`}>
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} size={18} />
          <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
        </div>
        <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} 
          className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}>
          <option value={8}>Show 8</option><option value={12}>Show 12</option><option value={24}>Show 24</option>
        </select>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedProducts.map(product => (
            <div key={product.id} className={`${theme.card} rounded-xl overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 border ${theme.border}`}>
              <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                {product.image?.startsWith('data:image') ? (
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-6xl">{product.image || '📦'}</span>
                )}
                {product.stock <= 5 && product.stock > 0 && <div className="absolute top-2 left-2 px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">Low Stock</div>}
                {product.stock === 0 && <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">Out of Stock</div>}
              </div>
              <div className="p-4">
                <h3 className={`font-semibold ${theme.text} mb-1 line-clamp-1`}>{product.name}</h3>
                <p className={`text-xs ${theme.textSecondary} mb-2`}>{product.category}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-xl font-bold text-blue-500`}>${product.price}</span>
                  <div className="flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /><span className={`text-xs ${theme.textSecondary}`}>{product.rating}</span></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowEditModal(product)} className="flex-1 py-1.5 rounded-lg border border-blue-500 text-blue-500 text-sm hover:bg-blue-500/10">Edit</button>
                  <button onClick={() => setShowDeleteConfirm(product.id)} className="flex-1 py-1.5 rounded-lg border border-red-500 text-red-500 text-sm hover:bg-red-500/10">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`${theme.card} rounded-xl overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className={`${theme.border} border-b`}>
                <tr className={`text-left text-xs sm:text-sm ${theme.textSecondary}`}>
                  <th className="p-3">Product</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Stock</th><th className="p-3">Rating</th><th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map(product => (
                  <tr key={product.id} className={`border-b ${theme.border} hover:bg-white/5 transition-all`}>
                    <td className="p-3"><div className="flex items-center gap-2">{product.image?.startsWith('data:image') ? <img src={product.image} className="w-8 h-8 rounded object-cover" /> : <span className="text-2xl">{product.image || '📦'}</span>}<span className={`font-semibold ${theme.text}`}>{product.name}</span></div></td>
                    <td className={`p-3 text-sm ${theme.textSecondary}`}>{product.category}</td>
                    <td className={`p-3 font-semibold ${theme.text}`}>${product.price}</td>
                    <td className={`p-3 text-sm ${product.stock === 0 ? 'text-red-500' : theme.text}`}>{product.stock}</td>
                    <td className="p-3"><div className="flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /><span className={`text-sm ${theme.text}`}>{product.rating}</span></div></td>
                    <td className="p-3"><div className="flex gap-2"><button onClick={() => setShowEditModal(product)} className="p-1 rounded hover:bg-white/10"><Edit size={16} /></button><button onClick={() => setShowDeleteConfirm(product.id)} className="p-1 rounded hover:bg-white/10"><Trash2 size={16} className="text-red-500" /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 flex-wrap">
          <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? 'opacity-50' : theme.cardHover}`}><ChevronLeft size={20} /></button>
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            let pageNum = i + 1;
            if (totalPages > 5 && currentPage > 3) pageNum = currentPage - 3 + i;
            if (pageNum > totalPages) return null;
            return <button key={i} onClick={() => setCurrentPage(pageNum)} className={`px-4 py-2 rounded-lg ${currentPage === pageNum ? theme.primary + ' text-white' : theme.cardHover}`}>{pageNum}</button>;
          })}
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className={`p-2 rounded-lg ${currentPage === totalPages ? 'opacity-50' : theme.cardHover}`}><ChevronRight size={20} /></button>
        </div>
      )}

      {/* Add/Edit Product Modal with Image Upload */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => { setShowAddModal(false); setShowEditModal(null); }}>
          <div className={`${theme.card} rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6`} onClick={(e) => e.stopPropagation()}>
            <h3 className={`text-2xl font-bold mb-4 ${theme.text}`}>{showEditModal ? 'Edit Product' : 'Add New Product'}</h3>
            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Product Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-all" onClick={() => document.getElementById('imageUpload').click()}>
                  {formData.imagePreview ? (
                    <img src={formData.imagePreview} alt="Preview" className="h-32 mx-auto rounded-lg object-cover" />
                  ) : (
                    <>
                      <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">Click to upload product image</p>
                    </>
                  )}
                  <input id="imageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </div>
              </div>
              
              {/* Gallery Upload */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Product Gallery (Multiple Images)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-all" onClick={() => document.getElementById('galleryUpload').click()}>
                  <Image size={32} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Click to upload gallery images</p>
                  <input id="galleryUpload" type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
                </div>
                {galleryImages.length > 0 && (
                  <div className="flex gap-2 mt-2 overflow-x-auto">
                    {galleryImages.map((img, idx) => (
                      <img key={idx} src={img} alt={`Gallery ${idx}`} className="w-16 h-16 rounded object-cover" />
                    ))}
                  </div>
                )}
              </div>
              
              <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className={`px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
                <input type="number" placeholder="Stock" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className={`px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`} />
              </div>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text}`}>
                {categories.map(cat => <option key={cat}>{cat}</option>)}
              </select>
              <div className="flex gap-3 pt-4">
                <button onClick={() => { setShowAddModal(false); setShowEditModal(null); }} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}>Cancel</button>
                <button onClick={handleAddProduct} className={`flex-1 px-4 py-2 rounded-lg ${theme.primary} text-white`}>{showEditModal ? 'Update' : 'Add'} Product</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteConfirm(null)}>
          <div className={`${theme.card} rounded-xl max-w-md w-full p-6 text-center`} onClick={(e) => e.stopPropagation()}>
            <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
            <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>Delete Product</h3>
            <p className={`${theme.textSecondary} mb-6`}>Are you sure you want to delete this product?</p>
            <div className="flex gap-3"><button onClick={() => setShowDeleteConfirm(null)} className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover}`}>Cancel</button><button onClick={() => handleDeleteProduct(showDeleteConfirm)} className={`flex-1 px-4 py-2 rounded-lg bg-red-500 text-white`}>Delete</button></div>
          </div>
        </div>
      )}
    </div>
  );
}