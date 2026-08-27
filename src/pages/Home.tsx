// src/pages/Home.tsx
import ProductGrid from '../components/products/ProductGrid';
import type { Product } from '../types';

// Temporary mock data until the Laravel API is ready
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-fidelity audio with active noise cancellation and 30-hour battery life.",
    price: 299.99,
    category: "Electronics",
    imageUrl: "/assets/headphones.jpg"
  },
  {
    id: 2,
    name: "Minimalist Mechanical Keyboard",
    description: "Tactile switches, customizable RGB backlighting, and aluminum frame.",
    price: 149.50,
    category: "Accessories",
    imageUrl: "/assets/keyboard.jpg"
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    description: "Adjustable lumbar support and breathable mesh back for all-day comfort.",
    price: 199.00,
    category: "Furniture",
    imageUrl: "/assets/chair.jpg"
  },
  {
    id: 4,
    name: "Smart Watch Pro",
    description: "Advanced health tracking, GPS, and seamless smartphone integration.",
    price: 249.99,
    category: "Electronics",
    imageUrl: "/assets/smartwatch.jpg"
  }
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Summer Sale is Here
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
          Get up to 50% off on premium electronics and accessories. 
        </p>
      </div>

      {/* Featured Products */}
      <ProductGrid 
        title="Featured Products" 
        products={MOCK_PRODUCTS} 
      />
    </div>
  );
}