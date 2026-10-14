import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "../../types/cart";
import { useCart } from "../../context/CartContext";
import { QuantitySelector } from "../product/QuantitySelector";
import { formatPrice } from "../../utils/formatPrice";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { increment, decrement, removeItem } = useCart();
  const { product, quantity } = item;

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const lineTotal = discountedPrice * quantity;

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
      {/* تصویر */}
      <Link
        to={`/products/${product.id}`}
        className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* اطلاعات */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link to={`/products/${product.id}`}>
              <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 text-sm sm:text-base">
                {product.title}
              </h3>
            </Link>
            <span className="text-xs text-gray-500 capitalize block mt-1">
              {product.category}
            </span>
          </div>

          <button
            onClick={() => removeItem(product.id)}
            aria-label="حذف از سبد"
            className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 mt-auto">
          <QuantitySelector
            value={quantity}
            max={product.stock}
            onChange={(next) => {
              if (next > quantity) increment(product.id);
              else if (next < quantity) decrement(product.id);
            }}
          />

          <div className="text-left">
            <div className="font-bold text-gray-900 text-sm sm:text-base">
              {formatPrice(lineTotal)}
            </div>
            {product.discountPercentage > 0 && (
              <div className="text-xs text-gray-400 line-through">
                {formatPrice(product.price * quantity)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}