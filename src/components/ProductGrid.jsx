// components/ProductGrid.jsx
import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Premium Wireless Headphones', price: 299, icon: '🎧', sales: 1234, rating: 4.8 },
  { id: 2, name: 'Smart Watch Ultra', price: 499, icon: '⌚', sales: 892, rating: 4.9 },
  { id: 3, name: 'Designer Laptop Bag', price: 129, icon: '🎒', sales: 2341, rating: 4.7 },
  { id: 4, name: 'USB-C Hub Pro', price: 79, icon: '🔌', sales: 3456, rating: 4.6 },
  { id: 5, name: 'Mechanical Keyboard', price: 189, icon: '⌨️', sales: 1567, rating: 4.8 },
  { id: 6, name: 'Gaming Mouse X', price: 89, icon: '🖱️', sales: 2789, rating: 4.7 }
];

export default function ProductGrid({ theme, role }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${theme.text}`}>
          <i className="fas fa-fire mr-2 text-orange-500"></i>
          Featured Products
        </h2>
        {role !== 'visitor' && (
          <div className={`px-4 py-2 rounded-lg ${theme.card} ${theme.textSecondary}`}>
            <i className="fas fa-shopping-cart mr-2"></i>
            Cart: {cart.length} items
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className={`${theme.card} ${theme.cardHover} rounded-xl shadow-lg overflow-hidden border ${theme.border} transition-all transform hover:-translate-y-2 duration-300`}>
            <div className={`text-6xl p-6 text-center ${theme.gradient}`}>
              {product.icon}
            </div>
            <div className="p-5">
              <h3 className={`text-xl font-semibold ${theme.text} mb-2`}>{product.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                  ))}
                </div>
                <span className={`text-sm ${theme.textSecondary}`}>({product.rating})</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  ${product.price}
                </span>
                <span className={`text-sm ${theme.textSecondary}`}>
                  <i className="fas fa-shopping-bag mr-1"></i> {product.sales}+ sold
                </span>
              </div>
              <button 
                onClick={() => addToCart(product)}
                className={`w-full ${theme.primary} ${theme.primaryHover} text-white py-2 rounded-lg transition-all font-semibold flex items-center justify-center gap-2`}
              >
                <i className="fas fa-cart-plus"></i> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}