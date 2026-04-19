// components/ProductModal.jsx
import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw
} from 'lucide-react';

export default function ProductModal({ product, onClose, theme, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const discount =
    product?.originalPrice > product?.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className={`${theme.card} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-inherit">
          <h2 className={`text-2xl font-bold ${theme.text}`}>
            {product?.name}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${theme.cardHover}`}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="h-64 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-8xl">
              {product?.image}
            </div>

            {/* Details */}
            <div>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={
                        i < Math.floor(product?.rating || 0)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>
                <span className={theme.textSecondary}>
                  ({product?.rating || 0} rating)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl font-bold text-blue-500">
                  ${product?.price}
                </span>

                {product?.originalPrice > product?.price && (
                  <>
                    <span
                      className={`text-lg line-through ${theme.textSecondary}`}
                    >
                      ${product.originalPrice}
                    </span>
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className={`${theme.textSecondary} mb-4`}>
                {product?.description ||
                  "Premium quality product with excellent features and customer satisfaction guarantee."}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-4">
                <label className={theme.text}>Quantity:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setQuantity(Math.max(1, quantity - 1))
                    }
                    className={`w-8 h-8 rounded-lg ${theme.cardHover}`}
                  >
                    -
                  </button>

                  <span className={`w-12 text-center ${theme.text}`}>
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={`w-8 h-8 rounded-lg ${theme.cardHover}`}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => onAddToCart(product)}
                  className={`flex-1 ${theme.primary} text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2`}
                >
                  <ShoppingCart size={18} />
                  Add to Cart - ${product?.price * quantity}
                </button>

                <button
                  className={`px-4 py-3 rounded-xl ${theme.cardHover}`}
                >
                  <Heart size={18} />
                </button>

                <button
                  className={`px-4 py-3 rounded-xl ${theme.cardHover}`}
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <Truck className="mx-auto mb-2" size={24} />
              <p className={`text-sm ${theme.text}`}>Free Shipping</p>
              <p className={`text-xs ${theme.textSecondary}`}>
                On orders over $50
              </p>
            </div>

            <div className="text-center">
              <Shield className="mx-auto mb-2" size={24} />
              <p className={`text-sm ${theme.text}`}>2 Year Warranty</p>
              <p className={`text-xs ${theme.textSecondary}`}>
                Full protection
              </p>
            </div>

            <div className="text-center">
              <RotateCcw className="mx-auto mb-2" size={24} />
              <p className={`text-sm ${theme.text}`}>
                30 Day Returns
              </p>
              <p className={`text-xs ${theme.textSecondary}`}>
                Money back guarantee
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className={`font-semibold mb-2 ${theme.text}`}>
              Tags
            </h3>

            <div className="flex flex-wrap gap-2">
              {product?.tags?.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm ${theme.cardHover} ${theme.textSecondary}`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}