import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import apiClient from '../lib/axios';
import { Package, Clock, CheckCircle, User } from 'lucide-react';

// Define TypeScript interfaces for our order data
interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  total_amount: string;
  status: string;
  created_at: string;
  items: OrderItem[];
}

export default function Profile() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get('/orders');
        setOrders(response.data);
      } catch (err: any) {
        setError('Failed to load order history.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-500">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* User Info Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 flex items-center gap-4">
        <div className="bg-gray-100 p-4 rounded-full">
          <User className="w-8 h-8 text-gray-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Package className="w-6 h-6" /> Order History
      </h2>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Loading orders...</div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-gray-200 shadow-sm text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
          <p className="text-gray-500">When you place orders, they will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Placed</p>
                  <p className="font-medium text-gray-900">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="font-medium text-gray-900">${parseFloat(order.total_amount).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order #</p>
                  <p className="font-medium text-gray-900">{order.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  {order.status === 'paid' || order.status === 'shipped' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                  <span className="font-semibold uppercase text-sm tracking-wide text-gray-700">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <ul className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                      <div>
                        <p className="font-medium text-gray-900">{item.product_name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}