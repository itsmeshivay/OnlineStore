import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  getTotalPrice: () => number;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const data = localStorage.getItem("cart");
      if (data) {
        setCart(JSON.parse(data));
      }
    } catch (error) {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    const existing = cart.find((p) => p.id === item.id);

    if (existing) {
      const updatedCart = cart.map((p) =>
        p.id === item.id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  
  const decreaseQuantity = (id: number) => {
    const existing = cart.find((p) => p.id === id);

    if (existing && existing.quantity > 1) {
      const updatedCart = cart.map((p) =>
        p.id === id
          ? { ...p, quantity: p.quantity - 1 }
          : p
      );
      setCart(updatedCart);
    } else {
      removeFromCart(id);
    }
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};