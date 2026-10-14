import type { CartItem } from "../types/cart";

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const price = item.product.price * (1 - item.product.discountPercentage / 100);
    return sum + price * item.quantity;
  }, 0);
}

export function getCartSavings(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const originalPrice = item.product.price * item.quantity;
    const discountedPrice =
      item.product.price * (1 - item.product.discountPercentage / 100) * item.quantity;
    return sum + (originalPrice - discountedPrice);
  }, 0);
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}