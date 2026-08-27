import { useState, useMemo, useCallback, useEffect } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((food) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.food.id === food.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.food.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { food, quantity: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((foodId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.food.id !== foodId));
  }, []);

  const updateQuantity = useCallback((foodId, quantity) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.food.id !== foodId);
      }
      return prevItems.map((item) =>
        item.food.id === foodId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.food.price * item.quantity,
      0
    );
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const contextValue = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
    }),
    [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
