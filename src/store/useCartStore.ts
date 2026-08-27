import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  // Computed values
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);
        if (existingItem) {
          // Increase quantity if it already exists
          return {
            items: state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        // Add new item with quantity 1
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter((item) => item.id !== productId),
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.id === productId 
            ? { ...item, quantity: Math.max(1, quantity) } // Prevent going below 1
            : item
        ),
      })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      
      totalPrice: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
    }),
    {
      name: 'larastore-cart', // Key used in localStorage
    }
  )
);