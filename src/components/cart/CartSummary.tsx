import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Tag, Truck } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Button, Input } from "../ui";
import { formatPrice } from "../../utils/formatPrice";
import { useAuth } from "../../context/AuthContext";

const SHIPPING_COST = 10;
const FREE_SHIPPING_THRESHOLD = 100;

export function CartSummary() {
  const { subtotal, savings, itemCount } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const { isAuthenticated } = useAuth();

  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = Math.max(0, subtotal - appliedDiscount + shipping);

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === "WELCOME10") {
      setAppliedDiscount(subtotal * 0.1);
    } else {
      setAppliedDiscount(0);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-24 space-y-4">
      <h2 className="font-bold text-gray-900 text-lg">خلاصه سفارش</h2>

      {/* کد تخفیف */}
      <div className="flex gap-2">
        <Input
          name="discount"
          placeholder="کد تخفیف"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <Button variant="outline" onClick={handleApplyDiscount}>
          <Tag className="h-4 w-4" />
          اعمال
        </Button>
      </div>

      <p className="text-xs text-gray-500">
        راهنما: کد <span className="font-mono font-semibold">WELCOME10</span> رو
        امتحان کن
      </p>

      {/* ریز اقلام */}
      <div className="space-y-2 text-sm pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">
            جمع کل ({itemCount.toLocaleString("fa-IR")} کالا)
          </span>
          <span className="font-medium">{formatPrice(subtotal + savings)}</span>
        </div>

        {savings > 0 && (
          <div className="flex items-center justify-between text-green-600">
            <span>سود شما از تخفیف‌ها</span>
            <span>-{formatPrice(savings)}</span>
          </div>
        )}

        {appliedDiscount > 0 && (
          <div className="flex items-center justify-between text-green-600">
            <span>کد تخفیف</span>
            <span>-{formatPrice(appliedDiscount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-gray-600 flex items-center gap-1">
            <Truck className="h-4 w-4" />
            حمل و نقل
          </span>
          {shipping === 0 ? (
            <span className="text-green-600 font-medium">رایگان</span>
          ) : (
            <span className="font-medium">{formatPrice(shipping)}</span>
          )}
        </div>
      </div>

      {/* پیام حمل رایگان */}
      {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
        <div className="text-xs text-blue-600 bg-blue-50 rounded-lg p-2.5 text-center">
          {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} دیگه خرید کن تا
          حمل‌ونقل رایگان بشه!
        </div>
      )}

      {/* مبلغ نهایی */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <span className="font-bold text-gray-900">مبلغ قابل پرداخت</span>
        <span className="font-bold text-xl text-gray-900">
          {formatPrice(total)}
        </span>
      </div>

      <Link to={isAuthenticated ? "/checkout" : "/login"} >
        <Button size="lg" fullWidth>
          {isAuthenticated ? "ادامه فرآیند خرید" : "ورود برای تسویه"}
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>

      <Link
        to="/products"
        className="block text-center text-sm text-blue-600 hover:underline mt-3"
      >
        ادامه خرید
      </Link>
    </div>
  );
}