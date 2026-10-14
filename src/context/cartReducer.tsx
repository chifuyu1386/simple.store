import type { CartAction, CartState } from "../types/cart";

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;
      const existing = state.items.find((item) => item.product.id === product.id);

      // اگه محصول از قبل توی سبد بود، تعدادش رو اضافه کن
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      // وگرنه یه آیتم جدید اضافه کن
      return {
        items: [...state.items, { product, quantity }],
      };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (item) => item.product.id !== action.payload.productId
        ),
      };

    case "INCREMENT":
      return {
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREMENT":
      return {
        items: state.items
          .map((item) =>
            item.product.id === action.payload.productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          // اگه تعداد صفر شد، آیتم رو حذف کن
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR_CART":
      return { items: [] };

    case "HYDRATE":
      return { items: action.payload.items };

    default:
      return state;
  }
}