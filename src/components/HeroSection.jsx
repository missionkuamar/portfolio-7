// components/ProductGrid.jsx
import React, { useContext, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const products = [
  { id: 1, name: 'Wireless Headphones', price: 99, image: '🎧', sales: 245 },
  { id: 2, name: 'Smart Watch', price: 199, image: '⌚', sales: 178 },
  { id: 3, name: 'Laptop Backpack', price: 49, image: '🎒', sales: 432 },
  { id: 4, name: 'USB-C Hub', price: 39, image: '🔌', sales: 567 },
  { id: 5, name: 'Mechanical Keyboard', price: 129, image: '⌨️', sales: 234 },
  { id: 6, name: 'Gaming Mouse', price: 59, image: '🖱️', sales: 389 }
];

export default function ProductGrid() {
  const { theme } = useContext(ThemeContext);
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`Added ${product.name} to cart!`);
  };
  
  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 ${theme.text}`}>
        <i className="fas fa-fire mr-2 text-orange-500"></i>
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className={`${theme.card} rounded-xl shadow-lg overflow-hidden border ${theme.border} hover:shadow-xl transition-all transform hover:-translate-y-1`}>
            <div className="text-6xl p-6 text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
              {product.image}
            </div>
            <div className="p-5">
              <h3 className={`text-xl font-semibold ${theme.text} mb-2`}>{product.name}</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                <span className={`text-sm ${theme.textSecondary}`}>
                  <i className="fas fa-shopping-bag mr-1"></i> {product.sales} sold
                </span>
              </div>
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                <i className="fas fa-cart-plus mr-2"></i> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className={`fixed bottom-4 right-4 ${theme.card} rounded-lg shadow-2xl p-4 border ${theme.border} z-50`}>
          <p className={`${theme.text} font-semibold`}>
            <i className="fas fa-shopping-cart mr-2 text-blue-600"></i>
            Cart: {cart.length} items
          </p>
        </div>
      )}
    </div>
  );
}