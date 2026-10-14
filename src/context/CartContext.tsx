import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { CartAction, CartItem, CartState } from "../types/cart";
import type { Product } from "../types/product";
import { cartReducer } from "./cartReducer";
import {
  getCartItemCount,
  getCartSavings,
  getCartSubtotal,
} from "../utils/cartCalculations";

const STORAGE_KEY = "simple-store-cart";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  savings: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const initialState: CartState = { items: [] };

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        dispatch({ type: "HYDRATE", payload: { items: parsed } });
      }
    } catch {
      
    }
  }, []);

  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      
    }
  }, [state.items]);

  // ─── اکشن‌ها ───
  const dispatchAction = (action: CartAction) => dispatch(action);

  const value: CartContextValue = {
    items: state.items,
    itemCount: getCartItemCount(state.items),
    subtotal: getCartSubtotal(state.items),
    savings: getCartSavings(state.items),
    addItem: (product, quantity = 1) =>
      dispatchAction({ type: "ADD_ITEM", payload: { product, quantity } }),
    removeItem: (productId) =>
      dispatchAction({ type: "REMOVE_ITEM", payload: { productId } }),
    increment: (productId) =>
      dispatchAction({ type: "INCREMENT", payload: { productId } }),
    decrement: (productId) =>
      dispatchAction({ type: "DECREMENT", payload: { productId } }),
    clearCart: () => dispatchAction({ type: "CLEAR_CART" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart باید داخل CartProvider استفاده بشه");
  }
  return ctx;
}