import { Link } from "react-router-dom";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { CartItem } from "../components/cart/CartItem";
import { CartSummary } from "../components/cart/CartSummary";
import { Button, EmptyState } from "../components/ui";

export function CartPage() {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState
          title="سبد خریدت خالیه"
          description="بریم یه سری محصول ببینیم و به سبد اضافه کنیم؟"
          action={
            <Link to="/products">
              <Button size="lg">
                <ShoppingBag className="h-5 w-5" />
                مشاهده محصولات
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          سبد خرید
        </h1>
        <Button variant="outline" size="sm" onClick={clearCart}>
          <Trash2 className="h-4 w-4" />
          خالی کردن سبد
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* لیست محصولات */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 px-5">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>

        {/* خلاصه سفارش */}
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}