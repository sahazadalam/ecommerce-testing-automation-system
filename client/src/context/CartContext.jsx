import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import cartService from '../services/cartService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    setLoading(true);
    try {
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const updatedCart = await cartService.addToCart(productId, quantity);
      setCart(updatedCart);
      toast.success('Added to cart!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
      return false;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const updatedCart = await cartService.updateCartItem(productId, quantity);
      setCart(updatedCart);
      return true;
    } catch (error) {
      toast.error('Failed to update quantity');
      return false;
    }
  };

  const removeItem = async (productId) => {
    try {
      const updatedCart = await cartService.removeFromCart(productId);
      setCart(updatedCart);
      toast.success('Item removed from cart');
      return true;
    } catch (error) {
      toast.error('Failed to remove item');
      return false;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCart({ items: [], totalPrice: 0 });
      toast.success('Cart cleared');
      return true;
    } catch (error) {
      toast.error('Failed to clear cart');
      return false;
    }
  };

  const getCartCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      getCartCount,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};