import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function Success() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
          Order placed successfully!
        </h2>
        
        <p className="text-gray-500 mb-8">
          Thank you for shopping with us. We have received your order and will begin processing it right away.
        </p>
        
        <Link
          to="/"
          className="inline-flex justify-center items-center w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}