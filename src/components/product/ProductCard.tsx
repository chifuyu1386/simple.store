import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../../types/product";
import { Badge, Button, Rating } from "../ui";
import { formatPrice } from "../../utils/formatPrice";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  const isLowStock = product.stock > 0 && product.stock <= 10;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      {/* تصویر + بج تخفیف */}
      <Link to={`/products/${product.id}`} className="relative block">
        <div className="aspect-square bg-gray-100 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {product.discountPercentage > 0 && (
          <div className="absolute top-3 right-3">
            <Badge variant="danger">
              {Math.round(product.discountPercentage)}٪ تخفیف
            </Badge>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">ناموجود</span>
          </div>
        )}
      </Link>

      {/* محتوا */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-xs text-gray-500 capitalize">
          {product.category}
        </span>

        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        <Rating value={product.rating} showValue size="sm" />

        {/* قیمت */}
        <div className="mt-auto pt-2">
          {product.discountPercentage > 0 ? (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(discountedPrice)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* دکمه */}
        <Button
          variant={isOutOfStock ? "secondary" : "primary"}
          size="sm"
          fullWidth
          disabled={isOutOfStock}
          className="mt-2"
        >
          <ShoppingCart className="h-4 w-4" />
          {isOutOfStock ? "ناموجود" : "افزودن به سبد"}
        </Button>
      </div>
    </div>
  );
}