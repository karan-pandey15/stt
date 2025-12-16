"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartDrawer() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartDrawer must be used within CartProvider");
  }
  return context;
}
