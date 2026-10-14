import type { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: number } }
  | { type: "INCREMENT"; payload: { productId: number } }
  | { type: "DECREMENT"; payload: { productId: number } }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; payload: { items: CartItem[] } };