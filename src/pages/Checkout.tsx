import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { CreditCard, Truck, ShieldCheck, AlertCircle } from 'lucide-react';
import apiClient from '../lib/axios';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // 1. Add a ref to track if a successful order just happened
  const isOrderPlaced = useRef(false); 

  // 2. Safely redirect to cart ONLY if it's empty AND we haven't just placed an order
  useEffect(() => {
    if (items.length === 0 && !isOrderPlaced.current) {
      navigate('/cart');
    }
  }, [items.length, navigate]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage('');
    
    try {
      const orderPayload = {
        total_amount: totalPrice(),
        items: items.map(item => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await apiClient.post('/orders', orderPayload);
      
      // 3. Set the flag to TRUE right before clearing the cart!
      isOrderPlaced.current = true; 
      
      clearCart();
      navigate('/success');

    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Failed to place order. Please make sure you are logged in.');
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Prevent rendering the form if the cart is empty (unless we are mid-redirect to success)
  if (items.length === 0 && !isOrderPlaced.current) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
        
        {/* Form Section */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Error Alert */}
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start gap-3 rounded-r-lg">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
            </div>
          )}

          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
            
            {/* Shipping Details */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Truck className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input required type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code</label>
                  <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input required type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input required type="text" placeholder="MM/YY" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                    <input required type="text" placeholder="123" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate pr-4">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">${totalPrice().toFixed(2)}</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3.5 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors focus:ring-4 focus:ring-blue-100 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Pay $${totalPrice().toFixed(2)}`}
              {!isProcessing && <ShieldCheck className="w-5 h-5" />}
            </button>
            <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Secure checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}