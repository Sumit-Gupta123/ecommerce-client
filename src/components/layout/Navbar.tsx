import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, User, LogOut, X } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    localStorage.removeItem('auth_token'); 
    setIsMobileMenuOpen(false);
    navigate('/login'); 
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
              Lara<span className="text-blue-600">Store</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium transition">Shop</Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-600 font-medium transition">Categories</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-900 transition">
              <Search className="w-6 h-6" />
            </button>

            {/* Desktop Auth UI */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                  title="View Profile & Orders"
                >
                  <User className="w-5 h-5" />
                  <span>Hi, {user?.name.split(' ')[0]}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-600 transition"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block text-gray-500 hover:text-blue-600 transition">
                <User className="w-6 h-6" />
              </Link>
            )}
            
            <Link to="/cart" className="text-gray-500 hover:text-gray-900 transition relative">
              <ShoppingCart className="w-6 h-6" />
              {/* Dynamic Cart Badge */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Toggle Button */}
            <button 
              className="md:hidden text-gray-500 hover:text-gray-900 transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-600"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-600"
            >
              Shop
            </Link>
            <Link 
              to="/categories" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-600"
            >
              Categories
            </Link>
          </div>

          {/* Mobile Auth UI */}
          <div className="pt-4 pb-4 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="px-4 space-y-1">
                <div className="px-3 py-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-base font-medium text-gray-900">
                    Hi, {user?.name.split(' ')[0]}
                  </span>
                </div>
                <Link 
                  to="/profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-600"
                >
                  Profile & Orders
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-4">
                <Link 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-600"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}