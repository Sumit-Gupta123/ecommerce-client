import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row bg-white p-6 rounded-xl border border-gray-200 shadow-sm gap-6 items-center sm:items-start">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-32 h-32 object-cover rounded-lg bg-gray-50"
              />
              
              <div className="flex-1 flex flex-col justify-between w-full h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">{item.category}</p>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  </div>
                  <p className="text-lg font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent rounded-l-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium text-gray-900">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-r-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="flex items-center text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">${totalPrice().toFixed(2)}</span>
              </div>
            </div>

            <Link 
              to="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3.5 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors focus:ring-4 focus:ring-blue-100"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}