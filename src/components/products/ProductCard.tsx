// src/components/products/ProductCard.tsx
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {

    const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-medium text-blue-600 mb-1 uppercase tracking-wider">
          {product.category}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        
        {/* Price and Action */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addItem(product)} 
            className="flex items-center justify-center p-2.5 bg-gray-900 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}